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

export { settlements };
