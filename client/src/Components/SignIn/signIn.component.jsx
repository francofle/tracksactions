import React from "react";
import "./signIn.styles.sass";
import { loginUser } from "../../firebase/firebase.utils";
import { Link } from "react-router-dom";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
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
    loginUser(email, password).then(user => {
      if (user.code) {
        // TODO: Handle error if user.code exists (maybe show a modal)
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
              />
            </div>
            <div className="form-group">
              <input
                name="password"
                type="password"
                className='signInFormInput'
                placeholder="Password"
                onChange={this.handleInputChange}
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
