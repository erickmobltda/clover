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

### Configuração automática (recomendado)

O projeto inclui um workflow do GitHub Actions (`.github/workflows/deploy.yml`) que faz o build e deploy automaticamente.

**Para configurar:**

1. No repositório do GitHub, vá em **Settings** → **Pages**
2. Em **Source**, selecione **GitHub Actions**
3. Faça um push para a branch `main` - o workflow irá fazer o build e deploy automaticamente

O workflow já está configurado com `VITE_BASE_PATH=/clover/`. Se o nome do seu repositório for diferente, edite o arquivo `.github/workflows/deploy.yml` e altere o valor de `VITE_BASE_PATH`.

### Deploy manual

Se preferir fazer o deploy manualmente:

1. Defina o caminho base que o GitHub Pages usará (ex.: `/clover/`):

   ```bash
   export VITE_BASE_PATH=/clover/
   npm run build
   ```

2. Publique o conteúdo de `dist/` na branch configurada para o Pages.

> Caso o site fique na raiz do domínio (`https://usuario.github.io/`), não é preciso setar `VITE_BASE_PATH` ou defina como `/`.

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
