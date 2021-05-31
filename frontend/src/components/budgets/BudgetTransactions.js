import React, { Component } from "react";
import {
    Container,
    Col,
    Row,
    Form,
    FormGroup,
    Button,
    Table,
} from "react-bootstrap";

import API from "../../api.js";

import FormFieldErrors from "../FormFieldErrors.js"
import Navigation from "../Navigation.js";
import ErrorModal from "../ErrorModal.js";

import TransactionTable from "./TransactionTable.js"
import Saldo from "./Saldo.js";

export default class BudgetTransactions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            budget: null,
            categories: [],
            transactions: [],
            transactionsPending: true,
            errorModal: false,
            input: {},
            errors: {},
        };

        this.budgetId = this.props.match.params.id;

        this.getTransactions = this.getTransactions.bind(this);
        this.getBudget = this.getBudget.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.showCategoriesDropdown = this.showCategoriesDropdown.bind(this);
    }

    getBudget() {
        API.get(`/api/budgets/${this.budgetId}`)
            .then((res) => {
                this.setState({
                    budget: res.data,
                });
            })
            .catch((res) => {
                console.log(res);
            });
    }
    getCategories() {
        API.get(`/api/categories`)
            .then((res) => {
                this.setState({categories: res.data})
            })
            .catch((res) => {
                console.log(res)
            });
    }
    getTransactions() {
        API.get(`/api/budgets/${this.budgetId}/transactions`)
            .then((res) => {
                this.setState({
                    transactions: res.data,
                    transactionsPending: false
                })
            })
            .catch((res) => {
                console.log(res)
            });
    }


    showCategoriesDropdown() {
        return (
            <Form.Control
                name="category"
                as="select"
                placeholder="Type"
                onChange={this.handleChange}
            >
                <option>Transaction Category</option>
                {(this.state.categories || []).map((category, index) => (
                    <option key={index} value={category.id}>{category.name}</option>
                ))}
            </Form.Control>
        );
    }

    getBudgetName() {
        return this.state.budget ? this.state.budget.name : "";
    }
    getBudgetSaldo() {
        return this.state.budget ? this.state.budget.saldo : "";
    }
    getBudgetValue() {
        return this.state.budget ? this.state.budget.value : "";
    }

    componentDidMount() {
        this.getBudget();
        this.getCategories();
        this.getTransactions();
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
            budget: this.budgetId
        })
            .then((res) => {
                let transactions = this.sate
                this.setState(state => {
                    const transactions = [...state.transactions, res.data]
                    return {
                        transactions: transactions
                    };
                });
                this.getBudget();
            })
            .catch((res) => {
                console.log(res)
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
                            <div className="text-left mb-4 h2">Add Transaction</div>
                        </Col>
                    </Row>
                    <Form method="post" onSubmit={this.handleSubmit} noValidate>
                        <Row>
                            <Col>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    onChange={this.handleChange}
                                />
                                <FormFieldErrors errors={this.state.errors.name} />
                            </Col>
                            <Col>
                                <Form.Control
                                    type="number"
                                    name="value"
                                    placeholder="Value"
                                    onChange={this.handleChange}
                                />
                                <FormFieldErrors errors={this.state.errors.value} />
                            </Col>
                            <Col>
                                {this.showCategoriesDropdown()}
                                <FormFieldErrors errors={this.state.errors.category} />
                            </Col>
                            <Col>
                                <Form.Control
                                    name="type"
                                    as="select"
                                    placeholder="Type"
                                    onChange={this.handleChange}
                                >
                                    <option>Transaction Type</option>
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </Form.Control>
                                <FormFieldErrors errors={this.state.errors.type} />
                            </Col>
                            <Col className="text-left">
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    <Row className="mt-5">
                        <Col>
                            <div className="text-left mb-4 h2">Transaction List</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <TransactionTable transactions={this.state.transactions} pending={this.state.transactionsPending}/>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}
