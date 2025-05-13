import { Hono } from "hono";
import { cors } from "hono/cors";
import { blogRouter } from "./routes/blog";
import { userRouter } from "./routes/user";

const app = new Hono();

app.use(
  "/api/v1/*",
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
