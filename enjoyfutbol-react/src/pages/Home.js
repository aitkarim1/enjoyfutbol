import React, { useEffect, useState } from 'react'
import Aside from '../components/Aside'
import { Badge, Button, ListGroup } from 'react-bootstrap'
import { faAngleRight, faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

function Home() {
  const [partidos, setPartidos] = useState([])
  const [partidosCheck, setPartidosCheck] = useState(null)
  const [jugadoresPartidos, setJugadoresPartidos] = useState({});
  const [campos, setCampos] = useState({});
  const [ciudad, setCiudad] = useState('Barcelona');
  const [nuevaCiudad, setNuevaCiudad] = useState('Barcelona');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [fechaFormateada, setFechaFormateada] = useState(new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));


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
    fetchPartidos();
  }, []);

  return (
    <section>
      <Aside />
      <main>
        <h4 className='d-flex justify-content-center mb-2'>Principal</h4>
        <div>
          <div>
            <h5>Partidos</h5>
            <p style={{ fontWeight: "100" }}>Partidos de futbol disponibles actualmente, Elige un partido</p><br />
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
                                <div><div>{partido.horaEmpezar}</div><div style={{ marginLeft: "5px" }}>p.m</div></div>
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
              <Button variant="outline-secondary" style={{ width: "100%", marginTop: "3px", color: "white" }} href="/partidos">Ver mas</Button>
            </div>
          </div>
          <hr className='my-5' />
          <div>
            <h5>Torneos</h5>
            <p style={{ fontWeight: "100" }}>Torneos de futbol disponibles actualmente, Elige un partido</p><br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "center" }}><FontAwesomeIcon icon={faChartSimple} size="5x" /></div><br />
                <div><p>No hay torneos disponibles actualmente</p></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  )
}

export default Home