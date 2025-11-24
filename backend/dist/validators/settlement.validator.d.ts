import { z } from "zod";
export declare const CreateSettlementSchema: z.ZodObject<{
    groupId: z.ZodString;
    fromUser: z.ZodString;
    toUser: z.ZodString;
    amount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    groupId: string;
    amount: number;
    fromUser: string;
    toUser: string;
}, {
    groupId: string;
    amount: number;
    fromUser: string;
    toUser: string;
}>;
export declare const updateSettlementSchema: z.ZodObject<{
    groupId: z.ZodOptional<z.ZodString>;
    fromUser: z.ZodOptional<z.ZodString>;
    toUser: z.ZodOptional<z.ZodString>;
    amount: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    groupId?: string | undefined;
    amount?: number | undefined;
    fromUser?: string | undefined;
    toUser?: string | undefined;
}, {
    groupId?: string | undefined;
    amount?: number | undefined;
    fromUser?: string | undefined;
    toUser?: string | undefined;
}>;
//# sourceMappingURL=settlement.validator.d.ts.map