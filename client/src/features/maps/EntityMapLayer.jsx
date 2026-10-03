import { memo } from 'react';
import { useMonitoring } from '../../services/MonitoringContext';
import { Marker, Popup } from 'react-leaflet';
import { getEntityIcon } from '../../services/mapIcons';  // Gunakan icon yang sudah Anda buat

// Pisahkan EntityMarker dan gunakan memo agar React tidak merender ulang kapal yang tidak bergerak
const EntityMarker = memo(({ data, activeMode, id, onSelect }) => {
  // Gunakan fallback kapitalisasi yang sama seperti sebelumnya
  const lat = data.latitude || data.lat;
  const lng = data.longitude || data.lon || data.lng;
  const heading = data.course || data.heading || data.Heading || 0;

  if (!lat || !lng) return null;

  return (
    <Marker
      position={[lat, lng]}
      icon={getEntityIcon(activeMode, heading)}
      eventHandlers={{
        click: () => onSelect(id),
      }}
    >
      {/* Opsional: Tambahkan tooltip/popup cepat jika diperlukan */}
    </Marker>
  );
});

// Komponen Utama Layer
function EntityMapLayer() {
  const { activeMarkers, activeMode, setSelectedEntityId } = useMonitoring();

  // Ubah object { "525119038": {...data} } menjadi array [{...data}]
  const markersArray = Object.values(activeMarkers);

  if (markersArray.length === 0) return null;

  return (
    <>
      {markersArray.map((data) => {
        // Ekstrak ID agar kebal terhadap perbedaan format API
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
