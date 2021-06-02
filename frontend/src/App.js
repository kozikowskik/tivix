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

import BudgetsList from "./components/budgets/BudgetsList.js";
import BudgetAdd from "./components/budgets/BudgetAdd.js";
import BudgetEdit from "./components/budgets/BudgetEdit.js";
import BudgetTransactions from "./components/budgets/BudgetTransactions.js";

import CategoryList from "./components/categories/CategoryList.js";
import CategoryAdd from "./components/categories/CategoryAdd.js";
import API from "./api.js";
import withForm from "./components/withForm.js";

function isAuthenticated() {
    let jwtAccessToken = localStorage.getItem("jwtAccessToken");
    return jwtAccessToken ? true : false;
}

const LoginForm = withForm(Login);

export default class App extends Component {
    componentWillMount() {
        //(async () => {
        //    const resp = await API.get("/api/settings");
        //    console.log(resp)
        //})();

        this.settings = {
            PAGE_SIZE: 10,
        };
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
                                <LoginForm
                                    {...props}
                                    successUrl={"/dashboard"}
                                />
                            )}
                        />
                        <PrivateRoute
                            exact
                            authed={isAuthenticated()}
                            settings={this.settings}
                            path="/dashboard"
                            component={Dashboard}
                        />

                        <PrivateRoute
                            exact
                            authed={isAuthenticated()}
                            settings={this.settings}
                            path="/budgets"
                            component={BudgetsList}
                        />
                        <PrivateRoute
                            exact
                            authed={isAuthenticated()}
                            settings={this.settings}
                            path="/budgets/add"
                            component={BudgetAdd}
                        />
                        <PrivateRoute
                            exact
                            authed={isAuthenticated()}
                            settings={this.settings}
                            path="/budgets/:id/edit/"
                            component={BudgetEdit}
                        />
                        <PrivateRoute
                            exact
                            authed={isAuthenticated()}
                            settings={this.settings}
                            path="/budgets/:id/transactions"
                            component={BudgetTransactions}
                        />

                        <PrivateRoute
                            exact
                            authed={isAuthenticated()}
                            settings={this.settings}
                            path="/categories"
                            component={CategoryList}
                        />
                        <PrivateRoute
                            exact
                            authed={isAuthenticated()}
                            settings={this.settings}
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
