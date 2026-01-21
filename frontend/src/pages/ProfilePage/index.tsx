import { useState, useCallback, useMemo } from 'react';
import { useParams } from 'react-router';
import { Layout } from '../../components/Layout';
import { PostCard } from '../../components/PostCard';
import { EditProfileModal } from '../../components/EditProfileModal';
import { useAuthStore } from '../../stores/authStore';
import { styles } from './styles';
import type { Post, User } from '../../types';

// Mock data moved outside component
const MOCK_USER: User = {
  id: 1,
  username: 'joaosilva',
  email: 'joao@email.com',
  first_name: 'João',
  last_name: 'Silva',
  bio: 'Desenvolvedor Full Stack apaixonado por tecnologia. Criando soluções inovadoras! 🚀',
  followers_count: 1234,
  following_count: 567,
  created_at: new Date(2024, 0, 15).toISOString(),
};

// Mock user posts
const INITIAL_USER_POSTS: Post[] = [
  {
    id: 1,
    author: MOCK_USER,
    content: 'Acabei de lançar meu novo projeto! 🚀 Estou muito animado com os resultados.',
    likes_count: 42,
    comments_count: 8,
    is_liked: false,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    author: MOCK_USER,
    content: 'Estudando React e TypeScript. A combinação está sendo incrível! 💙',
    likes_count: 28,
    comments_count: 5,
    is_liked: true,
    created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  },
];

export const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const { user: currentUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'posts' | 'likes'>('posts');
  const [posts, setPosts] = useState<Post[]>(INITIAL_USER_POSTS);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Memoize profile user (in real app, would fetch based on username)
  const profileUser = useMemo(() => MOCK_USER, []);

  // Check if viewing own profile
  const isOwnProfile = useMemo(
    () => currentUser?.username === username || !username,
    [currentUser?.username, username]
  );
  
  // Memoize user initials
  const userInitials = useMemo(() => {
    const first = profileUser.first_name?.[0] || '';
    const last = profileUser.last_name?.[0] || '';
    return (first + last).toUpperCase() || 'U';
  }, [profileUser]);

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

  const handleEditProfile = useCallback(() => {
    setIsEditModalOpen(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setIsEditModalOpen(false);
  }, []);

  return (
    <Layout>
      <div style={styles.container}>
        {/* Profile Header */}
        <div style={styles.header}>
          <div style={styles.avatarSection}>
            <div style={styles.avatar}>{userInitials}</div>
            <div style={styles.userInfo}>
              <h1 style={styles.name}>
                {profileUser.first_name} {profileUser.last_name}
              </h1>
              <p style={styles.username}>@{profileUser.username}</p>
              {profileUser.bio && <p style={styles.bio}>{profileUser.bio}</p>}
            </div>
            {isOwnProfile && (
              <button style={styles.button} aria-label="Editar perfil" onClick={handleEditProfile}>
                Editar Perfil
              </button>
            )}
            {!isOwnProfile && (
              <button style={styles.button} aria-label="Seguir usuário">Seguir</button>
            )}
          </div>

          {/* Stats */}
          <div style={styles.stats}>
            <div style={styles.stat}>
              <span style={styles.statNumber}>{posts.length}</span>
              <span style={styles.statLabel}>Posts</span>
            </div>
            <div style={styles.stat}>
              <span style={styles.statNumber}>{profileUser.followers_count}</span>
              <span style={styles.statLabel}>Seguidores</span>
            </div>
            <div style={styles.stat}>
              <span style={styles.statNumber}>{profileUser.following_count}</span>
              <span style={styles.statLabel}>Seguindo</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={styles.tabs} role="tablist" aria-label="Abas do perfil">
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'posts' ? styles.tabActive : {}),
            }}
            onClick={() => setActiveTab('posts')}
            role="tab"
            aria-selected={activeTab === 'posts'}
            aria-label="Ver posts"
          >
            Posts
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'likes' ? styles.tabActive : {}),
            }}
            onClick={() => setActiveTab('likes')}
            role="tab"
            aria-selected={activeTab === 'likes'}
            aria-label="Ver curtidas"
          >
            Curtidas
          </button>
        </div>

        {/* Posts */}
        <div>
          {activeTab === 'posts' && posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={() => handleLike(post.id)}
              onComment={() => handleComment(post.id)}
            />
          ))}
          {activeTab === 'likes' && (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
              Nenhum post curtido ainda
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {currentUser && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          user={currentUser}
        />
      )}
    </Layout>
  );
};
