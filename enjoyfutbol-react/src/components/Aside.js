import React, { useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTh, faCalendar, faFutbol, faLocationDot, faLock } from '@fortawesome/free-solid-svg-icons';

function Aside() {
  const [user, setUser] = useState("admin")
  return (
    <aside>
      <ListGroup className="custom-list-group">
        <ListGroup.Item action variant='dark' className="list-group-item-with-icon" href="/">
            <FontAwesomeIcon icon={faHome} className="icon" /> <span className="icon-text">Principal</span>
        </ListGroup.Item>
        <ListGroup.Item action variant='dark' className="list-group-item-with-icon" href="MapCampos">
            <FontAwesomeIcon icon={faLocationDot} className="icon" /> <span className="icon-text">Map Campos</span>
        </ListGroup.Item>
        <ListGroup.Item action variant='dark' className="list-group-item-with-icon" href="partidos">
            <FontAwesomeIcon icon={faFutbol} className="icon" /> <span className="icon-text">Partidos</span>
        </ListGroup.Item>
        <ListGroup.Item action variant='dark' className="list-group-item-with-icon" href="MisPartidos">
            <FontAwesomeIcon icon={faCalendar} className="icon" /> <span className="icon-text">Mis partidos</span>
        </ListGroup.Item>
        {user === "admin" && ( 
          <ListGroup.Item action variant='dark' className="list-group-item-with-icon" href="Administrar">
            <FontAwesomeIcon icon={faLock} className="icon" /> <span className="icon-text">Administrar</span>
          </ListGroup.Item>
        )}
      </ListGroup>
    </aside>
  )
}

export default Aside