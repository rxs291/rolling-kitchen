export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      return jsonResponse({
        ok: true,
        service: "rolling-kitchen",
        phase: "backend-health-check",
      });
    }

    if (url.pathname === "/api/orders" && request.method === "GET") {
      return listOrders(env);
    }

    if (url.pathname === "/api/orders" && request.method === "POST") {
      return createOrder(request, env);
    }

    if (url.pathname.startsWith("/api/")) {
      return jsonResponse(
        {
          ok: false,
          error: "Not found",
        },
        404,
      );
    }
    return env.ASSETS.fetch(request);
  },
};

const menu = [
  {
    id: "street-tacos",
    name: "Street Tacos",
    priceCents: 950,
  },
  {
    id: "loaded-fries",
    name: "Loaded Fries",
    priceCents: 800,
  },
  {
    id: "limeade",
    name: "Fresh Limeade",
    priceCents: 350,
  },
];

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function createOrder(request, env) {
  let body;

  try {
    body = await request.json();
  } catch {
    return jsonResponse(
      {
        ok: false,
        error: "Request body must be valid JSON.",
      },
      400,
    );
  }

  const validation = validateOrderRequest(body);

  if (!validation.ok) {
    return jsonResponse(
      {
        ok: false,
        error: validation.error,
      },
      400,
    );
  }

  const id = crypto.randomUUID();
  const displayId = createDisplayId();
  const paymentStatus = "test_unpaid";
  const orderStatus = "new";
  const itemsJson = JSON.stringify(validation.items);

  await env.DB.prepare(
    `INSERT INTO orders (
      id,
      display_id,
      customer_name,
      customer_phone,
      pickup_option,
      notes,
      items_json,
      total_cents,
      payment_status,
      order_status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      id,
      displayId,
      validation.customerName,
      validation.customerPhone,
      validation.pickupOption,
      validation.notes,
      itemsJson,
      validation.totalCents,
      paymentStatus,
      orderStatus,
    )
    .run();

  return jsonResponse(
    {
      ok: true,
      order: {
        id,
        displayId,
        totalCents: validation.totalCents,
        paymentStatus,
        orderStatus,
      },
    },
    201,
  );
}

async function listOrders(env) {
  const { results } = await env.DB.prepare(
    `SELECT
      id,
      display_id,
      customer_name,
      customer_phone,
      pickup_option,
      notes,
      items_json,
      total_cents,
      payment_status,
      order_status,
      created_at,
      updated_at
    FROM orders
    ORDER BY created_at DESC
    LIMIT 50`,
  ).all();

  return jsonResponse({
    ok: true,
    orders: results.map((order) => ({
      id: order.id,
      displayId: order.display_id,
      customerName: order.customer_name,
      customerPhone: order.customer_phone,
      pickupOption: order.pickup_option,
      notes: order.notes,
      items: JSON.parse(order.items_json),
      totalCents: order.total_cents,
      paymentStatus: order.payment_status,
      orderStatus: order.order_status,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
    })),
  });
}

function validateOrderRequest(body) {
  const customerName = String(body.customerName || "").trim();
  const customerPhone = String(body.customerPhone || "").trim();
  const pickupOption = String(body.pickupOption || "").trim();
  const notes = String(body.notes || "").trim();

  if (!customerName) {
    return { ok: false, error: "Pickup name is required." };
  }

  if (!customerPhone) {
    return { ok: false, error: "Phone number is required." };
  }

  if (!["asap", "scheduled"].includes(pickupOption)) {
    return { ok: false, error: "Pickup option must be asap or scheduled." };
  }

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return { ok: false, error: "At least one order item is required." };
  }

  const itemsById = new Map();

  for (const submittedItem of body.items) {
    const itemId = String(submittedItem.id || "").trim();
    const quantity = Number(submittedItem.quantity);

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return { ok: false, error: "Item quantity must be a positive integer." };
    }

    const menuItem = menu.find((item) => item.id === itemId);

    if (!menuItem) {
      return { ok: false, error: `Unknown menu item: ${itemId}` };
    }

    itemsById.set(itemId, (itemsById.get(itemId) || 0) + quantity);
  }

  let totalCents = 0;
  const items = [];

  for (const [itemId, quantity] of itemsById.entries()) {
    const menuItem = menu.find((item) => item.id === itemId);
    const lineTotalCents = menuItem.priceCents * quantity;
    totalCents += lineTotalCents;

    items.push({
      id: menuItem.id,
      name: menuItem.name,
      quantity,
      priceCents: menuItem.priceCents,
      lineTotalCents,
    });
  }

  return {
    ok: true,
    customerName,
    customerPhone,
    pickupOption,
    notes,
    items,
    totalCents,
  };
}

function createDisplayId() {
  const randomPart = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `RK-${randomPart}`;
}
