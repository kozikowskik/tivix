import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    getUserName() {
        return localStorage.getItem("username") || "";
    }
    getSignInText() {
        return `Signed is as: ${this.getUserName()}`;
    }
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand as={Link} to="/dashboard">
                    Finances
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to={"/dashboard"}>
                            Dashboard
                        </Nav.Link>
                        <Nav.Link as={Link} to={"/budgets"}>
                            Budgets
                        </Nav.Link>
                        <Nav.Link as={Link} to={"/categories"}>
                            Categories
                        </Nav.Link>
                    </Nav>
                    <Navbar.Text>
                        <NavDropdown
                            title={this.getSignInText()}
                            id="basic-nav-dropdown"
                        >
                            <NavDropdown.Item as={Link} to="/logout">
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
