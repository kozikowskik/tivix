import './App.css';

import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import PrivateRoute from './routers/privateRoute.router.js';

import Login from './components/Login.js';
import Budget from './components/Budget.js';
import AddBudget from './components/AddBudget.js';


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
                    <PrivateRoute authed={isAuthenticated()} path="/budgets/add" component={AddBudget} />
                    <PrivateRoute authed={isAuthenticated()} path="/budgets" component={Budget} />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
