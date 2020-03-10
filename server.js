const express = require('express');
require('dotenv').config();
const logger = process.env.NODE_ENV === 'production' ? null : require('morgan');
const routes = require('./routes');
const admin = require('firebase-admin');
const PORT = process.env.PORT || 5000;
const path = require('path');
require('./config/connection');

admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.GOOGLE_APPLICATION_AUTH_TYPE,
    project_id: process.env.GOOGLE_APPLICATION_PROJECT_ID,
    private_key_id: process.env.GOOGLE_APPLICATION_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_APPLICATION_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_APPLICATION_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_APPLICATION_CLIENT_ID,
    auth_uri: process.env.GOOGLE_APPLICATION_AUTH_URI,
    token_uri: process.env.GOOGLE_APPLICATION_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.GOOGLE_APPLICATION_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.GOOGLE_APPLICATION_CLIENT_X509_CERT_URL
  }),
  databaseURL: 'https://tracksactions-5c269.firebaseio.com'
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
} else {
  // TODO: Remove cors before deployment
  const cors = require('cors');
  app.use(cors());
  app.use(logger('dev'));
// TODO: Remove CORS
}

// Send all requests to React App
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
})


app.listen(PORT, () => {
  console.log(`🌎 API Server listening on PORT ${PORT}`);
});
