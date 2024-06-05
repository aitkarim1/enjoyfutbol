import React, { useEffect, useState } from 'react';
import Aside from '../components/Aside';
import { Badge, Button, Form, ListGroup, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthUser';

function Usuarios() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [campos, setCampos] = useState([]);
    const [selectedCampo, setSelectedCampo] = useState(null);
    const [nombre, setNombre] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [latitud, setLatitud] = useState('');
    const [longitud, setLongitud] = useState('');
    const [searchText, setSearchText] = useState('');

    const [showModificarModal, setShowModificarModal] = useState(false);
    const [showEliminarModal, setShowEliminarModal] = useState(false);
    const [showCampoModal, setShowCampoModal] = useState(false);
    const [showAñadirModal, setShowAñadirModal] = useState(false);

    const handleModificarClick = (campo) => {
        setSelectedCampo(campo.id);
        setNombre(campo.nombre);
        setUbicacion(campo.ubicacion);
        setCiudad(campo.ciudad);
        setLatitud(campo.latitud);
        setLongitud(campo.longitud);
        setShowModificarModal(true);
    };

    const handleEliminarClick = (campo) => {
        setSelectedCampo(campo.id);
        setShowEliminarModal(true);
    }

    const handleCampoClick = (campo) => {
        setSelectedCampo(campo.id);
        setNombre(campo.nombre);
        setUbicacion(campo.ubicacion);
        setCiudad(campo.ciudad);
        setShowCampoModal(true);
    };

    const handleAñadirClick = () => {
        setNombre('');
        setUbicacion('');
        setCiudad('');
        setLatitud('');
        setLongitud('');
        setShowAñadirModal(true);
    }

    const handleCloseAñadirModal = () => setShowAñadirModal(false);
    const handleCloseModificarModal = () => setShowModificarModal(false);
    const handleCloseEliminarModal = () => setShowEliminarModal(false);
    const handleCloseCampoModal = () => setShowCampoModal(false);

    useEffect(() => {
        if (user.role !== "admin") {
            navigate("/home");
        }
        fetchCampos()
    }, []);


    const fetchCampos = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/get-campos');
            if (response.ok) {
                const data = await response.json();
                setCampos(data);
                console.log(data)
                console.log(campos.length)
            } else {
                console.error('Error al obtener campos:', response.statusText);
            }
        } catch (error) {
            console.error('Error al obtener campos:', error);
        }
    };

    const modificar = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/modificar-campo', {
                method: "POST",
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: selectedCampo,
                    nombre: nombre,
                    ubicacion: ubicacion,
                    ciudad: ciudad,
                    latitud: latitud,
                    longitud: longitud,
                })
            });
            if (response.ok) {
                setShowModificarModal(false);
                window.location.reload();
            } else {
                console.error('Error:', response);
            }
        } catch (error) {
            console.error('Error al modificar usuario:', error);
        }
    };

    const Eleminar = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/eleminar-campo', {
                method: "POST",
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    campo_id: selectedCampo,
                })
            });
            if (response.ok) {
                const userData = await response.json();
                window.location.reload();
            } else {
                console.error('Error al obtener campos:', response.statusText);
            }
        } catch (error) {
            console.error('Error al obtener campos:', error);
        }
    };

    const Buscar = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:8000/api/buscar-campo', {
                method: "POST",
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    texto: searchText
                })
            });
            if (response.ok) {
                const userData = await response.json();
                console.log(userData)
                setCampos(userData)
            } else {
                console.error('Error:', response);
            }
        } catch (error) {
            console.error('Error al modificar usuario:', error);
        }
    }

    const AñadirCampo = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:8000/api/add-campo', {
                method: "POST",
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: nombre,
                    ubicacion: ubicacion,
                    ciudad: ciudad,
                    latitud: latitud,
                    longitud: longitud
                })
            });
            if (response.ok) {
                window.location.reload();
            } else {
                console.error('Error:', response);
            }
        } catch (error) {
            console.error('Error al modificar usuario:', error);
        }
    }

    return (
        <section>
            <Aside />
            <main>
                <h4 className='d-flex justify-content-center mb-2'>Lista campos</h4>
                <div><Button type='submit' variant="success" className=' m-1' onClick={handleAñadirClick}>Add Campo</Button></div>
                <div>
                    <div className='m-3'>Buscar campo:</div>
                    <Form>
                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                            <Form.Group className="mb-3 me-2" controlId="exampleForm.ControlInput1">
                                <Form.Control type="text" placeholder="Campo" value={searchText} onChange={(e) => setSearchText(e.target.value)}  required />
                            </Form.Group>
                            <Button type='submit' variant="primary" className=' m-0' onClick={Buscar}>Buscar</Button>
                        </div>
                    </Form>
                </div>
                <hr className='my-5' />
                <ListGroup as="ol" className="custom-list-group" style={{ border: "white" }}>
                    {campos.length > 0 && (
                        campos.map((campo, index) => (
                            <ListGroup.Item key={index} as="li" className="d-flex justify-content-between align-items-center py-1" style={{ borderBottom: "white solid 1px" }} action>
                                <div className="my-3 me-auto" style={{ cursor:"pointer" }} onClick={() => handleCampoClick(campo)}>
                                    <div className="fw-bold">{campo.nombre}</div>
                                </div>
                                <div>
                                    <Button variant="info" className='mx-2' onClick={() => handleModificarClick(campo)}>Modificar</Button>
                                    <Button variant="danger" onClick={() => handleEliminarClick(campo)}>Eliminar</Button>
                                </div>
                            </ListGroup.Item>
                        ))
                    )}
                </ListGroup>
            </main>

            {/* Modificar Campo Modal */}
            <Modal show={showModificarModal} onHide={handleCloseModificarModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar Campo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={modificar}>
                        <Form.Group controlId="formNombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formUbicacion" className="mt-3">
                            <Form.Label>Ubicación</Form.Label>
                            <Form.Control
                                type="text"
                                value={ubicacion}
                                onChange={(e) => setUbicacion(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCiudad" className="mt-3">
                            <Form.Label>Ciudad</Form.Label>
                            <Form.Control
                                as="select"
                                value={ciudad}
                                onChange={(e) => setCiudad(e.target.value)}
                            >
                                <option value="Zaragoza">Zaragoza</option>
                                <option value="Barcelona">Barcelona</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formLatitud" className="mt-3">
                            <Form.Label>Latitud</Form.Label>
                            <Form.Control
                                type="number"
                                value={latitud}
                                onChange={(e) => setLatitud(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formLongitud" className="mt-3">
                            <Form.Label>Longitud</Form.Label>
                            <Form.Control
                                type="number"
                                value={longitud}
                                onChange={(e) => setLongitud(e.target.value)}
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModificarModal}>
                                Cerrar
                            </Button>
                            <Button variant="primary" type="submit">
                                Guardar Cambios
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
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
                    <Button variant="danger" onClick={Eleminar}>
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
                    <h5>Nombre: {nombre}</h5>
                    <p>Id: {selectedCampo}</p>
                    <p>Ubicación: {ubicacion}</p>
                    <p>Ciudad: {ciudad}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCampoModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAñadirModal} onHide={handleCloseAñadirModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Añadir Campo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={AñadirCampo}>
                        <Form.Group controlId="formNombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formUbicacion" className="mt-3">
                            <Form.Label>Ubicación</Form.Label>
                            <Form.Control
                                type="text"
                                value={ubicacion}
                                onChange={(e) => setUbicacion(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formCiudad" className="mt-3">
                            <Form.Label>Ciudad</Form.Label>
                            <Form.Control
                                as="select"
                                value={ciudad}
                                onChange={(e) => setCiudad(e.target.value)}
                                required
                            >
                                <option value="" disabled>Elige una ciudad</option>
                                <option value="Zaragoza">Zaragoza</option>
                                <option value="Barcelona">Barcelona</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formLatitud" className="mt-3">
                            <Form.Label>Latitud</Form.Label>
                            <Form.Control
                                type="number"
                                value={latitud}
                                onChange={(e) => setLatitud(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formLongitud" className="mt-3">
                            <Form.Label>Longitud</Form.Label>
                            <Form.Control
                                type="number"
                                value={longitud}
                                onChange={(e) => setLongitud(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseAñadirModal}>
                                Cerrar
                            </Button>
                            <Button variant="primary" type="submit">
                                Añadir Campo
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </section>
    );
}

export default Usuarios;
