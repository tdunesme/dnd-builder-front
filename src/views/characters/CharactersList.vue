<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useCharactersStore } from "../../stores/characters";

import BaseAlert from "../../components/ui/BaseAlert.vue";
import BaseButton from "../../components/ui/BaseButton.vue";
import BaseCard from "../../components/ui/BaseCard.vue";
import BaseSpinner from "../../components/ui/BaseSpinner.vue";

const charactersStore = useCharactersStore();
const { items, isLoading, error } = storeToRefs(charactersStore);

onMounted(() => {
    charactersStore.getCharacters();
});
</script>

<template>
    <section class="page-shell">
        <header class="flex items-center justify-between mb-4">
            <div>
                <h1 class="text-xl font-semibold">Mes personnages</h1>
                <p class="text-sm text-gray-500">
                    Liste des personnages existants récupérés depuis l'API.
                </p>
            </div>

            <BaseButton>
                Créer un personnage
            </BaseButton>
        </header>

        <BaseCard class="page-main">
            <div v-if="isLoading" class="flex justify-center py-8">
                <BaseSpinner />
            </div>

            <BaseAlert v-else-if="error" variant="error">
                {{ error }}
            </BaseAlert>

            <div v-else>
                <p v-if="items.length === 0" class="text-sm text-gray-500">
                    Aucun personnage pour le moment.
                </p>

                <ul v-else class="space-y-2">
                    <li v-for="c in items" :key="c.id" class="card flex items-center justify-between">
                        <div>
                            <h2 class="font-medium">
                                {{ c.name }}
                            </h2>
                            <p class="text-xs text-gray-500">
                                Niveau {{ c.level }} • ID #{{ c.id }}
                            </p>
                        </div>

                        <BaseButton size="sm" variant="ghost" :to="{ name: 'character', params: { id: c.id } }">
                            Voir
                        </BaseButton>
                    </li>
                </ul>
            </div>
        </BaseCard>
    </section>
</template>