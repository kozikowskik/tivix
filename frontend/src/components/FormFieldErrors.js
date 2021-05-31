import React, { Component } from "react";

export default class FormFieldErrors extends Component {
    constructor(props) {
        super(props);

        this.showErrors = this.showErrors.bind(this);
    }
    showErrors() {
        if (Array.isArray(this.props.errors) && this.props.errors.length) return (
            this.props.errors.map((error, index) => (
                    <div key={index}>{error}</div>
                ))
        );
        return (
            <div>{this.props.errors}</div>
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
