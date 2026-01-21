import type { AuthResponse, LoginCredentials, RegisterData, User } from '../types/index';
import { STORAGE_KEYS } from '../utils/constants';
import { getDummyUsers, populateDummyData } from '../utils/dummyData';

// In-memory mock database - initialized with dummy data
populateDummyData(); // Garante que dados fictícios existam
const mockUsers: (User & { password: string })[] = getDummyUsers();
let mockUserId = mockUsers.length + 1;

// Simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await delay(300); // Delay reduzido para testes mais rápidos
    
    const user = mockUsers.find(u => 
      u.username === credentials.username && 
      u.password === credentials.password
    );
    
    if (!user) {
      throw new Error('Usuário ou senha incorretos');
    }
    
    const mockToken = 'mock-jwt-token-' + user.id + '-' + Date.now();
    const mockRefresh = 'mock-refresh-token-' + user.id + '-' + Date.now();
    
    localStorage.setItem(STORAGE_KEYS.TOKEN, mockToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, mockRefresh);
    // Vincular token ao usuário específico para persistência
    localStorage.setItem('current-user', JSON.stringify({
      id: user.id,
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      bio: user.bio,
      profile_picture: user.profile_picture,
      followers_count: user.followers_count,
      following_count: user.following_count,
      created_at: user.created_at,
      is_following: user.is_following
    }));
    
    return {
      access: mockToken,
      refresh: mockRefresh,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        bio: user.bio,
        profile_picture: user.profile_picture,
        followers_count: user.followers_count,
        following_count: user.following_count,
        created_at: user.created_at,
        is_following: user.is_following
      },
    };
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    await delay(500);
    
    if (mockUsers.some(u => u.username === data.username)) {
      throw new Error('Username already exists');
    }
    
    const newUser: User & { password: string } = {
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
      password: data.password,
    };
    
    mockUsers.push(newUser);
    
    const mockToken = 'mock-jwt-token-' + Date.now();
    const mockRefresh = 'mock-refresh-token-' + Date.now();
    
    localStorage.setItem(STORAGE_KEYS.TOKEN, mockToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, mockRefresh);
    // Vincular novo usuário ao token
    localStorage.setItem('current-user', JSON.stringify({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      bio: newUser.bio,
      profile_picture: newUser.profile_picture,
      followers_count: newUser.followers_count,
      following_count: newUser.following_count,
      created_at: newUser.created_at
    }));
    
    return {
      access: mockToken,
      refresh: mockRefresh,
      user: newUser,
    };
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem('current-user');
  },

  getCurrentUser: async (): Promise<User> => {
    await delay(300);
    
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    // Recuperar usuário vinculado ao token
    const currentUserData = localStorage.getItem('current-user');
    if (!currentUserData) {
      throw new Error('User data not found');
    }
    
    try {
      const user = JSON.parse(currentUserData);
      return user;
    } catch (error) {
      throw new Error('Invalid user data');
    }
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(STORAGE_KEYS.TOKEN);
  },
};
