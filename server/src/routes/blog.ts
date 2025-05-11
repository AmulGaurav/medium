import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// middleware
blogRouter.use("/*", async (c, next) => {
  try {
    const header = c.req.header("Authorization") || "";
    const token = header.split(" ")[1];

    const { id } = await verify(token, c.env.JWT_SECRET);

    if (!id) {
      c.status(401);
      return c.json({ message: "Unauthorized" });
    }

    c.set("userId", id as string);
    await next();
  } catch {
    c.status(401);
    return c.json({ message: "Unauthorized" });
  }
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();

    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: c.get("userId"),
      },
    });

    return c.json({
      id: blog.id,
    });
  } catch (e) {
    c.status(422);
    return c.json({
      message: "Incorrect fields in the body",
    });
  }
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();

    const blog = await prisma.blog.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({
      id: blog.id,
    });
  } catch {
    c.status(422);
    return c.json({
      message: "id must be string",
    });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.blog.findMany({
      select: {
        title: true,
      },
    });

    return c.json({
      blogs,
    });
  } catch {
    c.status(411);
    return c.json({
      message: "Error while fetching blogs",
    });
  }
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const id = c.req.param("id");

    const blog = await prisma.blog.findUnique({
      where: {
        id,
      },
    });

    return c.json({
      blog,
    });
  } catch {
    c.status(411);
    return c.json({
      message: "Error while fetching blog post",
    });
  }
});
