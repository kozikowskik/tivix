import React, { Component } from "react";
import {
    Container,
    Col,
    Row,
    Form,
    FormGroup,
    Card,
    Button,
} from "react-bootstrap";
import API from "../api.js";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.successUrl = props.successUrl || "/budgets";
    }
    handleSubmit(event) {
        const { username } = this.props.inputs;
        API.post("/api/token/", {
            username: this.props.inputs["username"],
            password: this.props.inputs["password"],
        })
            .then((res) => {
                localStorage.setItem("jwtAccessToken", res.data.access);
                localStorage.setItem("jwtRefreshToken", res.data.refresh);
                localStorage.setItem("username", username);

                this.props.history.push(this.props.successUrl);
            })
            .catch((res) => {
                this.setState({ errors: { form: res.response.data.detail } });
            });
    }
    validate() {
        let { inputs } = this.props;
        let errors = {};

        if (!inputs["username"]) {
            errors["username"] = "Please enter username.";
        }
        if (!inputs["password"]) {
            errors["password"] = "Please enter password.";
        }
        return errors;
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col xs={12} md={{ span: 5, offset: 3 }}>
                        <Card border="primary">
                            <Card.Header>Sign In</Card.Header>
                            <Card.Body>
                                <div className="text-danger">
                                    {this.props.errors.form}
                                </div>
                                <Form
                                    method="post"
                                    onSubmit={(e) =>
                                        this.props.handleSubmit(
                                            e,
                                            this,
                                            this.validate,
                                            this.handleSubmit
                                        )
                                    }
                                    noValidate
                                >
                                    <FormGroup>
                                        <Form.Label for="login">
                                            Login
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="username"
                                            id="username"
                                            value={this.props.inputs.username}
                                            onChange={this.props.handleChange}
                                        />
                                        <div className="text-danger">
                                            {this.props.errors.username}
                                        </div>
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Label for="password">
                                            Password
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            id="password"
                                            value={this.props.inputs.password}
                                            onChange={this.props.handleChange}
                                        />
                                        <div className="text-danger">
                                            {this.props.errors.password}
                                        </div>
                                    </FormGroup>
                                    <FormGroup>
                                        <Button type="submit">Submit</Button>
                                    </FormGroup>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}
