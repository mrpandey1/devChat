import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import {BrowserRouter as Router ,Switch,Route} from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';

const Root=()=>(
    <Router>
        <Switch>
            <Route exact path='/' component={App}>
            </Route>
            <Route path='/login' component={Login}>
            </Route>
            <Route path='/register' component={Register}>
            </Route>
        </Switch>
    </Router>
)

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
