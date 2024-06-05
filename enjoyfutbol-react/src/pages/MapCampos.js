import React, { useEffect, useState } from 'react'
import Aside from '../components/Aside'
import { Control, Icon, divIcon, point } from "leaflet";
import { TileLayer, Marker, MapContainer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Button, Card } from 'react-bootstrap';

function MapCampos() {
  const [campos, setCampos] = useState([]);

  useEffect(() => {
    const fetchCampos = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/get-campos');
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setCampos(data);
        } else {
          console.error('Error al obtener los campos:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener los campos:', error);
      }
    };

    fetchCampos();
  }, []);

  const customIcon = new Icon({
    iconUrl: require("../asset/icons/iconoMapa.webp"),
    iconSize: [30, 30] // size of the icon
  });

  const handleComoLlegar = (latitud, longitud) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitud},${longitud}`;
    window.open(url, '_blank');
  };
  
  return (
    <section>
      <Aside />
      <main style={{ padding: "0", margin: "0", paddingTop: "10px" }}>
        <div>
          <div className='mapa'>
            <MapContainer center={[40.911955151705315, 0.1537488871630788]} zoom={6} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MarkerClusterGroup
                chunkedLoading
              >
                {campos.map(campo => (
                  <Marker key={campo.id} position={[campo.latitud, campo.longitud]} icon={customIcon}>
                    <Popup className='popup'>
                      <Card style={{ width: '14rem', border: "none" }}>
                        <Card.Body>
                          <Card.Title>{campo.nombre}</Card.Title>
                          <Card.Text>
                            {campo.ubicacion}
                          </Card.Text>
                          <Button variant="primary" onClick={() => handleComoLlegar(campo.latitud, campo.longitud)}>Como llegar</Button>
                        </Card.Body>
                      </Card>
                    </Popup>
                  </Marker>
                ))}
              </MarkerClusterGroup>
            </MapContainer>
          </div>
        </div>
      </main>
    </section>
  )
}

export default MapCampos