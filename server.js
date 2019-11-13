const express = require('express');
require('dotenv').config();
const routes = require('./routes');
const admin = require('firebase-admin');
const PORT = process.env.PORT || 3005;
console.log(process.env.VAR);

const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS;

console.log(GOOGLE_APPLICATION_CREDENTIALS);
require('./config/connection');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));
}
app.use(routes);

app.listen(PORT, () => {
  console.log(`🌎 API Server listening on PORT ${PORT}`);
});