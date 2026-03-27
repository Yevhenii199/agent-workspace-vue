export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateName = (name: string): boolean => {
  return name.length >= 2 && name.length <= 50;
};

export interface ValidationError {
  field: string;
  message: string;
}

export const validateProfile = (
  name: string,
  email: string
): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!name.trim()) {
    errors.push({ field: 'name', message: 'validation.required' });
  } else if (!validateName(name)) {
    errors.push({
      field: 'name',
      message: name.length < 2 ? 'validation.nameTooShort' : 'validation.nameTooLong',
    });
  }

  if (!email.trim()) {
    errors.push({ field: 'email', message: 'validation.required' });
  } else if (!validateEmail(email)) {
    errors.push({ field: 'email', message: 'validation.invalidEmail' });
  }

  return errors;
};
