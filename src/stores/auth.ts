import { defineStore } from "pinia";
import type { ApiError } from "../services/apiClient";
import { loginRequest, signupRequest } from "../services/auth/auth";

interface AuthState {
    user: {
        id: string;
        email: string;
    } | null;
    token: string | null;
    status: "idle" | "loading";
    error: string | null;
}

const TOKEN_KEY = "dnd_auth_token";
const USER_KEY = "dnd_auth_user";

export const useAuthStore = defineStore("auth", {
    state: (): AuthState => ({
        user: null,
        token: null,
        status: "idle",
        error: null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
    },

    actions: {
        loadFromStorage() {
            const token = localStorage.getItem(TOKEN_KEY);
            const rawUser = localStorage.getItem(USER_KEY);

            if (token && rawUser) {
                try {
                    this.token = token;
                    this.user = JSON.parse(rawUser);
                } catch {
                    this.token = null;
                    this.user = null;
                }
            }
        },

        persist() {
            if (this.token && this.user) {
                localStorage.setItem(TOKEN_KEY, this.token);
                localStorage.setItem(USER_KEY, JSON.stringify(this.user));
            } else {
                localStorage.removeItem(TOKEN_KEY);
                localStorage.removeItem(USER_KEY);
            }
        },

        async login(email: string, password: string) {
            this.status = "loading";
            this.error = null;

            try {
                const res = await loginRequest(email, password);

                this.token = res.accessToken;
                this.user = {
                    id: res.id,
                    email: res.email,
                };
                this.persist();
            } catch (e) {
                console.error(e);
                const err = e as ApiError;
                if (err.status === 401) {
                    this.error = "Email ou mot de passe incorrect.";
                } else {
                    this.error = "Impossible de se connecter.";
                }
                throw e;
            } finally {
                this.status = "idle";
            }
        },

        logout() {
            this.token = null;
            this.user = null;
            this.persist();
        },
        async signup(email: string, password: string) {
            try {
                const res = await signupRequest(email, password);
                this.token = res.accessToken;
                this.user = {
                    id: res.id,
                    email: res.email,
                };
                this.persist();
            } catch (e) {
                const err = e as ApiError;
                if (err.status === 401) {
                    this.error = "Email ou mot de passe incorrect.";
                } else {
                    this.error = "Impossible de créer un compte.";
                }
                throw e;
            } finally {
                this.status = "idle";
            }
        }
    },
});
