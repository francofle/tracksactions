const express = require('express');
require('dotenv').config();
const routes = require('./routes');
const admin = require('firebase-admin');
const PORT = process.env.PORT || 3005;
require('./config/connection');

const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS;

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://tracksactions-5c269.firebaseio.com"
});

const app = express();

// TODO: Remove cors before deployment
const cors = require('cors');
app.use(cors());
// TODO: Remove CORS

app.use(express.urlencoded({extended: true}));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));
}
app.use(routes);



app.listen(PORT, () => {
  console.log(`🌎 API Server listening on PORT ${PORT}`);
});