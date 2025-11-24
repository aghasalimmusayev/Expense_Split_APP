import { z } from "zod";
export const CreateSettlementSchema = z.object({
    groupId: z.string().min(1, "groupId is required"),
    fromUser: z.string().min(1, "fromUser is required"),
    toUser: z.string().min(1, "toUser is required"),
    amount: z.coerce.number().positive("amount must be a positive number"),
});
export const updateSettlementSchema = CreateSettlementSchema.partial();
