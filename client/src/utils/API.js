import { auth } from "../firebase/firebase.utils";

export default {
  createUser: async userData => {
    return fetch("/api/users/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });
  },
  loginUser: async (email, password) => {
    const user = await auth
      .signInWithEmailAndPassword(email, password)
      .then(response => response.user)
      .catch(error => error);
    if (!user.code) {
      try {
        const authToken = await auth.currentUser.getIdToken();
        const response = await fetch(`/api/users/getUserObject`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
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
  }
};
