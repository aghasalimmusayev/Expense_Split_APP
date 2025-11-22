import type { Balance } from "../types/all.type";
import { readDB } from "@data/index";

export async function calculateGroupBalances(groupId: string): Promise<Balance[]> {
    const db = await readDB()
    const group = db.groups.find(g => g.id === groupId)
    if (!group) return [];
    const members = group.members;
    // Boş balans
    const balances: Balance[] = members.map((userId) => ({
        userId,
        owes: {},
        owedBy: {},
        netBalance: 0
    }));
    // user balansını tapmaq
    function getBalance(userId: string): Balance {
        return balances.find(b => b.userId === userId)!;
    }
    // EXPENSES → borc yaratmaq
    const groupExpenses = db.expenses.filter(e => e.groupId === groupId);
    for (const e of groupExpenses) {
        const participants = e.splitBetween?.length > 0
            ? e.splitBetween
            : members;
        const share = e.amount / participants.length;
        for (const uid of participants) {
            if (uid === e.paidBy) continue;
            const debtor = getBalance(uid);
            const creditor = getBalance(e.paidBy);
            debtor.owes[e.paidBy] = (debtor.owes[e.paidBy] || 0) + share;
            creditor.owedBy[uid] = (creditor.owedBy[uid] || 0) + share;
            debtor.netBalance -= share;
            creditor.netBalance += share;
        }
    }
    // SETTLEMENTS → borcu azaltmaq / bağlamaq
    const groupSettlements = db.settlements.filter(s => s.groupId === groupId);
    for (const s of groupSettlements) {
        const payer = getBalance(s.fromUser);
        const receiver = getBalance(s.toUser);
        // payer → receiver borcu azalır
        if (payer.owes[s.toUser]) {
            payer.owes[s.toUser] -= s.amount;
            if (payer.owes[s.toUser] <= 0) delete payer.owes[s.toUser];
        }
        if (receiver.owedBy[s.fromUser]) {
            receiver.owedBy[s.fromUser] -= s.amount;
            if (receiver.owedBy[s.fromUser] <= 0) delete receiver.owedBy[s.fromUser];
        }
        // netBalance düzəlir
        payer.netBalance += s.amount;
        receiver.netBalance -= s.amount;
    }
    return balances;
}
