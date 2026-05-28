const menu = [
  {
    id: "street-tacos",
    name: "Street Tacos",
    description: "Three grilled chicken tacos, onion, cilantro, and lime.",
    priceCents: 950
  },
  {
    id: "loaded-fries",
    name: "Loaded Fries",
    description: "Crispy fries, queso, pico, crema, and pickled jalapeno.",
    priceCents: 800
  },
  {
    id: "limeade",
    name: "Fresh Limeade",
    description: "Cold limeade with mint and sparkling water.",
    priceCents: 350
  }
];

const cart = new Map();
const menuContainer = document.querySelector("#menu");
const cartItemsContainer = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");

const pickupForm = document.querySelector(".pickup-form");
const checkoutButton = document.querySelector(".checkout-button");
const checkoutMessage = document.querySelector("#checkout-message");

function formatCurrency(priceCents) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(priceCents / 100);
}

function addToCart(itemId) {
  cart.set(itemId, (cart.get(itemId) || 0) + 1);
  renderCart(); 
 
}

function removeFromCart(itemId) {
  const newQuantity = (cart.get(itemId) || 0) - 1;

  if (newQuantity <= 0) {
    cart.delete(itemId);
  } else {
    cart.set(itemId, newQuantity);
  }

  renderCart(); 
}
 

function renderMenu() {
  menuContainer.innerHTML = menu
    .map(
      (item) => `
        <article class="menu-card">
          <div>
            <h3>${item.name}</h3>
            <p>${item.description}</p>
          </div>
          <div class="menu-actions">
            <strong>${formatCurrency(item.priceCents)}</strong>
            <button type="button" data-add="${item.id}">Add</button>
          </div>
        </article>
      `
    )
    .join("");

  menuContainer.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-add]");

    if (addButton) {
      addToCart(addButton.dataset.add);
    }
  });
}

function renderCart() {
  if (cart.size === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-state">Nothing added yet.</p>';
    cartTotal.textContent = formatCurrency(0);
    return;
  }

  let totalCents = 0;
  const cartLines = [];

  for (const [itemId, quantity] of cart.entries()) {
    const item = menu.find((menuItem) => menuItem.id === itemId);
    const lineTotalCents = item.priceCents * quantity;
    totalCents += lineTotalCents;

    cartLines.push(`
      <div class="cart-line">
        <div>
          <strong>${item.name}</strong>
          <span>${quantity} x ${formatCurrency(item.priceCents)}</span>
        </div>
        <div class="line-controls">
          <span>${formatCurrency(lineTotalCents)}</span>
          <button type="button" data-remove="${item.id}" aria-label="Remove one ${item.name}">
            -
          </button>
        </div>
      </div>
    `);
  }

  cartItemsContainer.innerHTML = cartLines.join("");
  cartTotal.textContent = formatCurrency(totalCents);
  updateCheckoutState();
}

function updateCheckoutState() {
  const formData = new FormData(pickupForm);
  const hasCartItems = cart.size > 0;
  const hasName = formData.get("name").trim() !== "";
  const hasPhone = formData.get("phone").trim() !== ""; 
  const hasPickUp = formData.get("pickupOption") !== "";

  const canCheckout = hasCartItems && hasName && hasPhone && hasPickUp;

  checkoutButton.disabled = !canCheckout;
 
      checkoutButton.textContent = canCheckout
    ? "Review order"
    : "Add items and pickup info to continue"; 


 
}

cartItemsContainer.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove]");

  if (removeButton) {
    removeFromCart(removeButton.dataset.remove);
  }
}); 

checkoutButton.addEventListener("click", () => {
  checkoutMessage.textContent =
    "Order preview ready. Backend submission comes in a later phase.";
});

pickupForm.addEventListener("input", updateCheckoutState);
document.addEventListener("click", updateCheckoutState);

renderMenu();
