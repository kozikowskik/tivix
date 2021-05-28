import React, { Component } from "react";
import { Container, Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import API from  "../api.js";

export default class EditBudget extends Component {
    constructor(props) {
        super(props)

        this.budgetId = this.props.match.params.id;

        this.state = {
            input: {},
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getBudget() {
        API.get(`/api/budgets/${this.budgetId}`).then(res => {
            if (res.status !== 201) {
                this.state["errors"]["form"] = res.data.details;
            }
            this.setState({
                input: {name: res.data.name}
            })
        }).catch((res) => {
            this.setState({
                errors: {form: res.response.data.detail}
            })
        });
    }
    componentDidMount() {
        this.getBudget()
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
        if(!this.validate()) {
            return false;
        }
        let input = {};
        API.put(`/api/budgets/${this.budgetId}`, {
            name: this.state.input['name'],
        }).then(res => {
            if (res.status !== 201) {
                this.state["errors"]["form"] = res.data.details;
            }
            this.props.history.push('/budgets');
        }).catch((res) => {
            this.setState({
                errors: {form: res.response.data.detail}
            })
        });
        input["name"] = "";
        this.setState({input:input});
    }
    validate(){
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input["name"]) {
            isValid = false;
            errors["name"] = "Please enter your budget name.";
        }

        this.setState({
            errors: errors
        });
        return isValid;
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <div className="text-danger">{this.state.errors.form}</div>
                        <Form method="post" onSubmit={this.handleSubmit} noValidate>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text" name="name" id="name" value={this.state.input.name} onChange={this.handleChange} />
                                <div className="text-danger">{this.state.errors.name}</div>
                            </FormGroup>
                            <FormGroup>
                                <Button>Submit</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}
