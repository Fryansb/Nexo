import { useState, useCallback, useMemo } from 'react';
import { Layout } from '../../components/Layout';
import { PostCard } from '../../components/PostCard';
import { CreatePostForm } from '../../components/CreatePostForm';
import { useAuthStore } from '../../stores/authStore';
import type { Post } from '../../types';

// Mock posts moved outside component to avoid recreation
const INITIAL_MOCK_POSTS: Post[] = [
  {
    id: 1,
    author: {
      id: 1,
      username: 'joaosilva',
      email: 'joao@email.com',
      first_name: 'João',
      last_name: 'Silva',
      bio: 'Desenvolvedor Full Stack',
      followers_count: 120,
      following_count: 85,
      created_at: new Date(2024, 0, 15).toISOString(),
    },
    content: 'Acabei de lançar meu novo projeto! 🚀 Estou muito animado com os resultados.',
    likes_count: 42,
    comments_count: 8,
    is_liked: false,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    author: {
      id: 2,
      username: 'mariasilva',
      email: 'maria@email.com',
      first_name: 'Maria',
      last_name: 'Santos',
      bio: 'Designer UI/UX',
      followers_count: 340,
      following_count: 120,
      created_at: new Date(2024, 1, 10).toISOString(),
    },
    content: 'Bom dia! Alguém tem recomendações de livros sobre design system? 📚',
    likes_count: 15,
    comments_count: 23,
    is_liked: true,
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    author: {
      id: 3,
      username: 'carlosdev',
      email: 'carlos@email.com',
      first_name: 'Carlos',
      last_name: 'Oliveira',
      bio: 'Backend Engineer | Python lover',
      followers_count: 580,
      following_count: 200,
      created_at: new Date(2023, 11, 5).toISOString(),
    },
    content: 'Finalmente entendi TypeScript! A tipagem realmente faz diferença na produtividade. 💙',
    likes_count: 89,
    comments_count: 12,
    is_liked: false,
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const HomePage = () => {
  const { user } = useAuthStore();
  const [posts, setPosts] = useState<Post[]>(INITIAL_MOCK_POSTS);

  // Memoized handlers to prevent unnecessary re-renders
  const handleCreatePost = useCallback((content: string) => {
    if (!user) return; // Safety check
    
    const newPost: Post = {
      id: Date.now() + Math.random(), // Avoid collision
      author: user,
      content,
      likes_count: 0,
      comments_count: 0,
      is_liked: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  }, [user]);

  const handleLike = useCallback((postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              is_liked: !post.is_liked,
              likes_count: post.is_liked ? post.likes_count - 1 : post.likes_count + 1,
            }
          : post
      )
    );
  }, []);

  const handleComment = useCallback((postId: number) => {
    // TODO: Implement comment modal/functionality
    if (process.env.NODE_ENV === 'development') {
      console.debug(`Comment action for post ${postId}`);
    }
  }, []);

  // Memoize user initials calculation
  const userInitials = useMemo(() => {
    if (!user?.first_name || !user?.last_name) return 'U';
    return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
  }, [user]);

  return (
    <Layout>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#111' }}>
          Feed
        </h1>

        <CreatePostForm userInitials={userInitials} onSubmit={handleCreatePost} />

        <div>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={() => handleLike(post.id)}
              onComment={() => handleComment(post.id)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};
