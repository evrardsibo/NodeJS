# Getting started

## Installation

First and foremost make sure that Node is installed on your machine.
Follow the instructions on the official node website ([Node](https://nodejs.org/en/download/)), work with the LTS version.

Make sure that the installation has been done correctly by doing in the terminal and check the node/npm version :

````BASH
node -v
npm -v
````

## Hello world

Enough of blabla, we're going to do what any (worthy) developer would do to test a new technology. Display a very nice "Hello world".

Created a file named ``server.js``.
As I said, with node we have to load the modules we need. 
Here, to create a server we will need the "http" module that is already included in node. 

````JavaScript
const http = require('http');
````

Then we create a constant "preserve" which will be an instance of "createServer", a method of the previously loaded "http" object. 

When we call the method http.createServer(), our goal is of course not only to have a server listening to a given port, we also want to perform an action when a request arrives to this server.

The problem is that this happens asynchronously: a request can arrive at any time and our server uses a single process.

(for PHP) When an HTTP request arrives, the web server (usually Apache) creates a new process and the associated PHP script is executed sequentially, i.e. interpreting the code in the order in which it is written.

From a flow control point of view, we are in the middle of our Node.js application when a request arrives on port 3000 and we have to process it. How do we handle this without losing our minds?

It is precisely at this level that the notion of event-driven programming of Node.js / JavaScript comes into play, although we need to learn new concepts to master it well. So let's see how these concepts are applied in the code of our server.

````javascript
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end('<h1>Hello World</h1>');
});
````

Then the server is told to listen to connections on port 3000.

````javascript
const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
````

We created the server, passing a function as a parameter of the creation method. Each time our server receives a request, this function will be called.

We don't know when a request will arrive, but we have now defined a location where we can handle it. This location is our function, whether we defined it beforehand or whether it is anonymous, it doesn't matter.

This concept is called a callback function. We pass a function as a parameter of a method and this function is used to be called back when an event related to the method is triggered.

So this method takes a callback with the parameter "res" as respons.

We define the status that the server sends, here the status 200 assuming that the connection has been successful. We also specify the header for our example html text and the charset. Then we define the message that will be sent to the user.

And now go to the terminal, go to the root of the folder. Start the server with the following command.

````NODE
node server.js 
````

