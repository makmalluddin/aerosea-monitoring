import MapCanvas from "../features/maps/MapCanvas"
import PlaybackControls from "../features/playback/PlaybackControl"
import { useMonitoring } from "../services/MonitoringContext"
import { LuHistory } from "react-icons/lu"

function Ship() {
  // Load data 
  const { loadHistoricalData, isDataReady } = useMonitoring();
  return (
    <div className="flex relative w-full h-full overflow-hidden">
      <MapCanvas />
      <div className="absolute top-6 left-6 z-1000 bg-surface-color/90 backdrop-blur-sm border border-border-color p-3 rounded-xl shadow-lg">
        <h2 className="text-lg font-bold text-text-primary mb-3">Mode Kapal Laut</h2>

        <div className="flex gap-2">
          {/* Tombol pemicu unduh data Historis */}
          <button
            onClick={() => loadHistoricalData('Ship')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDataReady ? 'bg-accent-color text-bg-color' : 'bg-bg-color text-text-secondary hover:text-text-primary border border-border-color'
              }`}
          >
            <LuHistory />
            Muat Data Historis
          </button>
        </div>
      </div>

      {/* 3. Panel Kendali Playback (Otomatis muncul di bawah jika ada data) */}
      <PlaybackControls />
    </div>
  )
}

export default Ship
