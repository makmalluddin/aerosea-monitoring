import { Marker, Popup } from 'react-leaflet';
import { useMonitoring } from '../../services/MonitoringContext';
import { getEntityIcon } from '../../services/mapIcons.jsx'

function HistoricalMapLayer() {
  const { activeMarkers, activeMode } = useMonitoring();

  // Convert hash map to array 
  const markersArray = Object.values(activeMarkers);

  // If data does not exist, make sure not to render anything
  if (markersArray.length === 0) return null;

  return (
    <>
      {markersArray.map((data) => {
        const id = data.mmsi || data.callsign;
        const lat = data.latitude;
        const lng = data.longitude;
        const heading = data.course || data.heading || 0;
        const speed = data.speed || 0;

        if (!lat || !lng) return null;

        return (
          <Marker
            key={id}
            position={[lat, lng]}
            icon={getEntityIcon(activeMode, heading)}
          >
            <Popup className="rounded-lg">
              <div className="font-sans text-sm">
                <strong className="block text-accent-color mb-1">
                  {activeMode === 'Ship' ? 'Kapal' : 'Pesawat'} ({id})
                </strong>
                <p className="m-0 text-text-secondary">Kecepatan: {speed} knots</p>
                <p className="m-0 text-text-secondary">Arah: {heading}°</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

export default HistoricalMapLayer;