And visit the following url : [http://localhost:3000](http://localhost:3000)

## Go further

Well that's all well and good, but you can't do much with a "Hello world"...

Create an index.html file that we'll put in a folder called ``views``. 

````HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <Title>Hello</title>
</head>
<body>
    <h1>Hello world</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia totam enim laboriosam tempora deleniti blanditiis ea sint velit sequi soluta. Iure totam dolorum enim saepe placeat illum quis perspiciatis impedit.</p>
</body>
</html>
````

Let's go back to server.js. We'll have to use another module, the one that manages external files. It's called fs and is included in node.

````javascript
const fs = require('fs');
````

And now all that remains is to load the index.html file.

````javascript
const http = require('http');
const fs = require('fs');

const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    fs.readFile('./views/index.html', 'utf-8', (err, data) => {
        if (err) throw err
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(data);
    }) 
  
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
````

Okay, now we're going to customize the welcome message. We're going to retrieve the username with the url. For example: ``http://localhost:3000/?name=Woods`` will display "Hello Woods". 

To do this we'll need another native node module, this is the ``url`` module.

so we call the module ... 

````JavaScript
const url = require('url');
````

Then thanks to the "request" parameter we can retrieve what was typed in the url. 

````js 
const query = url.parse(req.url, true).query;
````

We go back to the index.html file and modify the hello world with a "Hello {{name}}".

index.html

````html 
<h1>hello {{name}}</h1>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos natus, quas incidunt accusantium laboriosam temporibus ullam quia excepturi nisi dolorum. Ut quos doloribus neque similique ipsum quas cumque sequi id?</p>
````

in the server.js file, replace ``{{name}}` with the first name of the user.

````js
  data = data.replace("{{name}}", query.name)
````

Which gives in the end : 

````js
const http = require('http');
const fs = require('fs');
const url = require('url');

const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    fs.readFile('./views/index.html', 'utf-8', (err, data) => {

        if (err) throw err
        
        let query = url.parse(req.url, true).query;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        
        data = data.replace("{{name}}", query.name)
        res.end(data);

    }) 
  
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

````

restart the application 

````BASH
app.js node
````

and log in at [http://localhost:3000/?name=Keller](http://localhost:3000/?name=Keller)

Change the first name !

## Challenges

```NPM
npm install -g npx
```

### Check

Open your terminal and type the following command:

````NPM
npx arnaud
````

You're going to tell me, okay, that's fabulous but a little useless...but it's cool and it's a good funny challenge for start nodeJS

### How it works?

If you take a look on the source code the [original concept](https://github.com/bnb/bitandbang) proposed by Tierney Cyren, you'll see there's much complexity for a result as simple.

But you can do the same thing in a much simpler and a little funkier way too !

### npx ? huh ?

Npx is a very useful tool, shipped with node & npm since some versions.
It allows many things, but the most useful feature for us is to be able to run the command npx package-name in a terminal: npx will download the package, put it in cache, then execute the script defined in the main property of the package.json file.
It could not be simpler.

### Your npxcard

The goal, now, is to create your npxcard.
You will create and publish a npm package, named @your-name/card, with, as main property, a simple node script writing stuffs in the console.

> 💣 **HEY !** Using a card generator is *completely* useless and dumb.

This put aside, you have a total freedom for your npx card. Feel free to try some stuffs and create something that suits you: interactive resume, textual mini-game… anything.

There's [lot of packages](https://github.com/sindresorhus/awesome-nodejs#command-line-utilities) to do fun things with the terminal.

> 👉 **NOTE:** no need to publish your script to test it! If the `main` property of your `package.json` is correctly set, you can use the `node .` command to run your project.

## Next ?

### Publish a package

You will code a command line tool that will take a *country name* as *parameter*, like this:

```NODE
myNodeCLITool Belgium
```

The tool will verify that the parameter is a *well-formatted* country name, transform it onto a *two-letters country code*, then perform an HTTP request to the API of the [**nager.date**](https://date.nager.at/) service, like [explained here](https://date.nager.at/Api).  
You will show the results (a list of holidays dates **for the current year**) in a *readable* way in the terminal.

> 👉 **NOTE:** when I say "*for the current year*", it means "*retrieve the current year*", not hardcoding `2020` somewhere in the code. 😅

> ⚠️ **WARNING:** your script will be executed in a specific context. For these kind of command line tools, it's recommanded to add the following line at the top of your *entry point* (here, your `index.js` file):

	#!/usr/bin/env node
	
> 🤓 This line, at the top of an executable file, is called the [**shebang**](https://en.wikipedia.org/wiki/Shebang_(Unix))

As result, you will have a tool to get the holidays of the current year for the given country. Always useful.

#### `npm` packages to use

There's *a lot* of packages on [npm](https://www.npmjs.com), including some doing *exactly* what I ask you to do.  
That's not the point, obviously.

But to save you some trouble losing yourselves in this big pile of possibilities, I recommand you to use the following packages:

- [`country-list`](https://www.npmjs.com/package/country-list), to convert the country name into a country code
- [`axios`](https://www.npmjs.com/package/axios), to perform HTTP requests

##### even further…

For those of you wanting to make your tool *pretty* (and add more challenge), you can dig around the following packages:

- [`ora`](https://www.npmjs.com/package/ora), to show a *spinner* (loading animation) while your request is pending
- [`chalk`](https://www.npmjs.com/package/chalk), to add some colors in your terminal
- [`figlet`](https://www.npmjs.com/package/figlet), add some *style* to your terminal

You can also handle a *second parameter*, asking the year to show the corresponding holidays (if the parameter is missing, stick to the default behavior of looking for the current year).

#### Testing your tool / Prepare for publication

You've been able to test your program all along the development process, but in a perfect world, it will be cool to give it a name, like `holidates`, to be able to execute it like this in a terminal:

	$ holidates user@test.com
	
To do so, you'll need to document about the [`bin` property](https://docs.npmjs.com/files/package.json#bin) of the `package.json` file.  
You can also use the [`npm link`](https://docs.npmjs.com/cli/link) command to test your program locally before publishing it.

#### Publish on npm

Publishing on npm is free, but you need to [create an account](https://www.npmjs.com/signup).

Then, before publishing your package, there's three important steps to follow:

#### Choose a name for your package

You're free to name your package.  
But with *more than 1 million packages* on the npm registry, there's a change the name you choose is already in use.  
*Don't cry!* We can *scope* your package with your npm account's name. In your `package.json` file, prefix the `name` property with `@yournpmlogin/`, like this:

```json
{
  "name": "@user/holidates"
}
```

You will then be able to publish your package without problem, even if the name is already in use.

#### Complete your README.md file

The content of your `README.md` file will be displayed as the presentation of your package on npm. Explain how your package work, how to install and use it. Get inspiration from other well-known packages.

> 🇬🇧 **IMPORTANT:** write your README in **english**!

#### Update the version number

The first version of your package can be `1.0.0`, `0.1.0` or `0.0.1`, it's up to you.

But keep in mind that when you will update your package and publish a new version, you'll need to follow the rules of [semantic versionning (*aka* semver)](https://semver.org).

##### Publish

Finally, to publish on npm, simply use the following command:

```NPM
npm publish --access public
```

Okay, well, we've played enough ;)

![Rambo](../assets/rambo.gif)

[Next First APP](../2.first_app/readme.md)