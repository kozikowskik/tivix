import "./App.css";

import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import PrivateRoute from "./routers/privateRoute.router.js";

import Login from "./components/Login.js";
import Dashboard from "./components/Dashboard.js";

import Budgets from "./components/Budgets.js";
import AddBudget from "./components/AddBudget.js";
import EditBudget from "./components/EditBudget.js";
import BudgetTransactions from "./components/BudgetTransactions.js";

import CategoryList from "./components/categories/CategoryList.js";
import CategoryAdd from "./components/categories/CategoryAdd.js";

function isAuthenticated() {
    let jwtAccessToken = localStorage.getItem("jwtAccessToken");
    return jwtAccessToken ? true : false;
}

export default class App extends Component {
    componentWillMount() {
        console.log("Allication ");
    }
    render() {
        return (
            <Router>
                <div className="App">
                    <Switch>
                        <Route
                            exact
                            path="/"
                            exact
                            render={(props) => (
                                <Login {...props} successUrl={"/dashboard"} />
                            )}
                        />
                        <PrivateRoute
                            exact
                            authed={isAuthenticated()}
                            path="/dashboard"
                            component={Dashboard}
                        />

                        <PrivateRoute
                            exact
                            authed={isAuthenticated()}
                            path="/budgets"
                            component={Budgets}
                        />
                        <PrivateRoute
                            exact
                            authed={isAuthenticated()}
                            path="/budgets/add"
                            component={AddBudget}
                        />
                        <PrivateRoute
                            exact
                            authed={isAuthenticated()}
                            path="/budgets/edit/:id"
                            component={EditBudget}
                        />
                        <PrivateRoute
                            exact
                            authed={isAuthenticated()}
                            path="/budgets/:id/transactions"
                            component={BudgetTransactions}
                        />

                        <PrivateRoute
                            exact
                            authed={isAuthenticated()}
                            path="/categories"
                            component={CategoryList}
                        />
                        <PrivateRoute
                            exact
                            authed={isAuthenticated()}
                            path="/categories/add"
                            component={CategoryAdd}
                        />

                        <Redirect to="/" />
                    </Switch>
                </div>
            </Router>
        );

    }
}
