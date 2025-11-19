export interface Group {
    id: string;
    name: string;
    members: string[]; // user IDs
    createdBy: string;
    createdAt: Date;
}

export interface Expense {
    id: string;
    groupId: string;
    description: string;
    amount: number;
    paidBy: string; // user ID
    splitBetween: string[]; // user IDs
    splitMethod: "equal" | "percentage" | "exact";
    splits?: { [userId: string]: number }; // for exact/percentage
    category: string;
    date: Date;
}

export interface Balance {
    userId: string;
    owes: { [userId: string]: number };
    owedBy: { [userId: string]: number };
    netBalance: number;
}

export interface Settlement {
    id: string;
    groupId: string;
    from: string;
    to: string;
    amount: number;
    settledAt: Date;
}
