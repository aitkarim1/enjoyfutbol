import { faHome, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { useAuth } from './AuthUser';
import { Link, Navigate } from 'react-router-dom';

function NavBar() {
  const { user } = useAuth();

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/logout', {
        method: "POST",
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Requested-With': 'XmlHttpRequest' },
        credentials: 'include'
      });
      window.location.href = "/";

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  console.log(user)
  return (
    <>
      {user !== null && (
        <>
          <div className="nav-sup" style={{ height: "auto" }}>Contact: enjoyfutbol@conatct.tech</div>
          <Navbar expand="lg" className="navbar navbar-dark bg-dark py-3">
            <Container>
              <Navbar.Brand href="/">EnjoyFutbol</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse className="justify-content-end">
                {user ? ( // Si el usuario está autenticado
                  <div className='d-flex'>
                    <Nav className="me-auto d-flex">
                      <Navbar.Text>€{user.sueldo} </Navbar.Text>
                      <div className="vr vr-blurry" style={{ height: "20px", alignSelf: "center", marginLeft: "7px", color: "white" }}></div>
                      <NavDropdown title={user.name} id="basic-nav-dropdown">
                        <NavDropdown.Item href="profile"><FontAwesomeIcon icon={faUser} className="icon-nav" />perfil</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logout}><FontAwesomeIcon icon={faRightFromBracket} className="icon-nav" />Cerrar sesion</NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </div>
                ) : ( // Si el usuario no está autenticado
                  <Button variant="secondary" href="/login">Login</Button>
                )}
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
      )}
    </>
  )
}

export default NavBar