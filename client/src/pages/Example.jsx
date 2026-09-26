
import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { io } from 'socket.io-client';
import 'leaflet/dist/leaflet.css';

// Konfigurasi koneksi Socket.io ke backend Anda
const SOCKET_URL = 'http://localhost:5000';

// Fungsi Helper untuk membuat Ikon Dinamis yang bisa berputar
const createDynamicIcon = (type, heading) => {
  const rotasi = heading && heading <= 360 ? heading : 0;
  const isShip = type === 'ship';

  const color = isShip ? '#0056b3' : '#d32f2f'; // Biru untuk kapal, Merah untuk pesawat
  const symbol = isShip ? '⛴' : '✈';

  return L.divIcon({
    className: 'custom-icon',
    // Menggunakan text-shadow agar ikon tetap terlihat jelas di atas background peta OSM
    html: `<div style="
            color: ${color}; 
            font-size: 24px; 
            text-shadow: 2px 2px 4px white, -2px -2px 4px white; 
            transform: rotate(${rotasi}deg);
            display: flex;
            justify-content: center;
            align-items: center;
            transition: transform 0.3s ease;
          ">${symbol}</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12], // Titik tengah ikon tepat berada di koordinat
  });
};

export default function Example() {
  // State disimpan dalam bentuk Object { id: data } untuk efisiensi update & mencegah duplikasi
  const [ships, setShips] = useState({});
  const [aircraft, setAircraft] = useState({});

  // useRef untuk menyimpan instance socket agar tidak ter-recreate saat re-render
  const socketRef = useRef(null);

  useEffect(() => {
    // Inisialisasi Socket
    socketRef.current = io(SOCKET_URL);

    socketRef.current.on('connect', () => {
      console.log('✅ Terhubung ke Server Aerosea');
    });

    // Listener Data Kapal
    socketRef.current.on('ship-pipe', (dataArray) => {
      setShips((prevShips) => {
        const updatedShips = { ...prevShips };
        dataArray.forEach((ship) => {
          updatedShips[ship.mmsi] = ship;
        });
        return updatedShips;
      });
    });

    // Listener Data Pesawat
    socketRef.current.on('aircraft-pipe', (dataArray) => {
      setAircraft((prevAircraft) => {
        const updatedAircraft = { ...prevAircraft };
        dataArray.forEach((plane) => {
          updatedAircraft[plane.icao24] = plane;
        });
        return updatedAircraft;
      });
    });

    // Cleanup saat komponen di-unmount
    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  // Fungsi Kontrol
  const joinRoom = (room) => {
    if (socketRef.current) {
      socketRef.current.emit('join-room', room);
      console.log(`Meminta akses ke ${room}...`);
    }
  };

  const stopAll = () => {
    if (socketRef.current) {
      socketRef.current.emit('leave-room', 'ship-room');
      socketRef.current.emit('leave-room', 'aircraft-room');
      console.log('Semua stream dihentikan.');
    }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>

      {/* Panel Kontrol UI */}
      <div style={{
        position: 'absolute',
        top: '15px',
        right: '15px',
        zIndex: 1000, // Harus di atas peta (Leaflet z-index biasanya 400)
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        fontFamily: 'sans-serif'
      }}>
        <h3 style={{ margin: '0 0 10px 0', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>
          📡 Aerosea Control
        </h3>
        <button
          onClick={() => joinRoom('ship-room')}
          style={btnStyle('#2196F3')}
        >🚢 Mulai Radar Kapal</button>

        <button
          onClick={() => joinRoom('aircraft-room')}
          style={btnStyle('#FF5722')}
        >✈️ Mulai Radar Pesawat</button>

        <button
          onClick={stopAll}
          style={btnStyle('#757575')}
        >🛑 Hentikan Semua</button>
      </div>

      {/* Komponen Peta Leaflet */}
      <MapContainer
        center={[1.12, 104.0]}
        zoom={8}
        style={{ width: '100%', height: '100%' }}
        zoomControl={false} // Opsional: nonaktifkan zoom control default jika ingin memindahkannya
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {/* Render Marker Kapal */}
        {Object.values(ships).map((ship) => (
          <Marker
            key={ship.mmsi}
            position={[ship.latitude, ship.longitude]}
            icon={createDynamicIcon('ship', ship.heading || ship.cog)}
          >
            <Popup>
              <b>🚢 {ship.shipname || 'Unknown'}</b><br />
              MMSI: {ship.mmsi}<br />
              SOG: {ship.sog} knots<br />
              Heading: {ship.heading}°
            </Popup>
          </Marker>
        ))}

        {/* Render Marker Pesawat */}
        {Object.values(aircraft).map((plane) => (
          <Marker
            key={plane.icao24}
            position={[plane.latitude, plane.longitude]}
            icon={createDynamicIcon('aircraft', plane.heading)}
          >
            <Popup>
              <b>✈️ {plane.callsign || 'N/A'}</b><br />
              ICAO24: {plane.icao24}<br />
              Alt: {plane.geo_altitude} m<br />
              Vel: {plane.velocity} m/s
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

// Helper untuk styling tombol sederhana
const btnStyle = (bgColor) => ({
  display: 'block',
  width: '100%',
  padding: '8px',
  marginBottom: '8px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
  backgroundColor: bgColor,
  color: 'white',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
});
