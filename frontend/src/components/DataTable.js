import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table, Spinner } from "react-bootstrap";

export default class DataTable extends Component {
    showBody() {
        const colSpan = (this.props.headers || []).length;
        const rows = this.props.rows || [];

        if (this.props.pending === true)
            return (
                <tr>
                    <td colSpan={colSpan}>
                        <Spinner animation="border" variant="primary" />
                    </td>
                </tr>
            );
        if (rows.length === 0)
            return (
                <tr key={0}>
                    <td colSpan={colSpan}>
                        {this.props.noDataMessage
                            ? this.props.noDataMessage
                            : "Please provide data first."}
                    </td>
                </tr>
            );
        return rows.map((row, index) => (
            <tr key={index}>
                {(row || []).map((elem, index) => (
                    <td key={index}>{elem}</td>
                ))}
            </tr>
        ));
    }

    render() {
        return (
            <Table striped bordered hover>
                <thead>
                    {(this.props.headers || []).map((name) => (
                        <th>{name}</th>
                    ))}
                </thead>
                <tbody>{this.showBody()}</tbody>
            </Table>
        );
    }
}
DataTable.propTypes = {
    headers: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    pending: PropTypes.bool,
};
