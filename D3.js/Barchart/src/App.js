import { useState } from 'react';
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import './App.css';
import ChartWrapper from "./ChartWrapper"
import GenderDropdown from './GenderDropdown';

function App() {
  const [gender, setGender] = useState("men")
  console.log(gender)
  return (
    <>
    <Navbar bg="light">
      <Navbar.Brand>D3</Navbar.Brand>
    </Navbar>
    <Container>
      <Row>
        <Col xs={12}><GenderDropdown setGender={setGender}/></Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ChartWrapper gender={gender}/> 
        </Col>
      </Row>

    </Container>
    </>
  );
}

export default App;
