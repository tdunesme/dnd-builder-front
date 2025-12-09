<template>
    <form class="space-y-4" @submit.prevent="onSubmit">
        <div class="space-y-3">
            <!-- Email -->
            <BaseInput v-model="email" type="email" autocomplete="email">
                <template #label>
                    <BaseLabel>Email</BaseLabel>
                </template>
            </BaseInput>

            <!-- Mot de passe -->
            <BaseInput v-model="password" type="password" autocomplete="current-password">
                <template #label>
                    <BaseLabel>Mot de passe</BaseLabel>
                </template>
            </BaseInput>
        </div>

        <!-- Erreur globale -->
        <BaseAlert v-if="error" variant="error" title="Impossible de se connecter">
            {{ error }}
        </BaseAlert>

        <!-- Bouton de soumission -->
        <BaseButton type="submit" class="w-full justify-center" :disabled="loading">
            <span v-if="!loading">Se connecter</span>
            <span v-else class="inline-flex items-center gap-2">
                <BaseSpinner />
                Connexion...
            </span>
        </BaseButton>

        <p class="text-center text-xs text-gray-400">
            Pas encore de compte ?
            <RouterLink :to="{ name: 'signup' }">
                Créer un compte
            </RouterLink>
        </p>
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

import BaseAlert from "../components/ui/BaseAlert.vue";
import BaseButton from "../components/ui/BaseButton.vue";
import BaseInput from "../components/ui/BaseInput.vue";
import BaseLabel from "../components/ui/BaseLabel.vue";
import BaseSpinner from "../components/ui/BaseSpinner.vue";

const router = useRouter();
const auth = useAuthStore();

const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref<string | null>(null);

const onSubmit = async () => {
    error.value = null;
    loading.value = true;

    try {
        await auth.login(email.value, password.value);
        await router.push({ path: "/" });
    } catch {
        error.value = auth.error ?? "Impossible de se connecter.";
    } finally {
        loading.value = false;
    }
};
</script>