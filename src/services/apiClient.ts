import { useAuthStore } from "../stores/auth";

export interface ApiError extends Error {
    status?: number;
    data?: any;
}

export async function apiFetch<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const baseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:4000";
    const url = `${baseUrl}${path}`;

    const auth = useAuthStore();
    const token = auth.token;

    let normalizedHeaders: Record<string, string> = {};
    if (options.headers) {
        if (options.headers instanceof Headers) {
            options.headers.forEach((value, key) => {
                normalizedHeaders[key] = value;
            });
        } else if (Array.isArray(options.headers)) {
            options.headers.forEach(([key, value]) => {
                normalizedHeaders[key] = value;
            });
        } else {
            normalizedHeaders = options.headers as Record<string, string>;
        }
    }

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...normalizedHeaders,
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(url, {
        ...options,
        headers,
    });

    let data: any = null;
    try {
        data = await res.json();
    } catch {
        // pas de body JSON, ce n'est pas grave
    }

    if (!res.ok) {
        const err = new Error("API error") as ApiError;
        err.status = res.status;
        err.data = data;
        throw err;
    }

    return data as T;
}
