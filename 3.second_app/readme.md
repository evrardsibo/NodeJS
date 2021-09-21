# The App

We'll build a very simple pet management app. With no UI other than the API endpoints we'll design in a RESTfull manner and the data stored remotely through mongoose objects on mlab, a MONGODB BAAS (Backend As A Service).
At multiple steps we'll be making use of postman, our favorite API development environment.
The example folder is the app in it's finished state with commented code.

## Create the neccessary App folders and files:

Your app folder should be structured like this

```
node_first_app
│   index.js
│   readme.md
|   .gitignore
|
└───routes
│   │   petRoutes.js
│
└───models
    │   Pet.js

```

## Initialize NPM and install node_modules

Also for this app our Node dependancies will be managed with use of NPM. To initiate NPM onto our project there is a simple command which is, from the root of your project, `npm init`.
You will notice that the terminal will ask for information about the kind of app, ignore that, press return for all of them (about 10 times) and remember to add `node_modules` to the `.gitignore`!
To install the express and body-parser modules run `npm i --save express body-parser`

Now commit- and push your new project github.

## Express

index.js

```JS
const express     = require("express");
const bodyParser  = require("body-parser");

const app = express();

app.use(bodyParser.json());

require("./models/Pet")(app);
require("./routes/petRoutes")(app);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running`);
});
```

If you remember how to run the app in its setup you may guess `node index.js` like the previous app, which is correct. Though, our express app won't be satisfied requiring empty files and will throw an error.
To fix this, we have to do something with `Pet.js` and `petRoutes.js`.
We're going to install mongoose and a mongoDB connection to mlab.
After completing the setup of no-sql we'll create our Schema and Object interfaces.

## Mongoose

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.

![mongoose](https://cdn-images-1.medium.com/max/2000/0*b5piDNW1dqlkJWKe.)

MongoDB is a schema-less NoSQL document database. It means you can store JSON documents in it, and the structure of these documents can vary as it is not enforced like SQL databases. This is one of the advantages of using NoSQL as it speeds up application development and reduces the complexity of deployments.

### Object Model Interface

Mongoose's utility, with this app, is to be the interface for MongoDB.
Next we're going to create blueprints of data that the remote database allows, also known as a Mongoose schema.
A Mongoose schema defines the structure of the document, default values, validators, etc.,

Mongoose blueprint

```JS
  let mongoose = require('mongoose')
  let ExampleSchema = new mongoose.Schema({
    fieldName: Type,
    fieldName: Type,
    fieldName: Type
  })
  module.exports = mongoose.model('ExampleSchema', ExampleSchema)
```

The following Schema Types are permitted:

* Array
* Boolean
* Buffer
* Date
* Mixed (A generic / flexible data type)
* Number
* ObjectId
* String

### Create Pet Model

Inside of `Pet.js` within the models folder add the following code:

```JS
  let mongoose = require('mongoose')
  let EmailSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    species: String,
    primaryColor: String
  })
  module.exports = mongoose.model('EmailSchema', EmailSchema)
```

### An example of how stored data differs in Mongo(no-sql) vs. SQL Database:

![nosqlvssql](https://image.ibb.co/mWKZS9/sqlvsnosql.png)

### Terminologies

#### Collections

`Collections` in Mongo are equivalent to tables in relational databases. They can hold multiple JSON documents.

#### Documents

`Documents` are equivalent to records or rows of data in SQL. While a SQL row can reference data in other tables, Mongo documents usually combine that in a document.

#### Fields

`Fields` or attributes are similar to columns in a SQL table.

#### Schema

While Mongo is schema-less, SQL defines a schema via the table definition. A Mongoose `schema` is a document data structure (or shape of the document) that is enforced via the application layer.

#### Models

`Models` are higher-order constructors that take a schema and create an instance of a document equivalent to records in a relational database.

install mongoose on your project by running `npm i --save mongoose`

## Mongo

### Getting started

* Step 1 : [Create a user on Mongo](https://www.mongodb.com/) choose AWS as the cloud provider and the free plan. Follow the steps until you made the order for the free database.
* Step 2 : Go to [Mongo DB](https://docs.mongodb.com/manual/tutorial/)

* Step 3 : Create an admin user for your database. 

### Connect your app to the remote Database

index.js

* add `const mongoose = require("mongoose")` at the top of the file.
* after the models- and routes import, use mongoose to add the link which is to connect your user credentials to the database.

### You have learned:

  * Construct a mongoose schema
  * Environment variables to secure sensitive credentials
  * Mongoose Object modeling for MongoDB
  * Read/Write data on a remote database (as json, no-sql)
  * Mongoose validation
  * Mongoose pre-post document save hooks use-cases
  * Seed fake data

