import fs from "fs/promises";
import path from "path";
import type { Group, Expense, Settlement } from '../types/all.type.js' //! burada xeta var

const dbPath = path.join(process.cwd(), "src", "data", "db.json");

export async function readDB(): Promise<{
    users: any[],
    groups: Group[],
    expenses: Expense[],
    settlements: Settlement[]
}> {
    const file = await fs.readFile(dbPath, "utf-8");
    return JSON.parse(file);
}

export async function writeDB(db: any) {
    const formatted = JSON.stringify(db, null, 2);
    await fs.writeFile(dbPath, formatted, "utf-8");
}
