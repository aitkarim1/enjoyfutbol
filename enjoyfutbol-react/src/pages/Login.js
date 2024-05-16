import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { Button, Form } from 'react-bootstrap'
import { useAuth } from '../components/AuthUser';
import { Link, useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate()
  const { user, setUser } = useAuth();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: "POST",
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Requested-With': 'XmlHttpRequest' },
        credentials: 'include',
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
      const userData = await response.json();
      window.location.href = "/";

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  return (
    <div className='div-container'>
      <div className='register' style={{ display: "flex", justifyContent: "center", height: "75vh", alignItems: "center" }}>
        <div className='form'>
          <h2 style={{ textAlign: "center", marginBottom: "60px", fontWeight: "bold" }}>Iniciar sesión</h2>
          <Form style={{ width: "600px" }} onSubmit={login}>
            <Form.Floating className="mb-3">
              <Form.Control type="email" id="email" placeholder="name@example.com" onChange={e => { setEmail(e.target.value) }} required />
              <label htmlFor="email">Correo</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control type="password" id="password" placeholder="Password" onChange={e => { setPassword(e.target.value) }} required />
              <label htmlFor="password">Contraseña</label>
            </Form.Floating>

            <div className="row justify-content-center my-3 px-3">
              <Button type="submit" className="btn-block btn btn-primary btn-color">Iniciar sesión</Button>
            </div>

            <div className="row justify-content-center pointer my-2">
            <small className="text-muted user-select-none pe-auto">¿No tienes cuenta? <Link to={"/register"} style={{ textDecoration: 'none', color: 'inherit' }}> Registrate </Link></small>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login