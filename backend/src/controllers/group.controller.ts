import { Request, Response } from "express";
import { ZodError } from "zod";
import { addGroup, getGroupById, listGroups, removeGroup, updateGroup } from "@storage/groups.js";
import { CreateGroupSchema, UpdateGroupSchema } from "@validators/group.validator.js";

export async function createGroup(req: Request, res: Response) {
    try {
        const data = CreateGroupSchema.parse(req.body)
        const group = await addGroup(data.name, data.members)
        return res.status(201).json(group)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return res.status(400).json({
                message: "Validation error",
                errors: err.errors
            })
        }
        req.log.error({ err }, 'CreateGroup error');
        return res.status(500).json({ message: "Internal server Error" })
    }
}

export async function getGroups(req: Request, res: Response) {
    try {
        const groups = await listGroups()
        return res.status(200).json(groups)
    }
    catch (err) {
        req.log.error({ err }, 'GetGroups error');
        return res.status(500).json({ message: "Internal server Error" })
    }
}

export async function getGroupId(req: Request, res: Response) {
    try {
        const { id } = req.params
        const group = await getGroupById(id)
        if (!group) return res.status(404).json({ message: 'Group not found' })
        return res.status(200).json(group)
    }
    catch (err) {
        req.log.error({ err }, 'GetGroupId error');
        return res.status(500).json({ message: 'Internal server Error' })
    }
}

export async function updateGroupByZod(req: Request, res: Response) {
    try {
        const { id } = req.params
        const data = UpdateGroupSchema.parse(req.body)
        const updated = await updateGroup(id, data)
        if (!updated) return res.status(404).json({ message: 'Group not found' })
        return res.status(200).json(updated)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return res.status(400).json({
                message: 'Validation Error',
                errors: err.errors
            })
        }
        req.log.error({ err }, 'UpdateGropu Error');
        return res.status(500).json({ message: 'Internal server Error' })
    }
}

export async function deleteGroup(req: Request, res: Response) {
    try {
        const { id } = req.params
        const deleted = await removeGroup(id)
        if (!deleted) return res.status(404).json({ message: "Group not found" })
        return res.status(204).send()
    }
    catch (err) {
        req.log.error({ err }, 'DeleteGroup Error');
        return res.status(500).json({ message: 'Internal server Error' })
    }
}