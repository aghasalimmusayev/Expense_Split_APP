import type { Group, Expense, Settlement } from '../types/all.type.js';
export declare function readDB(): Promise<{
    users: any[];
    groups: Group[];
    expenses: Expense[];
    settlements: Settlement[];
}>;
export declare function writeDB(db: any): Promise<void>;
//# sourceMappingURL=index.d.ts.map