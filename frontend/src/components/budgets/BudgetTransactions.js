import React, { Component } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";

import API from "../../api.js";

import FormFieldErrors from "../FormFieldErrors.js";
import Navigation from "../Navigation.js";

import TransactionTable from "./TransactionTable.js";
import Saldo from "./Saldo.js";

import BudgetModel from "./BudgetModel.js";
import TransactionModel from "../transactions/TransactionModel.js";

import TransactionForm from "../transactions/TransactionForm.js";

export default class BudgetTransactions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pending: true,
            budget: null,

            transactions: [],
            transactionsPending: true,

            categories: [],
            errorModal: false,
            input: {},
            errors: {},
        };

        this.budgetId = this.props.match.params.id;

        this.budgetModel = new BudgetModel();
        this.transactionModel = new TransactionModel(this.budgetId);

        this.getTransactions = this.getTransactions.bind(this);
        this.getBudget = this.getBudget.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.showCategoriesDropdown = this.showCategoriesDropdown.bind(this);
    }

    componentDidMount() {
        this.getBudget();
        this.getTransactions();
        //this.getCategories();
    }

    getBudget() {
        if (this.state.pending !== true) {
            this.setState({ pending: true });
        }
        this.budgetModel.get(this.budgetId, (res) => {
            this.setState({
                budget: res.data,
                pending: false,
            });
        });
    }
    getTransactions() {
        if (this.state.transactionsPending !== true) {
            this.setState({ transactionsPending: true });
        }
        this.transactionModel.all({}, (res) => {
            this.setState({
                transactions: res.data,
                transactionsPending: false,
            });
        });
    }
    getCategories() {
        API.get(`/api/categories`)
            .then((res) => {
                this.setState({ categories: res.data });
            })
            .catch((res) => {
                console.log(res);
            });
    }

    showCategoriesDropdown() {
        //return (
        //    <Form.Control
        //        name="category"
        //        as="select"
        //        value={this.state.input.category}
        //        placeholder="Type"
        //        onChange={this.handleChange}
        //    >
        //        <option>Transaction Category</option>
        //        {(this.state.categories || []).map((category, index) => (
        //            <option key={index} value={category.id}>
        //                {category.name}
        //            </option>
        //        ))}
        //    </Form.Control>
        //);
    }

    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
        this.setState({
            input,
        });
    }
    validate() {
        const messageIsRequired = "Please enter your budget name.";
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input["name"]) {
            isValid = false;
            errors["name"] = messageIsRequired;
        }
        if (!input["value"]) {
            isValid = false;
            errors["value"] = messageIsRequired;
        }
        if (!input["category"]) {
            isValid = false;
            errors["category"] = messageIsRequired;
        }
        if (!input["type"]) {
            isValid = false;
            errors["type"] = messageIsRequired;
        }

        this.setState({
            errors: errors,
        });
        return isValid;
    }
    handleSubmit(event) {
        event.preventDefault();
        if (!this.validate()) {
            return false;
        }
        let input = {};

        API.post("/api/transactions", {
            name: this.state.input["name"],
            value: this.state.input["value"],
            transaction_type: this.state.input["type"],
            category: this.state.input["category"],
            budget: this.budgetId,
        })
            .then((res) => {
                let transactions = this.sate;
                this.setState((state) => {
                    const transactions = [...state.transactions, res.data];
                    return {
                        transactions: transactions,
                    };
                });
                this.getBudget();
            })
            .catch((res) => {
                console.log(res);
            });

        input["name"] = "";
        input["value"] = "";
        input["category"] = "";
        input["transaction_type"] = "";

        this.setState({ input: input });
    }
    render() {
        return (
            <>
                <Navigation />
                <Container className="mt-4">
                    <Saldo budget={this.state.budget} />
                    <Row>
                        <Col>
                            <div className="text-left mb-4 h2">
                                Add Transaction
                            </div>
                        </Col>
                    </Row>
                    <TransactionForm
                        handleSubmit={this.handleSubmit}
                        handleChange={this.handleChange}
                        input={this.state.input}
                        errors={this.state.errors}
                    />
                </Container>
            </>
        );
    }
}
