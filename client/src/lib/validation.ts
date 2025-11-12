export const validateNIN = (nin: string): { valid: boolean; error?: string } => {
  const cleaned = nin.replace(/\s/g, '');
  
  if (!cleaned) {
    return { valid: false, error: 'NIN is required' };
  }
  
  if (!/^\d+$/.test(cleaned)) {
    return { valid: false, error: 'NIN must contain only numbers' };
  }
  
  if (cleaned.length !== 11) {
    return { valid: false, error: 'NIN must be exactly 11 digits' };
  }
  
  return { valid: true };
};

export const validateEmail = (email: string): { valid: boolean; error?: string } => {
  if (!email) {
    return { valid: false, error: 'Email is required' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Please enter a valid email address' };
  }
  
  return { valid: true };
};

export const validatePassword = (password: string): { valid: boolean; error?: string; strength?: string } => {
  if (!password) {
    return { valid: false, error: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters' };
  }
  
  let strength = 'weak';
  let checks = 0;
  
  if (/[a-z]/.test(password)) checks++;
  if (/[A-Z]/.test(password)) checks++;
  if (/[0-9]/.test(password)) checks++;
  if (/[^a-zA-Z0-9]/.test(password)) checks++;
  
  if (checks >= 3 && password.length >= 12) {
    strength = 'strong';
  } else if (checks >= 2 && password.length >= 8) {
    strength = 'medium';
  }
  
  if (checks < 2) {
    return { 
      valid: false, 
      error: 'Password must contain at least 2 of: lowercase, uppercase, numbers, symbols',
      strength 
    };
  }
  
  return { valid: true, strength };
};

export const validatePhoneNumber = (phone: string): { valid: boolean; error?: string; formatted?: string } => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (!cleaned) {
    return { valid: false, error: 'Phone number is required' };
  }
  
  if (cleaned.startsWith('234')) {
    if (cleaned.length !== 13) {
      return { valid: false, error: 'Phone number must be 13 digits with country code (234)' };
    }
    const formatted = `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`;
    return { valid: true, formatted };
  }
  
  if (cleaned.startsWith('0')) {
    if (cleaned.length !== 11) {
      return { valid: false, error: 'Phone number must be 11 digits starting with 0' };
    }
    const formatted = `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
    return { valid: true, formatted };
  }
  
  if (cleaned.length === 10) {
    const formatted = `0${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    return { valid: true, formatted };
  }
  
  return { valid: false, error: 'Invalid Nigerian phone number format' };
};

export const validateFullName = (name: string): { valid: boolean; error?: string } => {
  if (!name || !name.trim()) {
    return { valid: false, error: 'Full name is required' };
  }
  
  const trimmed = name.trim();
  const parts = trimmed.split(/\s+/);
  
  if (parts.length < 2) {
    return { valid: false, error: 'Please enter your full name (first and last name)' };
  }
  
  if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) {
    return { valid: false, error: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
  }
  
  if (trimmed.length < 3) {
    return { valid: false, error: 'Name is too short' };
  }
  
  return { valid: true };
};
