import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../api.js";
import { Container, Col, Row, Button, Table } from "react-bootstrap";
import PaginationPanel from "./PaginationPanel.js";
import * as Icon from "react-bootstrap-icons";
import Navigation from "./Navigation.js";

export default class Budget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetching: false,
            budgets: [],
            totalRecords: 0,
            error: null,
        };
        this.deleteBudget = this.deleteBudget.bind(this);
        this.onPageChanged = this.onPageChanged.bind(this);
    }

    componentDidMount() {
        this.setState({ fetching: true });

        API.get("/api/budgets").then((res) => {
            this.setState({
                budgets: res.data.results,
                totalRecords: res.data.count,
                fetching: false,
            });
        });
    }

    deleteBudget(budgetId) {
        this.setState({ fetching: true });
        API.delete(`/api/budgets/${budgetId}`)
            .then((res) => {
                console.log(res);
                this.setState({
                    budgets: res.data.results,
                    totalRecords: res.data.count,
                    fetching: false,
                });
            })
            .catch((res) => {
                this.setState({ error: res.response.data.detail });
            });
    }

    onPageChanged(data) {
        const { currentPage } = data;

        this.setState({ fetching: true });
        API.get(`/api/budgets?page=${currentPage}`).then((res) => {
            this.setState({
                budgets: res.data.results,
                totalRecords: res.data.count,
                fetching: false,
            });
        });
    }

    getElementIndex(currentPage, pageSize, index) {
        return (currentPage - 1) * pageSize + (index + 1);
    }

    render() {
        return (
            <>
                <Navigation />
                <Container>
                    <Row>
                        <Col>
                            <div className="text-danger">
                                {this.state.error}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={{ size: 2, offset: 10 }}>
                            <Link to="/budgets/add">
                                <Button color="primary">Add Budget</Button>
                            </Link>
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
                                <tbody>
                                    {this.state.fetching === true ? (
                                        <tr>
                                            <td colspan="3">
                                                Loading users ...
                                            </td>
                                        </tr>
                                    ) : (
                                        this.state.budgets.map(
                                            (budget, index) => (
                                                <tr key={index}>
                                                    <th>{index + 1}</th>
                                                    <td>{budget.name}</td>
                                                    <td>
                                                        <Link
                                                            to={`/budgets/edit/${budget.pk}`}
                                                        >
                                                            <Button color="primary">
                                                                Edit
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            color="primary"
                                                            onClick={() =>
                                                                this.deleteBudget(
                                                                    budget.pk
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </Button>
                                                        <Link to={``}>
                                                            <Button variant="success">
                                                                <Icon.CashCoin />
                                                            </Button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    )}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <PaginationPanel
                                totalRecords={this.state.totalRecords}
                                pageLimit={1}
                                pageNeighbours={1}
                                onPageChanged={this.onPageChanged}
                            />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}
