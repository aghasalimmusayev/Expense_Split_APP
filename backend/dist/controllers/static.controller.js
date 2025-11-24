import { calculateStats } from "@reports/statistic.js";
export async function getStatics(req, res) {
    try {
        const { groupId } = req.params;
        const statics = await calculateStats(groupId);
        if (!statics)
            return res.status(404).json({ message: 'Group not found' });
        return res.status(200).json(statics);
    }
    catch (err) {
        req.log.error({ err }, 'GetGroupStatics error');
        res.status(500).json({ message: 'Internal server Error' });
    }
}
