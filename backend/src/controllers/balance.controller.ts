import { calculateGroupBalances } from "@storage/balances.js";
import { Request, Response } from "express";
export async function getGroupBalance(req: Request, res: Response) {
    try {
        const { groupId } = req.params
        const balance = await calculateGroupBalances(groupId)
        return res.status(200).json(balance)
    }
    catch (err) {
        req.log.error({ err }, 'Balance calculator error');
        return res.status(500).json({ message: 'Internal server Error' })
    }
}