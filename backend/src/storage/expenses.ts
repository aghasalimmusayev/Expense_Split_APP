import { randomUUID } from 'crypto';
import type { Expense, CreateExpenseInput } from '../types/all.type';
import { readDB, writeDB } from '../data';

// Yeni xərc əlavə et
export async function addExpense(input: CreateExpenseInput): Promise<Expense> {
    const db = await readDB()
    const expense: Expense = {
        id: randomUUID(),
        ...input,
        createdAt: new Date().toISOString(),
    };
    db.expenses.push(expense)
    await writeDB(db)
    return expense;
}

// ID ilə xərc tap
export async function getExpenseById(id: string): Promise<Expense | undefined> {
    const db = await readDB()
    const expense = db.expenses.find(g => g.id === id)
    return expense;
}

// Qrupa görə xərcləri cixart
export async function listExpensesByGroupId(groupId: string): Promise<Expense[]> {
    const db = await readDB()
    return db.expenses.filter(e => e.groupId === groupId);
}

// Müəyyən user-in müəyyən qrupdakı xərcləri
export async function listExpensesForUserInGroup(groupId: string, userId: string): Promise<Expense[]> {
    const db = await readDB()
    return db.expenses.filter(e => e.groupId === groupId && e.paidBy === userId);
}

// Xərc sil
export async function removeExpense(id: string): Promise<boolean> {
    const db = await readDB()
    const before = db.expenses.length
    db.expenses = db.expenses.filter(g => g.id !== id)
    if (db.expenses.length === before) return false;
    await writeDB(db)
    return true
}

