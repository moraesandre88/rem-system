Link for english version: [README-en](https://github.com/moraesandre88/rem-system/blob/main/README_en.md)

# REM-System

Olá! Seja bem-vindo. Essa é uma aplicação para um sistema de gerenciamento imobiliário utilizando React.js. Ela faz parte do projeto REM junto ao [REM-Server](https://github.com/moraesandre88/rem-server) e o REM-Site, todos em desenvolvimento.

## Configurações iniciais

Uma vez que esteja com o Rem-System na sua máquina, algumas configurações terão de ser feitas para que o sistema e alguns de seus serviços operem de forma correta. As etapas estão detalhadas na listagem logo abaixo.

### 1. Npm

Antes de mais nada, vale lembrar de instalar as dependências necessárias para que o projeto funcione. No seu terminal, navegue até a pasta do projeto `rem-system` e execute o comando: `npm i`. Uma vez que tudo esteja instalado, pode avançar para as demais etapas.

### 2. REM-Server

Como mencionado acima, esse projeto faz parte de um sistema que utiliza um servidor próprio, o [REM-Server](https://github.com/moraesandre88/rem-server). Clique no link e siga as instruções para configurar o servidor localmente.

### 3. Cloudinary

Para a hospedagem das fotos, foi utilizado o [Cloudinary](https://cloudinary.com/). As instruções sobre como criar sua conta e configurar o ambiente (no [REM-Server](https://github.com/moraesandre88/rem-server)) estão no README no link. Uma vez criada a conta, você precisará criar um arquivo `.env` na raiz do projeto e nele, criar uma variável chamada `REACT_APP_CLOUDINARY_CLOUD_NAME`. Atribua a essa variável sua `cloud_name` oriunda do Cloudinary. Uma vez criada, será necessário reiniciar o projeto para que a mesma seja reconhecida. Feito isso, todas as configurações necessárias estão prontas.

## Iniciando o sistema

Após a configuração inicial do sistema e a inicialização do [REM-Server](https://github.com/moraesandre88/rem-server) , abra seu terminal, vá para `rem-system` e execute o comando `npm start`. Pronto, seu sistema já está rodando e pronto para ser usado. 

## Observações

Seguindo todas as etapas até aqui, será necessário criar o primeiro usuário com sua senha. Esse terá todas as permissões necessárias para acessar todos os recursos do sistema. Os demais terão acessos mais restritos. Lembrando que esse é um projeto em desenvolvimento e que ainda há operações a serem criadas para o mesmo.