import { randomUUID } from "crypto";
import { readDB, writeDB } from '@data/index';
// Yeni qrup yarat
export async function addGroup(name, members) {
    const group = {
        id: randomUUID(),
        name,
        members,
        createdAt: new Date().toISOString(),
    };
    const db = await readDB();
    db.groups.push(group);
    await writeDB(db);
    return group;
}
// ID ilə qrup tap
export async function getGroupById(id) {
    const db = await readDB();
    return db.groups.find(gr => gr.id === id);
}
// Bütün qruplar
export async function listGroups() {
    const db = await readDB();
    return db.groups;
}
// Qrupu update et (adı və üzvləri dəyişmək üçün)
export async function updateGroup(id, data) {
    const db = await readDB();
    const index = db.groups.findIndex(g => g.id === id);
    const existing = db.groups[index];
    if (!existing)
        return undefined;
    const updated = {
        ...existing,
        ...data,
    };
    db.groups[index] = updated;
    await writeDB(db);
    return updated;
}
// Qrupu sil
export async function removeGroup(id) {
    const db = await readDB();
    db.groups = db.groups.filter(g => g.id !== id);
    await writeDB(db);
    return true;
}
