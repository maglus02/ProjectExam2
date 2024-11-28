import { load } from "../Storage/load";
import { API_KEY } from "./constants";

export function headers(hasBody: boolean = false): Headers {
    const headers = new Headers();

    const token = load<string>("token");

    if (token) {
        headers.append("Authorization", `Bearer ${token}`);
    }

    if (API_KEY) {
        headers.append("X-Noroff-API-Key", API_KEY);
    }

    if (hasBody) {
        headers.append("Content-Type", "application/json");
    }

    return headers;
}