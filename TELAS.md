# 📱 Telas e Funcionalidades - SocialNet

## 🎯 Total: 8-10 telas principais

---

## 1️⃣ **Tela de Login** 🔐
**Rota:** `/login`

**Elementos:**
- Logo da aplicação
- Campo: Email
- Campo: Senha
- Checkbox: "Lembrar-me"
- Botão: "Entrar"
- Link: "Esqueceu a senha?"
- Link: "Criar conta" → vai para Registro

**Funcionalidade:**
- Fazer login com email/senha
- Redirecionar para Feed após login
- Mensagens de erro se credenciais inválidas

---

## 2️⃣ **Tela de Registro** ✍️
**Rota:** `/register`

**Elementos:**
- Campo: Nome completo
- Campo: Username (único)
- Campo: Email
- Campo: Senha
- Campo: Confirmar senha
- Botão: "Criar conta"
- Link: "Já tem conta? Faça login"

**Funcionalidade:**
- Criar nova conta
- Validação de campos
- Verificar username/email únicos
- Redirecionar para Login após registro

---

## 3️⃣ **Feed / Home** 🏠
**Rota:** `/feed` ou `/`

**Header:**
- Logo
- Barra de busca
- Ícone: Notificações (opcional)
- Ícone: Perfil + dropdown menu

**Conteúdo Principal:**
- **Box "Criar Post"**
  - Avatar do usuário
  - Campo: "No que você está pensando?"
  - Botão: Upload de imagem
  - Botão: "Publicar"

- **Lista de Posts** (dos usuários que você segue)
  - Avatar + nome do autor
  - Tempo do post (ex: "há 2 horas")
  - Texto do post
  - Imagem (se tiver)
  - Botões: ❤️ Curtir (contador)
  - Botões: 💬 Comentar (contador)
  - Seção de comentários (expandível)

**Sidebar (opcional):**
- "Sugestões para seguir"
- Lista de usuários populares

**Funcionalidade:**
- Criar novo post
- Curtir/descurtir posts
- Comentar em posts
- Ver comentários
- Scroll infinito (carregar mais posts)

---

## 4️⃣ **Perfil do Usuário** 👤
**Rota:** `/profile/:username`

**Header do Perfil:**
- Foto de capa (opcional)
- Foto de perfil
- Nome do usuário
- @username
- Bio/descrição
- **Estatísticas:**
  - X Posts
  - X Seguidores
  - X Seguindo
- **Botão:** "Editar Perfil" (se for seu perfil)
- **Botão:** "Seguir" / "Deixar de seguir" (se for perfil de outro)

**Tabs/Abas:**
- **Posts:** Todos os posts do usuário
- **Curtidas:** Posts que o usuário curtiu (opcional)

**Funcionalidade:**
- Ver posts do usuário
- Seguir/deixar de seguir
- Ver seguidores/seguindo

---

## 5️⃣ **Editar Perfil** ✏️
**Rota:** `/profile/edit`

**Elementos:**
- Upload foto de perfil
- Upload foto de capa (opcional)
- Campo: Nome completo
- Campo: Username
- Campo: Bio/descrição
- Campo: Email
- Campo: Senha atual (para confirmar)
- Campo: Nova senha (opcional)
- Campo: Confirmar nova senha
- Botão: "Salvar alterações"
- Botão: "Cancelar"

**Funcionalidade:**
- Alterar foto de perfil
- Alterar nome/username
- Alterar bio
- Alterar senha
- Validações

---

## 6️⃣ **Lista de Seguidores** 👥
**Rota:** `/profile/:username/followers`

**Elementos:**
- Título: "Seguidores de @username"
- Lista de usuários:
  - Avatar
  - Nome
  - @username
  - Botão: "Seguir" / "Seguindo"
- Barra de busca (filtrar seguidores)

**Funcionalidade:**
- Ver todos os seguidores
- Seguir usuários da lista
- Voltar para perfil

---

## 7️⃣ **Lista de Seguindo** 👥
**Rota:** `/profile/:username/following`

