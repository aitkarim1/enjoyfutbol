import React from 'react'
import { Badge, Button, ListGroup } from 'react-bootstrap'
import Aside from '../components/Aside'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faCalendarDays, faLocationDot, faPersonRunning } from '@fortawesome/free-solid-svg-icons'

function Partido() {
  return (
    <section>
      <Aside />
      <main>
        <div>
            <ListGroup as="ol" className="custom-list-group m-0 p-0 mb-2">
                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center px-5" style={{ paddingTop: "60px" }}>
                    <div className="my-2 me-auto">
                        <div className="fw-bold" style={{ display: "flex" }}>
                        <div><div>montjuic</div><div style={{ fontWeight: "100" }}>7v7</div></div>
                        </div>
                    </div>
                    <Badge bg="primary" pill className="me-2">14</Badge>
                </ListGroup.Item>
            </ListGroup>
        </div>
        <div>
            <ListGroup as="ol" className="custom-list-group m-0 p-0" style={{ backgroundColor: "transparent" }}>
                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center px-5" style={{ backgroundColor: "transparent" }}>
                    <div className=" me-auto">
                      <div className="fw-bold" style={{ display: "flex" }}>
                        <div style={{ display: "flex", alignItems: "center" }}><FontAwesomeIcon icon={faCalendarDays} size="2x" /></div>
                        <div className="vr vr-blurry" style={{height: "50px", alignSelf: "center", marginLeft: "7px", marginRight: "7px", color: "white"}}></div>
                        <div><div>miercoles 15 mayo, 2024</div><div style={{ fontWeight: "100" }}>7:30-8:30a.m (60min)</div></div>
                      </div>
                    </div>
                </ListGroup.Item>
            </ListGroup>
            <ListGroup as="ol" className="custom-list-group m-0 p-0" style={{ backgroundColor: "transparent" }}>
                <ListGroup.Item as="li" className="item-hover d-flex justify-content-between align-items-center px-5" style={{ backgroundColor: "transparent" }} action>
                    <div className=" me-auto">
                      <div className="fw-bold" style={{ display: "flex" }}>
                        <div style={{ display: "flex", alignItems: "center" }}><FontAwesomeIcon icon={faLocationDot} size="2x" /></div>
                        <div className="vr vr-blurry" style={{height: "50px", alignSelf: "center", marginLeft: "7px", marginRight: "7px", color: "white"}}></div>
                        <div><div>CF la catalana</div><div style={{ fontWeight: "100" }}>Calle tomas broton, 36</div></div>
                      </div>
                    </div>
                    <FontAwesomeIcon icon={faAngleRight} />
                </ListGroup.Item>
            </ListGroup>
        </div>
        <div className='my-5'>
            <h4>Descripcion</h4>
            <p style={{ fontWeight: "100" }}>descripcion del partido aqui</p>
        </div>
        <hr className='my-5' />
        <div className='my-5'>
            <h4>Jugadores</h4>
            <ListGroup as="ol" className="custom-list-group m-0 p-0">
            <div className="row">
                <div className="col-md-6">
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center p-3 my-2">
                        <div className="me-auto">
                            <div className="fw-bold" style={{ display: "flex" }}>
                                <div><FontAwesomeIcon icon={faPersonRunning} /></div>
                                <div className='mx-2'>karm</div>
                            </div>
                        </div>
                    </ListGroup.Item>
                </div>
                <div className="col-md-6">
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center p-3 my-2">
                        <div className="me-auto">
                            <div className="fw-bold" style={{ display: "flex" }}>
                                <div><FontAwesomeIcon icon={faPersonRunning} /></div>
                                <div className='mx-2'>karm</div>
                            </div>
                        </div>
                    </ListGroup.Item>
                </div>
                <div className="col-md-6">
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center p-3 my-2">
                        <div className="me-auto">
                            <div className="fw-bold" style={{ display: "flex" }}>
                                <div><FontAwesomeIcon icon={faPersonRunning} /></div>
                                <div className='mx-2'>karm</div>
                            </div>
                        </div>
                    </ListGroup.Item>
                </div>
            </div>
            </ListGroup>
        </div>
        <div style={{ backgroundColor: "black" }}>
            <Button variant='success' className='mb-3' style={{ width: "70%", marginTop: "3px", position: "fixed", bottom: 0 }}>Unirme al partido</Button>
        </div>
      </main>
    </section>
  )
}

export default Partido