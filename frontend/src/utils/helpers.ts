/**
 * Format date for display
 * @param dateString - ISO date string
 * @returns Formatted date (e.g., "21 Jan 2026")
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

/**
 * Format relative time using date-fns with Portuguese locale
 * @param dateString - ISO date string
 * @returns Relative time
 */
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  // Para datas muito antigas, usar formato de data
  if (days > 7) {
    return formatDate(dateString);
  }

  // Usar lógica simples para português sem dependência externa
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (days > 0) {
    return `${days} dia${days > 1 ? 's' : ''} atrás`;
  }
  if (hours > 0) {
    return `${hours} hora${hours > 1 ? 's' : ''} atrás`;
  }
  if (minutes > 0) {
    return `${minutes} minuto${minutes > 1 ? 's' : ''} atrás`;
  }
  return 'agora mesmo';
};

/**
 * Truncate long text with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

/**
 * Validate email format
 * @param email - Email to validate
 * @returns true if valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Sanitize text content to prevent XSS
 * @param text - Text to sanitize
 * @returns Sanitized text
 */
export const sanitizeText = (text: string): string => {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Validate post content
 * @param content - Post content to validate
 * @returns Object with isValid and error message
 */
export const validatePostContent = (content: string): { isValid: boolean; error?: string } => {
  const trimmed = content.trim();
  
  if (!trimmed) {
    return { isValid: false, error: 'Conteúdo não pode estar vazio' };
  }
  
  if (trimmed.length > 280) {
    return { isValid: false, error: 'Conteúdo deve ter no máximo 280 caracteres' };
  }
  
  return { isValid: true };
};

/**
 * Validate password strength
 * @param password - Password to validate
 * @returns Object with isValid and error messages
 */
export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Senha deve ter pelo menos 8 caracteres');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Senha deve conter pelo menos uma letra minúscula');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Senha deve conter pelo menos uma letra maiúscula');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Senha deve conter pelo menos um número');
  }
  
  return { isValid: errors.length === 0, errors };
};

/**
 * Format number with abbreviation (e.g., 1500 -> 1.5k)
 * @param num - Number to format
 * @returns Formatted number
 */
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace('.0', '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace('.0', '') + 'k';
  }
  return num.toString();
};
