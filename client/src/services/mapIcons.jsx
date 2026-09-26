import L from 'leaflet';

// Function to set custom icon for ship and aircraft 
export const getEntityIcon = (mode, heading = 0) => {
  const strokeColor = mode === 'Ship' ? '#0ea5e9' : '#f59e0b';
  const svgPath = mode === 'Ship'
    ? '<path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M12 10v4"/><path d="M12 2v3"/>'
    : '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.5l-1.3 1.5c-.2.2-.2.6 0 .8L8 12 5 15l-3.2-.8c-.3 0-.6.2-.8.5L.2 16c-.2.2-.1.5.1.7L4 19l2.3 3.7c.2.2.5.3.7.1l1.3-1c.3-.2.5-.5.5-.8L8 18l3-3 7.8 5.6c.3.2.7.2.9 0l1.5-1.3c.3-.2.6-.6.5-1.1z"/>';

  const html = `
    <div style="transform: rotate(${heading}deg); transition: transform 0.3s ease-out; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="drop-shadow-md bg-surface-color/50 rounded-full p-0.5">
        ${svgPath}
      </svg>
    </div>
  `;

  return L.divIcon({
    html: html,
    className: 'bg-transparent border-none',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
};
