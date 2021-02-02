/*
Gerard Bringard
NodeJS Homework 1
This program listens on port 8080,
and when it receives a request, it
prints out "Hello World" to the page.
 */
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(8080);
