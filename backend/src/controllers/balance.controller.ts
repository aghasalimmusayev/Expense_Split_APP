import { calculateGroupBalances } from "../storage/balances";
import { Request, Response } from "express";
export function getGroupBalance(req: Request, res: Response) {
    try {
        const { groupId } = req.params
        const balance = calculateGroupBalances(groupId)
        return res.status(200).json(balance)
    }
    catch (err) {
        console.error('Balance calculator error: ' + err);
        return res.status(500).json({ message: 'Internal server Error' })
    }
}