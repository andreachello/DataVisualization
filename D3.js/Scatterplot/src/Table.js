import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

const Table = ({data, setData, activeName}) => {

    const [name, setName] = useState()
    const [height, setHeight] = useState()
    const [age, setAge] = useState()

    const handleRemove = (e) => {
        const newData = data.filter(d => {
            
            return d.name !== e.target.name 
        })
        setData(newData)
    }

    const handleSubmit = () => {
        setData([...data, {name, age, height}])
    }
    

  return (
    <>
    <Row>
        <Col xs={3}>
            <Form.Control
                placeholder='Name'
                name="name"
                value={name}
                onChange={e => setName(e.target.value)} />
        </Col>
        <Col xs={3}>
            <Form.Control
                placeholder='Height'
                name="height"
                value={height}
                onChange={e => setHeight(e.target.value)} />
        </Col>
        <Col xs={3}>
            <Form.Control
                placeholder='Age'
                name="age"
                value={age}
                onChange={e => setAge(e.target.value)} />
        </Col>
        <Col>
            <Button
                variant='primary'
                type="button"
                style={{width:"100"}}
                onClick={handleSubmit}
            >
            Add
            </Button>
        </Col>
    </Row>
    {data.length && data.map((student) => {
        const background = (student.name === activeName) ? "#F0F8FF" : "white"
        console.log(activeName)
        return (
            <Row key={student.name}
            style={{marginTop:"10px", backgroundColor: background }}>
                <Col xs={3}>{student.name}</Col>
                <Col xs={3}>{student.height}</Col>
                <Col xs={3}>{student.age}</Col>
                <Col xs={3}>
                    <Button
                        variant="danger"
                        type='button'
                        style={{width:"100"}}
                        name={student.name}
                        onClick={handleRemove}
                        >
                    Delete
                    </Button>
                        
                </Col>
            </Row>
    )})}
    </>
    
  )
}

export default Table