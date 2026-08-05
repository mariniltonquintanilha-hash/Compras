![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

# Compras — Lista de Compras Pro

> Aplicação web para gerenciar listas de compras, desenvolvida com **React + Vite + TypeScript**.

## 📌 Sobre o Projeto

Aplicação simples e eficiente para organizar sua lista de compras: adicione itens com nome, preço e quantidade, acompanhe o resumo financeiro e exporte os dados quando quiser.

## ✨ Funcionalidades

- ➕ Adicionar itens com nome, preço e quantidade
- ✅ Marcar itens como comprados/pendentes
- 🗑️ Remover itens ou limpar a lista
- 💾 Auto-salvamento no armazenamento local do navegador
- 📤 Salvar/carregar lista em **JSON**
- 📊 Resumo financeiro (total, gasto e pendente)
- ⌨️ Atalhos de teclado (`Ctrl+S` salva, `Delete` remove o selecionado)
- 📱 Interface limpa e responsiva

## 🚀 Como Executar

```bash
# instalar dependências
npm install

# ambiente de desenvolvimento
npm run dev

# build de produção
npm run build
```

## 📁 Estrutura do Projeto

```
├── App.tsx                    → Componente principal
├── components/
│   ├── AddItemForm.tsx        → Formulário de novos itens
│   ├── ShoppingTable.tsx      → Tabela de itens
│   └── Summary.tsx            → Resumo financeiro
├── utils/formatters.ts        → Formatação de valores
├── types.ts                   → Tipos TypeScript
└── vite.config.ts             → Configuração do Vite
```

## 📄 Licença

Projeto desenvolvido para fins de portfólio.
