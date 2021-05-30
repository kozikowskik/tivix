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

import API from "../api.js";

import Navigation from "./Navigation.js";
import ErrorModal from "./ErrorModal.js";

export default class BudgetTransactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            budget: null,
            errorModal: false,
        };

        this.budgetId = this.props.match.params.id;

        this.errorModal = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    getBudget() {
        API.get(`/api/budgets/${this.budgetId}`)
            .then((res) => {
                this.setState({
                    budget: res.data,
                });
            })
            .catch((res) => {
                this.errorModal.current.open(res.data.details);
            });
    }
    getBudgetName() {
        return this.state.budget ? this.state.budget.name : "";
    }
    componentDidMount() {
        this.getBudget();
    }
    handleSubmit() {}
    render() {
        return (
            <>
                <Navigation />
                <Container>
                    <Row>
                        <Col xs={3}>Budget Name: {this.getBudgetName()}</Col>
                    </Row>
                    <Row>
                        <Col xs={3}>Add Transaction</Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form
                                method="post"
                                onSubmit={this.handleSubmit}
                                noValidate
                            >
                                <FormGroup as={Col}>
                                    <Form.Label>Transaction Type</Form.Label>
                                    <Form.Control as="select">
                                        <option>Large select</option>
                                        <option>Large select</option>
                                        <option>Large select</option>
                                    </Form.Control>
                                    <Form.Label>Transaction Value</Form.Label>
                                    <Form.Control type="number" />
                                    <Form.Label>
                                        Transaction Category
                                    </Form.Label>
                                    <Form.Control as="select">
                                        <option>Large select</option>
                                        <option>Large select</option>
                                        <option>Large select</option>
                                    </Form.Control>
                                    <Button type="submit">Submit</Button>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Table>
                                <thead>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Actions</th>
                                </thead>
                                <tbody></tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
                <ErrorModal
                    message={this.state.errorMessage}
                    show={this.state.errorModalShow}
                />
            </>
        );
    }
}
