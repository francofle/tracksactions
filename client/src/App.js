import React from "react";
import {Switch, Route} from 'react-router-dom';
import "./App.css";
import SignIn from "./Components/SignIn/signIn.component";
import HomePage from "./Pages/HomePage/homepage.component";
//firebase Auth
import { auth } from "./firebase/firebase.utils";
import Header from "./Components/Header/header.component";

// Redux:
import {connect} from 'react-redux';
import {setCurrentUser} from "./redux/user/user.actions";
import {selectCurrentUser} from "./redux/user/user.selectors";
import {createStructuredSelector} from "reselect";


class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userObject => {
      let data = null;
      if (userObject) {
        const token = await auth.currentUser.getIdToken();
        const response  = await fetch('/api/users/getUserObject', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
          },
          body: JSON.stringify({uid: userObject.uid})
        });

        data = await response.json();

        data = {
          ...data,
          token
        };
      }
      setCurrentUser(data)
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

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

 const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser
 });

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser : user => dispatch(setCurrentUser(user))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
