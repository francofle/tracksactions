import React from "react";
import "./register.styles.sass";
import { Link } from "react-router-dom";
import API from "../../utils/API";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: ""
    };

    this.passwordField = React.createRef();
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, email, password } = this.state;
    console.log(name, email, password);
    // TODO: change alerts() to be displayed in page instead of alerts
    if (name === "" || !name) {
      return alert("Please enter a name");
    } else if (email === "" || !name) {
      return alert("Please enter an email address");
    } else if (password === "" || !password || password.length < 6) {
      return alert("Please enter a password with at least 6 characters");
    } else {
      API.createUser({name, email, password}).then(user => {
        //TODO: login user upon success
        console.log(user);
      })
    }
  };

  render() {
    return (
      <div className="registerPage">
        <h1 className="title">Register</h1>

        <form action="">
          <div className="form-group">
            <input
              name="name"
              type="text"
              placeholder="Name"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={this.handleInputChange}
              ref={element => (this.passwordField = element)}
              onFocus={() => this.passwordField.value = ''}
            />
          </div>
          <div className="registerButtonDiv">
            <Link to="/signIn" className="signInLink">
              Sign In
            </Link>

            <button
              className="registerBtn"
              type="submit"
              onClick={this.handleSubmit}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
