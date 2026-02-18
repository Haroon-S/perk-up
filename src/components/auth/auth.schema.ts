import z from "zod";

export const registerDefaultValues = {
  username: "",
  email: "",
  password: "",
};

export const loginDefaultValues = {
  email: "",
  password: "",
};

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, {
      error: `Username must be at least 3 characters.`,
    })
    .max(50, {
      error: `Username must be at most 50 characters long.`,
    }),
  email: z.email({ error: "Enter a valid email." }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters." })
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character.",
    ),
});

export const loginSchema = z.object({
  email: z.email({ error: "Enter a valid email." }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters." }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
