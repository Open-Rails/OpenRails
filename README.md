## Getting Started

Run 'yarn install' to install all dependencies

## Commands

Run 'yarn dev' to run the client + server in watch mode
Run 'yarn build' and then 'yarn start' in order to to first build the client app, and
then start the NestJS server. The NestJS server will serve the client app as a static file.

## Default Ports

React Client app: 3000 (only used when running in dev mode)
NestJS Server: 8081

## .env Variables

Create an optional .env file in this workspace's root folder `/`.

- `REACT_APP_SERVER_URL`: This is used by the react-client app to know where the NestJS server can be reached, such as https://openrails-staging.herokuapp.com. Defaults to http://localhost:3000 if not specified.

- `SERVER_PORT`: This changes the port that the NestJS server binds to. Defaults to 8081 if not specified. Any process.env.PORT value superseeds this value.
