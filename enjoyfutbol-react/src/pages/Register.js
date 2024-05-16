import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../components/AuthUser';

function Register() {
  const { user, setUser } = useAuth();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const register = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: "POST",
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Requested-With': 'XmlHttpRequest' },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        })
      });
      const userData = await response.json();
      console.log(userData.user)
      window.location.href = "/login";

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  return (
    <div className='div-container'>
      <div className='register' style={{ display: "flex", justifyContent: "center", height: "75vh", alignItems: "center" }}>
        <div className='form'>
        <h2 style={{ textAlign:"center", marginBottom:"60px", fontWeight:"bold" }}>Registrar</h2>
        <Form style={{ width: "600px" }} onSubmit={register}>
          <Form.Floating className="mb-3">
            <Form.Control type="text" id="name" placeholder="name" onChange={e => { setName(e.target.value) }} required />
            <label htmlFor="email">Nombre</label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control type="email" id="email" placeholder="name@example.com" onChange={e => { setEmail(e.target.value) }} required />
            <label htmlFor="email">Correo</label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control type="password" id="password" placeholder="Password" onChange={e => { setPassword(e.target.value) }} required />
            <label htmlFor="password">Contraseña</label>
          </Form.Floating>

          <div className="row justify-content-center my-3 px-3">
            <Button type="submit" className="btn-block btn btn-primary btn-color">Register</Button>
          </div>

          <div className="row justify-content-center pointer my-2">
            <small className="text-muted user-select-none pe-auto">¿Ya tienes cuenta? <Link to={"/login"} style={{ textDecoration: 'none', color: 'inherit' }}> Inisiar sesion </Link></small>
          </div>
        </Form>
        </div>
      </div>
    </div>
  )
}

export default Register