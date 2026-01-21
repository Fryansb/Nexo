/** Application configuration and constants */

/** API base URL */
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/** LocalStorage keys */
export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user_data',
} as const;

/** @deprecated Use STORAGE_KEYS.TOKEN */
export const TOKEN_KEY = STORAGE_KEYS.TOKEN;

/** @deprecated Use STORAGE_KEYS.REFRESH_TOKEN */
export const REFRESH_TOKEN_KEY = STORAGE_KEYS.REFRESH_TOKEN;

/** Application routes */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  EDIT_PROFILE: '/profile/edit',
  USER_PROFILE: (id: number | string) => `/user/${id}`,
} as const;

/** Validation limits */
export const LIMITS = {
  POST_MAX_LENGTH: 500,
  BIO_MAX_LENGTH: 160,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 30,
  PASSWORD_MIN_LENGTH: 8,
} as const;

/** Common error messages */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Connection error. Check your internet.',
  UNAUTHORIZED: 'Session expired. Please login again.',
  NOT_FOUND: 'Resource not found.',
  SERVER_ERROR: 'Server error. Try again later.',
} as const;
