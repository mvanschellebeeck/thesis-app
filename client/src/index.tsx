import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

import Technologies from './Technologies';
import Australia from './Australia';
import Navigation from './Navigation';
import Home from './Home';
import PageNotFound from './PageNotFound';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default class App extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/technologies" component={Technologies} />
            <Route path="/australia" component={Australia} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
