import { randomUUID } from "crypto";
import { Group } from "../types";

const groups = new Map<string, Group>();

// Yeni qrup yarat
export function addGroup(name: string, members: string[]): Group {
    const group: Group = {
        id: randomUUID(),
        name,
        members,
        createdAt: new Date().toISOString(),
    };

    groups.set(group.id, group);
    return group;
}

// ID ilə qrup tap
export function getGroupById(id: string): Group | undefined {
    return groups.get(id);
}

// Bütün qruplar
export function listGroups(): Group[] {
    return Array.from(groups.values());
}

// Qrupu update et (adı və üzvləri dəyişmək üçün)
export function updateGroup(id: string, data: Partial<Pick<Group, 'name' | 'members'>>): Group | undefined {
    const existing = groups.get(id);
    if (!existing) return undefined;
    const updated: Group = {
        ...existing,
        ...data,
    };
    groups.set(id, updated);
    return updated;
}

// Qrupu sil
export function removeGroup(id: string): boolean {
    return groups.delete(id);
}

// Əgər hansısa yerdə lazım olsa xam Map-i də export edə bilərik
export { groups };


