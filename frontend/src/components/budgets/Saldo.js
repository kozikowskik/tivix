import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Row, Spinner } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

export default class Saldo extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.getBudgetName = this.getBudgetName.bind(this);
        this.getSaldo = this.getSaldo.bind(this);
    }
    getBudgetName() {
        if (this.props.budget === null) return (
            <Spinner animation="border" variant="primary" />
        );
        return this.props.budget.name;
    }
    getSaldo() {
        if(this.props.budget === null) return (
            <Spinner animation="border" variant="primary" />
        );
        let {saldo, value} = this.props.budget;

        saldo = parseFloat(saldo)
        value = parseFloat(value);

        let arrow = null;
        if (saldo === value) {
            arrow = <Icon.ArrowDownUp />;
        } else if (saldo < value) {
            arrow = <Icon.ArrowDown />;
        } else {
            arrow = <Icon.ArrowUp />;
        }

        return (
            <>
                <span>{arrow}</span>
                <span>{this.props.budget.saldo} / {this.props.budget.value}</span>
            </>
        );
    }

    render() {
        console.log(this.props.budget);
        return (
            <Row>
                <Col>
                    <div className="text-left mb-4 h2">
                        Budget: {this.getBudgetName()}
                    </div>
                </Col>
                <Col>
                    <div className="h2">
                        Slado: {this.getSaldo()}
                    </div>
                </Col>
            </Row>

        );
    }
}
Saldo.propTypes = {
    pending: PropTypes.bool.isRequired,
    transactions: PropTypes.arrayOf(PropTypes.object),
};
