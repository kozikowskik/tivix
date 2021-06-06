import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Navigation from "./Navigation.js";

const withLayout = (WrappedComponent) => {
    class WithLayout extends Component {
        render() {
            return (
                <>
                    <Navigation />
                    <Container className="mt-4">
                        <WrappedComponent {...this.props} />
                    </Container>
                </>
            );
        }
    }
    WithLayout.displayName = `WithLayout(${getDisplayName(WrappedComponent)})`;
    return WithLayout;
};

const getDisplayName = (WrappedComponent) => {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

export default withLayout;
