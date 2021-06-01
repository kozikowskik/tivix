import React, { Component } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import FormFieldErrors from "../FormFieldErrors.js";

export default class BudgetForm extends Component {
    render() {
        return (
            <Form noValidate method="post" onSubmit={this.props.handleSubmit}>
                <Row>
                    <Col>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={this.props.input.name}
                            onChange={this.props.handleChange}
                        />
                        <FormFieldErrors errors={this.props.errors.name} />
                    </Col>
                    <Col>
                        <Form.Control
                            type="number"
                            name="value"
                            value={this.props.input.value}
                            onChange={this.props.handleChange}
                            placeholder="Value"
                        />
                        <FormFieldErrors errors={this.props.errors.value} />
                    </Col>
                    <Col className="text-left">
                        <Button type="submit">Submit</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}
