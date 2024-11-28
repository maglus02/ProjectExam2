import { load } from "../Storage/load";
import { API_KEY } from "./constants";

/**
 * Generates HTTP headers for API requests, including optional authentication and content headers.
 * 
 * @param {boolean} [hasBody=false] - Indicates whether the request includes a body (e.g., for POST or PUT requests).
 * @returns {Headers} The configured `Headers` object for the request.
 */
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