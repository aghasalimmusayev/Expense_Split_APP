import { z } from "zod";
export const CreateGroupSchema = z.object({
    name: z.string().min(1, "Group name is required"),
    members: z.array(z.string().min(1)).min(1, "Group must have at least one member"),
});
export const UpdateGroupSchema = CreateGroupSchema.partial();
