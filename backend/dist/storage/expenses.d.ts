import type { Expense, CreateExpenseInput } from '../types/all.type';
export declare function addExpense(input: CreateExpenseInput): Promise<Expense>;
export declare function getExpenseById(id: string): Promise<Expense | undefined>;
export declare function listExpensesByGroupId(groupId: string): Promise<Expense[]>;
export declare function listExpensesForUserInGroup(groupId: string, userId: string): Promise<Expense[]>;
export declare function updateExpenseById(id: string, patch: Partial<Expense>): Promise<any>;
export declare function removeExpense(id: string): Promise<boolean>;
//# sourceMappingURL=expenses.d.ts.map