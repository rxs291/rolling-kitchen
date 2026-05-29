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

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
