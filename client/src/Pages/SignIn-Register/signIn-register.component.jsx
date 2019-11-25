import React from 'react';
import './signIn-register.styles.sass'
import {withRouter} from 'react-router-dom';
import SignIn from "../../Components/SignIn/signIn.component";
import Register from "../../Components/Register/register.component";

const SignInRegister = ({match}) => {
  return (
    <div className="signIn-register">
      {match.path === '/signIn' ? <SignIn /> : <Register />}
    </div>
  )
};

export default withRouter(SignInRegister);