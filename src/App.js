import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux'

import Navigation from './components/Navigation/Navigation';
import Footer from './components/UI/Footer/Footer';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import SeriesEpisodes from './pages/SeriesEpisodes/SeriesEpisodes';
import Auth from './components/Auth/Auth';
import Logout from './components/Auth/Logout/Logout'
import './App.css';
import { authCheckState } from './store/actions';

class App extends Component {
  componentDidMount = () => {
    this.props.onTryAutoSignUp();
  }
  render() {
    return (
      <div className="App">
        <Navigation />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/register' component={Auth} />
          <Route path='/admin' component={Admin} />
          <Route path='/logout' component={Logout} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(authCheckState())
  }
}

export default connect(null, mapDispatchToProps)(App);
