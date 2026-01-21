export type User = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  bio?: string;
  profile_picture?: string;
  followers_count: number;
  following_count: number;
  is_following?: boolean;
  created_at: string;
};

export type Post = {
  id: number;
  author: User;
  content: string;
  image?: string;
  likes_count: number;
  comments_count: number;
  is_liked: boolean;
  created_at: string;
  updated_at: string;
};

export type Comment = {
  id: number;
  author: User;
  post: number;
  content: string;
  created_at: string;
};

export type AuthResponse = {
  access: string;
  refresh: string;
  user: User;
};

export type LoginCredentials = {
  username: string;
  password: string;
};

export type RegisterData = {
  username: string;
  email: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
};

export type UpdateProfileData = {
  first_name?: string;
  last_name?: string;
  bio?: string;
  profile_picture?: File;
};
