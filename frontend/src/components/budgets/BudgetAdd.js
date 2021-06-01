import React, { Component } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import Navigation from "../Navigation.js";
import BudgetModel from "./BudgetModel.js";
import FormFieldErrors from "../FormFieldErrors.js";

export default class BudgetAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: {},
            errors: {},
        };

        this.successUrl = "/budgets";
        this.model = new BudgetModel();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
        this.setState({
            input,
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        if (!this.validate()) {
            return false;
        }
        this.model.save(
            {
                name: this.state.input["name"],
                value: this.state.input["value"],
            },
            (res) => {
                this.props.history.push(this.successUrl);
            }
        );
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

        this.setState({
            errors: errors,
        });
        return isValid;
    }
    render() {
        return (
            <>
                <Navigation />
                <Container className="mt-4">
                    <Row>
                        <Col>
                            <div className="text-left mb-4 h2">Add Budget</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="text-danger">
                                {this.state.errors.form}
                            </div>
                        </Col>
                    </Row>
                    <Form noValidate method="post" onSubmit={this.handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    required
                                    onChange={this.handleChange}
                                />
                                <FormFieldErrors
                                    errors={this.state.errors.name}
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    type="number"
                                    name="value"
                                    onChange={this.handleChange}
                                    placeholder="Value"
                                    required
                                />
                                <FormFieldErrors
                                    errors={this.state.errors.value}
                                />
                            </Col>
                            <Col className="text-left">
                                <Button type="submit">Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </>
        );
    }
}
