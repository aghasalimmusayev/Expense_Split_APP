import { randomUUID } from 'crypto';
import type { Settlement } from '../types/all.type';

const settlements = new Map<string, Settlement>();

type CreateSettlementInput = Omit<Settlement, 'id' | 'createdAt'>;

export function addSettlement(input: CreateSettlementInput): Settlement {
    const settlement: Settlement = {
        id: randomUUID(),
        ...input,
        createdAt: new Date().toISOString(),
    };
    settlements.set(settlement.id, settlement);
    return settlement;
}

// Qrupa görə hesablaşmalar
export function listSettlementsByGroupId(groupId: string): Settlement[] {
    return Array.from(settlements.values()).filter(
        s => s.groupId === groupId
    );
}

// Müəyyən user üçün (kimdən/kimə) hesablaşmalar
export function listSettlementsForUser(userId: string): Settlement[] {
    return Array.from(settlements.values()).filter(
        s => s.fromUser === userId || s.toUser === userId
    );
}

// ID-yə görə settlement tap
export function getSettlementById(id: string): Settlement | undefined {
    return settlements.get(id);
}

// Settlement-i update et
export function changeSettlement(id: string, data: Partial<Pick<Settlement, "groupId" | "fromUser" | "toUser" | "amount">>):
    Settlement | undefined {

    const existing = settlements.get(id);
    if (!existing) return undefined;
    const updated: Settlement = {
        ...existing,
        ...data,
        createdAt: new Date().toISOString(),
    };
    settlements.set(id, updated);
    return updated;
}
export { settlements };

// Settlement-i silmek
export function removeSettlement(id: string): Settlement[] {
    return Array.from(settlements.values()).filter(set => set.id !== id)
}

