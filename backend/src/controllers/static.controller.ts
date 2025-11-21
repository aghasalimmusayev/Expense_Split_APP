import { Request, Response } from "express";
import { calculateStats } from "../reports/statistic";

export function getStatics(req: Request, res: Response) {
    try {
        const { groupId } = req.params
        const statics = calculateStats(groupId)
        if (!statics) return res.status(404).json({ message: 'Group not found' })
        return res.status(200).json(statics)
    }
    catch (err) {
        console.error('GetGroupStatics error: ' + err);
        res.status(500).json({ message: 'Internal server Error' })
    }
}
