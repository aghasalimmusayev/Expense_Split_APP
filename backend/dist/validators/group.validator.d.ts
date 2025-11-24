import { z } from "zod";
export declare const CreateGroupSchema: z.ZodObject<{
    name: z.ZodString;
    members: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    members: string[];
}, {
    name: string;
    members: string[];
}>;
export declare const UpdateGroupSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    members: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    members?: string[] | undefined;
}, {
    name?: string | undefined;
    members?: string[] | undefined;
}>;
//# sourceMappingURL=group.validator.d.ts.map