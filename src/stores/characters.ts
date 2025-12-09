// src/stores/characters.ts
import { defineStore } from "pinia";
import {
    createCharacter,
    deleteCharacter,
    getCharacters,
    type Character,
    type CharacterPayload
} from "../services/characters/characters";

type Status = "idle" | "loading" | "error";

interface CharactersState {
    items: Character[];
    status: Status;
    error: string | null;
}

export const useCharactersStore = defineStore("characters", {
    state: (): CharactersState => ({
        items: [],
        status: "idle",
        error: null,
    }),

    getters: {
        isLoading: (state) => state.status === "loading",
    },

    actions: {
        async getCharacters() {
            this.status = "loading";
            this.error = null;

            try {
                this.items = await getCharacters();
                this.status = "idle";
            } catch (e: any) {
                this.status = "error";
                this.error = e?.message ?? "Erreur lors du chargement des personnages.";
            }
        },

        async addCharacter(payload: CharacterPayload) {
            this.status = "loading";
            this.error = null;

            try {
                const created = await createCharacter(payload);
                this.items.push(created);
                this.status = "idle";
            } catch (e: any) {
                this.status = "error";
                this.error = e?.message ?? "Erreur lors de la création du personnage.";
            }
        },

        async removeCharacter(id: number) {
            this.status = "loading";
            this.error = null;

            try {
                await deleteCharacter(id);
                this.items = this.items.filter((c) => c.id !== id);
                this.status = "idle";
            } catch (e: any) {
                this.status = "error";
                this.error = e?.message ?? "Erreur lors de la suppression du personnage.";
            }
        }
    },
});
