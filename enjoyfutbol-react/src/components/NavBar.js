import { faHome, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'

function NavBar() {
  return (
    <>
      <div className="nav-sup" style={{height: "auto"}}>Contact: 658495236</div>
      <Navbar expand="lg" className="navbar navbar-dark bg-dark py-3">
        <Container>
          <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <div className='d-flex'>
              <Nav className="me-auto d-flex">
              <Navbar.Text>0,00€ </Navbar.Text>
              <div className="vr vr-blurry" style={{height: "20px", alignSelf: "center", marginLeft: "7px", color: "white"}}></div>
                  <NavDropdown title="Karim" id="basic-nav-dropdown">
                      <NavDropdown.Item href="#action/3.3"><FontAwesomeIcon icon={faUser} className="icon-nav" />perfil</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4"><FontAwesomeIcon icon={faRightFromBracket} className="icon-nav" />Cerrar sesion</NavDropdown.Item>
                  </NavDropdown>
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>


    </>
  )
}

export default NavBar