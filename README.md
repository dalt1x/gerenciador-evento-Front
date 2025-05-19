
# Gerenciador de Eventos - Frontend

Este é o frontend do sistema **Gerenciador de Eventos**, desenvolvido com **React**, **TypeScript**, **Tailwind CSS** e **Vite**. Ele consome uma API REST para exibir, criar e gerenciar eventos.

## 🛠️ Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [npm](https://www.npmjs.com/)

## 📁 Estrutura do Projeto

```
gerenciadorDeEventosFrontend/
├── public/                     # Arquivos públicos (index.html)
├── src/                        # Código-fonte principal
│   ├── components/
│   │   ├── eventos/            # Componentes relacionados a eventos (cards e formulários)
│   │   └── layouts/            # Componentes de layout (header, footer)
│   ├── App.tsx                 # Componente principal da aplicação
│   ├── main.tsx                # Ponto de entrada da aplicação
│   └── index.css               # Estilos globais com Tailwind
├── package.json                # Dependências e scripts npm
├── vite.config.ts              # Configuração do Vite
├── tailwind.config.js          # Configuração do Tailwind CSS
└── tsconfig.json               # Configurações do TypeScript
```

## ⚙️ Como Executar o Projeto

### 1. Pré-requisitos

- [Node.js](https://nodejs.org/) (versão recomendada: 18+)
- [npm](https://www.npmjs.com/) (instalado com o Node.js)

### 2. Instalar Dependências

```bash
npm install
```

### 3. Executar o Servidor de Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em: [http://localhost:5173](http://localhost:5173)

## 🔗 Conectando ao Backend

Por padrão, o frontend se comunica com uma API backend via HTTP. Para definir a URL do backend, siga os passos:

1. Crie um arquivo `.env` na raiz do projeto.
2. Adicione a variável com a URL da sua API:

```env
VITE_API_URL=http://localhost:8080
```

> 📝 Substitua `http://localhost:8080` pela URL real do seu backend, se estiver implantado em outro servidor.

3. No código, utilize a variável de ambiente com `import.meta.env.VITE_API_URL` para realizar chamadas à API:

```ts
const response = await fetch(`${import.meta.env.VITE_API_URL}/eventos`);
```

4. Após alterar o `.env`, reinicie o servidor com:

```bash
npm run dev
```

## 📦 Build de Produção

Para gerar a versão otimizada do projeto:

```bash
npm run build
```

## 🧪 Scripts Disponíveis

- `npm run dev`: Inicia o ambiente de desenvolvimento
- `npm run build`: Gera os arquivos otimizados para produção
- `npm run preview`: Visualiza o build localmente