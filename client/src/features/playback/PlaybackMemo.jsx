import { memo } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { getEntityIcon } from '../../utils/mapIcons';

// Komponen ini HANYA akan re-render jika lat, lng, atau heading berubah
const EntityMarker = memo(({ data, activeMode, id }) => {
  const lat = data.latitude;
  const lng = data.longitude;
  const heading = data.course || data.heading || 0;
  const speed = data.speed || 0;

  if (!lat || !lng) return null;

  return (
    <Marker position={[lat, lng]} icon={getEntityIcon(activeMode, heading)}>
      <Popup className="rounded-lg">
        {/* ... isi popup ... */}
      </Popup>
    </Marker>
  );
}, (prevProps, nextProps) => {
  // Fungsi PlaybackMemobanding: Kembalikan TRUE jika posisi TIDAK berubah (jangan re-render)
  return (
    prevProps.data.latitude === nextProps.data.latitude &&
    prevProps.data.longitude === nextProps.data.longitude &&
    (prevProps.data.course || prevProps.data.heading) === (nextProps.data.course || nextProps.data.heading)
  );
});

export default EntityMarker; 
