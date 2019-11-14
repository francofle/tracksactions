import React from "react";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
      email: ""
    };
  }

  handleInputChange = event => {
    const {value, name} = event.target;
    this.setState({
      [name]:value
    }, () => console.log(this.state));
  };

  onSignIn = () => {
    alert(`${this.state.name}\n${this.state.email}\n${this.state.password}`);
  };

  render() {
    return (
      <div className="App container-fluid">
        <h1>Sign In</h1>
        <form>
          <div className="form-group">
            <input
              type="text"
              name='name'
              placeholder="Name"
              style={{ width: "300px" }}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              name="email"
              type="email"
              placeholder="Email"
              style={{ width: "300px" }}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              name="password"
              type="password"
              placeholder="password"
              style={{ width: "300px" }}
              onChange={this.handleInputChange}
            />
          </div>
          <button type="submit" onClick={this.onSignIn}>
            Sign In
          </button>
        </form>
      </div>
    );
  }
}

export default App;
