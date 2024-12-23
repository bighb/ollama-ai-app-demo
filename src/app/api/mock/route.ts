// app/api/goodbye/route.js
export async function GET() {
  return new Response(JSON.stringify({ message: "Goodbye, World!" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
