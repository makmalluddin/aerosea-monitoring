import { memo } from 'react';
import { Marker } from 'react-leaflet';
import { useMonitoring } from '../../services/MonitoringContext';
import { getEntityIcon } from '../../services/mapIcons';

// Use react memo 
const EntityMarker = memo(({ data, activeMode, id }) => {
  const { setSelectedEntityId } = useMonitoring();

  const lat = data.latitude;
  const lng = data.longitude;
  const heading = data.course || data.Heading || 0;

  if (!lat || !lng) return null;

  return (
    <Marker
      position={[lat, lng]}
      icon={getEntityIcon(activeMode, heading)}
      eventHandlers={{
        click: () => setSelectedEntityId(id)
      }}
    />
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.data.latitude === nextProps.data.latitude &&
    prevProps.data.longitude === nextProps.data.longitude &&
    (prevProps.data.course || prevProps.data.Heading) === (nextProps.data.course || nextProps.data.Heading)
  );
});

function HistoricalMapLayer() {
  const { activeMarkers, activeMode } = useMonitoring();
  const markersArray = Object.values(activeMarkers);

  if (markersArray.length === 0) return null;

  return (
    <>
      {markersArray.map((data) => (
        <EntityMarker
          key={data.mmsi || data.Callsign}
          id={data.mmsi || data.Callsign}
          data={data}
          activeMode={activeMode}
        />
      ))}
    </>
  );
}

export default HistoricalMapLayer;
