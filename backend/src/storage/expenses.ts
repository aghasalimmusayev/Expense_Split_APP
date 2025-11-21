import { randomUUID } from 'crypto';
import type { Expense, CreateExpenseInput } from '../types/all.type';

const expenses = new Map<string, Expense>();

// Yeni xərc əlavə et
export function addExpense(input: CreateExpenseInput): Expense {
    const expense: Expense = {
        id: randomUUID(),
        ...input,
        createdAt: new Date().toISOString(),
    };
    expenses.set(expense.id, expense);
    return expense;
}

// ID ilə xərc tap
export function getExpenseById(id: string): Expense | undefined {
    return expenses.get(id);
}

// Qrupa görə xərcləri siyahıla
export function listExpensesByGroupId(groupId: string): Expense[] {
    return Array.from(expenses.values()).filter(e => e.groupId === groupId);
}

// İstəsən: müəyyən user-in müəyyən qrupdakı xərcləri
export function listExpensesForUserInGroup(groupId: string, userId: string): Expense[] {
    return Array.from(expenses.values()).filter(
        e => e.groupId === groupId && e.paidBy === userId
    );
}

// Xərc sil
export function removeExpense(id: string): boolean {
    return expenses.delete(id);
}

export { expenses };
