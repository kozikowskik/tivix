import React, { Component } from "react";
import { Container, Col, Row, Button, Table, Spinner } from "react-bootstrap";
import {Link} from "react-router-dom";
import Navigation from "../Navigation.js";
import API from "../../api.js";
import ErrorModal from "../ErrorModal.js";
import PaginationPanel from "../PaginationPanel.js";
import * as Icon from "react-bootstrap-icons";

export default class CategoryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetching: false,
            categories: [],
            totalRecords: 0,
        };

        this.getCategories = this.getCategories.bind(this);
        this.onPageChanged = this.onPageChanged.bind(this);
        this.handlDelete = this.handlDelete.bind(this);
    }

    getCategories() {
        this.setState({ fetching: true });

        API.get("/api/categories").then((res) => {
            this.setState({
                categories: res.data.results,
                totalRecords: res.data.count,
                fetching: false,
            });
        });
    }

    getCategoriesList() {
        const colSpan = 4
        if (this.state.categories.length === 0 && !this.state.fetching) return (
            <tr>
                <td colSpan={colSpan}>Please add category first.</td>
            </tr>
        );
        if (this.state.fetching === true) return (
            <tr>
                <td colSpan={colSpan}>
                    <Spinner animation="border" variant="primary" />
                </td>
            </tr>
        );
        return this.state.categories.map((category, index) => (
            <tr key={index}>
                <td>{(index + 1)}</td>
                <td>{category.name}</td>
                <td>{category.type}</td>
                <td>
                    {<Button variant="danger" onClick={() => {this.handlDelete(category.id)}}><Icon.X /></Button>}
                </td>
            </tr>
        ));
    }

    handlDelete(categoryId) {
        this.setState({ fetching: true });
        API.delete(`/api/categories/${categoryId}`)
            .then((res) => {
                this.setState({
                    categories: res.data.results,
                    totalRecords: res.data.count,
                    fetching: false,
                });
            })
            .catch((res) => {
                if (!('response' in res)) {
                    console.log("Uknown error.");
                }
                // res.response.data;
            });
    }

    onPageChanged(data) {
        const { currentPage } = data;

        this.setState({ fetching: true });
        API.get(`/api/categories?page=${currentPage}`).then((res) => {
            this.setState({
                categories: res.data.results,
                totalRecords: res.data.count,
                fetching: false,
            });
        });
    }

    componentDidMount() {
        this.getCategories();
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
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>{this.getCategoriesList()}</tbody>
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
