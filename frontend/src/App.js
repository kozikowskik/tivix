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
import Logout from "./components/Logout.js";

import BudgetsList from "./components/budgets/BudgetsList.js";
import BudgetAdd from "./components/budgets/BudgetAdd.js";
import BudgetEdit from "./components/budgets/BudgetEdit.js";
import BudgetTransactions from "./components/budgets/BudgetTransactions.js";
import BudgetShare from "./components/budgets/BudgetShare.js";

import CategoryList from "./components/categories/CategoryList.js";
import CategoryAdd from "./components/categories/CategoryAdd.js";
import API from "./api.js";

import withForm from "./components/withForm.js";
import withLayout from "./components/withLayout.js";

function isAuthenticated() {
    let jwtAccessToken = localStorage.getItem("jwtAccessToken");
    return jwtAccessToken ? true : false;
}

const LoginWithForm = withForm(Login);
const BudgetAddWithForm = withForm(BudgetAdd);
const BudgetEditWithForm = withForm(BudgetEdit);
const CategoryAddWithForm = withForm(CategoryAdd);
const BudgetTransactionsWithForm = withForm(BudgetTransactions);

export default class App extends Component {
    componentWillMount() {
        this.settings = {
            PAGE_SIZE: 10,
        };
        //(async () => {
        //    const resp = await API.get("/api/settings");
        //    this.settings = resp.data;
        //})();
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
                                <LoginWithForm
                                    {...props}
                                    successUrl={"/budgets"}
                                />
                            )}
                        />

                        <PrivateRoute
                            exact
                            authed={isAuthenticated()}
                            settings={this.settings}
                            path="/budgets"
                            component={withLayout(BudgetsList)}
                        />
                        <PrivateRoute
                            exact
                            authed={isAuthenticated()}
                            settings={this.settings}
                            path="/budgets/add"
                            component={withLayout(BudgetAddWithForm)}
                        />
                        <PrivateRoute
                            exact
                            authed={isAuthenticated()}
                            settings={this.settings}
                            path="/budgets/:id/edit/"
                            component={withLayout(BudgetEditWithForm)}
                        />
                        <PrivateRoute
                            exact
                            authed={isAuthenticated()}
                            settings={this.settings}
                            path="/budgets/:id/transactions"
                            component={withLayout(BudgetTransactionsWithForm)}
                        />
                        <PrivateRoute
                            exact
                            authed={isAuthenticated()}
                            settings={this.settings}
                            path="/budgets/:id/share"
                            component={withLayout(BudgetShare)}
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
                            component={CategoryAddWithForm}
                        />

                        <PrivateRoute
                            exact
                            authed={true}
                            settings={this.settings}
                            path="/logout"
                            component={Logout}
                        />

                        <Redirect to="/" />
                    </Switch>
                </div>
            </Router>
        );
    }
}
