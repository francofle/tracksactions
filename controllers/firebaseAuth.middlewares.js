const admin = require('firebase-admin');

const getAuthToken = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    req.authToken = req.headers.authorization.split(' ')[1];
  } else {
    req.authToken = null;
  }
  next();
};

const checkIfAuthenticated = (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin.auth().verifyIdToken(authToken);
      req.authId = userInfo.uid;
      return next();
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/id-token-expired' || error.code === 'auth/id-token-revoked') {
        return res.status(401).json({ message: 'token expired' });
      }
      return res.status(401).json({ message: 'You are not authorized to make this request' });
    }
  });
};

module.exports = checkIfAuthenticated;
