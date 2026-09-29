import React, { useEffect } from "react";
import MapCanvas from "../features/maps/MapCanvas";
import PlaybackControls from "../features/playback/PlaybackControl";
import { useMonitoring } from "../services/MonitoringContext";
import { LuHistory } from "react-icons/lu";
import DetailPanel from "../utils/DetailPanel";

function Aircraft() {
  // Load data dan fungsi pembersih dari context
  const { loadHistoricalData, isDataReady, clearHistoricalData } = useMonitoring();

  // Logika pembersihan (Sangat disarankan agar data peta tidak bertumpuk saat ganti menu)
  useEffect(() => {
    return () => {
      if (clearHistoricalData) {
        clearHistoricalData();
      }
    };
  }, [clearHistoricalData]);

  return (
    <div className="flex relative w-full h-full overflow-hidden">
      <MapCanvas />

      <div className="absolute top-6 left-6 z-1000 bg-surface-color/90 backdrop-blur-sm border border-border-color p-3 rounded-xl shadow-lg">
        {/* Judul disesuaikan */}
        <h2 className="text-lg font-bold text-text-primary mb-3">Mode Pesawat Terbang</h2>

        <div className="flex gap-2">
          {/* Parameter fetch diubah menjadi 'Aircraft' */}
          <button
            onClick={() => loadHistoricalData('Aircraft')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDataReady
                ? 'bg-accent-color text-bg-color'
                : 'bg-bg-color text-text-secondary hover:text-text-primary border border-border-color'
              }`}
          >
            <LuHistory />
            Muat Data Historis
          </button>
        </div>
      </div>

      <DetailPanel />
      {/* Playback Control */}
      <PlaybackControls />
    </div>
  );
}

export default Aircraft;
