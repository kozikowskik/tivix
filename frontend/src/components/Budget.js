import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Col, Row, Form, Button, Table } from 'reactstrap';
import API from  "../api.js";

export default class Budget extends Component {
    constructor(props) {
        super(props)

        this.state = {
            budgets: []
        };
    }

    componentDidMount() {
        //this.setState({budgets: [1, 2, 3, 4, 5]})
        let jwtAccessToken = localStorage.getItem('jwtAccessToken')
        API.get('/api/budgets', {}, {
            headers: {
                "Authorization": `Bearer ${jwtAccessToken}`
            }
        }).then(res => {
            if (res.data.length > 0) {}
            this.setState({budgets: res.data})
        });
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col sm={{size: 1, offset: 11}}>
                        <Link to="/budget/add">
                            <Button color="primary">primary</Button>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table>
                            <thead>
                                <th>#</th>
                                <th>Name</th>
                            </thead>
                            <tbody>
                                {
                                    this.state.budgets.length == 0
                                        ? <tr><td colspan="2">Loading users ...</td></tr>
                                        : this.state.budgets.map((budget, index)=> (
                                            <tr key={index}>
                                                <th scope="row">{(index + 1)}</th>
                                                <td>{budget.name}</td>
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

