<p align="center">
  <a href="https://nodejs.org/en" target="blank"><img src="https://logos-download.com/wp-content/uploads/2016/09/Node_logo_NodeJS.png" width="200" alt="Node Logo" /></a>
</p>

## OBJETIVOS


1. Comprender el funcionamiento del protocolo HTTP (sus verbos y estados).
2. Comprender el funcionamiento de aplicaciones stateless, mecanismos asíncronos y
funcionamiento REST.
3. Diseñar e implementar un proyecto de software con requerimientos específicos.

## Instalación

```bash
$ npm install
$ pnpm install
$ yarn install
```
## Objetivo

- [x] Autenticación mediante Google Oauth2
- [x] Jason web Token
- [x] Busqueda mediante ID
- [x] Busqueda general
- [x] Crear reservas
- [x] Consultar reservas
- [x] Consultar agenda


## Ejecutando la app

```bash
# watch mode
$ npm run dev
$ pnpm run dev

# development
$ npm run start
$ pnpm run start

```
## Endpoints
Para poder testear se puede utilizar el programa Postman con los siguientes endpoints

```bash
#Get
http://localhost:3000/v1/rooms/
#Get
http://localhost:3000/v1/rooms/<ID>
#Put
http://localhost:3000/v1/rooms/<ID>
#Delete
http://localhost:3000/v1/rooms/<ID>

#Get
http://localhost:3000/v1/user/
#Get
http://localhost:3000/v1/user/<ID>
#Put
http://localhost:3000/v1/user/<ID>
#Delete
http://localhost:3000/v1/user/<ID>

#Get
http://localhost:3000/v1/reserve/
#POST
http://localhost:3000/v1/reserve/

{
  "date_req": "2023-02-21",
  "time_start": "16:00:00",
  "time_end": "23:00:00",
  "uuid_room": "b1a6d1e6-d24b-4fb1-91da-7deabf80ceed",
  "token_users": "112194271299726334727"
}

```
Tambien se puede utilizar el editor VS Code con la extensión [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client), de este modo puede utilizar el archivo:

- api.http

Que se encuentra en la raíz del proyecto con los endpoints listos.

## Autores

- Nicolas Jara Carvajal 
- Tomas Lillo
- Gustavo Oyarce
