import React from 'react'
import Aside from '../components/Aside'
import { Control, Icon, divIcon, point } from "leaflet";
import { TileLayer,Marker,MapContainer,Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Button, Card } from 'react-bootstrap';

function MapCampos() {
    var position = [41.652810, -0.917670]
    const customIcon = new Icon({
        // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
        iconUrl: require("../asset/icons/iconoMapa.webp"), 
        iconSize: [30, 30] // size of the icon
      });
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
                    <Marker position={position} icon={customIcon}>
                    <Popup className='popup'>
                        <Card style={{ width: '14rem', border: "none" }}>
                        {/* <Card.Img variant="top" src={"images/"+proyecto.urlImage} /> */}
                        <Card.Body>
                            <Card.Title>Nombre</Card.Title>
                            <Card.Text>
                            Ubicacion
                            </Card.Text>
                            <Button variant="primary">Como llegar</Button>
                        </Card.Body>
                        </Card>
                    </Popup>
                    </Marker>
                    </MarkerClusterGroup>
                </MapContainer>
            </div>
        </div>
      </main>
    </section>
  )
}

export default MapCampos