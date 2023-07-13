# Projeto de Banco de Dados

## Projeto feito com mysql, python com fastAPI e React

## Para rodar o projeto
### BackEnd

O projeto está dockerizado, ou seja, necessita-se do Docker para rodar.

Com o docker instalado, para subir o banco de dados e o backend, basta executar:
(Talvez seja necessário baixar o mysql no coker primeiro)
```
docker pull mysql
```
```
docker-compose up
```

Ao executar esse comandos os arquivos SQL em mysql/database serão executados para criar o DB e popular com dados básicos
No navegador a documentação da API pode ser acessada em localhost:8000/docs

### FrontEnd
Para o frontend é necessário instalar o node, para ter certeza, na versão 18.12.1
Após a instalação do node, executar:
```
cd frontend/
```
Isso irá entrar na pasta correta e então:
```
npm install
```
Assim que ele terminar de baixar todas as dependências, executar:
```
npm start
```
Provavelmente vai demorar um pouco para carregar

O site abrirá em localhost:3000


