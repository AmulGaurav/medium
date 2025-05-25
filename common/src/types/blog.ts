import { z } from "zod";

export const createBlogInput = z.object({
  title: z
    .string()
    .min(5, { message: "Title must include at least 5 characters!" })
    .max(150, { message: "Title cannot include more than 60 characters!" }),
  content: z.string().min(6, { message: "Content is too short!" }).max(2000, {
    message: "Maximum limit of 2000 characters has been reached!",
  }),
  published: z.boolean().optional(),
});

export const updateBlogInput = z.object({
  id: z.string().max(50),
  title: z.string().min(5).max(40).optional(),
  content: z.string().min(6).max(60).optional(),
  published: z.boolean().optional().optional(),
});

export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
