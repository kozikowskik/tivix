import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

export default class ErrorModal extends Component {
    constructor(props) {
        super(props);

        const { message, show } = props;

        this.message = message ? this.message : "";
        this.show = show ? true : false;
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: this.show,
            message: this.message,
        };
    }
    handleClose() {
        this.setState({ show: false });
    }
    getMessage() {
        return this.state.message ? this.state.message : "";
    }
    render() {
        console.log(this.state);
        return (
            <>
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.getMessage()}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

ErrorModal.propTypes = {
    message: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
};
