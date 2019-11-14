const admin = require("firebase-admin");

const createUser = async (req, res) => {
  const {name, email, password} = req.body;

  const user = await admin.auth().createUser({
    email,
    password,
    displayName: name,
  })

  return res.json(user);
};

module.exports = createUser;