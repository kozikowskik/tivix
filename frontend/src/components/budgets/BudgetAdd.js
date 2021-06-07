import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import BudgetModel from "./BudgetModel.js";
import BudgetForm from "./BudgetForm.js";

export default class BudgetAdd extends Component {
    constructor(props) {
        super(props);

        this.successUrl = "/budgets";
        this.model = new BudgetModel();

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit() {
        this.model.save(
            {
                name: this.props.inputs["name"],
                value: this.props.inputs["value"],
            },
            (res) => {
                this.props.history.push(this.successUrl);
            }
        );
    }
    validate() {
        let input = this.props.inputs;
        let errors = {};
        const messageIsRequired = (name) => `Please enter your budget ${name}`;

        if (!input["name"]) {
            errors["name"] = messageIsRequired("name");
        }
        if (!input["value"]) {
            errors["value"] = messageIsRequired("value");
        }

        return errors;
    }
    render() {
        return (
            <>
                <Row>
                    <Col>
                        <div className="text-left mb-4 h2">Add Budget</div>
                    </Col>
                </Row>
                <BudgetForm
                    handleChange={this.props.handleChange}
                    handleSubmit={(e) => {
                        this.props.handleSubmit(
                            e,
                            this,
                            this.validate,
                            this.handleSubmit
                        );
                    }}
                    inputs={this.props.inputs}
                    errors={this.props.errors}
                />
            </>
        );
    }
}
