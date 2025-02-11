import { BASE_API_URL } from "../constants"

const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

type Method = keyof typeof METHODS;

interface RequestOptions {
  headers?: Record<string, string>;
  method: Method;
  data?: Record<string, unknown>;
  timeout?: number;
}

interface QueryObject {
  [key: string]: unknown;
}

function queryStringify(data: QueryObject): string {
  if (typeof data !== "object" || data === null) {
    throw new Error("Data must be an object");
  }

  const keys = Object.keys(data);
  return keys.length ? 
    "?" + keys.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key] as string)}`).join("&") : "";
}

class HTTPTransport {
  private baseURL: string;

  constructor(relativePath: string) {
    this.baseURL = `${BASE_API_URL}${relativePath}`;
  }

  get(url: string, options: Omit<RequestOptions, "method"> = {}): Promise<unknown> {
    return this.request(url, { ...options, method: METHODS.GET });
  }

  post(url: string, options: Omit<RequestOptions, "method"> = {}): Promise<unknown> {
    return this.request(url, { ...options, method: METHODS.POST });
  }

  put(url: string, options: Omit<RequestOptions, "method"> = {}): Promise<unknown> {
    return this.request(url, { ...options, method: METHODS.PUT });
  }

  delete(url: string, options: Omit<RequestOptions, "method"> = {}): Promise<unknown> {
    return this.request(url, { ...options, method: METHODS.DELETE });
  }

  private request(url: string, options: RequestOptions, timeout = 5000): Promise<unknown> {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject("No method specified");
        return;
      }

      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      const isGet = method === METHODS.GET;

      const fullUrl = `${this.baseURL}${url}`;

      xhr.open(
        method, 
        isGet && data ? `${fullUrl}${queryStringify(data)}` : fullUrl,
      );

      headers['Content-Type'] = typeof data === 'object' && data !== null ? "application/json" : headers['Content-Type'] || "";

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          try {
            const errorResponse = JSON.parse(xhr.response);
            reject(errorResponse);
          } catch (e) {
              reject(`Error: ${xhr.status} ${xhr.statusText}`);
          }
        }
      };

      xhr.onabort = reject;
      xhr.onerror = () => reject("Network error");

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        const requestData = typeof data === "object" ? JSON.stringify(data) : data;
        xhr.send(requestData);
      }
    });
  }
}

export default HTTPTransport;
