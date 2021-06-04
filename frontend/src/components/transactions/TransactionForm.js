import React, { Component } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import FormFieldErrors from "../FormFieldErrors.js";

export default class TransactionForm extends Component {
    render() {
        return (
            <Form method="post" onSubmit={this.props.handleSubmit} noValidate>
                <Row>
                    <Col>
                        <Form.Control
                            disabled={this.props.disabled}
                            type="text"
                            name="name"
                            value={this.props.inputs.name}
                            placeholder="Name"
                            onChange={this.props.handleChange}
                        />
                        <FormFieldErrors errors={this.props.errors.name} />
                    </Col>
                    <Col>
                        <Form.Control
                            disabled={this.props.disabled}
                            type="number"
                            name="value"
                            value={this.props.inputs.value}
                            placeholder="Value"
                            onChange={this.props.handleChange}
                        />
                        <FormFieldErrors errors={this.props.errors.value} />
                    </Col>
                    <Col>
                        <Form.Control
                            disabled={this.props.disabled}
                            name="category"
                            as="select"
                            value={this.props.inputs.category}
                            placeholder="Type"
                            onChange={this.props.handleChange}
                        >
                            <option>Transaction Category</option>
                            {(this.props.categories || []).map(
                                (category, index) => (
                                    <option key={index} value={category.id}>
                                        {category.name}
                                    </option>
                                )
                            )}
                        </Form.Control>
                        <FormFieldErrors errors={this.props.errors.category} />
                    </Col>
                    <Col>
                        <Form.Control
                            disabled={this.props.disabled}
                            name="type"
                            as="select"
                            value={this.props.inputs.type}
                            placeholder="Type"
                            onChange={this.props.handleChange}
                        >
                            <option>Transaction Type</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </Form.Control>
                        <FormFieldErrors errors={this.props.errors.type} />
                    </Col>
                    <Col className="text-left">
                        <Button
                            disabled={this.props.disabled}
                            variant="primary"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}
TransactionForm.defaultProps = {
    disabled: false,
};
