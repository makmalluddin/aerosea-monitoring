import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import HistoricalMapLayer from './HistoricalMapLayer';

// Function to help leaflet recalculate size after routing 
function MapResizer() {
  const map = useMap();
  useEffect(() => {
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
        style={{ height: '100%', width: '100%' }}
      >
        <MapResizer />

        {/* Map Esri */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
          attribution='Tiles &copy; <a href="https://www.esri.com/">Esri</a>'
        />

        {/* Layer for historical data */}
        <HistoricalMapLayer />
      </MapContainer>
    </div>
  );
}

export default MapCanvas;
