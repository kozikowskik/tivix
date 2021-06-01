import React, { Component } from "react";
import { Container, Col, Row, Button, Table, Spinner } from "react-bootstrap";
import {Link} from "react-router-dom";
import Navigation from "../Navigation.js";
import API from "../../api.js";
import PaginationPanel from "../PaginationPanel.js";
import * as Icon from "react-bootstrap-icons";
import DataTable from "../DataTable.js"
import CategoryModel from "./CategoryData.js"

export default class CategoryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pending: false,
            categories: [],
            totalRecords: 0,
        };

        this.categoryModel = new CategoryModel();

        this.getCategories = this.getCategories.bind(this);

        this.onPageChanged = this.onPageChanged.bind(this);

        this.handleDelete = this.handleDelete.bind(this);

        this.getCategories = this.getCategories.bind(this);

        this.createRows = this.createRows.bind(this);
    }

    getCategories(page=null) {
        let data = {};

        if (page) {
            data = {params : {page}}
        }

        this.setState({ pending: true });
        this.categoryModel.all(data, (res) => {
            this.setState({
                categories: this.createRows(res.data.results),
                totalRecords: res.data.count,
                pending: false,
            });
        });

    }

    handleDelete(categoryId) {
        this.setState({ pending: true });
        this.categoryModel.delete(categoryId, (res) => {
            this.getCategories();
        });
    }

    onPageChanged(data) {
        const { currentPage = 1} = data;

        this.getCategories(currentPage)
    }

    createRows(categories) {
        return (categories || []).map((category, index)=> (
            [
                (index + 1),
                category.name,
                <Button onClick={() => {this.handleDelete(category.id)}}><Icon.X /></Button>
            ]
        ))
    }

    componentDidMount() {
    }

    render() {
        return (
            <>
                <Navigation />
                <Container className="mt-4">
                    <Row>
                        <Col>
                            <div className="text-left mb-4 h2">Categories List</div>
                        </Col>
                        <Col className="text-right">
                            <Button as={Link} to="/categories/add" variant="secondary"><Icon.Plus /></Button>
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
