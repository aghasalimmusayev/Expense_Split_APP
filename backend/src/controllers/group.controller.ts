import { Request, Response } from "express";
import { ZodError } from "zod";
import { addGroup, getGroupById, listGroups, removeGroup, updateGroup } from "../storage";
import { CreateGroupSchema, UpdateGroupSchema } from "../validators";

export function createGroup(req: Request, res: Response) {
    try {
        const data = CreateGroupSchema.parse(req.body)
        const group = addGroup(data.name, data.members)
        return res.status(201).json(group)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return res.status(400).json({
                message: "Validation error",
                errors: err.errors
            })
        }
        console.log('CreateGroup error: ' + err);
        return res.status(500).json({ message: "Internal server Error" })
    }
}

export function getGroups(req: Request, res: Response) {
    try {
        const groups = listGroups()
        return res.status(200).json(groups)
    }
    catch (err) {
        console.error('GetGroups error: ' + err);
        return res.status(500).json({ message: "Internal server Error" })
    }
}

export function getGroupId(req: Request, res: Response) {
    try {
        const { id } = req.params
        const group = getGroupById(id)
        if (!group) return res.status(404).json({ message: 'Group not found' })
        return res.status(200).json(group)
    }
    catch (err) {
        console.error('GetGroupId error: ' + err);
        return res.status(500).json({ message: 'Internal server Error' })
    }
}

export function updateGroupByZod(req: Request, res: Response) {
    try {
        const { id } = req.params
        const data = UpdateGroupSchema.parse(req.body)
        const updated = updateGroup(id, data)
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
        console.error('UpdateGropu Error: ' + err);
        return res.status(500).json({ message: 'Internal server Error' })
    }
}

export function deleteGroup(req: Request, res: Response) {
    try {
        const { id } = req.params
        const deleted = removeGroup(id)
        if (!deleted) return res.status(404).json({ message: "Group not found" })
        return res.status(204).send()
    }
    catch (err) {
        console.error('DeleteGroup Error: ' + err);
        return res.status(500).json({ message: 'Internal server Error' })
    }
}