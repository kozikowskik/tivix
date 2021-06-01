import React, { Component } from "react";
import {
    Container,
    Col,
    Row,
    Button,
    Table,
    Spinner,
    Dropdown,
    Modal,
} from "react-bootstrap";
import PropTypes from "prop-types";
import API from "../../api.js";

export default class ShareBudgetModal extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <Modal show={this.prop.open}>
                <Modal.Header closeButton>
                    <Modal.Title>Share this Budget with</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => this.setState({open: false})}
                    >
                        Close
                    </Button>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
ShareBudgetModal.propTypes = {
    open: PropTypes.bool.isRequired,
};
