import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

function MapCanvas() {
  const centerMap = [-2.548926, 118.014863];

  return (
    <MapContainer center={centerMap} className='flex-1 relative z-0' zoom={5} scrollWheelZoom={true}>
      {/* Map openstreetmap  */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Marker example  */}
      <Marker position={centerMap}>
        <Popup>
          <div className='text-green-500'>
            Ini adalah contoh
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default MapCanvas;
