import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import Sidebar from "./Sidebar";
import MapCanvas from "../maps/MapCanvas";

function Dashboard() {
  const centerMap = [-2.548926, 118.014863];
  const [mode, setMode] = useState('dashboard')

  return (
    <div className="flex relative w-full h-full overflow-hidden">
      {/* Sidebar  */}
      <Sidebar />

      {/* Main Menu */}
      <div className="flex-1 h-full w-full relative">
        <MapCanvas />

        {/* Layer Blur */}
        <div
          className="absolute inset-y-0 left-0 z-10 w-3/5 pointer-events-none"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',

            maskImage: 'linear-gradient(to right, black 30%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, black 30%, transparent 100%)',

            background: 'linear-gradient(to right, rgba(243, 244, 246, 0.85) 0%, rgba(243, 244, 246, 0) 100%)'
          }}
        />

        {/* Layer Menu  */}
        <div className="absolute top-20 left-20 z-20">
          <h1 className="text-2xl text-text-primary">
            Aerosea Monitoring
          </h1>
          <p className="mt-4 w-3/7 text-text-secondary">
            Platform untuk visualisasi kapal dan pesawat menggunakan
            data historis dan data real-time. Projek ini dibangun
            dengan :
            <ul className="list-disc">
              <li className="">Frontend: </li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
