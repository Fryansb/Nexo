# 📱 Telas - Nexo Social Network

## 🔐 Autenticação

### 1. Login (`/login`)
- Campo: Username
- Campo: Password
- Botão: Entrar
- Link: "Não tem conta? Cadastre-se"
- Redirecionamento após login: Feed (`/`)

### 2. Registro (`/register`)
- Campo: Username
- Campo: Email
- Campo: First Name
- Campo: Last Name
- Campo: Password
- Campo: Confirmar Password
- Botão: Cadastrar
- Link: "Já tem conta? Faça login"
- Redirecionamento após registro: Feed (`/`)

---

## 🏠 Telas Principais

### 3. Feed/Home (`/`)
**Layout:**
- Navbar superior com logo e menu
- Sidebar esquerda (opcional): Navegação rápida
- Coluna central: Feed de posts
- Sidebar direita (opcional): Sugestões de pessoas

**Componentes:**
- `CreatePost`: Área para criar novo post
  - Textarea para conteúdo
  - Upload de imagem
  - Botão "Publicar"
  
- `PostCard`: Card de post
  - Avatar e nome do autor
  - Conteúdo do post
  - Imagem (se houver)
  - Data de publicação
  - Botões: Curtir, Comentar
  - Contador de curtidas e comentários
  - Lista de comentários (expansível)

### 4. Perfil do Usuário (`/profile`)
**Seções:**
- Header do perfil
  - Foto de perfil
  - Nome completo
  - Username
  - Bio
  - Contadores: Posts, Seguidores, Seguindo
  - Botão: "Editar Perfil"
  
- Grid/Lista de posts do usuário
  - Posts ordenados por data (mais recente primeiro)

### 5. Editar Perfil (`/profile/edit`)
- Upload de foto de perfil
- Campo: First Name
- Campo: Last Name
- Campo: Bio (textarea)
- Botão: "Salvar Alterações"
- Botão: "Cancelar"

### 6. Perfil de Outro Usuário (`/user/:id`)
**Similar ao perfil próprio, mas com:**
- Botão: "Seguir" / "Deixar de Seguir" (em vez de "Editar Perfil")
- Indicador se você já segue a pessoa
- Posts públicos do usuário

---

## 🔧 Componentes Compartilhados

### Layout
- **Navbar**
  - Logo "Nexo"
  - Link: Feed
  - Avatar do usuário logado
  - Botão: Sair

### Post Components
- **PostCard**: Exibe um post completo
- **CreatePost**: Formulário para criar post
- **CommentList**: Lista de comentários
- **CommentForm**: Formulário para comentar

### Profile Components
- **ProfileHeader**: Cabeçalho com info do usuário
- **FollowButton**: Botão de seguir/deixar de seguir
- **PostGrid**: Grid de posts do perfil

### UI Components
- **Button**: Botão customizável
- **Input**: Campo de input
- **Textarea**: Campo de texto multilinha
- **Card**: Container com sombra e borda
- **Avatar**: Imagem circular de perfil
- **Modal**: Modal para ações

---

## 🎨 Design System

### Cores
- **Primary**: Blue (#3b82f6)
- **Background**: Gray 50 (#f9fafb)
- **Cards**: White (#ffffff)
- **Text**: Gray 900 (#111827)
- **Border**: Gray 200 (#e5e7eb)

### Espaçamento
- Container principal: max-w-7xl
- Padding padrão: p-4
- Gap entre elementos: gap-4

### Tipografia
- Títulos: font-bold
- Corpo: font-normal
- Small: text-sm
