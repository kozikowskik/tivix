import React, { Component } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import Navigation from "../Navigation.js";
import FormFieldErrors from "../FormFieldErrors.js";
import CategoryModel from "./CategoryModel.js";

export default class CategoryAdd extends Component {
    constructor(props) {
        super(props);

        this.successUrl = "/categories";
        this.model = new CategoryModel();

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        this.model.save(
            {
                name: this.props.inputs["name"],
            },
            () => {
                this.props.history.push(this.successUrl);
            }
        );
    }

    validate() {
        let { inputs } = this.props;
        let errors = {};

        if (!inputs["name"]) {
            errors["name"] = "Please enter category name";
        }
        return errors;
    }

    render() {
        return (
            <>
                <Row>
                    <Col>
                        <div className="text-left mb-4 h2">Add Category</div>
                    </Col>
                </Row>
                <Form
                    noValidate
                    method="post"
                    onSubmit={(e) => {
                        this.props.handleSubmit(
                            e,
                            this,
                            this.validate,
                            this.handleSubmit
                        );
                    }}
                >
                    <Row>
                        <Col>
                            <Form.Control
                                name="name"
                                placeholder="Name"
                                value={this.props.inputs.name}
                                onChange={this.props.handleChange}
                            />
                            <FormFieldErrors errors={this.props.errors.name} />
                        </Col>
                        <Col className="text-left">
                            <Button type="submit">Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </>
        );
    }
}
