import React, { Component } from "react";

export default class FormFieldErrors extends Component {
    constructor(props) {
        super(props);

        this.showErrors = this.showErrors.bind(this);
    }
    showErrors() {
        const errors = [];
        console.log(this.props)
        return (
            errors.map((error, index) => (
                    <div key={index}>{error}</div>
                ))
        );
    }

    render() {
        return (
            <div className="text-danger">
                {this.showErrors()}
            </div>
        );
    }
}
