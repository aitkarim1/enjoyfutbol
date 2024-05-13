import React from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import Aside from '../components/Aside'
import { faCalendarDays, faPenToSquare, faPersonRunning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Profile() {
  return (
    <section>
      <Aside />
      <main>
        <div>
            <ListGroup as="ol" className="custom-list-group m-0 p-0" style={{ backgroundColor: "transparent" }}>
                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center px-5" style={{ backgroundColor: "transparent" }}>
                    <div className=" me-auto">
                      <div className="fw-bold" style={{ display: "flex" }}>
                        <div style={{ display: "flex", alignItems: "center", marginRight: "15px" }}><FontAwesomeIcon icon={faPersonRunning} size="2x" /></div>
                        <div><div style={{ fontSize: "19px" }}>kam ka</div><div style={{ fontWeight: "100", fontSize: "14px" }}>0 partidos jugados</div></div>
                      </div>
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </div>
        <div>
            <ListGroup as="ol" className="custom-list-group m-0 p-0" style={{ backgroundColor: "transparent" }}>
                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center px-5" style={{ backgroundColor: "transparent" }}>
                    <div className=" me-auto">
                      <div className="fw-bold" style={{ display: "flex" }}>
                        <div><div style={{ fontSize: "19px", color: "green" }}>€0.00</div><div style={{ fontWeight: "100", fontSize: "14px" }}>crédito</div></div>
                      </div>
                    </div>
                    <Button variant='success' style={{ width: "20%"}}>Pedir Crédito</Button>
                </ListGroup.Item>
            </ListGroup>
        </div>
        <div>
            <div>
                <ListGroup as="ol" className="custom-list-group m-0 p-0" style={{ backgroundColor: "transparent" }}>
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center" style={{ backgroundColor: "transparent" }}>
                        <div className=" me-auto">
                        <div className="fw-bold" style={{ display: "flex" }}>
                            <div style={{ fontSize: "19px" }}>Sobre mí</div>
                        </div>
                        </div >
                        <div style={{ display: "flex", cursor: "pointer" }}>
                            <div style={{ marginRight: "9px" }}>Edit</div><div><FontAwesomeIcon icon={faPenToSquare} /></div>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            </div>
            <div className="table-responsive">
            <table className="table table-dark">
              <tbody>
                <tr>
                  <td>Género:</td>
                  <td>Masculino</td>
                </tr>
                <tr>
                  <td>Fecha de nacimiento:</td>
                  <td>01 de enero de 1990</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </section>
  )
}

export default Profile