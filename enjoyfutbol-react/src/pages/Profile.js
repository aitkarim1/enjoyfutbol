import React, { useState } from 'react'
import { Button, Form, ListGroup, Modal } from 'react-bootstrap'
import Aside from '../components/Aside'
import { faCalendarDays, faChartSimple, faFutbol, faPenToSquare, faPersonRunning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuth } from '../components/AuthUser'

function Profile() {
  const { user } = useAuth();
  const [genero, setGenero] = useState(user.genero || '');
  const [fechaNacimiento, setFechaNacimiento] = useState(user.fechaNacimiento || '');
  const [nivel, setNivel] = useState(user.nivel || '');
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const editar = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/api/editar-usuario', {
        method: "POST",
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({
          user_id: user.id, 
          genero :genero,
          fechaNacimiento: fechaNacimiento,
          nivel: nivel
        })
      });
      const userData = await response.json();
      if (response.ok) {
        window.location.reload();
      } else {
        console.error('Error:', response);
      }

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  return (
    <section>
      <Aside />
      <main>
        <div>
          <ListGroup as="ol" className="custom-list-group m-0 p-0" style={{ backgroundColor: "transparent" }}>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center px-5" style={{ backgroundColor: "transparent" }}>
              <div className=" me-auto">
                <div className="fw-bold" style={{ display: "flex" }}>
                  <div style={{ display: "flex", alignItems: "center", marginRight: "15px" }}><FontAwesomeIcon icon={faPersonRunning} size="2x" /></div>
                  <div><div style={{ fontSize: "19px" }}>{user.name}</div><div style={{ fontWeight: "100", fontSize: "14px" }}>{user.numeroPartidos} partidos jugados</div></div>
                </div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </div>
        <div>
          <ListGroup as="ol" className="custom-list-group m-0 p-0" style={{ backgroundColor: "transparent" }}>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center px-5" style={{ backgroundColor: "transparent" }}>
              <div className=" me-auto">
                <div className="fw-bold" style={{ display: "flex" }}>
                  <div><div style={{ fontSize: "19px", color: "green" }}>{user.sueldo}</div><div style={{ fontWeight: "100", fontSize: "14px" }}>crédito</div></div>
                </div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </div>
        <div>
          <div>
            <ListGroup as="ol" className="custom-list-group m-0 p-0" style={{ backgroundColor: "transparent" }}>
              <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center" style={{ backgroundColor: "transparent" }}>
                <div className=" me-auto">
                  <div className="fw-bold" style={{ display: "flex" }}>
                    <div style={{ fontSize: "19px" }}>Sobre mí</div>
                  </div>
                </div >
                <div style={{ display: "flex", cursor: "pointer" }} onClick={handleShowModal}>
                  <div style={{ marginRight: "9px" }}>Edit</div><div><FontAwesomeIcon icon={faPenToSquare} /></div>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </div>
          <div className="table-responsive">
            <table className="table table-dark">
              <tbody>
                {user.genero && (
                  <tr>
                    <td>Género:</td>
                    <td>{user.genero}</td>
                  </tr>
                )}
                {user.fechaNacimiento && (
                  <tr>
                    <td>Fecha de nacimiento:</td>
                    <td>{user.fechaNacimiento}</td>
                  </tr>
                )}
                {user.nivel && (
                  <tr>
                    <td>Nivel:</td>
                    <td>{user.nivel}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className='my-3'>
          <h5>Mis Partidos</h5>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}><FontAwesomeIcon icon={faFutbol} size="5x" /></div><br />
              <div><p><a href="/MisPartidos" style={{ textDecoration: 'none', color: 'inherit' }}>Ver Mis Partidos</a></p></div>
            </div>
          </div>
        </div>
        <div className='my-3'>
          <h5>Mis Torneos</h5>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}><FontAwesomeIcon icon={faChartSimple} size="5x" /></div><br />
              <div><p><a href="/MisTorneos" style={{ textDecoration: 'none', color: 'inherit' }}>Ver Mis Torneos</a></p></div>
            </div>
          </div>
        </div>


        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Perfil</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={editar}>
              <Form.Group controlId="formGenero">
                <Form.Label>Género</Form.Label>
                <Form.Control as="select" value={genero} onChange={(e) => setGenero(e.target.value)} >
                  <option value="">Selecciona tu género</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formFechaNacimiento" className="mt-3">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)}/>
              </Form.Group>
              <Form.Group controlId="formNivel" className="mt-3">
                <Form.Label>Nivel</Form.Label>
                <Form.Control as="select" value={nivel} onChange={(e) => setNivel(e.target.value)}>
                  <option value="">Selecciona tu nivel</option>
                  <option value="Bajo">Bajo</option>
                  <option value="Medio">Medio</option>
                  <option value="Avanzado">Avanzado</option>
                </Form.Control>
              </Form.Group>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
                <Button variant="primary" type="submit">Guardar Cambios</Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </main>
    </section>
  )
}

export default Profile