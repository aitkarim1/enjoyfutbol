import { faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Aside from '../components/Aside'


function MisPartidos() {
  return (
    <section>
      <Aside />
      <main>
        <h4 className='d-flex justify-content-center mb-2'>Mis Partidos</h4>
          <div>
            <h5>Partidos</h5>
            <p style={{ fontWeight: "100" }}>Partidos de futbol en los que estas inscrito</p><br/>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "center" }}><FontAwesomeIcon icon={faChartSimple} size="5x" /></div><br/>
                <div><p>No tienes ningun partido actualmente</p></div>
              </div>
            </div>
          </div>
      </main>
    </section>
  )
}

export default MisPartidos