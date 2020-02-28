import { auth } from '../firebase/firebase.utils';
import firebase from 'firebase';

export default {
  createUser: async userData => {
    return fetch('/api/users/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
  },
  loginUser: async (email, password) => {
    const user = await auth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => auth.signInWithEmailAndPassword(email, password))
      .then(response => response.user)
      .catch(error => error);

    if (!user.code) {
      try {
        const authToken = await auth.currentUser.getIdToken();
        const response = await fetch(`/api/users/getUserObject`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${authToken}`
          },
          body: JSON.stringify({ uid: user.uid })
        });
        return await response.json();
      } catch (error) {
        return error;
      }
    }
    return user;
  },
  createTransaction: (transaction, mongoId, authToken) => {
    return fetch(`/api/transactions/${mongoId}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify(transaction)
    });
  },
  findTransactionById: (transactionId, authToken) => {
    return fetch(`/api/transactions/${transactionId}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${authToken}`
      }
    }).catch(error => error)
  },
  updateTransactionById: (transactionId, authToken, updatedTransaction, mongoId) => {
    return fetch(`/api/transactions/${transactionId}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify({
        ...updatedTransaction,
        mongoId
      })
    }).catch(error => error);
  }
};
