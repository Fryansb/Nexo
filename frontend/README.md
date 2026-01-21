# Frontend - Nexo Social Network

Interface web da rede social Nexo, desenvolvida com React, TypeScript e TailwindCSS.

## 🚀 Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool rápida
- **TailwindCSS** - Framework CSS
- **React Router v7** - Roteamento
- **Zustand** - Gerenciamento de estado
- **React Query** - Cache e sincronização de dados
- **Axios** - Cliente HTTP
- **React Hot Toast** - Notificações

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React reutilizáveis
│   ├── auth/           # Componentes de autenticação
│   ├── layout/         # Layout e navegação
│   ├── posts/          # Componentes de posts
│   ├── profile/        # Componentes de perfil
│   └── ui/             # Componentes UI base
├── pages/              # Páginas da aplicação
├── services/           # Serviços e API
├── stores/             # Zustand stores
├── types/              # Definições TypeScript
├── utils/              # Utilitários e helpers
└── App.tsx             # Componente raiz
```

## 🛠️ Setup e Desenvolvimento

### Pré-requisitos

- Node.js 20.19+ ou 22.12+
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Criar arquivo .env
cp .env.example .env
```

### Executar em desenvolvimento

```bash
# Modo desenvolvimento
npm run dev
```

Acesse: http://localhost:5173

### Build para produção

```bash
npm run build
npm run preview  # Preview do build
```

## 🔐 Autenticação

Sistema de autenticação com JWT (simulado em modo mock):

- Login/Registro
- Proteção de rotas
- Persistência de sessão
- Refresh token automático

## 📝 Rotas

| Rota | Descrição | Protegida |
|------|-----------|-----------|
| `/login` | Página de login | Não |
| `/register` | Cadastro de usuário | Não |
| `/` | Feed principal | Sim |
| `/profile` | Perfil do usuário | Sim |
| `/user/:id` | Perfil de outro usuário | Sim |

## 🧪 Modo Mock (Simulação)

Atualmente a aplicação roda em modo mock (sem backend):
- Dados armazenados em memória
- Usuários criados temporariamente
- Ideal para desenvolvimento do frontend

Para conectar ao backend real, edite `src/services/authService.ts`.

## 📦 Scripts

```bash
npm run dev        # Desenvolvimento
npm run build      # Build produção
npm run preview    # Preview do build
```

## 🎯 Status

✅ Estrutura base  
✅ Autenticação (mock)  
✅ Componentes UI  
✅ Rotas protegidas  
🚧 Feed de posts  
🚧 Perfil completo  
🚧 Comentários  
🚧 Upload de imagens  

---

**Versão:** 0.1.0 - Início do projeto
