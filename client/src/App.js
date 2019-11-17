import React from "react";
import {Switch, Route} from 'react-router-dom';
import "./App.css";
import SignIn from "./Components/SignIn/signIn.component";
import HomePage from "./Pages/HomePage/homepage.component";
//firebase Auth
import { auth } from "./firebase/firebase.utils";
import Header from "./Components/Header/header.component";


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
    // TODO: Add header and connect to redux.  (13 in redux OneNote)
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path={'/'} component={HomePage}/>
          <Route path={'/signIn'} component={SignIn}/>
        </Switch>
      </div>
    );
  }
}

export default App;
