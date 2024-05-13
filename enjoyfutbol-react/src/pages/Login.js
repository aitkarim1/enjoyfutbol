import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { Button, Form } from 'react-bootstrap'
import { useAuth } from '../components/AuthUser';


function Login() {
  const { user, setUser } = useAuth();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = async (e) => {
    e.preventDefault()
    try {
        const response = await fetch('http://localhost:8000/api/login', {
          method: "POST",
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Requested-With': 'XmlHttpRequest'},
          credentials: 'include',
          body: JSON.stringify({
            email: email,
            password: password
          })
        });
        const userData = await response.json();
        console.log(userData.user)

    } catch (error) {
        console.error('Error fetching user data:', error);
    }
  }

  return (
    
    <div>
      <Form onSubmit={login}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Correo</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" onChange={e =>{setEmail(e.target.value)}} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="password" onChange={e =>{setPassword(e.target.value)}} required />
        </Form.Group>
        <Button type="submit"  className="btn-block btn btn-primary btn-color">Iniciar sesión</Button>
      </Form>
    </div>
  )
}

export default Login