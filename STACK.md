# 🏗️ Stack Técnica - SocialNet

## 📋 Visão Geral

Rede social completa com sistema de autenticação, perfis, posts, curtidas, comentários e feed personalizado.

---

## 🔧 Back-end

### Framework e Linguagem
- **Python 3.12+**
- **Django 6.0.1** - Framework web
- **Django REST Framework 3.16** - API REST

### Autenticação
- **djangorestframework-simplejwt** - JWT tokens
- **drf-yasg** - Documentação automática da API (Swagger)

### Banco de Dados
- **PostgreSQL** (Produção)
- **SQLite** (Desenvolvimento)
- **psycopg2-binary** - Driver PostgreSQL

### Processamento de Imagens
- **Pillow** - Upload e processamento de imagens (perfil, posts)

### CORS e Segurança
- **django-cors-headers** - Permitir requisições do front-end
- **python-decouple** - Gerenciamento de variáveis de ambiente

### Testes
- **pytest** - Framework de testes
- **pytest-django** - Integração Django + pytest
- **factory-boy** - Fixtures para testes

### Utilitários
- **django-extensions** - Comandos úteis para desenvolvimento

---

## 🎨 Front-end

### Framework e Linguagem
- **React 19** - Biblioteca UI com hooks otimizados
- **TypeScript** - Tipagem estática rigorosa
- **Vite 7.3.1** - Build tool moderna e rápida

### Roteamento
- **React Router v7** - Navegação entre páginas

### Gerenciamento de Estado
- **Zustand** - Estado global com persistência (auth, user)

### Requisições HTTP
- **Axios** - Cliente HTTP para consumir API

### UI e Estilização
- **CSS-in-JS** - Sistema de estilização 100% inline
- **CSSProperties** - Tipagem TypeScript para estilos
- **react-hot-toast** - Notificações elegantes

### Utilitários
- **date-fns** - Manipulação de datas com i18n

---

## 🚀 DevOps e Deploy

### Controle de Versão
- **Git** - Versionamento
- **GitHub** - Hospedagem do código

### CI/CD
- **GitHub Actions** - Automação de testes e deploy
  - Build e testes automáticos
  - Deploy automático em produção
  - Code quality checks

### Containerização
- **Docker** - Containers para desenvolvimento
- **Docker Compose** - Orquestração local

### Deploy
- **Railway** - Back-end + PostgreSQL (gratuito)
- **Vercel** - Front-end React (gratuito)
- **Cloudinary** - Armazenamento de imagens (gratuito)

### Monitoramento
- **Sentry** - Monitoramento de erros (opcional)

---

## 📦 Gerenciamento de Dependências

### Back-end
- **Poetry** - Gerenciador de dependências Python

### Front-end
- **npm** ou **pnpm** - Gerenciador de pacotes Node.js

---

## 🗂️ Estrutura de Diretórios

```
socialnet/
├── backend/                    # Django API
│   ├── accounts/              # Autenticação e perfis
│   ├── posts/                 # Posts, curtidas, comentários
│   ├── follows/               # Sistema de seguir
│   ├── feed/                  # Feed personalizado
│   ├── media/                 # Upload de arquivos
│   └── config/                # Configurações Django
│
├── frontend/                   # React App
│   ├── src/
│   │   ├── pages/             # Páginas da aplicação
│   │   ├── components/        # Componentes reutilizáveis
│   │   ├── services/          # API calls
│   │   ├── hooks/             # Custom hooks
│   │   ├── store/             # Estado global
│   │   └── utils/             # Utilitários
│   └── public/
│
├── .github/
│   └── workflows/             # GitHub Actions
│
├── docker-compose.yml         # Orquestração local
├── .gitignore
├── STACK.md                   # Este arquivo
└── README.md                  # Documentação principal
```

---

## 🔐 Variáveis de Ambiente

### Back-end (.env)
```
SECRET_KEY=
DEBUG=
DATABASE_URL=
ALLOWED_HOSTS=
CORS_ALLOWED_ORIGINS=
CLOUDINARY_URL=
```

### Front-end (.env)
```
VITE_API_URL=
```

---

## 📊 Requisitos Atendidos

✅ Sistema de Autenticação (registro, login, JWT)
✅ Configuração de Perfil (foto, nome, senha)
✅ Sistema de Seguir (follow/unfollow, lista)
✅ Feed de Notícias (posts dos seguidos)
✅ Interações (curtidas e comentários)
✅ Deploy (Railway + Vercel)
✅ Arquitetura REST
✅ Banco de dados (PostgreSQL)

---

## 🎯 Diferenciais

- ⚡ Performance otimizada (React.memo, useCallback, useMemo)
- 🎨 UI moderna e responsiva (CSS-in-JS)
- 🔒 Segurança (JWT, CORS, validações)
- 📱 Mobile-friendly
- 🧪 Mock system para desenvolvimento
- 🚀 Build otimizado (343KB gzipped)
- 📚 Documentação técnica completa
- 🐳 Dockerizado

---

**Última atualização:** Janeiro 2026 - v0.9.0-beta
