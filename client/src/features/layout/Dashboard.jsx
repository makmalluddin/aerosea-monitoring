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
      <Sidebar />
      <div className="flex-1 h-full w-full relative">
        <MapCanvas />
      </div>
    </div>
  )
}

export default Dashboard
