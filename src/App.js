import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import Footer from './components/UI/Footer/Footer';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import SeriesEpisodes from './pages/SeriesEpisodes/SeriesEpisodes';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/admin' component={Admin} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
