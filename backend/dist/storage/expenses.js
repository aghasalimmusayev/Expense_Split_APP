import { randomUUID } from 'crypto';
import { readDB, writeDB } from '@data/index';
// Yeni xərc əlavə et
export async function addExpense(input) {
    const db = await readDB();
    const expense = {
        id: randomUUID(),
        ...input,
        createdAt: new Date().toISOString(),
    };
    db.expenses.push(expense);
    await writeDB(db);
    return expense;
}
// ID ilə xərc tap
export async function getExpenseById(id) {
    const db = await readDB();
    const expense = db.expenses.find(g => g.id === id);
    return expense;
}
// Qrupa görə xərcləri cixart
export async function listExpensesByGroupId(groupId) {
    const db = await readDB();
    return db.expenses.filter(e => e.groupId === groupId);
}
// Müəyyən user-in müəyyən qrupdakı xərcləri
export async function listExpensesForUserInGroup(groupId, userId) {
    const db = await readDB();
    return db.expenses.filter(e => e.groupId === groupId && e.paidBy === userId);
}
// Group-daki xerci deyis
export async function updateExpenseById(id, patch) {
    const db = await readDB();
    const idx = db.expenses.findIndex(e => e.id === id);
    if (idx === -1)
        return null;
    db.expenses[idx] = { ...db.expenses[idx], ...patch, createdAt: new Date().toISOString() };
    await writeDB(db);
    return db.expenses[idx];
}
// Xərc sil
export async function removeExpense(id) {
    const db = await readDB();
    const before = db.expenses.length;
    db.expenses = db.expenses.filter(g => g.id !== id);
    if (db.expenses.length === before)
        return false;
    await writeDB(db);
    return true;
}
