import React from 'react'
// import logo from '../logo.svg'
import { Navbar, NavbarBrand } from 'reactstrap'

const NavBar = () => {
  return (
    <header>
      <Navbar color="danger">
        <NavbarBrand className="text-white"> Doctor Appointments</NavbarBrand>
      </Navbar>
    </header>
  )
}

export default NavBar
