import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

import CoastlineDesalination from './pages/CoastlineDesalination';
import Home from './pages/Home';
import Navigation from './pages/Navigation';
import PageNotFound from './pages/PageNotFound';
import Technologies from './pages/Technologies';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import InlandDeslination from './pages/InlandDesalination';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/technologies" component={Technologies} />
            <Route path="/coastline-desalination" component={CoastlineDesalination} />
            <Route path="/inland-desalination" component={InlandDeslination} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
