import api from './api';
import type { Post, Comment } from '../types/index';

export const postService = {
  getPosts: async (): Promise<Post[]> => {
    const response = await api.get<Post[]>('/posts/');
    return response.data;
  },

  getPost: async (id: number): Promise<Post> => {
    const response = await api.get<Post>(`/posts/${id}/`);
    return response.data;
  },

  createPost: async (content: string, image?: File): Promise<Post> => {
    const formData = new FormData();
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    const response = await api.post<Post>('/posts/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updatePost: async (id: number, content: string): Promise<Post> => {
    const response = await api.patch<Post>(`/posts/${id}/`, { content });
    return response.data;
  },

  deletePost: async (id: number): Promise<void> => {
    await api.delete(`/posts/${id}/`);
  },

  likePost: async (id: number): Promise<void> => {
    await api.post(`/posts/${id}/like/`);
  },

  unlikePost: async (id: number): Promise<void> => {
    await api.delete(`/posts/${id}/like/`);
  },

  getComments: async (postId: number): Promise<Comment[]> => {
    const response = await api.get<Comment[]>(`/posts/${postId}/comments/`);
    return response.data;
  },

  createComment: async (postId: number, content: string): Promise<Comment> => {
    const response = await api.post<Comment>(`/posts/${postId}/comments/`, { content });
    return response.data;
  },

  deleteComment: async (postId: number, commentId: number): Promise<void> => {
    await api.delete(`/posts/${postId}/comments/${commentId}/`);
  },
};
