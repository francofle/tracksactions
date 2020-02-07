import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage/homepage.component';
import SignInRegister from './Pages/SignIn-Register/signIn-register.component';
import NewTransactionForm from './Components/NewTransactionForm/newTransactionForm.component';
import ProfilePage from "./Pages/ProfilePage/profilePage.component";

//firebase Auth
import { auth } from './firebase/firebase.utils';
import Header from './Components/Header/header.component';

// Redux:
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userObject => {
      let data = null;
      if (userObject) {
        const token = await auth.currentUser.getIdToken();
        const response = await fetch('/api/users/getUserObject', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ uid: userObject.uid })
        });

        data = await response.json();

        data = {
          ...data,
          token
        };
      }
      setCurrentUser(data);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className='App'>
        <Header />
        <Switch>
          <Route
            exact
            path={'/'}
            render={() => {
              return this.props.currentUser ? <HomePage /> : <Redirect to={'/signIn'} />;
            }}
          />
          <Route
            exact
            path={'/signIn'}
            render={() => {
              return this.props.currentUser ? <Redirect to={'/'} /> : <SignInRegister />;
            }}
          />
          <Route
            exact
            path={'/register'}
            render={() => {
              return this.props.currentUser ? <Redirect to={'/'} /> : <SignInRegister />;
            }}
          />
          <Route
            exact
            path={'/newTransaction'}
            render={() => {
              return this.props.currentUser ? <NewTransactionForm /> : <Redirect to={'/signIn'} />;
            }}
          />
          <Route exact path={'/profile'} component={ProfilePage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: user => dispatch(setCurrentUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
