export interface UseAuthActionsReturn {
    handleSignIn: (email: string, password: string, name: string, role: "admin" | "viewer" | "editor") => Promise<void>;
    handleLogIn: (email: string, password: string) => Promise<void>;
}

export interface ApiErrorResponse {
    message: string;
    statusCode: number;
    code?: string; // Наприклад, якщо бекенд повертає коди помилок
}

export interface User {
    _id: string;
    email: string;
    name: string;
    role: "admin" | "viewer" | "editor";
    password: string; // Optional, not returned by the API

}

export interface UI {
    tittle: string;
    footer: string;
}

export interface Todo{
    name:string,
    deadline: string,
    author?: string,
    createdTime: number,
    _id?: string,
}