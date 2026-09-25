import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Komponen pembantu untuk memaksa Leaflet menghitung ulang ukurannya setelah routing
function MapResizer() {
  const map = useMap();
  useEffect(() => {
    // Memaksa recalculate size agar peta tidak abu-abu setelah navigasi
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  return null;
}

function MapCanvas() {
  const centerMap = [-2.548926, 118.014863];

  return (
    <div className='absolute inset-0 z-0 h-full w-full'>
      <MapContainer
        center={centerMap}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }} // Memastikan tinggi peta pasti 100%
      >
        <MapResizer />

        {/* Map openstreetmap / Esri */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
          attribution='Tiles &copy; <a href="https://www.esri.com/">Esri</a>'
        />

        {/* Marker example */}
        <Marker position={centerMap}>
          <Popup>
            <div className='text-green-500 font-semibold'>
              Ini adalah contoh
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapCanvas;
