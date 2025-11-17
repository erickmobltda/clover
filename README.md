# Clover Pub — Static Experience

Recriação estática do site do [Clover Pub](https://cloverpub.com.br/) construída com **React + Vite**. O projeto reúne todas as seções públicas (Home, Eventos, Recrutamento e Cardápio off-canvas) e redireciona ações importantes para o WhatsApp oficial do pub.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build estático

```bash
npm run build
```

Os arquivos prontos estarão em `dist/`.

## Publicação no GitHub Pages

1. Defina o caminho base que o GitHub Pages usará (ex.: `/clover-site/`):

   ```bash
   export VITE_BASE_PATH=/NOME_DO_REPO/
   npm run build
   ```

2. Publique o conteúdo de `dist/` na branch configurada para o Pages (geralmente `gh-pages`).

> Caso o site fique na raiz do domínio (`https://usuario.github.io/`), não é preciso setar `VITE_BASE_PATH`.

## Estrutura principal

- `src/pages` – páginas Home, Eventos e Recrutamento
- `src/components` – Header, Footer, Cardápio off-canvas e botão flutuante do WhatsApp
- `src/data` – textos, imagens remotas e metadados reutilizados
- `src/utils/whatsapp.ts` – helpers para gerar links e abrir conversas

## Scripts úteis

| Script            | Descrição                                    |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Ambiente de desenvolvimento com HMR          |
| `npm run build`   | Build otimizado para deploy estático         |
| `npm run preview` | Pré-visualiza o conteúdo do diretório `dist` |
