export interface Group {
    id: string;
    name: string;
    members: string[];
    createdAt: string;
}
export interface Expense {
    id: string;
    groupId: string;
    description: string;
    amount: number;
    paidBy: string;
    splitBetween: string[];
    splits?: {
        [userId: string]: number;
    };
    category: string;
    createdAt: string;
}
export interface CreateExpenseInput {
    groupId: string;
    description: string;
    amount: number;
    paidBy: string;
    splitBetween: string[];
    splits?: {
        [userId: string]: number;
    };
    category: string;
}
export interface Balance {
    userId: string;
    owes: {
        [userId: string]: number;
    };
    owedBy: {
        [userId: string]: number;
    };
    netBalance: number;
}
export interface Settlement {
    id: string;
    groupId: string;
    fromUser: string;
    toUser: string;
    amount: number;
    createdAt: string;
}
//# sourceMappingURL=all.type.d.ts.map