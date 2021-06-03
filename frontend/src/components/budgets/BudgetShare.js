import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import Navigation from "../Navigation.js";
import BudgetShareTable from "./BudgetShareTable.js";

export default class BudgetAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
        };
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
                                pending={this.pending}
                                users={this.state.users}
                            />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}
