import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import PageNotFound from './pages/PageNotFound';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Desalination from './pages/Desalination';
import './index.css';

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" component={Desalination} />
          <Route path="/desalination" component={Desalination} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
