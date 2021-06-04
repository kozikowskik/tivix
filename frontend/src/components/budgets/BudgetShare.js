import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import Navigation from "../Navigation.js";
import BudgetShareTable from "./BudgetShareTable.js";
import BaseModel from "../BaseModel.js";
import BudgetModel from "./BudgetModel.js";

export default class BudgetAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pending: true,
            users: [],
            budget: {},
        };

        this.budgetId = this.props.match.params.id;

        this.model = new BaseModel("/api/users");
        this.budgetModel = new BudgetModel();
        this.getUsers = this.getUsers.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getBudget() {
        if (this.state.pending !== true) {
            this.setState({ pending: true });
        }
        this.budgetModel.get(this.budgetId, (res) => {
            if (res.data.shared === true) {
                this.props.history.push("/budgets");
            }
            this.setState({
                budget: res.data,
                pending: false,
            });
        });
    }
    getUsers() {
        if (this.state.pending !== true) {
            this.setState({ pending: true });
        }
        this.model.all({}, (res) => {
            this.setState({
                pending: false,
                users: res.data.results,
            });
        });
    }

    handleChange(event, userId) {
        const { checked } = event.target;

        this.budgetModel.shareWith(this.budgetId, {
            userId,
            checked,
        });
    }

    componentDidMount() {
        this.getBudget();
        this.getUsers();
    }

    render() {
        return (
            <>
                <Navigation />
                <Container className="mt-4">
                    <Row>
                        <Col>
                            <div className="text-left mb-4 h2">
                                Share Budget
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <BudgetShareTable
                                pending={this.state.pending}
                                users={this.state.users}
                                budget={this.state.budget}
                                handleChange={this.handleChange}
                            />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}
