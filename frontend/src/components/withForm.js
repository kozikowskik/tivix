import React, { Component } from "react";

const withForm = (WrappedComponent) => {
    class WithForm extends Component {
        constructor(props) {
            super(props);

            this.state = {
                input: {},
                errors: {},
            };
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
        handleChange(event, caller) {
            let input = this.state.input;
            input[event.target.name] = event.target.value;
            this.setState({
                input,
            });
        }
        handleSubmit(event, caller, validate, submit) {
            event.preventDefault();
            if (!this.validate(caller, validate)) {
                return false;
            }
            if (!typeof submit === "function") {
                throw new Error("Submit is not a function");
            }
            submit.apply(caller, [event, this]);
            let input = {};
            for (const f in this.state.input) {
                input[f] = "";
            }
            this.setState({ input });
        }
        validate(caller, validate) {
            if (!typeof validate === "function") {
                throw new Error("Validate is not a function");
            }
            const errors = validate.apply(caller, [this]);

            this.setState({
                errors,
            });
            return Object.keys(errors).length === 0 ? true : false;
        }
        render() {
            return (
                <WrappedComponent
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    errors={this.state.errors}
                    inputs={this.state.input}
                    {...this.props}
                />
            );
        }
    }
    WithForm.displayName = `WithSearch(${getDisplayName(WrappedComponent)})`;
    return WithForm;
};

const getDisplayName = (WrappedComponent) => {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

export default withForm;
