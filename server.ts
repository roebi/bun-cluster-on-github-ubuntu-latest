import { serve } from "bun";

const id = Math.random().toString(36).slice(2);

serve({
  port: process.env.PORT || 8080,
  development: false,
  // Linux only: allows multiple Bun processes to share the same port
  reusePort: true,
  async fetch(_request) {
    return new Response("Hello from Bun #" + id + "!\n");
  },
});
