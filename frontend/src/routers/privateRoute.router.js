import { BrowserRouter as Router, Switch, Route, Link, Component, Redirect } from "react-router-dom";

function PrivateRoute ({component: Component, authed, settings, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} settings={settings} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}

export default PrivateRoute;
