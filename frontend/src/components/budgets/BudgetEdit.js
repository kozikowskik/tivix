import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import Navigation from "../Navigation.js";
import BudgetModel from "./BudgetModel.js";
import BudgetForm from "./BudgetForm.js";

export default class BudgetEdit extends Component {
    constructor(props) {
        super(props);

        this.state = { pending: true, inputs: {} };

        this.budgetId = this.props.match.params.id;

        this.model = new BudgetModel();

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    getBudget() {
        if (this.state.pending !== true) {
            this.setState({ pending: true });
        }
        this.model.get(this.budgetId, (res) => {
            this.props.inputs.name = res.data.name;
            this.props.inputs.value = res.data.value;
            this.setState({
                pending: false,
            });
        });
    }
    componentDidMount() {
        this.getBudget();
    }
    handleSubmit() {
        this.model.update(
            this.budgetId,
            {
                name: this.props.inputs["name"],
                value: this.props.inputs["value"],
            },
            (res) => {
                this.props.history.push("/budgets");
            }
        );
    }
    validate() {
        const messageIsRequired = "Please enter your budget";
        let { inputs } = this.props;
        let errors = {};

        if (!inputs["name"]) {
            errors["name"] = messageIsRequired + " name";
        }
        if (!inputs["value"]) {
            errors["value"] = messageIsRequired + " value";
        }

        return errors;
    }

    render() {
        return (
            <>
                <Navigation />
                <Container className="mt-4">
                    <Row>
                        <Col>
                            <div className="text-left mb-4 h2">Budget Edit</div>
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
                </Container>
            </>
        );
    }
}
