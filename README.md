# Teste Técnico Solides

Este projeto é um teste técnico para a Solides, implementando um sistema de gerenciamento de documentos com capacidades de filtragem e integração com armazenamento em nuvem.

## 🚀 Tecnologias

- Next.js 14
- Bun
- Prisma
- PostgreSQL (Neon)
- Cloudinary
- TypeScript
- Tailwind CSS

## 📋 Requisitos

- Listagem de documentos com filtros
- Funcionalidade de upload de documentos
- Integração com armazenamento em nuvem
- Design responsivo
- Integração com banco de dados

## 🛠️ Configuração

1.  Clone o repositório
2.  Instale as dependências com `bun`
3.  Configure as variáveis de ambiente
    Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
    ```env
    DATABASE_URL="postgresql://solidesdb_owner:4Elq8wpfJknh@ep-sparkling-resonance-a5hx3o9i.us-east-2.aws.neon.tech/solidesdb?sslmode=require"
    CLOUDINARY_CLOUD_NAME="dwkm7ejso"
    CLOUDINARY_API_KEY="169457217769365"
    CLOUDINARY_API_SECRET="kHEmToRJ6SxGADw_Js22MWi4ewE"
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dwkm7ejso"
    ```
4.  Execute as migrações do banco de dados
    ```bash
    bun prisma generate
    bun prisma db push
    ```
5.  Inicie o servidor de desenvolvimento
    `bash
bun dev
`
    A aplicação estará disponível em `http://localhost:3000`

## 📦 Estrutura do Projeto

```
└── 📁solides
    └── 📁.next
    └── 📁prisma
        └── 📁migrations
            └── 📁20241122135744_yes
                └── migration.sql
            └── 📁20241122140034_init
                └── migration.sql
            └── 📁20241122142302_init
                └── migration.sql
            └── migration_lock.toml
        └── schema.prisma
    └── 📁public
        └── 📁pdfjs
            └── pdf.worker.min.js
        └── icons
    └── 📁src
        └── 📁app
            └── 📁api
                └── 📁documents
                    └── route.ts
                └── 📁server
                    └── route.ts
            └── 📁components
                └── components
            └── 📁fonts
                └── GeistMonoVF.woff
                └── GeistVF.woff
            └── favicon.ico
            └── globals.css
            └── layout.tsx
            └── page.tsx
        └── 📁components
            └── 📁ui
                └── components
            └── components
        └── 📁hooks
            └── use-mobile.tsx
            └── use-tablet.tsx
        └── 📁lib
            └── 📁validations
                └── document.ts
            └── cloudinary.ts
            └── prisma-warmup.ts
            └── prisma.ts
            └── utils.ts
        └── 📁server
            └── contracts.ts
        └── 📁store
            └── use-filter-store.ts
            └── use-mutation-store.ts
        └── middleware.ts
    └── .env
    └── .env.example
    └── .env.production
    └── .eslintrc.json
    └── .gitignore
    └── .npmrc
    └── bun.lockb
    └── components.json
    └── next-env.d.ts
    └── next.config.ts
    └── package.json
    └── postcss.config.mjs
    └── README.md
    └── tailwind.config.ts
    └── tsconfig.json
    └── vercel.json
```

## 🔍 Funcionalidades

- Upload e gerenciamento de documentos
- Filtragem de documentos por diversos critérios
- Integração com armazenamento em nuvem (Cloudinary)
- Design responsivo para todos os tamanhos de tela
- Integração com banco de dados PostgreSQL usando Prisma ORM

## 📝 Observações

- Certifique-se de ter o Bun instalado em seu sistema
  - Para instalar o Bun: `curl -fsSL https://bun.sh/install | bash`
- O projeto utiliza Neon para hospedagem do PostgreSQL
- Cloudinary é usado para armazenamento de documentos
- A aplicação é construída com Next.js 14 e TypeScript
- Recomendado Node.js versão 18.x ou superior
