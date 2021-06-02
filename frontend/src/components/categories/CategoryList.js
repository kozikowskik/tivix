import React, { Component } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navigation from "../Navigation.js";
import PaginationPanel from "../PaginationPanel.js";
import * as Icon from "react-bootstrap-icons";
import DataTable from "../DataTable.js";
import CategoryModel from "./CategoryModel.js";

export default class CategoryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: [],
            pending: false,
            categories: [],
            totalRecords: 0,
        };

        this.model = new CategoryModel();

        this.getCategories = this.getCategories.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onPageChanged = this.onPageChanged.bind(this);
        this.createRows = this.createRows.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

    getCategories(page = null) {
        let data = {};

        if (page) {
            data = { params: { page } };
        }
        if (this.state.pending !== true) {
            this.setState({ pending: true });
        }
        this.model.all(data, (res) => {
            this.setState({
                categories: this.createRows(res.data.results),
                totalRecords: res.data.count,
                pending: false,
            });
        });
    }

    handleDelete(categoryId) {
        this.setState({ pending: true });
        this.model.delete(categoryId, (res) => {
            this.getCategories();
        });
    }

    onPageChanged(data) {
        const { currentPage = 1 } = data;
        this.getCategories(currentPage);
    }

    createRows(categories) {
        return (categories || []).map((category, index) => [
            index + 1,
            category.name,
            <Button
                onClick={() => {
                    this.handleDelete(category.id);
                }}
            >
                <Icon.X />
            </Button>,
        ]);
    }

    handleFilter(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;

        this.setState({
            input,
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
                                Categories List
                            </div>
                        </Col>
                        <Col className="text-right">
                            <Button
                                as={Link}
                                to="/categories/add"
                                variant="secondary"
                            >
                                <Icon.Plus />
                            </Button>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col xs={2}>
                            <Form.Control
                                name="name"
                                placeholder="Name"
                                required
                                value={this.state.input.name}
                                onChange={this.handleFilter}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <DataTable
                                headers={["#", "Name", "Actions"]}
                                rows={this.state.categories}
                                pending={this.state.pending}
                                noDataMessage={"Add your first category."}
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
