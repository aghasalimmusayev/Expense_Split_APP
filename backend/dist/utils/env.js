import { config } from "dotenv";
import { EnvSchema } from "@validators/env.validator";
config();
const parsed = EnvSchema.safeParse(process.env);
if (!parsed.success) {
    console.error("Invalid ENV configuration:");
    console.error(parsed.error.format());
    process.exit(1); // stop server
}
export const env = parsed.data;
