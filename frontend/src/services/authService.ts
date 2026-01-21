import type { AuthResponse, LoginCredentials, RegisterData, User } from '../types/index';
import { STORAGE_KEYS } from '../utils/constants';

// In-memory mock database
const mockUsers: User[] = [];
let mockUserId = 1;

// Simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await delay(500);
    
    const user = mockUsers.find(u => u.username === credentials.username);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    const mockToken = 'mock-jwt-token-' + Date.now();
    const mockRefresh = 'mock-refresh-token-' + Date.now();
    
    localStorage.setItem(STORAGE_KEYS.TOKEN, mockToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, mockRefresh);
    
    return {
      access: mockToken,
      refresh: mockRefresh,
      user,
    };
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    await delay(500);
    
    if (mockUsers.some(u => u.username === data.username)) {
      throw new Error('Username already exists');
    }
    
    const newUser: User = {
      id: mockUserId++,
      username: data.username,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      bio: '',
      profile_picture: undefined,
      followers_count: 0,
      following_count: 0,
      created_at: new Date().toISOString(),
    };
    
    mockUsers.push(newUser);
    
    const mockToken = 'mock-jwt-token-' + Date.now();
    const mockRefresh = 'mock-refresh-token-' + Date.now();
    
    localStorage.setItem(STORAGE_KEYS.TOKEN, mockToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, mockRefresh);
    
    return {
      access: mockToken,
      refresh: mockRefresh,
      user: newUser,
    };
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  },

  getCurrentUser: async (): Promise<User> => {
    await delay(300);
    
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    const user = mockUsers[mockUsers.length - 1];
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(STORAGE_KEYS.TOKEN);
  },
};
