import React, { Component } from "react";
import { Container, Row, Form, FormGroup, Label, Input, Card, CardTitle, CardText, Button } from 'reactstrap';
import axios from "axios";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }    
    handleSubmit(e) {
        e.preventDefault();
        axios.get("/api/token/").then((res) => console.log(res)).catch((err) => console.log(err))
    }
    render() {
        return (
            <Card body outline color="secondary">
                <CardTitle tag="h5">Sign In</CardTitle>
                <Form method="post" onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="login">Login</Label>
                        <Input type="email" name="email" id="login" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" />
                    </FormGroup>
                    <FormGroup>
                        <Button>Submit</Button>
                    </FormGroup>
                </Form>
            </Card>
        );
    }
}
