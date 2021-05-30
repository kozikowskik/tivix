import React, { Component } from "react";
import {
    Container,
    Col,
    Row,
    Form,
    FormGroup,
    Label,
    Input,
    Card,
    CardTitle,
    CardText,
    Button,
} from "reactstrap";
import API from "../api.js";

export default class Login extends Component {
    constructor(props) {
        super(props);

        //localStorage.clear();

        this.state = {
            input: {},
            errors: {},
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.successUrl = this.props.successUrl
            ? this.props.successUrl
            : "/budgets";
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

        API.post("/api/token/", {
            username: this.state.input["username"],
            password: this.state.input["password"],
        })
            .then((res) => {
                localStorage.setItem("jwtAccessToken", res.data.access);
                localStorage.setItem("jwtRefreshToken", res.data.refresh);

                this.props.history.push(this.successUrl);
            })
            .catch((res) => {
                this.setState({
                    errors: { form: res.response.data.detail },
                });
            });

        input["username"] = "";
        input["password"] = "";
        this.setState({ input: input });
    }
    validate() {
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input["username"]) {
            isValid = false;
            errors["username"] = "Please enter your email Address.";
        }
        if (typeof input["email"] !== "undefined") {
            var pattern = new RegExp(
                /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
            );
            if (!pattern.test(input["username"])) {
                isValid = false;
                errors["username"] = "Please enter valid email address.";
            }
        }
        if (!input["password"]) {
            isValid = false;
            errors["password"] = "Please enter password.";
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
                    <Col sm="12" md={{ size: 5, offset: 4 }}>
                        <Card body outline color="secondary">
                            <CardTitle tag="h5">Sign In</CardTitle>
                            <div className="text-danger">
                                {this.state.errors.form}
                            </div>
                            <Form
                                method="post"
                                onSubmit={this.handleSubmit}
                                noValidate
                            >
                                <FormGroup>
                                    <Label for="login">Login</Label>
                                    <Input
                                        type="text"
                                        name="username"
                                        id="username"
                                        onChange={this.handleChange}
                                    />
                                    <div className="text-danger">
                                        {this.state.errors.email}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="password"
                                        onChange={this.handleChange}
                                    />
                                    <div className="text-danger">
                                        {this.state.errors.password}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Button>Submit</Button>
                                </FormGroup>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}
