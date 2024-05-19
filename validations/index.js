import * as z from "zod";

export const signupSchema = z
  .object({
    username: z.string().min(1, "Username is require"),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid Email" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  emailOrUsername: z
    .string()
    .min(1, { message: "Please enter your email or username" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const updateProfileSchema = z.object({
  username: z.string().min(1, "Username is require"),
  image: z.string().optional(),
});

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  image: z.string().min(1, "Image is required"),
  category: z.string().min(1, "Category is reuiqred"),
  description: z.string().min(1, "Description is required"),
});

export const commentSchema = z.object({
  content: z.string().min(1, "Title is required"),
});
