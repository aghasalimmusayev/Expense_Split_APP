import { readDB } from "../data";
import { calculateGroupBalances } from "@storage/balances";

export async function calculateStats(groupId: string) {
    const db = await readDB();
    const group = db.groups.find(g => g.id === groupId);
    if (!group) {
        return {
            totalExpenses: 0,
            totalPaidPerUser: {},
            mostSpender: null,
            balances: []
        };
    }
    const membersSet = new Set(group.members);
    // Qrupa aid bütün xərclər
    const groupExpenses = db.expenses.filter(e => e.groupId === groupId);
    // yalnız cari member-lərin iştirak etdiyi hissəni nəzərə al
    const activeExpenses = groupExpenses
        .map(e => {
            // splitBetween boşdursa, bütün cari member-lər sayılır
            const rawParticipants = e.splitBetween?.length > 0 ? e.splitBetween : group.members;
            const participants = rawParticipants.filter(uid => membersSet.has(uid));
            const paidByActive = membersSet.has(e.paidBy);
            // nə ödəyən, nə də iştirakçı qalmayıbsa — bu expense cari statistikadan çıxır
            if (!paidByActive && participants.length === 0) return null;
            return { ...e, splitBetween: participants };
        })
        .filter(Boolean) as typeof groupExpenses;
    // Ümumi xərclənən məbləğ (cari member-lərlə bağlı expense-lər üzrə)
    const totalExpenses = activeExpenses.reduce((acc, e) => acc + e.amount, 0);
    // Hər cari user nə qədər pul ödəyib
    const totalPaidPerUser: Record<string, number> = {};
    activeExpenses.forEach(exp => {
        if (!membersSet.has(exp.paidBy)) return; // silinən user-in ödədiyi cari statistikaya girməsin
        totalPaidPerUser[exp.paidBy] = (totalPaidPerUser[exp.paidBy] || 0) + exp.amount;
    });
    // Ən çox xərc edən user
    let mostSpender: [string, number] | null = null;
    if (Object.keys(totalPaidPerUser).length > 0) {
        mostSpender = Object.entries(totalPaidPerUser).sort((a, b) => b[1] - a[1])[0] as [string, number];
    }
    const balances = await calculateGroupBalances(groupId);
    return {
        totalExpenses,
        totalPaidPerUser,
        mostSpender,
        balances
    };
}
