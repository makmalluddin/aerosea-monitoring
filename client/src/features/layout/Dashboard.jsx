import { useState, useEffect } from "react"
import "leaflet/dist/leaflet.css"
import Sidebar from "./Sidebar";
import MapCanvas from "../maps/MapCanvas";
import InformationBox from "../../utils/InformationBox";

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
          <h1 className="text-3xl text-text-primary">
            Aerosea Monitoring
          </h1>

          <p className="my-2 w-2/5 text-text-secondary">
            Platform monitoring yang menggabungkan data
            real-time dan historis dari lalu lintas udara
            dan perairan di wilayah Indonesia.
          </p>

          <ul className="list-inside list-disc">
            <li>Dual Mode</li>
            <li>Real-time Data</li>
            <li>Air And Sea Scope</li>
          </ul>
        </div>
        <div className="absolute bottom-20 left-20 z-20">
          asdd
          <InformationBox />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
