import React, { useEffect, useState } from 'react';
import Aside from '../components/Aside';
import { Badge, Button, Form, ListGroup, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthUser';

function Usuarios() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [sueldo, setSueldo] = useState('');
    const [genero, setGenero] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [nivel, setNivel] = useState('');
    const [numeroPartidos, setNumeroPartidos] = useState('');
    const [role, setRole] = useState('');
    const [searchText, setSearchText] = useState('');


    const [showModificarModal, setShowModificarModal] = useState(false);
    const [showEliminarModal, setShowEliminarModal] = useState(false);
    const [showUsuarioModal, setShowUsuarioModal] = useState(false);

    const handleModificarClick = (user) => {
        setSelectedUser(user.id);
        setName(user.name);
        setEmail(user.email);
        setSueldo(user.sueldo);
        setGenero(user.genero);
        setFechaNacimiento(user.fechaNacimiento);
        setNivel(user.nivel);
        setNumeroPartidos(user.numeroPartidos);
        setRole(user.role);
        setShowModificarModal(true);
    };
    const handleEliminarClick = (user) => {
        setSelectedUser(user.id);
        setShowEliminarModal(true);
    }
    const handleUsuarioClick = (user) => {
        setShowUsuarioModal(true);
        setSelectedUser(user.id);
        setName(user.name);
        setEmail(user.email);
    }

    const handleCloseModificarModal = () => setShowModificarModal(false);
    const handleCloseEliminarModal = () => setShowEliminarModal(false);
    const handleCloseUsuarioModal = () => setShowUsuarioModal(false);

    useEffect(() => {
        if (user.role !== "admin") {
            navigate("/home");
        }
    }, []);

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/get-usuarios');
            if (response.ok) {
                const data = await response.json();
                setUsers(data.usuarios);
            } else {
                console.error('Error al obtener usuarios:', response.statusText);
            }
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
        }
    };

    const modificar = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/modificar-usuario', {
                method: "POST",
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: selectedUser.id,
                    name: name,
                    email: email,
                    sueldo: sueldo,
                    genero: genero,
                    fechaNacimiento: fechaNacimiento,
                    nivel: nivel,
                    numeroPartidos: numeroPartidos,
                    role: role
                })
            });
            if (response.ok) {
                const userData = await response.json();
                setUsers(userData.usuarios);
                setShowModificarModal(false);
                window.location.reload();
            } else {
                console.error('Error:', response);
            }
        } catch (error) {
            console.error('Error al modificar usuario:', error);
        }
    };

    const Eleminar = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/eleminar-usuario', {
                method: "POST",
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: selectedUser,
                })
            });
            if (response.ok) {
                const userData = await response.json();
                window.location.reload();
            } else {
                console.error('Error:', response);
            }
        } catch (error) {
            console.error('Error al modificar usuario:', error);
        }
    };

    // const Ver = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch('http://localhost:8000/api/ver-usuario', {
    //             method: "POST",
    //             headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //                 user_id: selectedUser,
    //             })
    //         });
    //         if (response.ok) {
    //             const userData = await response.json();
    //             window.location.reload();
    //         } else {
    //             console.error('Error:', response);
    //         }
    //     } catch (error) {
    //         console.error('Error al modificar usuario:', error);
    //     }
    // };

    const Buscar = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:8000/api/buscar-usuario', {
                method: "POST",
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    searchText: searchText
                })
            });
            if (response.ok) {
                const userData = await response.json();
                console.log(userData)
                setUsers(userData)
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
                <h4 className='d-flex justify-content-center mb-2'>Lista usuarios</h4>
                <div>
                    <div className='m-3'>Buscar usuario:</div>
                    <Form>
                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                            <Form.Group className="mb-3 me-2" controlId="exampleForm.ControlInput1">
                                <Form.Control type="text" placeholder="Usuario" value={searchText} onChange={(e) => setSearchText(e.target.value)}  required />
                            </Form.Group>
                            <Button type='submit' variant="primary" className=' m-0' onClick={Buscar}>Buscar</Button>
                        </div>
                    </Form>
                </div>
                <hr className='my-5' />
                <ListGroup as="ol" className="custom-list-group" style={{ border: "white" }}>
                    {users.map((user, index) => (
                        <ListGroup.Item key={index} as="li" className="d-flex justify-content-between align-items-center py-1" style={{ borderBottom: "white solid 1px" }} action>
                            <div className="my-3 me-auto" onClick={handleUsuarioClick}>
                                <div className="fw-bold">{user.name}</div>
                            </div>
                            <div>
                                <Button variant="info" className='mx-2' onClick={() => handleModificarClick(user)}>Modificar</Button>
                                <Button variant="danger" onClick={() => handleEliminarClick(user)}>Eliminar</Button>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </main>

            {/* Modificar Usuario Modal */}
            <Modal show={showModificarModal} onHide={handleCloseModificarModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={modificar}>
                        <Form.Group controlId="formName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail" className="mt-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formSueldo" className="mt-3">
                            <Form.Label>Sueldo</Form.Label>
                            <Form.Control
                                type="text"
                                value={sueldo}
                                onChange={(e) => setSueldo(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formGenero" className="mt-3">
                            <Form.Label>Género</Form.Label>
                            <Form.Control
                                as="select"
                                value={genero}
                                onChange={(e) => setGenero(e.target.value)}
                            >
                                <option value="">Selecciona tu género</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formFechaNacimiento" className="mt-3">
                            <Form.Label>Fecha de Nacimiento</Form.Label>
                            <Form.Control
                                type="date"
                                value={fechaNacimiento}
                                onChange={(e) => setFechaNacimiento(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formNivel" className="mt-3">
                            <Form.Label>Nivel</Form.Label>
                            <Form.Control
                                as="select"
                                value={nivel}
                                onChange={(e) => setNivel(e.target.value)}
                            >
                                <option value="">Selecciona tu nivel</option>
                                <option value="Bajo">Bajo</option>
                                <option value="Medio">Medio</option>
                                <option value="Avanzado">Avanzado</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formNumeroPartidos" className="mt-3">
                            <Form.Label>Número de Partidos</Form.Label>
                            <Form.Control
                                type="number"
                                value={numeroPartidos}
                                onChange={(e) => setNumeroPartidos(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formRole" className="mt-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                as="select"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="user">user
                                </option>
                                <option value="admin">admin</option>
                                <option value="organizador">organizador</option>
                            </Form.Control>
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
                    <Button variant="danger" onClick={Eleminar}>
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
                    <h5>Nombre: {name}</h5>
                    <p>Email: {email}</p>
                    {/* Agrega aquí más detalles del usuario según tus necesidades */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUsuarioModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
}

export default Usuarios;