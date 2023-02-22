# Sequelize Practice Project

This project consists of a simple Express.js application built around an e-commerce theme to practice concepts of the Sequelize.js object relational mapper (ORM). It uses models, associations, migrations and seeders. The database that was used is PostgreSQL.

## How To Run
Make sure you have Node.js and PostgreSQL installed locally.

1. Clone the repository and navigate to its folder.
```
git clone https://github.com/Pedro-Freddi/sequelize-practice.git
cd sequelize-practice
```
2. Install dependencies.
```
yarn install
```
3. Edit `/EXAMPLE.env` to add database's password (and change username, if you wish). Save is as `.env` after editing.

4. Run this command to create the database, run migrations and seeders. This command is defined in `package.json` and groups different sequelize-cli commands.
```
yarn db:restore
```
5. Run the application.
```
yarn dev
```

6. Endpoints are available in `localhost:8000/api`. Possible routes and methods are:
```
/customers - GET, POST
/customer/:id - GET, PUT, DELETE
/products - GET, POST
/products/:name - GET
/products/:id - PUT, DELETE
/orders - GET, POST
/order/:id - GET, PUT, DELETE
```
