import React, { useEffect, useState } from 'react'
import Aside from '../components/Aside'
import { Badge, Button, Form, ListGroup, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'

function Usuarios() {
    const [user, setUser] = useState("admin")
    const navigate = useNavigate()

    useEffect(() => {
        if (user !== "admin") {
            navigate("/home")
        }
    }, [])

    const [showModificarModal, setShowModificarModal] = useState(false);
    const [showEliminarModal, setShowEliminarModal] = useState(false);
    const [showUsuarioModal, setShowUsuarioModal] = useState(false);

    const handleModificarClick = () => setShowModificarModal(true);
    const handleEliminarClick = () => setShowEliminarModal(true);
    const handleUsuarioClick = () => setShowUsuarioModal(true);

    const handleCloseModificarModal = () => setShowModificarModal(false);
    const handleCloseEliminarModal = () => setShowEliminarModal(false);
    const handleCloseUsuarioModal = () => setShowUsuarioModal(false);

    return (
        <section>
            <Aside />
            <main>
                <h4 className='d-flex justify-content-center mb-2'>Lista usuarios</h4>
                <div>
                    <div className='m-3'>Buscar usuario:</div>
                    <Form>
                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                            <Form.Group className="mb-3 me-2" controlId="exampleForm.ControlInput1">
                                <Form.Control type="text" placeholder="Usuario" required className='' />
                            </Form.Group>
                            <Button type='submit' variant="primary" className=' m-0'>Buscar</Button>
                        </div>
                    </Form>
                </div>
                <hr className='my-5' />
                <ListGroup as="ol" className="custom-list-group" style={{ border: "white" }}>
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center py-1" style={{ borderBottom: "white solid 1px" }} action>
                        <div className="my-3 me-auto" onClick={handleUsuarioClick}>
                            <div className="fw-bold">Subheading</div>
                        </div>
                        <div>
                            <Button variant="info" className='mx-2' onClick={handleModificarClick}>Modificar</Button>
                            <Button variant="danger" onClick={handleEliminarClick}>Eliminar</Button>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center py-1" style={{ borderBottom: "white solid 1px" }} action>
                        <div className="my-3 me-auto" onClick={handleUsuarioClick}>
                            <div className="fw-bold">Subheading</div>
                        </div>
                        <div>
                            <Button variant="info" className='mx-2' onClick={handleModificarClick}>Modificar</Button>
                            <Button variant="danger" onClick={handleEliminarClick}>Eliminar</Button>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            </main>

            {/* Modificar Usuario Modal */}
            <Modal show={showModificarModal} onHide={handleCloseModificarModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Modificar el usuario
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModificarModal}>
                        Cerrar
                    </Button>
                    <Button variant="primary">
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Eliminar Usuario Modal */}
            <Modal show={showEliminarModal} onHide={handleCloseEliminarModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar este usuario?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEliminarModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger">
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Usuario Modal */}
            <Modal show={showUsuarioModal} onHide={handleCloseUsuarioModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Detalles del Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    datos del usuario
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUsuarioModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    )
}

export default Usuarios
