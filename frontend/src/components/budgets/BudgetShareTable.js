import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import DataTable from "../DataTable.js";

export default class BudgetShareTable extends Component {
    constructor(props) {
        super(props);
    }
    getHeaders() {
        return ["#", "User", "#"];
    }
    getRows() {
        return [[1, "abcd", <Form.Check type={"checkbox"} />]];
    }
    render() {
        return (
            <DataTable
                headers={this.getHeaders()}
                rows={this.getRows()}
                pending={this.props.pending}
            />
        );
    }
}
BudgetShareTable.propTypes = {
    pending: PropTypes.bool.isRequired,
    users: PropTypes.arrayOf(PropTypes.object),
};
