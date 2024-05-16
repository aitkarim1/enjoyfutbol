import React, { useEffect, useState } from 'react';
import Aside from '../components/Aside';
import { Badge, Button, Form, ListGroup, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

function Usuarios() {
    const [user, setUser] = useState("admin");
    const navigate = useNavigate();
    const [campos, setCampos] = useState([]);
    const [showModificarModal, setShowModificarModal] = useState(false);
    const [showEliminarModal, setShowEliminarModal] = useState(false);
    const [showCampoModal, setShowCampoModal] = useState(false);

    const handleModificarClick = () => setShowModificarModal(true);
    const handleEliminarClick = () => setShowEliminarModal(true);
    const handleCampoClick = () => setShowCampoModal(true);

    const handleCloseModificarModal = () => setShowModificarModal(false);
    const handleCloseEliminarModal = () => setShowEliminarModal(false);
    const handleCloseCampoModal = () => setShowCampoModal(false);

    useEffect(() => {
        if (user !== "admin") {
            navigate("/home");
        }
    }, []);


    const fetchCampos = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/get-campos');
            if (response.ok) {
                const data = await response.json();
                setCampos(data.campos);
            } else {
                console.error('Error al obtener campos:', response.statusText);
            }
        } catch (error) {
            console.error('Error al obtener campos:', error);
        }
    };

    return (
        <section>
            <Aside />
            <main>
                <h4 className='d-flex justify-content-center mb-2'>Lista campos</h4>
                <div>
                    <div className='m-3'>Buscar campo:</div>
                    <Form>
                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                            <Form.Group className="mb-3 me-2" controlId="exampleForm.ControlInput1">
                                <Form.Control type="text" placeholder="Campo" required className='' />
                            </Form.Group>
                            <Button type='submit' variant="primary" className=' m-0'>Buscar</Button>
                        </div>
                    </Form>
                </div>
                <hr className='my-5' />
                <ListGroup as="ol" className="custom-list-group" style={{ border: "white" }}>
                    {campos.map((campo, index) => (
                        <ListGroup.Item key={index} as="li" className="d-flex justify-content-between align-items-center py-1" style={{ borderBottom: "white solid 1px" }} action>
                            <div className="my-3 me-auto" onClick={handleCampoClick}>
                                <div className="fw-bold">{campo.name}</div>
                            </div>
                            <div>
                                <Button variant="info" className='mx-2' onClick={handleModificarClick}>Modificar</Button>
                                <Button variant="danger" onClick={handleEliminarClick}>Eliminar</Button>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </main>

            {/* Modificar Campo Modal */}
            <Modal show={showModificarModal} onHide={handleCloseModificarModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar Campo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Modificar el campo
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

            {/* Eliminar Campo Modal */}
            <Modal show={showEliminarModal} onHide={handleCloseEliminarModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar Campo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar este campo?
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

            {/* Campo Modal */}
            <Modal show={showCampoModal} onHide={handleCloseCampoModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Detalles del Campo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Datos del campo
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCampoModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
}

export default Usuarios;
