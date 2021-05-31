import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../api.js";
import { Container, Col, Row, Button, Table, Spinner } from "react-bootstrap";
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

        this.onPageChanged = this.onPageChanged.bind(this);
        this.handlDelete = this.handlDelete.bind(this);
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

    handlDelete(budgetId) {
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

    getBudgets() {
        const colSpan = 4;
        if (this.state.budgets.length === 0 && !this.state.fetching) return (
            <tr>
                <td colSpan={colSpan}>Please add budget first.</td>
            </tr>
        );
        if (this.state.fetching === true) return (
            <tr>
                <td colSpan={colSpan}>
                    <Spinner animation="border" variant="primary" />
                </td>
            </tr>
        );
        return this.state.budgets.map((category, index) => (
            this.state.budgets.map(
                (budget, index) => (
                    <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{budget.name}</td>
                        <td>{budget.value}</td>
                        <td>
                            <Button variant="secondary" as={Link} to={`/budgets/edit/${budget.pk}`}><Icon.Pencil /></Button>
                            <Button variant="primary" as={Link} to={`/budgets/${budget.pk}/transactions`}><Icon.CashCoin /></Button>
                            <Button variant="danger" onClick={() => {this.handlDelete(budget.id)}}><Icon.X /></Button>
                        </td>
                    </tr>
                )
            )
        ));
    }

    render() {
        return (
            <>
                <Navigation />
                <Container className="mt-4">
                    <Row>
                        <Col>
                            <div className="text-left mb-4 h2">Budgets List</div>
                        </Col>
                        <Col className="text-right">
                            <Button as={Link} to="/budgets/add" variant="secondary"><Icon.Plus /></Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Table striped bordered hover>
                                <thead>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Value</th>
                                    <th>Actions</th>
                                </thead>
                                <tbody>
                                    {this.getBudgets()}
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
