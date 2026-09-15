import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function App() {
  const centerMap = [-2.548926, 118.014863];

  return (
    <MapContainer center={centerMap} zoom={5} style={{ height: '100vh', width: '100%' }} scrollWheelZoom={true}>

      {/* 1. Base Layer: Gambar Peta dari OpenStreetMap */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* 2. Overlay Layer: Titik Marker */}
      <Marker position={centerMap}>
        <Popup>
          Halo! <br /> Ini adalah titik pusat Aerosea.
        </Popup>
      </Marker>

    </MapContainer>
  )
}

export default App;
