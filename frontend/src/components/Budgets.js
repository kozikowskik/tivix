import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Col, Row, Form, Button, Table } from 'reactstrap';
import API from  "../api.js";

export default class Budget extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fetching: false,
            budgets: [],
            error: null
        };
        this.deleteBudget = this.deleteBudget.bind(this);
    }

    deleteBudget(budgetId) {
        API.delete(`/api/budgets/${budgetId}`).then(res => {
            let newBudgets = this.state.budgets.filter(elem => elem.pk !== budgetId);
            this.setState({
                budgets: newBudgets
            })
        }).catch((res) => {
            this.state["error"] = res.response.data.detail;
        });
    }

    componentDidMount() {
        this.setState({fetching: true})
        API.get('/api/budgets').then(res => {
            this.setState({budgets: res.data, fetching: false})
        });
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <div className="text-danger">{this.state.error}</div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={{size: 2, offset: 10}}>
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
                                {
                                    this.state.fetching === true
                                        ? <tr><td colspan="3">Loading users ...</td></tr>
                                        : this.state.budgets.map((budget, index)=> (
                                            <tr key={index}>
                                                <th scope="row">{(index + 1)}</th>
                                                <td>{budget.name}</td>
                                                <td>
                                                    <Link to={`/budgets/edit/${budget.pk}`}>
                                                        <Button color="primary">Edit</Button>
                                                    </Link>
                                                    <Button color="primary" onClick={() => this.deleteBudget(budget.pk)}>Delete</Button>
                                                </td>
                                            </tr>
                                        ))
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        );
    }
}

