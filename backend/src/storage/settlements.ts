import { randomUUID } from 'crypto';
import type { Settlement } from '../types/all.type';
import { readDB, writeDB } from '@data/index';

type CreateSettlementInput = Omit<Settlement, 'id' | 'createdAt'>;

export async function addSettlement(input: CreateSettlementInput): Promise<Settlement> {
    const db = await readDB()
    const settlement: Settlement = {
        id: randomUUID(),
        ...input,
        createdAt: new Date().toISOString(),
    };
    db.settlements.push(settlement)
    await writeDB(db)
    return settlement;
}

// Qrupa görə hesablaşmalar
export async function listSettlementsByGroupId(groupId: string): Promise<Settlement[]> {
    const db = await readDB()
    return db.settlements.filter(s => s.groupId === groupId);
}

// Müəyyən user üçün (kimdən/kimə) hesablaşmalar
export async function listSettlementsForUser(userId: string): Promise<Settlement[]> {
    const db = await readDB()
    return db.settlements.filter(s => s.fromUser === userId || s.toUser === userId);
}

// ID-yə görə settlement tap
export async function getSettlementById(id: string): Promise<Settlement | undefined> {
    const db = await readDB()
    const settlement = db.settlements.find(s => s.id === id)
    return settlement
}

// Settlement-i update et
export async function changeSettlement(id: string, data: Partial<Pick<Settlement, "groupId" | "fromUser" | "toUser" | "amount">>):
    Promise<Settlement | undefined> {

    const db = await readDB()
    const index = db.settlements.findIndex(s => s.id === id)
    const existing = db.settlements[index]
    if (!existing) return undefined;
    const updated: Settlement = {
        ...existing,
        ...data,
        createdAt: new Date().toISOString(),
    };
    db.settlements[index] = updated
    await writeDB(db)
    return updated;
}

// Settlement-i silmek
export async function removeSettlement(id: string): Promise<Boolean> {
    const db = await readDB()
    const before = db.settlements.length
    db.settlements = db.settlements.filter(set => set.id !== id)
    if (db.settlements.length === before) return false
    await writeDB(db)
    return true
}

