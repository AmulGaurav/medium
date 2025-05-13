import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@amulgaurav/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const { data, success } = signupInput.safeParse(body);

    if (!success) {
      c.status(411);
      return c.json({
        message: "Inputs not correct",
      });
    }

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ token });
  } catch (e) {
    c.status(403);
    return c.json({ message: "User already exists!" });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const { data, success } = signinInput.safeParse(body);

    if (!success) {
      c.status(411);
      return c.json({
        message: "Inputs not correct",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
        password: data.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ message: "User not found!" });
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ token });
  } catch (error) {
    console.log(error);
    return c.json({ message: "Error occured while signing up!" });
  }
});
