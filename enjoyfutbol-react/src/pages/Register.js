import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../components/AuthUser';
import NavBar from '../components/NavBar';

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
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Requested-With': 'XmlHttpRequest'},
          body: JSON.stringify({
            name: name,
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
      <Form onSubmit={register}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="name" onChange={e =>{setName(e.target.value)}} required />
        </Form.Group>
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

export default Register