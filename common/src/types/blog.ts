import { z } from "zod";

export const createBlogInput = z.object({
  title: z.string().email().min(5).max(40),
  content: z.string().min(6).max(60),
  published: z.boolean().optional(),
});

export const updateBlogInput = z.object({
  id: z.string().max(50),
  title: z.string().email().min(5).max(40).optional(),
  content: z.string().min(6).max(60).optional(),
  published: z.boolean().optional().optional(),
});

export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
