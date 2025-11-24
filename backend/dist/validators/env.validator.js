import { z } from "zod";
export const EnvSchema = z.object({
    PORT: z.string().default("3014"),
    NODE_ENV: z.enum(["development", "production", "test"]),
    // JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
    // DB_URL: z.string().url("DB_URL must be a valid URL"),
});
