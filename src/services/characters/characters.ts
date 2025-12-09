import { apiFetch } from "../apiClient";

export interface Character {
    id: number;
    name: string;
    level: number;
    ownerId: string;
    speciesId?: number | null;
    classId?: number | null;
    backgroundId?: number | null;
    createdAt: string; // Date ISO renvoyée par le back
    updatedAt: string;
}

export interface CharacterPayload {
    name: string;
    level?: number;
    speciesId?: number | null;
    classId?: number | null;
    backgroundId?: number | null;
}

export async function getCharacters() {
    return await apiFetch<Character[]>("/characters");
}

export async function getCharacter(id: number): Promise<Character> {
    return await apiFetch<Character>(`/characters/${id}`);
}

export async function createCharacter(payload: CharacterPayload): Promise<Character> {
    return await apiFetch<Character>("/characters", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export async function deleteCharacter(id: number): Promise<void> {
    return await apiFetch<void>(`/characters/${id}`, {
        method: "DELETE",
    });
}
