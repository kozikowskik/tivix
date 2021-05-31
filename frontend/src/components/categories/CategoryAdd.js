import React, { Component } from "react";
import { Container, Col, Row, Button, Table, Spinner, Form } from "react-bootstrap";
import {Link} from "react-router-dom";
import Navigation from "../Navigation.js";
import API from "../../api.js";
import ErrorModal from "../ErrorModal.js";
import PaginationPanel from "../PaginationPanel.js";
import * as Icon from "react-bootstrap-icons";
import FormFieldErrors from "../FormFieldErrors.js"

export default class CategoryAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: {},
            errors: {},
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
        this.setState({
            input,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!this.validate()) {
            return false;
        }
        let input = {};

        API.post("/api/categories", {
            name: this.state.input["name"],
        })
            .then((res) => {
                this.props.history.push("/categories");
            })
            .catch((res) => {
                if (!('response' in res)) {
                    console.log("Uknown error.")
                }
                this.setState({
                    errors: res.response.data
                })
            });

        input["name"] = "";
        this.setState({ input: input });
    }

    validate() {
        const messageIsRequired = "Please enter your budget name.";

        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input["name"]) {
            isValid = false;
            errors["name"] = messageIsRequired;
        }

        this.setState({
            errors: errors,
        });
        return isValid;
    }

    render() {
        return (
            <>
                <Navigation />
                <Container className="mt-4">
                    <Row>
                        <Col>
                            <div className="text-left mb-4 h2">Add Category</div>
                        </Col>
                    </Row>
                    <Form noValidate method="post" onSubmit={this.handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Control name="name" placeholder="Name" required onChange={this.handleChange} />
                                <FormFieldErrors errors={this.state.errors.name} />
                            </Col>
                            <Col className="text-left">
                                <Button type="submit">Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </>
        );
    }
}
