# 🛒 Lista de Compras Pro

Uma aplicação web simples e eficiente para gerenciar sua lista de compras, desenvolvida com React, Vite e TypeScript. Organize seus itens, acompanhe os preços e tenha um resumo financeiro do que foi comprado e do que ainda está pendente.

## ✨ Recursos

*   **Adicionar Itens:** Adicione novos itens à sua lista com nome, preço e quantidade.
*   **Marcar como Comprado:** Alterne facilmente o status de um item entre "comprado" e "pendente".
*   **Remover Itens:** Exclua itens individualmente da sua lista.
*   **Limpar Lista:** Opção para remover todos os itens da lista de uma vez.
*   **Auto-salvamento:** Suas alterações são salvas automaticamente a cada 5 modificações no armazenamento local do navegador, garantindo que você não perca seus dados.
*   **Salvar/Carregar JSON:** Exporte sua lista de compras para um arquivo JSON ou importe uma lista existente.
*   **Resumo Financeiro:** Visualize o valor total da lista, o quanto já foi gasto em itens comprados e o valor pendente.
*   **Atalhos de Teclado:**
    *   `Ctrl + S` (ou `Cmd + S` no macOS): Salva a lista em um arquivo JSON.
    *   `Delete`: Remove o item selecionado na tabela.
*   **Interface Intuitiva:** Design limpo e responsivo para uma experiência de usuário agradável.

## 🚀 Tecnologias Utilizadas

*   **React:** Biblioteca JavaScript para construção de interfaces de usuário.
*   **Vite:** Ferramenta de build frontend que oferece uma experiência de desenvolvimento extremamente rápida.
*   **TypeScript:** Superset do JavaScript que adiciona tipagem estática para maior robustez do código.
*   **Tailwind CSS:** Framework CSS utility-first para estilização rápida e responsiva.

## 🛠️ Instalação e Uso

Para configurar e rodar o projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/lista-de-compras-pro.git
    cd lista-de-compras-pro
    ```
    *(Ajuste o comando `git clone` para o URL correto do seu repositório)*

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    # ou
    yarn dev
    ```
    O aplicativo estará disponível em `http://localhost:5173` (ou outra porta disponível).

4.  **Para construir para produção:**
    ```bash
    npm run build
    # ou
    yarn build
    ```
    Os arquivos de produção serão gerados na pasta `dist/`.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

Este projeto está licenciado sob a Licença Verkupp. Consulte o arquivo `LICENSE` para mais detalhes.