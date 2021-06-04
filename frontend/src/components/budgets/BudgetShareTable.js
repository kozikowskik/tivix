import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import DataTable from "../DataTable.js";

export default class BudgetShareTable extends Component {
    getHeaders() {
        return ["#", "User", "#"];
    }
    getRows() {
        return (this.props.users || []).map((user, index) => [
            index + 1,
            user.username,
            <Form.Check
                type={"checkbox"}
                onChange={(e) => {
                    this.props.handleChange(e, user.id);
                }}
                defaultChecked={(() => {
                    return this.props.budget.shared_with.includes(user.id);
                })()}
            />,
        ]);
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
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    budget: PropTypes.object.isRequired,
};
BudgetShareTable.defaultProps = {
    pending: true,
    users: [],
    budget: {
        shared_with: [],
    },
};