**Elementos:**
- Título: "Seguindo por @username"
- Lista de usuários:
  - Avatar
  - Nome
  - @username
  - Botão: "Seguir" / "Seguindo"
- Barra de busca (filtrar)

**Funcionalidade:**
- Ver todos que o usuário segue
- Deixar de seguir
- Voltar para perfil

---

## 8️⃣ **Post Individual** 📝
**Rota:** `/post/:id`

**Elementos:**
- Post completo (igual ao feed)
- **Seção de Comentários:**
  - Lista completa de comentários
  - Avatar + nome de quem comentou
  - Texto do comentário
  - Tempo do comentário
  - Botão: Curtir comentário (opcional)
  - Botão: Responder (opcional)
- Box: "Adicionar comentário"
  - Campo de texto
  - Botão: "Comentar"

**Funcionalidade:**
- Ver post específico
- Ver todos os comentários
- Adicionar comentário
- Curtir/descurtir

---

## 9️⃣ **Busca / Explorar** 🔍
**Rota:** `/explore` ou `/search`

**Elementos:**
- Barra de busca principal
- **Resultados:**
  - Aba: Usuários
  - Aba: Posts
- Lista de resultados

**Funcionalidade:**
- Buscar usuários por nome/username
- Buscar posts por conteúdo
- Seguir usuários dos resultados

---

## 🔟 **Notificações** (Opcional) 🔔
**Rota:** `/notifications`

**Elementos:**
- Lista de notificações:
  - "@fulano curtiu seu post"
  - "@ciclano começou a seguir você"
  - "@beltrano comentou no seu post"
- Ícone de lida/não lida
- Link para o post/perfil relacionado

**Funcionalidade:**
- Ver notificações
- Marcar como lida
- Clicar para ir ao post/perfil

---

## 📊 Resumo de Funcionalidades por Tela

| Tela | Criar | Ler | Atualizar | Deletar |
|------|-------|-----|-----------|---------|
| Login | - | - | - | - |
| Registro | ✅ Conta | - | - | - |
| Feed | ✅ Post | ✅ Posts | - | - |
| Perfil | - | ✅ Info | - | - |
| Editar Perfil | - | - | ✅ Info | - |
| Post | ✅ Comentário | ✅ Detalhes | - | - |
| Seguidores | - | ✅ Lista | ✅ Seguir | ✅ Deixar |
| Seguindo | - | ✅ Lista | ✅ Seguir | ✅ Deixar |
| Busca | - | ✅ Resultados | - | - |

---

## 🎨 Componentes Reutilizáveis Necessários

1. **PostCard** - Card de post (usado no feed, perfil, post individual)
2. **CommentItem** - Item de comentário
3. **UserCard** - Card de usuário (busca, sugestões, seguidores)
4. **Header/Navbar** - Header com menu
5. **Avatar** - Foto de perfil
6. **FollowButton** - Botão seguir/seguindo
7. **LikeButton** - Botão de curtir
8. **Modal** - Para confirmações
9. **ImageUpload** - Upload de imagens
10. **LoadingSpinner** - Loading state

---

## 🔄 Fluxo Principal do Usuário

1. **Registro** → Login
2. **Login** → Feed
3. **Feed** → Ver posts → Curtir/Comentar
4. **Feed** → Clicar em usuário → Perfil
5. **Perfil** → Seguir usuário
6. **Feed** → Ver posts de quem segue
7. **Header** → Meu Perfil → Editar Perfil
8. **Perfil** → Seguidores/Seguindo

---

## 🎯 MVP (Mínimo Viável)

**Telas obrigatórias para MVP:**
1. ✅ Login
2. ✅ Registro
3. ✅ Feed
4. ✅ Perfil
5. ✅ Editar Perfil

**Pode fazer depois:**
- Lista de seguidores/seguindo (pode usar modal)
- Busca/Explorar
- Notificações
- Post individual (pode abrir modal no feed)

---

**Total Estimado:**
- **5 telas essenciais** para MVP
- **8-10 telas** para completo
- **10 componentes** reutilizáveis
