import './App.css';

import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import PrivateRoute from './routers/privateRoute.router.js';

import Login from './components/Login.js';
import Budgets from './components/Budgets.js';
import AddBudget from './components/AddBudget.js';
import EditBudget from './components/EditBudget.js';


function isAuthenticated () {
    let jwtAccessToken = localStorage.getItem('jwtAccessToken')
    return jwtAccessToken ? true : false;
}


function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path='/' exact render={(props) => (
                        <Login {...props} successUrl={"/budgets"} />
                    )} />
                    <PrivateRoute exact authed={isAuthenticated()} path="/budgets" component={Budgets} />
                    <PrivateRoute exact authed={isAuthenticated()} path="/budgets/add" component={AddBudget} />
                    <PrivateRoute exact authed={isAuthenticated()} path="/budgets/edit/:id" component={EditBudget} />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
