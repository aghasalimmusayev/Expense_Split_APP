import { Request, Response } from "express";
import { ZodError } from "zod";
import { addSettlement, changeSettlement, getSettlementById, listSettlementsByGroupId, listSettlementsForUser, removeSettlement } from "../storage";
import { CreateSettlementSchema, updateSettlementSchema } from "../validators";

export function createSettlement(req: Request, res: Response) {
    try {
        const data = CreateSettlementSchema.parse(req.body);
        const settlement = addSettlement(data);
        return res.status(201).json(settlement);
    } catch (err) {
        if (err instanceof ZodError) {
            return res.status(400).json({
                message: "Validation error",
                errors: err.errors,
            });
        }
        console.error("createSettlement error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export function getSettlementsByGroup(req: Request, res: Response) {
    try {
        const { groupId } = req.params;
        const settlements = listSettlementsByGroupId(groupId);
        return res.status(200).json(settlements);
    } catch (err) {
        console.error("getSettlementsByGroup error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export function getSettlementsForUser(req: Request, res: Response) {
    try {
        const { userId } = req.params;
        const settlements = listSettlementsForUser(userId);
        return res.status(200).json(settlements);
    } catch (err) {
        console.error("getSettlementsForUser error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export function getSettlementId(req: Request, res: Response) {
    try {
        const { id } = req.params
        const settlement = getSettlementById(id)
        if (!settlement) return res.status(404).json({ message: 'Settlement not found' })
        return res.status(200).json(settlement)
    }
    catch (err) {
        console.error('GetSettlementById Error: ' + err);
        return res.status(500).json({ message: 'Internal server Error' })
    }
}

export function updateSettlement(req: Request, res: Response) {
    try {
        const { id } = req.params
        const data = updateSettlementSchema.parse(req.body)
        const updated = changeSettlement(id, data)
        if (!updated) return res.status(404).json({ message: 'Settlement not found' })
        return res.status(200).json(updated)
    }
    catch (err) {
        if (err instanceof ZodError) {
            res.status(400).json({
                message: 'Validation Error',
                errors: err.errors
            })
        }
        console.error('GetSettlementById Error: ' + err);
        return res.status(500).json({ message: 'Internal server Error' })
    }
}

export function deleteSettlement(req: Request, res: Response) {
    try {
        const { id } = req.params
        const deleted = removeSettlement(id)
        if (!deleted) return res.status(404).json({ message: 'Settlement not found' })
        return res.status(204).send()
    }
    catch (err) {
        console.error('GetSettlementById Error: ' + err);
        return res.status(500).json({ message: 'Internal server Error' })
    }
}