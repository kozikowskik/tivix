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

import Navigation from "../Navigation.js";
import ErrorModal from "../ErrorModal.js";

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
    handleSubmit() {

    }
    render() {
        return (
            <>
                <Navigation />
                <Container className="mt-4">
                    <Row>
                        <Col>
                            <div className="text-left mb-4 h2">Add Transaction</div>
                        </Col>
                    </Row>
                    <Form method="post" onSubmit={this.handleSubmit} noValidate>
                        <Row>
                            <Col>
                                <Form.Control placeholder="First name" />
                            </Col>
                            <Col>
                                <Form.Control placeholder="Last name" />
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </>
        );
    }
}
