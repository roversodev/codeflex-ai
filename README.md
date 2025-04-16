<h1 align="center">💪 Assistente Fitness com IA 🤖</h1>

## Destaques:

- 🚀 Stack Tecnológica: Next.js, React, Tailwind & Shadcn UI
- 🎙️ Assistente de Voz com IA (Vapi)
- 🧠 Integração com LLM (Gemini AI)
- 🏋️ Planos de Treino Personalizados
- 🥗 Programas de Dieta Customizados
- 🔒 Autenticação e Autorização (Clerk)
- 💾 Banco de Dados (Convex)
- 🎬 Geração de Programas em Tempo Real
- 💻 Layouts
- 🎭 Componentes Cliente e Servidor

## Funcionalidades

- **Assistente IA Inteligente**: Converse com uma IA que pergunta sobre seus objetivos fitness, condição física e preferências
- **Planos de Treino Personalizados**: Receba rotinas de exercícios personalizadas baseadas no seu nível de condicionamento, lesões e objetivos
- **Recomendações de Dieta**: Receba planos alimentares personalizados considerando suas alergias e preferências alimentares
- **Autenticação de Usuário**: Entre com GitHub, Google ou email/senha
- **Gerenciamento de Programas**: Crie e visualize múltiplos programas fitness com apenas o mais recente ativo
- **Design Responsivo**: Interface bonita que funciona em todos os dispositivos

## Configuração do arquivo .env

```js
# Autenticação Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# URLs de Redirecionamento Clerk
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# IA de Voz Vapi
NEXT_PUBLIC_VAPI_WORKFLOW_ID=
NEXT_PUBLIC_VAPI_API_KEY=

# Banco de Dados Convex
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
```

## Começando

1. Clone o repositório
2. Instale as dependências:

```shell
npm install
```
3. Configure suas variáveis de ambiente como mostrado acima
4. Execute o servidor de desenvolvimento:

```shell
npm run dev
```

5. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## Implantação

Esta aplicação pode ser facilmente implantada na Vercel:

```shell
npm run build
npm run start
```

Ou conecte seu repositório GitHub à Vercel para implantações automáticas.

## Tecnologias Utilizadas

- **Next.js**: Framework React para construção do frontend e rotas da API
- **Tailwind CSS & Shadcn UI**: Para estilização e componentes de UI
- **Clerk**: Autenticação e gerenciamento de usuários
- **Vapi**: Plataforma de agente de voz para IA conversacional
- **Convex**: Banco de dados em tempo real
- **Gemini AI**: Modelo de Linguagem Grande para geração de programas fitness personalizados

## Saiba Mais

Para aprender mais sobre as tecnologias utilizadas neste projeto:

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Vapi Documentation](https://docs.vapi.ai)
- [Convex Documentation](https://docs.convex.dev)
- [Gemini AI Documentation](https://ai.google.dev/gemini-api)
