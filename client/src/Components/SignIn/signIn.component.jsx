import React from "react";
import "./signIn.styles.sass";
import API from '../../utils/API';
import { Link } from "react-router-dom";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();
  }

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    API.loginUser(email, password).then(user => {
      if (user.code) {
        // TODO: Handle error if user.code exists (maybe show a modal)
        this.emailInput.value = '';
        this.passwordInput.value = '';
        alert(user.message);
      }
    });
  };

  render() {
    return (
      <div className="signIn w-100">
        <div className="formContainer">
          <h1 className='title'>Sign In</h1>
          <form className='signInForm' onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                name="email"
                type="email"
                className='signInFormInput'
                placeholder="Email"
                onChange={this.handleInputChange}
                ref={element => this.emailInput = element}
              />
            </div>
            <div className="form-group">
              <input
                name="password"
                type="password"
                className='signInFormInput'
                placeholder="Password"
                onChange={this.handleInputChange}
                ref={element => this.passwordInput = element}
              />
            </div>
            <div className="signInButtonDiv">
              <button
                className='signInBtn'
                type="submit"
                onClick={this.handleSubmit}
              >
                Sign In
              </button>
              <Link to="/register" className='registerLink'>Register</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
