import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router ,Switch,Route,withRouter} from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import 'semantic-ui-css/semantic.min.css';
import firebase from './firebase';

import {createStore} from 'redux';
import {Provider,connect} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers';
import {setUser ,clearUser} from './actions'
import Spinner from './Spinner';
const store=createStore(rootReducer,composeWithDevTools());

class Root extends React.Component{

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user=>{
            if(user){
                this.props.setUser(user);
                this.props.history.push('/');
            }else{
                this.props.history.push('/login');
                this.props.clearUser();
            }
        })
    }

    render(){
    return this.props.isLoading?<Spinner/>:(
            <Switch>
                <Route exact path='/' component={App}>
                </Route>
                <Route path='/login' component={Login}>
                </Route>
                <Route path='/register' component={Register}>
                </Route>
            </Switch>
        )};
    }

const mapStateFromProps=state=>({
    isLoading:state.user.isLoading
});

const RootWithAuth=withRouter(connect(mapStateFromProps,{setUser,clearUser})(Root));
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <RootWithAuth/>
        </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
