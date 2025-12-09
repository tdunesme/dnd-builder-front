import { apiFetch } from "../apiClient";


export interface LoginResponse {
    id: string;
    email: string;
    accessToken: string;
}

export async function loginRequest(email: string, password: string) {
    return apiFetch<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}

export async function signupRequest(email: string, password: string) {
    return apiFetch<LoginResponse>("/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}