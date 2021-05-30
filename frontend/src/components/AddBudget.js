import React, { Component } from "react";
import {
    Container,
    Col,
    Row,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
} from "react-bootstrap";
import API from "../api.js";

export default class AddBudget extends Component {
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

        API.post("/api/budgets", {
            name: this.state.input["name"],
        })
            .then((res) => {
                if (res.status === 201) {
                    this.props.history.push("/budgets");
                }
            })
            .catch((res) => {
                this.setState({
                    errors: { form: res.response.data.detail },
                });
            });

        input["name"] = "";
        this.setState({ input: input });
    }
    validate() {
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input["name"]) {
            isValid = false;
            errors["name"] = "Please enter your budget name.";
        }

        this.setState({
            errors: errors,
        });
        return isValid;
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <div className="text-danger">
                            {this.state.errors.form}
                        </div>
                        <Form
                            method="post"
                            onSubmit={this.handleSubmit}
                            noValidate
                        >
                            <FormGroup>
                                <Form.Label for="name">Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={this.handleChange}
                                />
                                <div className="text-danger">
                                    {this.state.errors.name}
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Button type="submit">Submit</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}
