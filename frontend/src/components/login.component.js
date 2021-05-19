import React, { Component } from "react";
import { Container, Col, Row, Form, FormGroup, Label, Input, Card, CardTitle, CardText, Button } from 'reactstrap';
import API from  "../api.js";

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: {},
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
        this.setState({
            input
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        if(this.validate()){
            console.log(this.state);
            let input = {};
            input["email"] = "";
            input["password"] = "";
            this.setState({input:input});
            //Call backend
            //backend
            API.post('/api/token/')
                .then(res => {
                    console.log(res);
                })
                .catch(res => {
                    console.log(res);
                });
        }
    }
    validate(){
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input["email"]) {
            isValid = false;
            errors["email"] = "Please enter your email Address.";
        }
        if (typeof input["email"] !== "undefined") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["email"])) {
                isValid = false;
                errors["email"] = "Please enter valid email address.";
            }
        }
        if (!input["password"]) {
            isValid = false;
            errors["password"] = "Please enter password.";
        }
        console.log(errors, input)
        this.setState({
            errors: errors
        });
        return isValid;
    } 
    render() {
        return (
            <Container>
                <Row>
                    <Col sm="12" md={{ size: 5, offset: 4  }}>
                        <Card body outline color="secondary">
                            <CardTitle tag="h5">Sign In</CardTitle>
                            <Form method="post" onSubmit={this.handleSubmit} noValidate>
                                <FormGroup>
                                    <Label for="login">Login</Label>
                                    <Input type="email" name="email" id="login" onChange={this.handleChange} />
                                    <div className="text-danger">{this.state.errors.email}</div>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input type="password" name="password" id="password" onChange={this.handleChange} />
                                    <div className="text-danger">{this.state.errors.password}</div>
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
