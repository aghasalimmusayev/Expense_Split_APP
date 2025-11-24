import { Group } from "../types";
export declare function addGroup(name: string, members: string[]): Promise<Group>;
export declare function getGroupById(id: string): Promise<Group | undefined>;
export declare function listGroups(): Promise<Group[]>;
export declare function updateGroup(id: string, data: Partial<Pick<Group, 'name' | 'members'>>): Promise<Group | undefined>;
export declare function removeGroup(id: string): Promise<boolean>;
//# sourceMappingURL=groups.d.ts.map