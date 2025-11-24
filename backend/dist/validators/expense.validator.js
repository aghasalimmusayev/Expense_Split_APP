import { z } from "zod";
export const CreateExpenseSchema = z.object({
    groupId: z.string().min(1, "groupId is required"),
    description: z.string().min(1, "description is required"),
    amount: z.coerce.number().positive("amount must be a positive number"),
    paidBy: z.string().min(1, "paidBy is required"),
    splitBetween: z.array(z.string().min(1)).min(1, "At least one participant is required"), // { [userId]: amount }
    splits: z.record(z.coerce.number().nonnegative()).optional(),
    category: z.string().min(1, "category is required"),
});
export const UpdatedExpenseSchema = CreateExpenseSchema.partial();
