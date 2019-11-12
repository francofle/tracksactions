const express = require('express');
const PORT = process.env.PORT || 3005;
const routes = require('./routes');

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