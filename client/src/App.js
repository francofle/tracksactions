import React from "react";
import "./App.css";
import axios from 'axios';
import SignIn from "./Components/SignIn/signIn.component";

//firebase Auth
import { auth } from "./firebase/firebase.utils";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userObject => {
      if (!userObject) return;

      const response = await fetch('/api/users/getUserObject', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({uid: userObject.uid})
      });

      const data = await response.json();

      this.setState({
        currentUser: data
      })

    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  setCurrentUser = (userObject) => {

  };

  render() {
    return (
      <div className="App container-fluid">
        <SignIn />
      </div>
    );
  }
}

export default App;
