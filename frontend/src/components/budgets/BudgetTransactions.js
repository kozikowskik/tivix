import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";

import Navigation from "../Navigation.js";

import TransactionTable from "../transactions/TransactionTable.js";
import Saldo from "./Saldo.js";

import BudgetModel from "./BudgetModel.js";
import TransactionModel from "../transactions/TransactionModel.js";

import TransactionForm from "../transactions/TransactionForm.js";
import CategoryModel from "../categories/CategoryModel.js";

export default class BudgetTransactions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pending: true,
            budget: {},

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
        this.categoriesModel = new CategoryModel();

        this.getBudget = this.getBudget.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.getTransactions = this.getTransactions.bind(this);

        this.validate = this.validate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getBudget();
        this.getCategories();
        this.getTransactions();
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
    getCategories() {
        this.categoriesModel.all({}, (res) => {
            this.setState({ categories: res.data.results });
        });
    }
    getTransactions() {
        if (this.state.transactionsPending !== true) {
            this.setState({ transactionsPending: true });
        }
        this.budgetModel.getTransactions(this.budgetId, (res) => {
            this.setState({
                transactions: res.data.results,
                transactionsPending: false,
            });
        });
    }
    validate() {
        const messageIsRequired = (name) => `Please enter your budget ${name}.`;
        let { inputs } = this.props;
        let errors = {};

        if (!inputs["name"]) {
            errors["name"] = messageIsRequired("name");
        }
        if (!inputs["value"]) {
            errors["value"] = messageIsRequired("value");
        }
        if (!inputs["category"]) {
            errors["category"] = messageIsRequired("category");
        }
        if (!inputs["type"]) {
            errors["type"] = messageIsRequired("type");
        }
        return errors;
    }
    handleSubmit(event) {
        event.preventDefault();
        if (!this.validate()) {
            return false;
        }
        const { inputs } = this.props;

        this.transactionModel.save(
            {
                name: inputs["name"],
                value: inputs["value"],
                transaction_type: inputs["type"],
                category: inputs["category"],
                budget: this.budgetId,
            },
            (res) => {
                this.setState((state) => {
                    const transactions = [...state.transactions, res.data];
                    return {
                        transactions: transactions,
                    };
                });
                this.getBudget();
            }
        );
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
                        disabled={this.state.budget.shared}
                        handleChange={this.props.handleChange}
                        handleSubmit={(e) => {
                            this.props.handleSubmit(
                                e,
                                this,
                                this.validate,
                                this.handleSubmit
                            );
                        }}
                        categories={this.state.categories}
                        inputs={this.props.inputs}
                        errors={this.props.errors}
                    />
                    <Row className="mt-4">
                        <Col>
                            <TransactionTable
                                pending={this.props.transactionsPending}
                                transactions={this.state.transactions}
                            />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}
