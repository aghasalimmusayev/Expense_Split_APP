import type { Settlement } from '../types/all.type';
type CreateSettlementInput = Omit<Settlement, 'id' | 'createdAt'>;
export declare function addSettlement(input: CreateSettlementInput): Promise<Settlement>;
export declare function listSettlementsByGroupId(groupId: string): Promise<Settlement[]>;
export declare function listSettlementsForUser(userId: string): Promise<Settlement[]>;
export declare function getSettlementById(id: string): Promise<Settlement | undefined>;
export declare function changeSettlement(id: string, data: Partial<Pick<Settlement, "groupId" | "fromUser" | "toUser" | "amount">>): Promise<Settlement | undefined>;
export declare function removeSettlement(id: string): Promise<Boolean>;
export {};
//# sourceMappingURL=settlements.d.ts.map