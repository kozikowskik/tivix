import React, { Component } from "react";
import Navigation from "./Navigation.js";

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        //this.handleChange = this.handleChange.bind(this);
    }
    render() {
        return (
            <>
                <Navigation />
            </>
        );
    }
}
