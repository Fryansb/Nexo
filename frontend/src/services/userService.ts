import api from './api';
import type { User, UpdateProfileData } from '../types/index';

export const userService = {
  getUser: async (id: number): Promise<User> => {
    const response = await api.get<User>(`/users/${id}/`);
    return response.data;
  },

  updateProfile: async (data: UpdateProfileData): Promise<User> => {
    const formData = new FormData();
    
    if (data.first_name) formData.append('first_name', data.first_name);
    if (data.last_name) formData.append('last_name', data.last_name);
    if (data.bio) formData.append('bio', data.bio);
    if (data.profile_picture) formData.append('profile_picture', data.profile_picture);

    const response = await api.patch<User>('/auth/me/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  followUser: async (id: number): Promise<void> => {
    await api.post(`/users/${id}/follow/`);
  },

  unfollowUser: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}/follow/`);
  },

  getFollowers: async (id: number): Promise<User[]> => {
    const response = await api.get<User[]>(`/users/${id}/followers/`);
    return response.data;
  },

  getFollowing: async (id: number): Promise<User[]> => {
    const response = await api.get<User[]>(`/users/${id}/following/`);
    return response.data;
  },
};
