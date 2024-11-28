import { headers } from "./headers";

export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
    return fetch(url, {
        ...options,
        headers: headers(Boolean(options.body)),
    });
}

