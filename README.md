<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

<hr />

## **Getting started**

First you must to clone the repository using:

```bash
$ git clone 'https://github.com/caiquetorres/graphql-example-nestjs.git'
```

After that install all the required dependencies with:

```bash
$ npm install -g @nestjs/cli

$ npm install
```

This project uses <strong>husky's commit-msg hook</strong>. For using it run the following commands:

```bash
$ npx husky install

$ npx husky add .husky/commit-msg 'npx --no-install commitlint --edit $1'
```

<hr />

## **Running the app**

```bash
# development
$ nest start

# watch mode
$ nest start --watch

# production mode
$ nest start --prod
```

<hr />

## **Docker**

The application uses Docker for running some examples of databases.

> Obs: Using the ".env.{database}.example" files you can copy the configuration found in those and put it in the ".env" file.

For using Postgres

```bash
$ sudo docker-compose up -d posgres
```

For using MySQL

```bash
$ sudo docker-compose up -d mysql
```

<hr />

## **Migrations**

For creating a new migration run the command:

```bash
$ npm run typeorm:migrate MIGRATION_NAME
```

And for executing all the migrations run:

```bash
$ npm run typeorm:run
```

<hr />

## **Structure**

Always, when creating a new entity, create a folder in 'src/modules' with the entity name (Ex: 'src/modules/product' ).
Inside the folder, it must have the following structure:

- `product`
  - `dtos` (All the dtos related with products)
    - `create-product.input.ts`
    - `update-product.input.ts`
    - `query-product.args.ts`
  - `entities` (All the entities related with products)
    - `product.entity.ts`
  - `resolvers` (All the resolvers related with products)
    - `product-relations.resolver.ts`
    - `product.resolver.ts`
  - `services` (All the services related with products)
    - `product-relations.service.ts`
    - `product.service.ts`
  - `product.module.ts`

<hr>

## **Sentry**

The application is also integrated with <a href="https://sentry.io/">Sentry</a> this way it allows tracking exceptions and storing them.

<hr>

## **License**

Paperbook API is [MIT licensed](LICENSE).
