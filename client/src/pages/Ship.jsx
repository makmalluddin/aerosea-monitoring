import MapCanvas from "../features/maps/MapCanvas"
import PlaybackControls from "../features/playback/PlaybackControl"
import { useMonitoring } from "../services/MonitoringContext"
import DetailPanel from "../utils/DetailPanel";
import ModeControlPanel from "../utils/ModeControlPanel";

function Ship() {
  // Load data 
  const { loadHistoricalData, isDataReady } = useMonitoring();
  return (
    <div className="flex relative w-full h-full overflow-hidden">
      <MapCanvas />
      <div className="absolute top-6 right-6 z-1000 w-80 flex flex-col gap-4 max-h-[calc(100vh-120px)]">
        <ModeControlPanel entityType="Ship" />
        <DetailPanel />
      </div>

      {/* Playback Control */}
      <PlaybackControls />
    </div>
  )
}

export default Ship
