const express = require('express');
const mongodb = require('./db/connect');
const contactRoutes = require('./routes/contacts');

const port = process.env.PORT || 8080
const app = express();

app
  .use(express.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
 
    next();
  })
  app.use('/', require('./routes'));


mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to MongoDB and listening on ${port}`);
    }
});