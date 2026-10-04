import { memo } from 'react';
import { useMonitoring } from '../../services/MonitoringContext';
import { Marker, Tooltip } from 'react-leaflet';
import { getEntityIcon } from '../../services/mapIcons';

// Funtion to get entity by Memo to avoid react to re rendering
const EntityMarker = memo(({ data, activeMode, id, onSelect }) => {
  // Fallback to different data 
  const lat = data.latitude || data.lat;
  const lng = data.longitude || data.lon || data.lng;
  const heading = data.course || data.heading || data.Heading || data.cog || 0;
  const displayName = data.shipname || data.callsign || id;

  if (!lat || !lng) return null;

  return (
    <Marker
      position={[lat, lng]}
      icon={getEntityIcon(activeMode, heading)}
      eventHandlers={{
        click: () => onSelect(id),
      }}
    >
      <Tooltip direction="auto" offset={[0, -10]} opacity={0.9}>
        <div className="flex flex-col gap-1 text-sm min-w-120px">
          <span className="font-bold border-b border-gray-300 pb-1 mb-1">
            {displayName}
          </span>
          <div className="max-h-200px overflow-y-auto custom-scrollbar flex flex-col gap-1">
            {Object.entries(data).map(([key, value]) => {
              // Abaikan data yang kosong agar rapi
              if (value === null || value === undefined || value === '') return null;

              return (
                <div key={key} className="flex justify-between gap-4 border-b border-gray-100/50 pb-0.5">
                  <span className="text-gray-500 capitalize">{key.replace(/_/g, ' ')}</span>
                  <span className="font-semibold text-gray-800 text-right truncate">
                    {value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Tooltip>
    </Marker>
  );
});

// Function Main Layer
function EntityMapLayer() {
  const { activeMarkers, activeMode, setSelectedEntityId } = useMonitoring();
  const markersArray = Object.values(activeMarkers);

  if (markersArray.length === 0) return null;
  return (
    <>
      {markersArray.map((data) => {
        const id = data.mmsi || data.callsign || data.Callsign;
        return (
          <EntityMarker
            key={id}
            id={id}
            data={data}
            activeMode={activeMode}
            onSelect={setSelectedEntityId}
          />
        );
      })}
    </>
  );
}

export default EntityMapLayer;
