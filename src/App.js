import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux'

import Navigation from './components/Navigation/Navigation';
import Footer from './components/UI/Footer/Footer';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import SeriesDetails from './pages/SeriesDetails/SeriesDetails';
import Auth from './components/Auth/Auth';
import Logout from './components/Auth/Logout/Logout'
import './App.css';
import { authCheckState, getSeries } from './store/actions';

class App extends Component {
  componentDidMount = () => {
    this.props.onTryAutoSignUp();
    this.props.onGetSeries();
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
          <Route path='/details' component={SeriesDetails} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetSeries: () => dispatch(getSeries()),
    onTryAutoSignUp: () => dispatch(authCheckState()),
  }
}

export default connect(null, mapDispatchToProps)(App);
