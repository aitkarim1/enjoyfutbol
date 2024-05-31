import { faChartSimple, faFutbol, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Aside from '../components/Aside'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../components/AuthUser'

function Administrar() {
  const { user } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/home")
    }
  }, [])

  return (
    <section>
      <Aside />
      <main>
        <h4 className='d-flex justify-content-center mb-2'>Administrar</h4>
        <div>
          <h5>Usuarios</h5>
          <p style={{ fontWeight: "100" }}>Administrar los usuarios de la aplicacion</p><br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}><FontAwesomeIcon icon={faUser} size="5x" /></div><br />
              <div style={{ cursor: "pointer" }}><p><a href="/usuarios" style={{ textDecoration: 'none', color: 'inherit' }}>Administrar usuarios</a></p></div>
            </div>
          </div>
        </div>
        <hr className='my-5' />
        <div>
          <h5>Campos</h5>
          <p style={{ fontWeight: "100" }}>Administrar los campos de la aplicacion</p><br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}><FontAwesomeIcon icon={faFutbol} size="5x" /></div><br />
              <div style={{ cursor: "pointer" }}><p><a href="/campos" style={{ textDecoration: 'none', color: 'inherit' }}>Administrar campos</a></p></div>
            </div>
          </div>
        </div>
      </main>
    </section>
  )
}

export default Administrar