import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import { Container, Col, Row, Button } from "react-bootstrap";
import PaginationPanel from "../PaginationPanel.js";
import Navigation from "../Navigation.js";
import BudgetModel from "./BudgetModel.js";
import DataTable from "../DataTable.js";

export default class Budget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pending: false,
            budgets: [],
            totalRecords: 0,
        };

        this.model = new BudgetModel();

        this.getBudgets = this.getBudgets.bind(this);
        this.createRows = this.createRows.bind(this);

        this.onPageChanged = this.onPageChanged.bind(this);
        this.handlDelete = this.handlDelete.bind(this);
    }

    getBudgets(page = null) {
        let data = {};

        if (page) {
            data = { params: { page } };
        }
        if (this.state.pending !== true) {
            this.setState({ pending: true });
        }
        this.model.all(data, (res) => {
            this.setState({
                budgets: this.createRows(res.data.results),
                totalRecords: res.data.count,
                pending: false,
            });
        });
    }

    createRows(data) {
        return (data || []).map((budget, index) => [
            index + 1,
            budget.name,
            budget.saldo,
            budget.value,
            [
                this.getDeleteButton(budget),
                this.getEditButton(budget),
                this.getTransactionsButton(budget),
            ],
        ]);
    }

    onPageChanged(data) {
        const { currentPage = 1 } = data;
        this.getBudgets(currentPage);
    }

    getEditButton(budget) {
        return (
            <Button
                variant="secondary"
                as={Link}
                to={`/budgets/${budget.id}/edit`}
            >
                <Icon.Pencil />
            </Button>
        );
    }
    getTransactionsButton(budget) {
        return (
            <Button
                variant="primary"
                as={Link}
                to={`/budgets/${budget.id}/transactions`}
            >
                <Icon.CashCoin />
            </Button>
        );
    }
    getDeleteButton(budget) {
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
    handlDelete(id) {
        this.setState({ pending: true });
        this.model.delete(id, (res) => {
            this.getBudgets();
        });
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
                            <DataTable
                                headers={[
                                    "#",
                                    "Name",
                                    "Saldo",
                                    "Value",
                                    "Actions",
                                ]}
                                rows={this.state.budgets}
                                pending={this.state.pending}
                                noDataMessage={"Add your first budget."}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <PaginationPanel
                                totalRecords={this.state.totalRecords}
                                pageLimit={this.props.settings.PAGE_SIZE}
                                onPageChanged={this.onPageChanged}
                            />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}
