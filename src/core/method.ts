const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
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
  if (typeof data !== 'object' || data === null) {
    throw new Error('Data must be an object');
  }

  const keys = Object.keys(data);
  return keys.length ? 
    '?' + keys.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key] as string)}`).join('&') : '';
}

class HTTPTransport {
  get(url: string, options: Omit<RequestOptions, 'method'> = {}): Promise<unknown> {
    return this.request(url, { ...options, method: METHODS.GET });
  }

  post(url: string, options: Omit<RequestOptions, 'method'> = {}): Promise<unknown> {
    return this.request(url, { ...options, method: METHODS.POST });
  }

  put(url: string, options: Omit<RequestOptions, 'method'> = {}): Promise<unknown> {
    return this.request(url, { ...options, method: METHODS.PUT });
  }

  delete(url: string, options: Omit<RequestOptions, 'method'> = {}): Promise<unknown> {
    return this.request(url, { ...options, method: METHODS.DELETE });
  }

  private request(url: string, options: RequestOptions, timeout = 5000): Promise<unknown> {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method specified');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method, 
        isGet && data ? `${url}${queryStringify(data)}` : url,
      );

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(`Error: ${xhr.status} ${xhr.statusText}`);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = () => reject('Network error');

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        const requestData = typeof data === 'object' ? JSON.stringify(data) : data;
        xhr.send(requestData);
      }
    });
  }
}

const httpClient = new HTTPTransport();

export default httpClient;
