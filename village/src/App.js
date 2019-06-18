import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Smurfs from './components/Smurfs';
import SmurfForm from './components/SmurfForm';

import axios from 'axios';
import { timingSafeEqual } from 'crypto';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
    };
  }

  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  componentDidMount() {
    axios
      .get('http://localhost:3333/smurfs')
      .then(res => this.setState({ smurfs: res.data }));
  }

  addSmurf = smurf => {
    axios
      .post('http://localhost:3333/smurfs', smurf)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        {/* Navigation */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/smurfs">
              Smurfs Database
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav ml-auto">
                <Link className="nav-item nav-link active" to="/smurfs">
                  All Smurfs <span className="sr-only">(current)</span>
                </Link>
                <Link className="nav-item nav-link active" to="/smurfForm">
                  Add A Smurf
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Route
          exact
          path="/smurfs"
          render={props => <Smurfs {...props} smurfs={this.state.smurfs} />}
        />
        <Route
          exact
          path="/smurfForm"
          render={props => <SmurfForm {...props} addSmurf={this.addSmurf} />}
        />

        {/* <Route path="/smurfs" component={Smurfs} Smurfs smurfs={this.state.smurfs} />
        <Route path="/smurfForm" component={SmurfForm} SmurfForm addSmurf={this.addSmurf} /> */}
      </div>
    );
  }
}

export default App;
