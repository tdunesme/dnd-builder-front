import axios, { type AxiosRequestConfig } from "axios";
import { useAuthStore } from "../stores/auth";

export interface ApiError extends Error {
    status?: number;
    data?: any;
}

// Instance Axios centrale
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:4000",
    withCredentials: false,
});

// 🔐 Intercepteur requête : ajoute le Bearer token si présent
api.interceptors.request.use((config) => {
    const auth = useAuthStore();
    const token = auth.token;

    if (token) {
        config.headers = config.headers ?? {};
        (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
    }

    return config;
});

// ⚠️ Intercepteur réponse : logout automatique sur 401 (optionnel mais pratique)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const auth = useAuthStore();

        if (error.response?.status === 401) {
            auth.logout();
        }

        return Promise.reject(error);
    },
);

export async function apiFetch<T>(
    path: string,
    options: RequestInit = {},
): Promise<T> {
    // On garde la signature RequestInit pour ne rien casser côté appelant
    const axiosConfig: AxiosRequestConfig = {
        url: path, // baseURL déjà gérée par l'instance Axios
        method: (options.method as AxiosRequestConfig["method"]) ?? "GET",
    };

    // 🔁 Normalisation des headers depuis RequestInit vers Record<string, string>
    const normalizedHeaders: Record<string, string> = {};
    const h = options.headers;

    if (h instanceof Headers) {
        h.forEach((value, key) => {
            normalizedHeaders[key] = value;
        });
    } else if (Array.isArray(h)) {
        h.forEach(([key, value]) => {
            if (typeof value === "string") {
                normalizedHeaders[key] = value;
            }
        });
    } else if (h && typeof h === "object") {
        Object.assign(normalizedHeaders, h as Record<string, string>);
    }

    // Si on a un body et pas de Content-Type, on force JSON
    if (options.body !== undefined && !("Content-Type" in normalizedHeaders)) {
        normalizedHeaders["Content-Type"] = "application/json";
    }

    if (Object.keys(normalizedHeaders).length > 0) {
        axiosConfig.headers = normalizedHeaders;
    }

    if (options.body !== undefined) {
        // Axios accepte une string JSON directement comme data
        axiosConfig.data = options.body;
    }

    try {
        const response = await api.request<T>(axiosConfig);
        return response.data as T;
    } catch (error: any) {
        // Normalisation en ApiError pour rester compatible avec le reste du code
        if (error && error.isAxiosError) {
            const err = new Error("API error") as ApiError;
            err.status = error.response?.status;
            err.data = error.response?.data;
            throw err;
        }

        throw error;
    }
}
