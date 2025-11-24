import { z } from "zod";
export declare const CreateExpenseSchema: z.ZodObject<{
    groupId: z.ZodString;
    description: z.ZodString;
    amount: z.ZodNumber;
    paidBy: z.ZodString;
    splitBetween: z.ZodArray<z.ZodString, "many">;
    splits: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
    category: z.ZodString;
}, "strip", z.ZodTypeAny, {
    groupId: string;
    splitBetween: string[];
    description: string;
    amount: number;
    paidBy: string;
    category: string;
    splits?: Record<string, number> | undefined;
}, {
    groupId: string;
    splitBetween: string[];
    description: string;
    amount: number;
    paidBy: string;
    category: string;
    splits?: Record<string, number> | undefined;
}>;
export declare const UpdatedExpenseSchema: z.ZodObject<{
    groupId: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    amount: z.ZodOptional<z.ZodNumber>;
    paidBy: z.ZodOptional<z.ZodString>;
    splitBetween: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    splits: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>>;
    category: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    groupId?: string | undefined;
    splitBetween?: string[] | undefined;
    description?: string | undefined;
    amount?: number | undefined;
    paidBy?: string | undefined;
    splits?: Record<string, number> | undefined;
    category?: string | undefined;
}, {
    groupId?: string | undefined;
    splitBetween?: string[] | undefined;
    description?: string | undefined;
    amount?: number | undefined;
    paidBy?: string | undefined;
    splits?: Record<string, number> | undefined;
    category?: string | undefined;
}>;
//# sourceMappingURL=expense.validator.d.ts.map