import './App.css';

import Login from './components/login.component.js';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path='/' component={Login} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
