import L from 'leaflet';

export const getEntityIcon = (mode, heading = 0) => {
  const color = mode === 'Ship' ? '#0ea5e9' : '#f59e0b';

  const svgPath = mode === 'Ship'
    ? '<path d="M12 2 C 12 2, 7 8, 7 14 L 7 21 L 17 21 L 17 14 C 17 8, 12 2, 12 2 Z" />'
    : '<path d="M12 2.5a2.5 2.5 0 0 0-2.5 2.5v7l-7 4.5v2.5l7-2v5.5l-2 1.5v1.5l4.5-1.5 4.5 1.5v-1.5l-2-1.5v-5.5l7 2v-2.5l-7-4.5v-7a2.5 2.5 0 0 0-2.5-2.5z"/>';

  const html = `
    <div style="transform: rotate(${heading}deg); display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
      <svg width="60" height="60" viewBox="0 0 24 24" fill="${color}" stroke="#ffffff" stroke-width="1.5" stroke-linejoin="round" class="drop-shadow-lg">
        ${svgPath}
      </svg>
    </div>
  `;

  return L.divIcon({
    html: html,
    className: 'bg-transparent border-none',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  });
};
