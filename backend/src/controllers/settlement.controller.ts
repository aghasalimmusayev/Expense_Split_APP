import { Request, Response } from "express";
import { ZodError } from "zod";
import { addSettlement, changeSettlement, getSettlementById, listSettlementsByGroupId, listSettlementsForUser, removeSettlement } from "@storage/settlements.js";
import { CreateSettlementSchema, updateSettlementSchema } from "@validators/settlement.validator.js";

export async function createSettlement(req: Request, res: Response) {
    try {
        const data = CreateSettlementSchema.parse(req.body);
        const settlement = await addSettlement(data);
        return res.status(201).json(settlement);
    } catch (err) {
        if (err instanceof ZodError) {
            return res.status(400).json({
                message: "Validation error",
                errors: err.errors,
            });
        }
        req.log.error({ err }, "createSettlement error");
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function getSettlementsByGroup(req: Request, res: Response) {
    try {
        const { groupId } = req.params;
        const settlements = await listSettlementsByGroupId(groupId);
        return res.status(200).json(settlements);
    } catch (err) {
        req.log.error({ err }, "getSettlementsByGroup error");
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function getSettlementsForUser(req: Request, res: Response) {
    try {
        const { userId } = req.params;
        const settlements = await listSettlementsForUser(userId);
        return res.status(200).json(settlements);
    } catch (err) {
        req.log.error({ err }, "getSettlementsForUser error");
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function getSettlementId(req: Request, res: Response) {
    try {
        const { id } = req.params
        const settlement = await getSettlementById(id)
        if (!settlement) return res.status(404).json({ message: 'Settlement not found' })
        return res.status(200).json(settlement)
    }
    catch (err) {
        req.log.error({ err }, 'GetSettlementById Error');
        return res.status(500).json({ message: 'Internal server Error' })
    }
}

export async function updateSettlement(req: Request, res: Response) {
    try {
        const { id } = req.params
        const data = updateSettlementSchema.parse(req.body)
        const updated = await changeSettlement(id, data)
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
        req.log.error({ err }, 'GetSettlementById Error');
        return res.status(500).json({ message: 'Internal server Error' })
    }
}

export async function deleteSettlement(req: Request, res: Response) {
    try {
        const { id } = req.params
        const deleted = await removeSettlement(id)
        if (!deleted) return res.status(404).json({ message: 'Settlement not found' })
        return res.status(204).send()
    }
    catch (err) {
        console.error({ err }, 'GetSettlementById Error');
        return res.status(500).json({ message: 'Internal server Error' })
    }
}