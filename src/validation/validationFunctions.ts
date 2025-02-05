interface ValidationResult {
  isValid: boolean;
  errorMessage: string;
}
/**
 * Проверяет, является ли данное поле обязательным.
 * Функция возвращает false, если поле пустое или содержит только пробелы.
 * 
 * @param value - значение поля
 * @returns объект с результатом проверки и сообщением об ошибке
 */
export const validateRequired = (value: string): ValidationResult => {
  const isValid = value.trim() !== "";

  if (!isValid) {
    return {
      isValid: false,
      errorMessage: "Это поле является обязательным и не может быть пустым."
    };
  }

  return {
    isValid: true,
    errorMessage: ""
  };
};

/**
 * Проверяет, является ли строка корректным email.
 * Email должен содержать латиницу, может включать цифры
 * и специальные символы (дефис и нижнее подчеркивание),
 * а также обязательно должен содержать символ "собака" (@)
 * и точку после неё. Перед точкой должны быть буквы.
 * 
 * @param email - строка для проверки
 * @returns объект с результатом проверки и сообщением об ошибке
 */
export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      errorMessage: "Неверный формат электронной почты."
    };
  }

  return {
    isValid: true,
    errorMessage: ""
  };
};

/**
 * Проверяет, является ли строка корректным именем/фамилией.
 * Имя должно начинаться с заглавной буквы, 
 * может содержать буквы латиницы и кириллицы, 
 * не допускает пробелов, цифр и специальных символов (только дефис).
 * 
 * @param name - строка для проверки
 * @returns объект с результатом проверки и сообщением об ошибке
 */
export const validateName = (name: string): ValidationResult => {
  const minLength = 2;
  const maxLength = 50;

  if (name.length < minLength || name.length > maxLength) {
    return {
      isValid: false,
      errorMessage: `Введите от ${minLength} до ${maxLength} символов.`
    };
  }

  const nameRegex = /^[A-Za-zА-Яа-яЁё-]+$/;
  if (!nameRegex.test(name)) {
    return {
      isValid: false,
      errorMessage: "Только буквы, без пробелов, цифр и специальных символов (дефис разрешен)."
    };
  }

  if (!/^[A-ZА-Я]/.test(name)) {
    return {
      isValid: false,
      errorMessage: "Имя должно начинаться с заглавной буквы."
    };
  }

  return {
    isValid: true,
    errorMessage: ""
  };
};

/**
 * Проверяет, соответствует ли логин заданным требованиям.
 * Логин должен содержать от 3 до 20 символов и не состоять только из цифр.
 * Допустимые символы: латинские буквы, цифры, символы "-" и "_".
 * 
 * @param login - строка для проверки
 * @returns объект с результатом проверки и сообщением об ошибке
 */
export const validateLogin = (login: string): ValidationResult => {

  if (login.length < 3 || login.length > 20) {
    return {
      isValid: false,
      errorMessage: "Введите от 3 до 20 символов."
    };
  }

  if (/^[0-9]+$/.test(login)) {
    return {
      isValid: false,
      errorMessage: "Логин не должен состоять только из цифр."
    };
  }

  const loginRegex = /^(?=.{3,20}$)(?![0-9]+$)[a-zA-Z0-9_-]+$/;
  if (!loginRegex.test(login)) {
    return {
      isValid: false,
      errorMessage: "Логин может содержать только латинские буквы, цифры, '-' и '_'."
    };
  }

  return {
    isValid: true,
    errorMessage: ""
  };
};

/**
 * Проверяет, соответствует ли пароль заданным требованиям.
 * Пароль должен содержать от 8 до 40 символов,
 * обязательно иметь хотя бы одну заглавную букву и хотя бы одну цифру.
 * 
 * @param password - строка для проверки
 * @returns объект с результатом проверки и сообщением об ошибке
 */
export const validatePassword = (password: string): ValidationResult => {
  const minLength = 8;
  const maxLength = 40;

  if (password.length < minLength || password.length > maxLength) {
    return {
      isValid: false,
      errorMessage: `Введите от ${minLength} до ${maxLength} символов.`
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      errorMessage: "Введите хотя бы одну заглавную букву."
    };
  }

  if (!/[0-9]/.test(password)) {
    return {
      isValid: false,
      errorMessage: "Введите хотя бы одну цифру."
    };
  }

  return {
    isValid: true,
    errorMessage: ""
  };
};

/**
 * Проверяет, соответствует ли номер телефона заданному формату.
 * Номер должен состоять из 10-15 цифр и может начинаться с '+'.
 * 
 * @param phone - строка для проверки
 * @returns объект с результатом проверки и сообщением об ошибке
 */
export const validatePhone = (phone: string): ValidationResult => {
  const phoneRegex = /^\+?\d{10,15}$/;

  if (!phoneRegex.test(phone)) {
    return {
      isValid: false,
      errorMessage: "Введите от 10 до 15 цифр."
    };
  }

  return {
    isValid: true,
    errorMessage: ""
  };
};

/**
 * Проверяет, совпадает ли пароль с его подтверждением.
 * 
 * @param password - строка пароля
 * @param confirmPassword - строка подтверждения пароля
 * @returns объект с результатом проверки и сообщением об ошибке
 */
export const validatePasswordConfirmation = (password: string, confirmPassword: string): ValidationResult => {
  if (password !== confirmPassword) {
    return {
      isValid: false,
      errorMessage: "Пароли не совпадают."
    };
  }

  return {
    isValid: true,
    errorMessage: ""
  };
};

/**
 * Проверяет, является ли поле для выбора файлов обязательным.
 * Функция возвращает false, если поле пустое или не выбраны файлы.
 * 
 * @param files - объект FileList, получаемый из инпута типа file
 * @returns объект с результатом проверки и сообщением об ошибке
 */
export const validateFileRequired = (files: FileList | null): ValidationResult => {
  if (!files || files.length === 0) {
    return {
      isValid: false,
      errorMessage: "Нужно выбрать файл."
    };
  }
  
  return {
    isValid: true,
    errorMessage: ""
  };
};
