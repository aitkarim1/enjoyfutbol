import React from 'react'
import Aside from '../components/Aside'
import { Badge, Button, ListGroup } from 'react-bootstrap'
import { faAngleRight, faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Home() {
  return (
    <section>
      <Aside />
      <main>
        <h4 className='d-flex justify-content-center mb-2'>Principal</h4>
        <div>
          <div>
            <h5>Partidos</h5>
            <p style={{ fontWeight: "100" }}>Partidos de futbol disponibles actualmente, Elige un partido</p><br/>
            <p>Hoy, dom 12 mayo, 2024</p>
            <div>
              <ListGroup as="ol" className="custom-list-group" style={{ border: "white" }}>
                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center" action>
                    <div className="my-2 me-auto">
                      <div className="fw-bold" style={{ display: "flex" }}>
                        <div><div>8:00</div><div>a.m</div></div>
                        <div className="vr vr-blurry" style={{height: "50px", alignSelf: "center", marginLeft: "7px", marginRight: "7px", color: "white"}}></div>
                        <div><div>montjuic</div><div>7v7</div></div>
                      </div>
                      
                    </div>
                    <Badge bg="primary" pill className="me-2">14</Badge>
                    <FontAwesomeIcon icon={faAngleRight} />
                </ListGroup.Item>
                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center" action>
                    <div className="my-3 me-auto">
                        <div className="fw-bold">Subheading</div>
                    </div>
                    <Badge bg="primary" pill className="me-2">14</Badge>
                    <FontAwesomeIcon icon={faAngleRight} />
                </ListGroup.Item>
                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center" action>
                    <div className="my-3 me-auto">
                        <div className="fw-bold">Subheading</div>
                    </div>
                    <Badge bg="primary" pill className="me-2">14</Badge>
                    <FontAwesomeIcon icon={faAngleRight} />
                </ListGroup.Item>
              </ListGroup>
              <Button variant="outline-secondary" style={{ width: "100%", marginTop: "3px", color: "white" }} href="/partidos">Ver mas</Button>
            </div>
          </div>
          <hr className='my-5' />
          <div>
            <h5>Torneos</h5>
            <p style={{ fontWeight: "100" }}>Torneos de futbol disponibles actualmente, Elige un partido</p><br/>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "center" }}><FontAwesomeIcon icon={faChartSimple} size="5x" /></div><br/>
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