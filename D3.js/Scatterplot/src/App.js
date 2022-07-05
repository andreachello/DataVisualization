import React, { useState, useEffect } from 'react';
import { Col, Container, Navbar, Row} from 'react-bootstrap';
import './App.css';
import Table from './Table';
import { json } from "d3"

import ChartWrapper from "./ChartWrapper"

const url = "https://udemy-react-d3.firebaseio.com/children.json"

function App() {

  const [data, setData] = useState({})
  const [activeName, setActiveName] = useState(null)

  useEffect(() => {
    json(url)
    .then(d => setData(d))
    .catch(error => console.log(error))
  }, [])

  const onToggle = (name) => {
    if (data.length > 0) {
      setActiveName(name)
    }
  }
  
  const renderChart = () => {
    if (data.length > 0) {
      
      return (
        <ChartWrapper data={data} setActiveName={setActiveName} onToggle={onToggle}/> 
      )
    }
    return "No data"
  }

  return (
    <>
    <div>
    <Navbar bg="light">
      <Navbar.Brand>D3</Navbar.Brand>
    </Navbar>
    <Container>
      <Row>
        <Col md={6} xs={12}>{renderChart()}</Col>
        <Col md={6} xs={12}><Table data={data} setData={setData} activeName={activeName}/></Col>
      </Row>

    </Container>
    </div>
    </>
  );
}

export default App;
