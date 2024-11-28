import { headers } from "./headers";

/**
 * A wrapper around the `fetch` API that includes authentication headers.
 * 
 * @async
 * @param {string} url - The URL to send the request to.
 * @param {RequestInit} [options={}] - Additional fetch options, such as method, headers, and body.
 * @returns {Promise<Response>} The `Response` object from the fetch call.
 */
export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
    return fetch(url, {
        ...options,
        headers: headers(Boolean(options.body)),
    });
}

