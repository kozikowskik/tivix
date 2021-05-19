import './App.css';

import { Container, Row, Col } from 'reactstrap';
import Login from './components/login.component.js';

function App() {
    return (
        <div className="App">
            <Container>
                <Row>
                    <Col sm="12" md={{ size: 5, offset: 4  }}>
                        <Login />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
