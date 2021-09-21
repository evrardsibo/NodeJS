const jsonfile = require("jsonfile");
const file_path = "./DB/users.json";

module.exports = app => {

  app.put("/user", (req, res) => {

    let user;
    let username = req.body.username;
    let email    = req.query.email;

    jsonfile.readFile(file_path, function(err, content) {
      for (var i = content.length - 1; i >= 0; i--) {
        if (content[i].email === req.query.email) {

          console.log("updated user " + req.query.email + " has now username : " + username);

          user = content[i];
          user.username = username;

        }
      }

      jsonfile.writeFile(file_path, content, function(err) {
        console.log(err);
      });

    });
    res.send(user);
  });

  app.delete("/users/destroy", (req, res) => {

    let email = req.body.email;

    jsonfile.readFile(file_path, function(err, content) {

      for (var i = content.length - 1; i >= 0; i--) {

        if (content[i].email === email) {
          console.log("removing " + content[i].email + "from DB");
          content.pop(i);
        }

      }

      jsonfile.writeFile(file_path, content, function(err) {
        console.log(err);
      });

      res.sendStatus(200);
    });
  });

  app.get("/users", (req, res) => {
    console.log("fetching all users");

    jsonfile.readFile(file_path, function(err, content) {
      res.send(content);
    });
  });

  app.get("/user", (req, res) => {

    let user;
    let username = req.query.username;

    jsonfile.readFile(file_path, function(err, content) {

      for (var i = content.length - 1; i >= 0; i--) {

        if (content[i].username === username) {
          console.log("user found");
          console.log(content[i]);
          user = content[i];
        }

      }

      res.send(user);
    });
  });

  app.post("/users/new", (req, res) => {

    let { email, username } = req.body;

    jsonfile.readFile(file_path, function(err, content) {

      content.push({ email, username });

      console.log("added " + email + "to DB");

      jsonfile.writeFile(file_path, content, function(err) {
        console.log(err);
      });

      res.sendStatus(200);
    });
  });
};
