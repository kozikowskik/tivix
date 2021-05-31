import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import {
    Container,
    Col,
    Row,
    Button,
    Table,
    Spinner,
    Dropdown,
    Modal,
} from "react-bootstrap";
import PaginationPanel from "../PaginationPanel.js";
import Navigation from "../Navigation.js";
import API from "../../api.js";

export default class Budget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetching: false,
            budgets: [],
            totalRecords: 0,
            error: null,
            openShareModal: false,
        };

        this.onPageChanged = this.onPageChanged.bind(this);

        this.getButtonDelete = this.getButtonDelete.bind(this);
        this.handlDelete = this.handlDelete.bind(this);

        this.openShareModal = this.openShareModal.bind(this);
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
                this.setState({
                    budgets: res.data.results,
                    totalRecords: res.data.count,
                    fetching: false,
                });
            })
            .catch((res) => {
                console.log(res);
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

    openShareModal(budget) {
        this.setState({
            openShareModal: true,
        });
        API.delete(`/api/budgets/${budget.id}/users`)
            .then((res) => {
                this.setState({
                    users: res.data,
                });
            })
            .catch((res) => {
                console.log(res);
            });
    }

    getElementIndex(currentPage, pageSize, index) {
        return (currentPage - 1) * pageSize + (index + 1);
    }

    getShareButton(budget) {
        return (
            <Button
                variant="secondary"
                onClick={() => this.openShareModal(budget)}
            >
                <Icon.Share />
            </Button>
        );
    }

    getButtonEdit(budget) {
        return (
            <Button
                variant="secondary"
                as={Link}
                to={`/budgets/edit/${budget.pk}`}
            >
                <Icon.Pencil />
            </Button>
        );
    }
    getButtonTransactions(budget) {
        return (
            <Button
                variant="primary"
                as={Link}
                to={`/budgets/${budget.pk}/transactions`}
            >
                <Icon.CashCoin />
            </Button>
        );
    }
    getButtonDelete(budget) {
        return (
            <Button
                variant="danger"
                onClick={() => {
                    this.handlDelete(budget.id);
                }}
            >
                <Icon.X />
            </Button>
        );
    }

    getBudgets() {
        const colSpan = 4;
        if (this.state.budgets.length === 0 && !this.state.fetching)
            return (
                <tr>
                    <td colSpan={colSpan}>Please add budget first.</td>
                </tr>
            );
        if (this.state.fetching === true)
            return (
                <tr>
                    <td colSpan={colSpan}>
                        <Spinner animation="border" variant="primary" />
                    </td>
                </tr>
            );
        return (this.state.budgets || []).map((budget, index) => (
            <tr key={index}>
                <th>{index + 1}</th>
                <td>{budget.name}</td>
                <td>{budget.value}</td>
                <td>
                    {this.getButtonDelete(budget)}
                    {this.getButtonEdit(budget)}
                    {this.getButtonTransactions(budget)}
                    {this.getShareButton(budget)}
                </td>
            </tr>
        ));
    }

    render() {
        return (
            <>
                <Navigation />
                <Container className="mt-4">
                    <Row>
                        <Col>
                            <div className="text-left mb-4 h2">
                                Budgets List
                            </div>
                        </Col>
                        <Col className="text-right">
                            <Button
                                as={Link}
                                to="/budgets/add"
                                variant="secondary"
                            >
                                <Icon.Plus />
                            </Button>
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
                                <tbody>{this.getBudgets()}</tbody>
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
                <Modal show={this.state.openShareModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Share this Budget with</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {(this.state.users || []).map((user) => {
                            console.log(user);
                        })}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() =>
                                this.setState({ openShareModal: false })
                            }
                        >
                            Close
                        </Button>
                        <Button variant="primary">Save changes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
