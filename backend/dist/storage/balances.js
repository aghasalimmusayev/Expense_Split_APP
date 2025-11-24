import { readDB } from "@data/index";
export async function calculateGroupBalances(groupId) {
    const db = await readDB();
    const group = db.groups.find(g => g.id === groupId);
    if (!group)
        return [];
    const members = group.members;
    const membersSet = new Set(members);
    const balances = members.map(userId => ({
        userId,
        owes: {},
        owedBy: {},
        netBalance: 0
    }));
    function getBalance(userId) {
        return balances.find(b => b.userId === userId);
    }
    // EXPENSES → borc yaratmaq
    const groupExpenses = db.expenses.filter(e => e.groupId === groupId);
    for (const e of groupExpenses) {
        // paidBy cari member deyilsə, bu expense cari balansdan çıxır
        if (!membersSet.has(e.paidBy))
            continue;
        const rawParticipants = e.splitBetween?.length > 0 ? e.splitBetween : members;
        // silinmiş user-ləri çıxar
        const participants = rawParticipants.filter(uid => membersSet.has(uid));
        if (participants.length === 0)
            continue;
        const share = e.amount / participants.length;
        for (const uid of participants) {
            if (uid === e.paidBy)
                continue;
            const debtor = getBalance(uid);
            const creditor = getBalance(e.paidBy);
            if (!debtor || !creditor)
                continue;
            debtor.owes[e.paidBy] = (debtor.owes[e.paidBy] || 0) + share;
            creditor.owedBy[uid] = (creditor.owedBy[uid] || 0) + share;
            debtor.netBalance -= share;
            creditor.netBalance += share;
        }
    }
    // SETTLEMENTS → balansları bağlama
    const groupSettlements = db.settlements.filter(s => s.groupId === groupId);
    for (const s of groupSettlements) {
        if (!membersSet.has(s.fromUser) || !membersSet.has(s.toUser))
            continue;
        const from = getBalance(s.fromUser);
        const to = getBalance(s.toUser);
        if (!from || !to)
            continue;
        from.netBalance += s.amount;
        to.netBalance -= s.amount;
    }
    return balances;
}
