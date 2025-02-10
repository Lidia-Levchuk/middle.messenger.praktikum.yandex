interface CookieOptions {
  path?: string;
  expires?: Date;
  secure?: boolean;
  'max-age'?: number;
  sameSite?: 'Lax' | 'Strict' | 'None';
};

/**
 * Устанавливает куку в браузере.
 * @param name Имя куки.
 * @param value Значение куки.
 * @param options Дополнительные параметры куки.
 */
export function setCookie(name: string, value: string, options?: CookieOptions): void {
  const opts = options || {};

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (opts.expires) {
    cookieString += `;expires=${opts.expires.toUTCString()}`;
  }
  if (opts.path) {
    cookieString += `;path=${opts.path}`;
  }
  if (opts.secure) {
    cookieString += `;secure`;
  }
  if (opts['max-age']) {
    cookieString += `;max-age=${opts['max-age']}`;
  }
  if (opts.sameSite) {
    cookieString += `;sameSite=${opts.sameSite}`;
  }

  document.cookie = cookieString;
}

/**
 * Получает значение куки по имени.
 * @param name Имя куки.
 * @returns Значение куки или undefined, если не найдено.
 */
export function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop();
    if (cookieValue) {
      return cookieValue.split(';').shift();
    }
  }
}

/**
 * Удаляет куку по имени.
 * @param name Имя куки.
 */
export function deleteCookie(name: string): void {
  setCookie(name, '', { expires: new Date(0) }); // Устанавливаем дату истечения в прошлое
}

/**
 * Проверяет наличие куки по имени.
 * @param name Имя куки.
 * @returns true, если кука существует, иначе false.
 */
export function hasCookie(name: string): boolean {
  return document.cookie.split('; ').some((cookie) => cookie.startsWith(`${name}=`));
}
