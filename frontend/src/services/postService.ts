import api from './api';
import type { Post, Comment } from '../types/index';
import { getDummyPosts, getDummyUsers } from '../utils/dummyData';

// Mock data para desenvolvimento
let mockPosts: Post[] = [];
let mockPostId = 1;

// Função para popular posts fictícios 
const initializeMockPosts = () => {
  if (mockPosts.length === 0) {
    const dummyPosts = getDummyPosts();
    const dummyUsers = getDummyUsers();
    
    mockPosts = dummyPosts.map((post) => {
      const author = dummyUsers.find(user => user.id === post.author_id);
      return {
        id: post.id,
        content: post.content,
        created_at: post.created_at,
        updated_at: post.created_at,
        likes_count: post.likes_count,
        comments_count: post.comments_count,
        is_liked: post.is_liked,
        author: author ? {
          id: author.id,
          username: author.username,
          email: author.email,
          first_name: author.first_name,
          last_name: author.last_name,
          profile_picture: author.profile_picture,
          followers_count: author.followers_count,
          following_count: author.following_count,
          created_at: author.created_at,
          bio: author.bio,
        } : {
          id: post.author_id,
          username: 'Unknown',
          email: 'unknown@email.com',
          first_name: 'Unknown',
          last_name: 'User',
          profile_picture: undefined,
          followers_count: 0,
          following_count: 0,
          created_at: new Date().toISOString(),
          bio: '',
        }
      };
    });
    mockPostId = Math.max(...mockPosts.map(p => p.id)) + 1;
  }
};

// Simular delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const postService = {
  getPosts: async (): Promise<Post[]> => {
    // Em desenvolvimento, usar posts fictícios
    if (import.meta.env.DEV) {
      await delay(200);
      initializeMockPosts();
      return [...mockPosts].sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
    
    // Em produção, usar API real
    const response = await api.get<Post[]>('/posts/');
    return response.data;
  },

  getPost: async (id: number): Promise<Post> => {
    if (import.meta.env.DEV) {
      await delay(150);
      initializeMockPosts();
      const post = mockPosts.find(p => p.id === id);
      if (!post) throw new Error('Post não encontrado');
      return post;
    }
    
    const response = await api.get<Post>(`/posts/${id}/`);
    return response.data;
  },

  createPost: async (content: string, image?: File): Promise<Post> => {
    if (import.meta.env.DEV) {
      await delay(300);
      initializeMockPosts();
      
      const currentUser = JSON.parse(localStorage.getItem('auth-storage') || '{}').state?.user;
      if (!currentUser) throw new Error('Usuário não autenticado');
      
      const newPost: Post = {
        id: mockPostId++,
        content,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        likes_count: 0,
        comments_count: 0,
        is_liked: false,
        author: {
          id: currentUser.id,
          username: currentUser.username,
          email: currentUser.email,
          first_name: currentUser.first_name,
          last_name: currentUser.last_name,
          profile_picture: currentUser.profile_picture,
          followers_count: currentUser.followers_count,
          following_count: currentUser.following_count,
          created_at: currentUser.created_at,
          bio: currentUser.bio,
        }
      };
      
      mockPosts.unshift(newPost); // Adicionar no início do array
      return newPost;
    }
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
