import React, { Component } from "react";
import PropTypes from "prop-types";
import DataTable from "../DataTable.js"
import API from "../../api.js";
import Moment from 'react-moment';

export default class TransactionTable extends Component {
    constructor(props) {
        super(props);
    }
    getHeaders() {
        return ["#", "Name", "Value", "Category", "Type", "Created At"];
    }
    getRows() {
        return (this.props.transactions || []).map((transaction, index)=> (
                [
                    (index + 1),
                    transaction.name,
                    transaction.value,
                    transaction.category_name,
                    transaction.transaction_type_name,
                    <Moment format="YYYY/MM/DD">{transaction.created_at}</Moment>
                ]
        ))
    }
    render() {
        return (
            <DataTable headers={this.getHeaders()} rows={this.getRows()} pending={this.props.pending} />
        );
    }
}
TransactionTable.propTypes = {
    pending: PropTypes.bool.isRequired,
    transactions: PropTypes.arrayOf(PropTypes.object),
};
