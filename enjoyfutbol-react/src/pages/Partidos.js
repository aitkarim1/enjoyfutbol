import React, { useEffect, useState } from 'react';
import Aside from '../components/Aside';
import { Badge, Button, Form, ListGroup, Modal } from 'react-bootstrap';
import { faAngleRight, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthUser';

function Partidos() {
    const { user } = useAuth();
    const [partidos, setPartidos] = useState([]);
    const [campos, setCampos] = useState({});
    const [listacampos, setListaCampos] = useState([]);
    const [jugadoresPartidos, setJugadoresPartidos] = useState({});
    const [partidosCheck, setPartidosCheck] = useState(null);
    const [ciudad, setCiudad] = useState('Barcelona');
    const [nuevaCiudad, setNuevaCiudad] = useState('Barcelona');
    const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
    const [fechaFormateada, setFechaFormateada] = useState(new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));

    const [campoSeleccionado, setCampoSeleccionado] = useState('');
    const [descripcionPartido, setDescripcionPartido] = useState('');
    const [tipoPartido, setTipoPartido] = useState('3v3');
    const [fechaPartido, setFechaPartido] = useState('');
    const [horaInicioPartido, setHoraInicioPartido] = useState('');
    const [horaFinPartido, setHoraFinPartido] = useState('');
    const [costePartido, setCostePartido] = useState('');

    const [showModalAgregarPartido, setShowModalAgregarPartido] = useState(false);
    const handleShowModalAgregarPartido = () => setShowModalAgregarPartido(true);
    const handleCloseModalAgregarPartido = () => setShowModalAgregarPartido(false);

    // fetch para sacar solo los campos necesarios
    const fetchCampos = async (campoIds) => {
        console.log(campoIds)
        const campoPromises = campoIds.map(id =>
            fetch('http://localhost:8000/api/get-campo-by-id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            }).then(response => response.json())
        );
        // Esperar a que todas las promesas se resuelvan y obtener los datos de los campos
        const campoData = await Promise.all(campoPromises);
        console.log(campoData)
        // Para evitar datos de campos duplicados
        const camposMap = campoData.reduce((acc, campo) => {
            acc[campo.id] = campo;
            return acc;
        }, {});
        console.log(camposMap)
        return camposMap;
    };

    const fetchJugadores = async (partidoId) => {
        try {
            const response = await fetch('http://localhost:8000/api/get-usuarios-partido', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ partido_id: partidoId })
            });

            if (response.ok) {
                const jugadoresData = await response.json();
                return jugadoresData.length;
            } else {
                console.error('Error al buscar jugadores:', response.statusText);
                return 0;
            }
        } catch (error) {
            console.error('Error al obtener los jugadores:', error);
            return 0;
        }
    };

    const fetchPartidos = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/buscar-partidos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ciudad, fecha })
            });

            if (response.ok) {
                const partidoData = await response.json();
                setPartidos(partidoData);
                setPartidosCheck(partidoData.length);

                const campoIds = partidoData.map(partido => partido.campo_id);
                const camposMap = await fetchCampos(campoIds);
                setCampos(camposMap);

                const jugadoresPromises = partidoData.map(partido => fetchJugadores(partido.id));
                const jugadoresData = await Promise.all(jugadoresPromises);

                const jugadoresMap = partidoData.reduce((acc, partido, index) => {
                    acc[partido.id] = jugadoresData[index];
                    return acc;
                }, {});
                setJugadoresPartidos(jugadoresMap);

                const nuevaFecha = new Date(fecha);
                setFechaFormateada(
                    nuevaFecha.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                );
                setNuevaCiudad(ciudad);
            } else {
                console.error('Error al buscar partidos:', response.statusText);
            }
        } catch (error) {
            console.error('Error al obtener los partidos:', error);
        }
    };

    useEffect(() => {
        fetchPartidos()
        fetchListaCampos()
    }, []);

    const Buscar = async (e) => {
        e.preventDefault();
        await fetchPartidos();
    };

    const fetchListaCampos = async () => {
        try {
            // Primera solicitud: obtener detalles del partido
            const responsePartido = await fetch('http://localhost:8000/api/get-campos', {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (responsePartido.ok) {
                const partidoData = await responsePartido.json();
                setListaCampos(partidoData)
            } else {
                console.error('Error al buscar partido:', responsePartido.statusText);
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    const addPartido = async (e) => {
        e.preventDefault()
        try {
            // Primera solicitud: obtener detalles del partido
            const responsePartido = await fetch('http://localhost:8000/api/add-partido', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    campo: campoSeleccionado,
                    descripcion: descripcionPartido,
                    tipo: tipoPartido,
                    fecha: fechaPartido,
                    horaEmpezar: horaInicioPartido,
                    horaTerminar: horaFinPartido,
                    coste: costePartido
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

    return (
        <section>
            <Aside />
            <main>
                <h4 className='d-flex justify-content-center mb-2'>Partidos</h4>
                <div>
                    <div>
                        {user.role === "admin" && user.role === "organizador" && <Button variant='success' onClick={handleShowModalAgregarPartido}>Añadir partido</Button>}
                        <div className='my-4'>
                            <div className='m-3'>Filtrar los partidos:</div>
                            <Form onSubmit={Buscar}>
                                <div style={{ display: "flex" }}>
                                    <Form.Select aria-label="Default select example" className='mx-2 w-25' value={ciudad} onChange={(e) => setCiudad(e.target.value)}>
                                        <option value="Barcelona">Barcelona</option>
                                        <option value="Zaragoza">Zaragoza</option>
                                    </Form.Select>
                                    <Form.Group controlId="duedate" className='mx-2'>
                                        <Form.Control type="date" name="duedate" placeholder="Due date" value={fecha} onChange={(e) => setFecha(e.target.value)} min={new Date().toISOString().split('T')[0]} />
                                    </Form.Group>
                                    <Button type='submit' variant="primary" className='mx-2 w-25'>Buscar</Button>
                                </div>
                            </Form>
                        </div>
                        <p>{nuevaCiudad} El {fechaFormateada}</p>
                        <div>
                            {partidosCheck !== null && (
                                <ListGroup as="ol" className="custom-list-group" style={{ border: "white" }}>
                                    {partidos.length > 0 ? (
                                        partidos.map((partido, index) => {
                                            const maxJugadores = partido.tipo ? parseInt(partido.tipo.split('v')[0]) * 2 : 0;
                                            const numJugadores = jugadoresPartidos[partido.id] || 0;

                                            return (
                                                <Link key={index} to={`/partido/${partido.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center" action>
                                                        <div className="my-2 me-auto">
                                                            <div className="fw-bold" style={{ display: "flex" }}>
                                                                <div><div>{partido.horaEmpezar}</div><div style={{ marginLeft: "5px" }}>a.m</div></div>
                                                                <div className="vr vr-blurry" style={{ height: "50px", alignSelf: "center", marginLeft: "7px", marginRight: "7px", color: "white" }}></div>
                                                                <div><div>{campos[partido.campo_id]?.nombre}</div><div>{partido.tipo}</div></div>
                                                            </div>
                                                        </div>
                                                        <Badge bg={numJugadores === maxJugadores ? "danger" : "primary"} pill className="me-2">
                                                            {numJugadores}/{maxJugadores}
                                                        </Badge>
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </ListGroup.Item>
                                                </Link>
                                            );
                                        })
                                    ) : (
                                        <div><br />
                                            <div style={{ display: "flex", justifyContent: "center" }}>
                                                <div>
                                                    <div style={{ display: "flex", justifyContent: "center" }}><FontAwesomeIcon icon={faChartSimple} size="5x" /></div><br />
                                                    <div><p>No hay partidos disponibles para esta fecha</p></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </ListGroup>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Modal show={showModalAgregarPartido} onHide={handleCloseModalAgregarPartido}>
                <Modal.Header closeButton>
                    <Modal.Title>Añadir Partido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formCampo">
                            <Form.Label>Campo</Form.Label>
                            <Form.Select value={campoSeleccionado} onChange={(e) => setCampoSeleccionado(e.target.value)} required>
                                <option value="" disabled>Elegir campo</option>
                                {listacampos.map(campo => (
                                    <option key={campo.id} value={campo.id}>{campo.ciudad}, {campo.nombre}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formDescripcion">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control type="text" value={descripcionPartido} onChange={(e) => setDescripcionPartido(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formTipo">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control as="select" value={tipoPartido} onChange={(e) => setTipoPartido(e.target.value)} required>
                                <option value="5v5">5v5</option>
                                <option value="7v7">7v7</option>
                                <option value="9v9">9v9</option>
                                <option value="11v11">11v11</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formFecha">
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control type="date" value={fechaPartido} onChange={(e) => setFechaPartido(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group controlId="formHoraInicio">
                            <Form.Label>Hora de inicio</Form.Label>
                            <Form.Control type="time" value={horaInicioPartido} onChange={(e) => setHoraInicioPartido(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group controlId="formHoraFin">
                            <Form.Label>Hora de fin</Form.Label>
                            <Form.Control type="time" value={horaFinPartido} onChange={(e) => setHoraFinPartido(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group controlId="formCoste">
                            <Form.Label>Coste</Form.Label>
                            <Form.Control type="number" value={costePartido} onChange={(e) => setCostePartido(e.target.value)} required/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalAgregarPartido}>Cancelar</Button>
                    <Button variant="success" onClick={addPartido}>Añadir</Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
}

export default Partidos;
