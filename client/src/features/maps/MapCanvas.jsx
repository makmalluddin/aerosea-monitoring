import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

function MapCanvas() {
  const centerMap = [-2.548926, 118.014863];

  return (
    <div className='absolute inset-0 z-0'>
      <MapContainer center={centerMap} className='w-full h-full' zoom={5} scrollWheelZoom={true}>
        {/* Map openstreetmap  */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
          attribution='Tiles &copy; <a href="https://www.esri.com/">Esri</a>'
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
    </div>
  )
}

export default MapCanvas;
