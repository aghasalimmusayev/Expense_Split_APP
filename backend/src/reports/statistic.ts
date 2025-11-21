import { calculateGroupBalances } from "../storage/balances";
import { expenses } from "../storage/expenses";

export function calculateStats(groupId: string) {
    // Qrupa aid bütün xərclər
    const groupExpenses = Array.from(expenses.values()).filter(e => e.groupId === groupId);
    // Ümumi xərclənən məbləğ
    const totalExpenses = groupExpenses.reduce((acc, e) => acc + e.amount, 0);
    // Hər user nə qədər pul ödəyib
    const totalPaidPerUser: Record<string, number> = {};
    groupExpenses.forEach(exp => {
        if (!totalPaidPerUser[exp.paidBy]) totalPaidPerUser[exp.paidBy] = exp.amount;
        else totalPaidPerUser[exp.paidBy] += exp.amount;
    });
    // Ən çox xərc edən user
    let mostSpender = null;
    if (Object.keys(totalPaidPerUser).length > 0) {
        mostSpender = Object.entries(totalPaidPerUser).sort((a, b) => b[1] - a[1])[0]; // nəticə: ["userId", amount]
    }
    const balances = calculateGroupBalances(groupId);
    return {
        totalExpenses,
        totalPaidPerUser,
        mostSpender,
        balances
    };
}
