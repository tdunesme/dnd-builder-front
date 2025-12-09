<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import BaseAlert from "../../components/ui/BaseAlert.vue";
import BaseButton from "../../components/ui/BaseButton.vue";
import BaseCard from "../../components/ui/BaseCard.vue";
import BaseSpinner from "../../components/ui/BaseSpinner.vue";
import { getCharacter, type Character } from "../../services/characters/characters";

const route = useRoute();
const router = useRouter();

const character = ref<Character | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

const id = Number(route.params.id);

async function loadCharacter() {
    loading.value = true;
    error.value = null;

    try {
        character.value = await getCharacter(id);
    } catch (e: any) {
        error.value = e?.message ?? "Impossible de charger le personnage.";
    } finally {
        loading.value = false;
    }
}

function goBack() {
    router.push({ name: "characters" });
}

onMounted(loadCharacter);
</script>

<template>
    <section class="page-shell">
        <header class="flex items-center justify-between mb-4">
            <div>
                <h1 class="text-xl font-semibold">
                    Détail du personnage
                </h1>
                <p class="text-sm text-gray-500">
                    Consultation d'un personnage existant.
                </p>
            </div>

            <BaseButton variant="ghost" size="sm" @click="goBack">
                ← Retour à la liste
            </BaseButton>
        </header>

        <BaseCard class="page-main">
            <div v-if="loading" class="flex justify-center py-8">
                <BaseSpinner />
            </div>

            <BaseAlert v-else-if="error" variant="error">
                {{ error }}
            </BaseAlert>

            <div v-else-if="character" class="space-y-4">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-lg font-semibold">
                            {{ character.name }}
                        </h2>
                        <p class="text-sm text-gray-500">
                            ID #{{ character.id }}
                        </p>
                    </div>

                    <span class="badge">
                        Niveau {{ character.level }}
                    </span>
                </div>

                <dl class="grid grid-cols-1 gap-4 sm:grid-cols-2 text-sm">
                    <div>
                        <dt class="font-medium text-gray-700">Espèce</dt>
                        <dd class="text-gray-500">
                            {{ character.speciesId ?? "Non définie" }}
                        </dd>
                    </div>
                    <div>
                        <dt class="font-medium text-gray-700">Classe</dt>
                        <dd class="text-gray-500">
                            {{ character.classId ?? "Non définie" }}
                        </dd>
                    </div>
                    <div>
                        <dt class="font-medium text-gray-700">Background</dt>
                        <dd class="text-gray-500">
                            {{ character.backgroundId ?? "Non défini" }}
                        </dd>
                    </div>
                    <div>
                        <dt class="font-medium text-gray-700">Créé le</dt>
                        <dd class="text-gray-500">
                            {{ new Date(character.createdAt).toLocaleString() }}
                        </dd>
                    </div>
                </dl>

                <!-- Placeholder pour les futures sections du builder -->
                <div class="mt-6 border-t pt-4 text-xs text-gray-400">
                    Section builder détaillée à venir (caractéristiques, sorts, équipement…)
                </div>
            </div>

            <BaseAlert v-else variant="warning">
                Aucun personnage trouvé pour cet identifiant.
            </BaseAlert>
        </BaseCard>
    </section>
</template>