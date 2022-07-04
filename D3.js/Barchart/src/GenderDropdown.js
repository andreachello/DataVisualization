import React from 'react'
import { Dropdown } from 'react-bootstrap'

const GenderDropdown = ({setGender}) => {

  return (
    <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Please select gender
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item onClick={() => setGender("men")}>Men</Dropdown.Item>
            <Dropdown.Item onClick={() => setGender("women")}>Women</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
  )
}

export default GenderDropdown