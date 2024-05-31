import React, { useEffect, useState } from 'react'
import { Badge, Button, Form, ListGroup, Modal } from 'react-bootstrap'
import Aside from '../components/Aside'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faCalendarDays, faLocationDot, faPersonRunning } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'
import { useAuth } from '../components/AuthUser'


function Partido() {
    const { user } = useAuth();
    const [partido, setPartido] = useState([])
    const [campo, setCampo] = useState([])
    const [campos, setCampos] = useState([])
    const [jugadores, setJugadores] = useState([])
    const [partidosCheck, setPartidosCheck] = useState(null);
    const [maxJugadores, setMaxJugadores] = useState(null)
    const params = useParams();

    const [campoModificar, setCampoModificar] = useState()
    const [descripcion, setDescripcion] = useState()
    const [fecha, setFecha] = useState()
    const [tipo, setTipo] = useState()
    const [horaEmpezar, setHoraEmpezar] = useState()
    const [horaTerminar, setHoraTerminar] = useState()
    const [coste, setCoste] = useState()

    const [showModalUnirse, setShowModalUnirse] = useState(false)
    const handleShowModalUnirse = () => { setShowModalUnirse(true) }
    const handleCloseModalUnirse = () => { setShowModalUnirse(false) }

    const [showModalCancelar, setShowModalCancelar] = useState(false)
    const handleShowModalCancelar = () => { setShowModalCancelar(true) }
    const handleCloseModalCancelar = () => { setShowModalCancelar(false) }

    const [showModalModificar, setShowModalModificar] = useState(false)
    const handleShowModalModificar = () => { setShowModalModificar(true) }
    const handleCloseModalModificar = () => { setShowModalModificar(false) }

    const [showModalAbandonar, setShowModalAbandonar] = useState(false);
    const handleShowModalAbandonar = () => setShowModalAbandonar(true);
    const handleCloseModalAbandonar = () => setShowModalAbandonar(false);


    const fetchPartidoYCampo = async () => {
        try {
            // Primera solicitud: obtener detalles del partido
            const responsePartido = await fetch('http://localhost:8000/api/get-partido-by-id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: params.id
                })
            });

            if (responsePartido.ok) {
                const partidoData = await responsePartido.json();
                setPartido(partidoData)
                setPartidosCheck(partidoData)
                setMaxJugadores(partidoData.tipo ? parseInt(partidoData.tipo.split('v')[0]) * 2 : 0)

                setCampoModificar(partidoData.campo_id);
                setDescripcion(partidoData.descripcion);
                setTipo(partidoData.tipo);
                setFecha(partidoData.fecha);
                setHoraEmpezar(partidoData.horaEmpezar);
                setHoraTerminar(partidoData.horaTerminar);
                setCoste(partidoData.coste);

                const campoId = partidoData.campo_id;
                const responseCampo = await fetch('http://localhost:8000/api/get-campo-by-id', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: campoId
                    })
                });

                if (responseCampo.ok) {
                    const campoData = await responseCampo.json();
                    console.log(campoData)
                    setCampo(campoData)
                } else {
                    console.error('Error al buscar campo:', responseCampo.statusText);
                }
            } else {
                console.error('Error al buscar partido:', responsePartido.statusText);
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    const fetchJugadores = async () => {
        try {
            // Primera solicitud: obtener detalles del partido
            const responsePartido = await fetch('http://localhost:8000/api/get-usuarios-partido', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    partido_id: params.id
                })
            });

            if (responsePartido.ok) {
                const partidoData = await responsePartido.json();
                setJugadores(partidoData)
                console.log(jugadores.length)
            } else {
                console.error('Error al buscar partido:', responsePartido.statusText);
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    const fetchCampos = async () => {
        try {
            // Primera solicitud: obtener detalles del partido
            const responsePartido = await fetch('http://localhost:8000/api/get-campos', {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (responsePartido.ok) {
                const partidoData = await responsePartido.json();
                setCampos(partidoData)
                console.log(partidoData)
            } else {
                console.error('Error al buscar partido:', responsePartido.statusText);
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    const modificarPartido = async (e) => {
        e.preventDefault()
        try {
            // Primera solicitud: obtener detalles del partido
            const responsePartido = await fetch('http://localhost:8000/api/modificar-partido', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    partido_id: params.id,
                    campo_id: campoModificar,
                    descripcion: descripcion,
                    tipo: tipo,
                    fecha: fecha,
                    horaEmpezar: horaEmpezar,
                    horaTerminar: horaTerminar,
                    coste: coste
                })
            });

            if (responsePartido.ok) {
                window.location.reload();
            } else {
                console.error('Error al buscar partido:', responsePartido.statusText);
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    const abandonarPartido = async (e) => {
        e.preventDefault()
        try {
            // Primera solicitud: obtener detalles del partido
            const responsePartido = await fetch('http://localhost:8000/api/abandonar-partido', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    partido_id: params.id,
                    user_id: user.id
                })
            });

            if (responsePartido.ok) {
                window.location.reload();
            } else {
                console.error('Error al buscar partido:', responsePartido.statusText);
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    useEffect(() => {
        fetchPartidoYCampo();
        fetchJugadores()
        fetchCampos()
    }, []);

    function fechaFormateada(fecha) {
        const nuevaFecha = new Date(fecha);
        return nuevaFecha.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    }

    const pagar = async () => {
        try {
            // Primera solicitud: obtener detalles del partido
            const responsePartido = await fetch('http://localhost:8000/api/añadir-usuario-partido', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user.id,
                    partido_id: params.id,
                    coste: partido.coste
                })
            });

            if (responsePartido.ok) {
                window.location.reload();
            } else {
                console.error('Error al buscar partido:', responsePartido.statusText);
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }


    return (
        <section>
            <Aside />
            <main>
                {partidosCheck !== null && (
                    <>
                        <div>
                            <ListGroup as="ol" className="custom-list-group m-0 p-0 mb-2">
                                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center px-5" style={{ paddingTop: "60px" }}>
                                    <div className="my-2 me-auto">
                                        <div className="fw-bold" style={{ display: "flex" }}>
                                            <div><div>{campo.nombre}</div><div style={{ fontWeight: "100" }}>{partido.tipo}</div></div>
                                        </div>
                                    </div>
                                    {maxJugadores && (<Badge bg={jugadores.length === maxJugadores ? "danger" : "primary"} pill className="me-2">{jugadores.length}/{maxJugadores}</Badge>)}
                                </ListGroup.Item>
                            </ListGroup>
                        </div>
                        <div>
                            <ListGroup as="ol" className="custom-list-group m-0 p-0" style={{ backgroundColor: "transparent" }}>
                                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center px-5" style={{ backgroundColor: "transparent" }}>
                                    <div className=" me-auto">
                                        <div className="fw-bold" style={{ display: "flex" }}>
                                            <div style={{ display: "flex", alignItems: "center" }}><FontAwesomeIcon icon={faCalendarDays} size="2x" /></div>
                                            <div className="vr vr-blurry" style={{ height: "50px", alignSelf: "center", marginLeft: "7px", marginRight: "7px", color: "white" }}></div>
                                            {partido.fecha && (<div><div>{fechaFormateada(partido.fecha)}</div><div style={{ fontWeight: "100" }}>{partido.horaEmpezar}-{partido.horaTerminar} ({partido.duracion}min)</div></div>)}
                                        </div>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                            <ListGroup as="ol" className="custom-list-group m-0 p-0" style={{ backgroundColor: "transparent" }}>
                                <ListGroup.Item as="li" className="item-hover d-flex justify-content-between align-items-center px-5" style={{ backgroundColor: "transparent" }} action>
                                    <div className=" me-auto">
                                        <div className="fw-bold" style={{ display: "flex" }}>
                                            <div style={{ display: "flex", alignItems: "center" }}><FontAwesomeIcon icon={faLocationDot} size="2x" /></div>
                                            <div className="vr vr-blurry" style={{ height: "50px", alignSelf: "center", marginLeft: "7px", marginRight: "7px", color: "white" }}></div>
                                            {campo && (<div><div>{campo.nombre}</div><div style={{ fontWeight: "100" }}>{campo.ubicacion}</div></div>)}
                                        </div>
                                    </div>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </ListGroup.Item>
                            </ListGroup>
                        </div>
                        <div className='my-5'>
                            <h4>Descripcion</h4>
                            <p style={{ fontWeight: "100" }}>{partido.descripcion}</p>
                        </div>
                        <hr className='my-5' />
                        <div className='my-5'>
                            <h4>Jugadores</h4>
                            <ListGroup as="ol" className="custom-list-group m-0 p-0">
                                <div className="row">
                                    {jugadores.length > 0 && (
                                        jugadores.map((jugador, index) => (
                                            <div key={index} className="col-md-6">
                                                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center p-3 my-2">
                                                    <div className="me-auto">
                                                        <div className="fw-bold" style={{ display: "flex" }}>
                                                            <div><FontAwesomeIcon icon={faPersonRunning} /></div>
                                                            <div className='mx-2'>{jugador.name}</div>
                                                        </div>
                                                    </div>
                                                </ListGroup.Item>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </ListGroup>
                        </div>
                        {user.role === "user" && (
                            jugadores.some(jugador => jugador.id === user.id) ? (
                                <div style={{ display: "flex", flexDirection: "column", width: "100%", marginBottom: "10px" }}>
                                    <Button variant='warning' style={{ marginBottom: "10px" }} onClick={handleShowModalUnirse}>Chat del partido</Button>
                                    <Button variant='danger' className='mb-3' onClick={handleShowModalAbandonar}>Abandonar el partido</Button>
                                </div>

                            ) : (
                                jugadores.length < maxJugadores && (
                                    <Button variant='success' className='mb-3' style={{ width: "70%", marginTop: "3px", position: "fixed", bottom: 0 }} onClick={handleShowModalUnirse}>Unirme al partido por <strong>{partido.coste}€</strong></Button>
                                )
                            )
                        )}
                        {user.role === "admin" && user.role === "organizador" && (
                            <div style={{ width: "70%", marginTop: "3px", position: "fixed", bottom: 0 }}>
                                <div style={{ display: "flex" }}>
                                    <Button variant='info' className='mb-3 mx-4' style={{ width: "50%" }} onClick={handleShowModalModificar}>Modificar partido</Button>
                                    <Button variant='danger' className='mb-3 mx-4' style={{ width: "50%" }} onClick={handleShowModalCancelar}>Cancelar partido</Button>
                                </div>
                            </div>
                        )}

                    </>
                )}
            </main>

            <Modal show={showModalUnirse} onHide={handleCloseModalUnirse}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Inscripción</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Sueldo: <strong>{user.sueldo}€</strong></p>
                    <p>Coste del partido: <strong>{partido.coste}€</strong></p>
                    {parseFloat(user.sueldo) < parseFloat(partido.coste) ? (
                        <>
                            <Button variant="primary" disabled>Pagar y Unirse</Button>
                            <br /><small style={{ color: "red" }}>No tienes suficiente saldo para unirte a este partido.</small>
                        </>
                    ) : (
                        <Button variant="primary" onClick={pagar}>Pagar y Unirse</Button>
                    )}

                </Modal.Body>
            </Modal>

            <Modal show={showModalCancelar} onHide={handleCloseModalCancelar}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Cancelación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>¿Estás seguro de que deseas cancelar este partido?</p>
                    <Button variant="danger" className='mx-2y'>Sí, Cancelar</Button>
                    <Button variant="secondary" onClick={handleCloseModalCancelar}>No, Volver</Button>
                </Modal.Body>
            </Modal>

            <Modal show={showModalModificar} onHide={handleCloseModalModificar}>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar Partido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={modificarPartido}>
                        <Form.Group controlId="formNombre" className='my-2'>
                            <Form.Label>Campo</Form.Label>
                            <Form.Select value={campoModificar} onChange={(e) => setCampoModificar(e.target.value)} required>
                                {campos.map(campo => (
                                    <option key={campo.id} value={campo.id}>{campo.ciudad}, {campo.nombre}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formDescripcion" className='my-2'>
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control as="textarea" rows={3} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="formTipo" className='my-2'>
                            <Form.Label>Tipo</Form.Label>
                            <Form.Select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                                <option value="5v5">5v5</option>
                                <option value="7v7">7v7</option>
                                <option value="9v9">9v9</option>
                                <option value="11v11">11v11</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formFecha" className='my-2'>
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="formHoraEmpezar" className='my-2'>
                            <Form.Label>Hora de empezar</Form.Label>
                            <Form.Control type="time" value={horaEmpezar} onChange={(e) => setHoraEmpezar(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="formHoraTerminar" className='my-2'>
                            <Form.Label>Hora de terminar</Form.Label>
                            <Form.Control type="time" value={horaTerminar} onChange={(e) => setHoraTerminar(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="formCoste" className='my-2 mb-2'>
                            <Form.Label>Coste</Form.Label>
                            <Form.Control type="number" value={coste} onChange={(e) => setCoste(e.target.value)} required />
                        </Form.Group>
                        <Button type='submit' variant="primary" className='mx-1'>Guardar Cambios</Button>
                        <Button variant="secondary" className='mx-1' onClick={handleCloseModalModificar}>Cancelar</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showModalAbandonar} onHide={handleCloseModalAbandonar}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Abandono</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>¿Estás seguro de que deseas abandonar el partido?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalAbandonar}>Cancelar</Button>
                    <Button variant="danger" onClick={abandonarPartido}>Abandonar</Button>
                </Modal.Footer>
            </Modal>
        </section>
    )
}

export default Partido