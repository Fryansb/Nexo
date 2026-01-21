import type { User } from '../types/index';

/** Tipo para posts fictícios (formato interno de armazenamento) */
type DummyPost = {
  id: number;
  author_id: number;
  content: string;
  created_at: string;
  likes_count: number;
  comments_count: number;
  is_liked: boolean;
};

// Usuários fictícios para facilitar desenvolvimento e testes
const dummyUsers: (User & { password: string })[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@nexo.com',
    first_name: 'Admin',
    last_name: 'Sistema',
    bio: '👑 Administrador do sistema. Gerenciando a comunidade Nexo!',
    profile_picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    followers_count: 1250,
    following_count: 85,
    created_at: new Date('2024-01-01').toISOString(),
    is_following: false,
    password: 'Admin123'
  },
  {
    id: 2,
    username: 'maria_santos',
    email: 'maria@email.com',
    first_name: 'Maria',
    last_name: 'Santos',
    bio: '🎨 Designer apaixonada por UX/UI. Criando experiências incríveis!',
    profile_picture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    followers_count: 892,
    following_count: 234,
    created_at: new Date('2024-02-15').toISOString(),
    is_following: true,
    password: '123456'
  },
  {
    id: 3,
    username: 'joao_dev',
    email: 'joao@email.com',
    first_name: 'João',
    last_name: 'Developer',
    bio: '💻 Full Stack Developer | React & Node.js enthusiast | Coffee lover ☕',
    profile_picture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    followers_count: 567,
    following_count: 189,
    created_at: new Date('2024-03-10').toISOString(),
    is_following: false,
    password: '123456'
  },
  {
    id: 4,
    username: 'ana_travel',
    email: 'ana@email.com',
    first_name: 'Ana',
    last_name: 'Viajante',
    bio: '✈️ Explorando o mundo uma cidade por vez. Travel blogger & photographer 📸',
    profile_picture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    followers_count: 1450,
    following_count: 356,
    created_at: new Date('2024-01-20').toISOString(),
    is_following: true,
    password: '123456'
  },
  {
    id: 5,
    username: 'carlos_chef',
    email: 'carlos@email.com',
    first_name: 'Carlos',
    last_name: 'Gourmet',
    bio: '👨‍🍳 Chef profissional | Compartilhando receitas e dicas culinárias 🍽️',
    profile_picture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    followers_count: 723,
    following_count: 145,
    created_at: new Date('2024-04-05').toISOString(),
    is_following: false,
    password: '123456'
  },
  {
    id: 6,
    username: 'luisa_fit',
    email: 'luisa@email.com',
    first_name: 'Luísa',
    last_name: 'Fitness',
    bio: '💪 Personal Trainer | Vida saudável & bem-estar | Vamos treinar juntos! 🏋️‍♀️',
    profile_picture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    followers_count: 2180,
    following_count: 567,
    created_at: new Date('2024-02-28').toISOString(),
    is_following: true,
    password: '123456'
  }
];

// Posts fictícios para cada usuário
const dummyPosts: DummyPost[] = [
  {
    id: 1,
    author_id: 1,
    content: 'Bem-vindos ao Nexo! 🚀 Nossa plataforma está crescendo cada dia mais. Obrigado por fazerem parte desta comunidade incrível!',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes_count: 45,
    comments_count: 8,
    is_liked: false
  },
  {
    id: 2,
    author_id: 2,
    content: 'Acabei de finalizar um novo projeto de UI/UX! 🎨 O processo criativo é sempre desafiador, mas o resultado vale cada pixel ajustado. #Design #UX',
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    likes_count: 23,
    comments_count: 5,
    is_liked: true
  },
  {
    id: 3,
    author_id: 3,
    content: 'Quem mais está animado com as novidades do React 19? 💻 As Server Actions vão revolucionar como desenvolvemos! #React #WebDev',
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    likes_count: 67,
    comments_count: 12,
    is_liked: true
  },
  {
    id: 4,
    author_id: 4,
    content: 'Paris nunca deixa de me surpreender! ✈️ Cada rua conta uma história, cada café tem sua magia. Já sabem qual será meu próximo destino? 🗼 #Travel #Paris',
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    likes_count: 89,
    comments_count: 15,
    is_liked: false
  },
  {
    id: 5,
    author_id: 5,
    content: 'Receita do dia: Risotto de cogumelos selvagens! 🍄 O segredo está no ponto do arroz e na qualidade dos ingredientes. Quem quer a receita completa?',
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    likes_count: 34,
    comments_count: 18,
    is_liked: true
  },
  {
    id: 6,
    author_id: 6,
    content: 'Treino de hoje: ✅ HIIT 30min, ✅ Força para membros superiores, ✅ Alongamento. Lembrem-se: consistência é a chave! 💪 #Fitness #Motivation',
    created_at: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
    likes_count: 156,
    comments_count: 22,
    is_liked: true
  },
  {
    id: 7,
    author_id: 1,
    content: 'Implementamos uma nova funcionalidade de edição de perfil! 🔧 Agora vocês podem personalizar ainda mais seus perfis. Feedback é sempre bem-vindo!',
    created_at: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    likes_count: 78,
    comments_count: 6,
    is_liked: false
  }
];

// Função para popular dados fictícios no localStorage
export const populateDummyData = () => {
  localStorage.setItem('nexo-dummy-users', JSON.stringify(dummyUsers));
  localStorage.setItem('nexo-dummy-posts', JSON.stringify(dummyPosts));
  
  console.log('✅ Dados fictícios carregados com sucesso!');
  console.log('📝 Usuários disponíveis para teste:');
  dummyUsers.forEach(user => {
    console.log(`   👤 ${user.username} (${user.password})`);
  });
};

// Função para obter usuários fictícios
export const getDummyUsers = (): (User & { password: string })[] => {
  const stored = localStorage.getItem('nexo-dummy-users');
  return stored ? JSON.parse(stored) : dummyUsers;
};

// Função para obter posts fictícios
export const getDummyPosts = (): DummyPost[] => {
  const stored = localStorage.getItem('nexo-dummy-posts');
  return stored ? JSON.parse(stored) : dummyPosts;
};

// Função para limpar dados fictícios
export const clearDummyData = () => {
  localStorage.removeItem('nexo-dummy-users');
  localStorage.removeItem('nexo-dummy-posts');
  console.log('🗑️ Dados fictícios removidos');
};

// Auto-popular dados na primeira carga (apenas em desenvolvimento)
if (import.meta.env.DEV && !localStorage.getItem('nexo-dummy-users')) {
  populateDummyData();
}