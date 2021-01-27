# Electronic-punch-clock

Projeto criado com o intuito de fazer o controle de ponto eletrônico via cliente web.

Com o crescente numero de vagas com modalidade home office, o sistema poderia ser utilizado para controle dos horários dos funcionários. Onde os mesmo possuem sua dashboard com os horários cadastrados mais recentes e a possibilidade de adicionar novos horários de entrada e saída. A admin dashboard  utilizada para controle dos horários de todos os funcionários em tempo real e a autenticação de todas as rotas será feita com jwt.

Projeto criado com a seguinte stack: Api com MongoDB, Apollo server, NodeJS e graphql; Cliente web criado utilizando react.

Requisitos:

 - Node
 - NPM

Utilização:

 - clone este repositório para um diretório local em sua maquina.
 - adicione uma pasta ao **src** chamada **./config.js** com o link de conexão com seu banco de dados Mongo chamado **MONGODB**, porta a ser utilizada como **PORT** por ex: **localhost:3000**, e uma **SECRET_KEY** para jwt.
 - ao arquivo **apolloProvider.js** localizado em **./register/src/apolloProvider.js**   adicione a **url** onde seu servidor esta rodando.
 - abra um terminal dentro da raiz da pasta e executar um **npm install** ou **npm i** para baixar todos os pacotes utilizados.
 - agora basta executar o comando **npm start** dentro da pasta raiz para a api e outro **npm start** dentro da pasta register para rodar o front.
