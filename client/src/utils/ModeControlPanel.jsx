import { useState } from 'react';
import { useMonitoring } from '../services/MonitoringContext';
import { LuHistory, LuRadio } from 'react-icons/lu';

function ModeControlPanel({ entityType }) {
  // Declare variable 
  const { loadHistoricalData, isDataReady, resetPlayback, connectLiveSocket, disconnectSocket } = useMonitoring();
  const [subMode, setSubMode] = useState('Historis');

  const handleSubModeChange = (newMode) => {
    if (newMode !== subMode) {
      resetPlayback();
      setSubMode(newMode);
    }
  };

  const title = entityType === 'Ship' ? 'Mode Kapal Laut' : 'Mode Pesawat Terbang';

  return (
    <div className="bg-surface-color/90 backdrop-blur-md border border-border-color p-4 rounded-xl shadow-lg shrink-0">

      {/* Header Panel */}
      <div className="flex justify-between items-center mb-4 gap-4">
        <h2 className="text-lg font-bold text-text-primary">{title}</h2>

        {/* Live Indicator*/}
        {subMode === 'Live' && (
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        )}
      </div>

      {/* Toggle Switch */}
      <div className="flex bg-bg-color p-1 rounded-lg mb-4 border border-border-color/50">
        <button
          onClick={() => handleSubModeChange('Live')}
          className={`flex-1 py-1.5 text-sm font-semibold rounded-md transition-all cursor-pointer ${subMode === 'Live'
            ? 'bg-surface-color text-green-500 shadow-sm'
            : 'text-text-secondary hover:text-text-primary'
            }`}
        >
          Live
        </button>
        <button
          onClick={() => handleSubModeChange('Historis')}
          className={`flex-1 py-1.5 text-sm font-semibold rounded-md transition-all cursor-pointer ${subMode === 'Historis'
            ? 'bg-surface-color text-accent-color shadow-sm'
            : 'text-text-secondary hover:text-text-primary'
            }`}
        >
          Historis
        </button>
      </div>

      {/* Konten Dinamis Berdasarkan Sub-Mode */}
      {subMode === 'Historis' ? (
        <div className="animate-fade-in">
          <p className="text-xs text-text-secondary mb-3 leading-relaxed">
            Data historis yang disimpan dalam database
          </p>
          <button
            onClick={() => loadHistoricalData(entityType)}
            className={`w-full flex justify-center items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors border cursor-pointer ${isDataReady
              ? 'bg-accent-color text-bg-color border-transparent'
              : 'bg-surface-color text-accent-color border-accent-color/30 hover:bg-accent-color hover:text-bg-color'
              }`}
          >
            <LuHistory className="text-lg" />
            Muat Data
          </button>
        </div>
      ) : (
        <div className="animate-fade-in">
          <p className="text-xs text-text-secondary mb-3 leading-relaxed">
            Data real-time yang terhubung melalui Socket.io.
          </p>
          <button
            onClick={() => connectLiveSocket(entityType)}
            className="w-full flex justify-center items-center gap-2 bg-surface-color text-green-500 border border-green-500/30 hover:bg-green-500 hover:text-bg-color px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
          >
            <LuRadio className="text-lg" />
            Hubungkan Server
          </button>
        </div>
      )}

    </div>
  );
}

export default ModeControlPanel;
