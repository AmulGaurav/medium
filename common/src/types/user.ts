import { z } from "zod";

export const signupInput = z.object({
  email: z.string().email().min(5).max(40),
  password: z.string().min(6).max(20),
  name: z.string().min(1).max(40),
});

export const signinInput = z.object({
  email: z.string().email().min(5).max(40),
  password: z.string().min(6).max(20),
});

export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
