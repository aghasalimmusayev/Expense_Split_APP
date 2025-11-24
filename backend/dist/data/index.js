import fs from "fs/promises";
import path from "path";
const dbPath = path.join(process.cwd(), "src", "data", "db.json");
export async function readDB() {
    const file = await fs.readFile(dbPath, "utf-8");
    return JSON.parse(file);
}
export async function writeDB(db) {
    const formatted = JSON.stringify(db, null, 2);
    await fs.writeFile(dbPath, formatted, "utf-8");
}
