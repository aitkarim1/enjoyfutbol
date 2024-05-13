import React from 'react'
import Aside from '../components/Aside'
import { Badge, Button, Form, ListGroup } from 'react-bootstrap'
import { faAngleRight, faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Partidos() {
    return (
        <section>
            <Aside />
            <main>
                <h4 className='d-flex justify-content-center mb-2'>Partidos</h4>
                <div>
                    <div>
                        <div className='my-4'>
                            <div className='m-3'>Filtrar los partidos:</div>
                            <Form>
                                <div style={{ display: "flex" }}>
                                    <Form.Select aria-label="Default select example" className='mx-2 w-25'>
                                        <option>Ciudad</option>
                                        <option value="1">Barcelona</option>
                                        <option value="2">Zaragoza</option>
                                    </Form.Select>
                                    <Form.Group controlId="duedate" className='mx-2'>
                                        <Form.Control type="date" name="duedate" placeholder="Due date" />
                                    </Form.Group>
                                    <Button type='submit' variant="primary" className='mx-2 w-25'>Buscar</Button>
                                </div>
                            </Form>
                        </div>
                        <p>Hoy, dom 12 mayo, 2024</p>
                        <div>
                            <ListGroup as="ol" className="custom-list-group" style={{ border: "white" }}>
                                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center" action>
                                    <div className="my-2 me-auto">
                                        <div className="fw-bold" style={{ display: "flex" }}>
                                            <div><div>8:00</div><div>a.m</div></div>
                                            <div className="vr vr-blurry" style={{ height: "50px", alignSelf: "center", marginLeft: "7px", marginRight: "7px", color: "white" }}></div>
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
                        </div>
                    </div>
                </div>
            </main>
        </section>
    )
}

export default Partidos