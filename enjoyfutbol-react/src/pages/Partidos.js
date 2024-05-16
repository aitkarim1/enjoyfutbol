import React, { useEffect, useState } from 'react'
import Aside from '../components/Aside'
import { Badge, Button, Form, ListGroup } from 'react-bootstrap'
import { faAngleRight, faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

function Partidos() {
    const [partidos, setPartidos] = useState([])
    const [campos, setCampos] = useState([])
    const [partidosCheck, setPartidosCheck] = useState(null)
    const [camposCheck, setCamposCheck] = useState(null)
    const [ciudad, setCiudad] = useState('Barcelona');
    const [nuevaCiudad, setNuevaCiudad] = useState('Barcelona');
    const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
    const [fechaFormateada, setFechaFormateada] = useState(new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));

    useEffect(() => {
        // Función para obtener los partidos
        const fetchPartidos = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/buscar-partidos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ciudad: ciudad,
                        fecha: fecha
                    })
                });
                if (response.ok) {
                    const data = await response.json();
                    setPartidos(data.partidos);
                    const nuevaFecha = new Date(fecha);
                    setFechaFormateada(
                        nuevaFecha.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                    );
                    setNuevaCiudad(ciudad)
                    setPartidosCheck(partidos.length)
                } else {
                    console.error('Error al buscar partidos:', response.statusText);
                }
            } catch (error) {
                console.error('Error al obtener los partidos:', error);
            }
        };

        // Llamar a la función para obtener los partidos cuando el componente se monta
        fetchPartidos();
    }, []);

    useEffect(() => {
        const fetchCampos = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/get-campos', {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setCampos(data.campo);
                    setCamposCheck(data.campo.length)
                } else {
                    console.error('Error al buscar partidos:', response.statusText);
                }
            } catch (error) {
                console.error('Error al obtener los partidos:', error);
            }
        };
        fetchCampos();
    }, []);

    const Buscar = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:8000/api/buscar-partidos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ciudad: ciudad,
                    fecha: fecha
                })
            });
            if (response.ok) {
                const data = await response.json();
                setPartidos(data.partidos);
                const nuevaFecha = new Date(fecha);
                setFechaFormateada(
                    nuevaFecha.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                );
                setNuevaCiudad(ciudad)
            } else {
                console.error('Error al buscar partidos:', response.statusText);
            }
        } catch (error) {
            console.error('Error al obtener los partidos:', error);
        }
    };


    return (
        <section>
            <Aside />
            <main>
                <h4 className='d-flex justify-content-center mb-2'>Partidos</h4>
                <div>
                    <div>
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
                            {partidosCheck !== null && camposCheck !== null && (
                                <ListGroup as="ol" className="custom-list-group" style={{ border: "white" }}>
                                    {partidos.length > 0 ? (
                                        partidos.map((partido, index) => (
                                            <Link key={index} to={`/partido/${partido.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                                                <ListGroup.Item key={index} as="li" className="d-flex justify-content-between align-items-center" action>
                                                    <div className="my-2 me-auto">
                                                        <div className="fw-bold" style={{ display: "flex" }}>
                                                            <div><div>{partido.hora}</div><div style={{ marginLeft: "5px" }}>a.m</div></div>
                                                            <div className="vr vr-blurry" style={{ height: "50px", alignSelf: "center", marginLeft: "7px", marginRight: "7px", color: "white" }}></div>
                                                            <div><div>{partido.campo_nombre}</div><div>{partido.tipo}</div></div>
                                                        </div>
                                                    </div>
                                                    <Badge bg="primary" pill className="me-2">{partido.jugadores}</Badge>
                                                    <FontAwesomeIcon icon={faAngleRight} />
                                                </ListGroup.Item>
                                            </Link>
                                        ))
                                    ) : (
                                        <div><br />
                                            <div style={{ display: "flex", justifyContent: "center" }}>
                                                <div>
                                                    <div style={{ display: "flex", justifyContent: "center" }}><FontAwesomeIcon icon={faChartSimple} size="5x" /></div><br />
                                                    <div><p>No hay partidos disponibles para este día</p></div>
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
        </section >
    )
}

export default Partidos