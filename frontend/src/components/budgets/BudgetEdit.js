import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import Navigation from "../Navigation.js";
import BudgetModel from "./BudgetModel.js";
import BudgetForm from "./BudgetForm.js";

export default class BudgetEdit extends Component {
    constructor(props) {
        super(props);

        this.budgetId = this.props.match.params.id;

        this.state = {
            pending: true,
            input: {},
            errors: {},
        };

        this.model = new BudgetModel();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getBudget() {
        if (this.state.pending !== true) {
            this.setState({ pending: true });
        }
        this.model.get(this.budgetId, (res) => {
            this.setState({
                input: { name: res.data.name, value: res.data.value },
                pending: false,
            });
        });
    }
    componentDidMount() {
        this.getBudget();
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
        let input = {};

        this.model.update(
            this.budgetId,
            {
                name: this.state.input["name"],
                value: this.state.input["value"],
            },
            (res) => {
                this.props.history.push("/budgets");
            }
        );
        input["name"] = "";
        input["value"] = "";
        this.setState({ input: input });
    }
    validate() {
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input["name"]) {
            isValid = false;
            errors["name"] = "Please enter your budget name.";
        }
        if (!input["value"]) {
            isValid = false;
            errors["value"] = "Please enter your budget value.";
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
                    <BudgetForm
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        input={this.state.input}
                        errors={this.state.errors}
                    />
                </Container>
            </>
        );
    }
}
