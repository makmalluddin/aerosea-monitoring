import { useMonitoring } from '../services/MonitoringContext';
import { LuX, LuInfo } from 'react-icons/lu';

function DetailPanel() {
  const { selectedEntityId, setSelectedEntityId, activeMarkers, activeMode } = useMonitoring();

  // Fetch live data
  const entityData = activeMarkers[selectedEntityId];

  const hiddenKey = ['_id', '__v']

  return (
    <div className="flex-1 min-h-0 right-6 z-1000 w-80 bg-surface-color/90 backdrop-blur-md border border-border-color rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh]">

      {/* Header Panel */}
      <div className="bg-accent-color/10 border-b border-border-color p-4 flex justify-between items-center">
        <h3 className="font-bold text-accent-color">
          Detail {activeMode === 'Ship' ? 'Kapal' : 'Pesawat'}
        </h3>
        <button
          onClick={() => setSelectedEntityId(null)}
          className="text-text-secondary hover:text-red-500 transition-colors"
        >
          <LuX className="text-xl" />
        </button>
      </div>

      {/* Data Content */}
      {entityData ? (
        // JIKA ADA DATA KAPAL/PESAWAT YANG DIKLIK
        <div className="p-4 overflow-y-auto custom-scrollbar flex flex-col gap-2">
          {Object.entries(entityData)
            .filter(([key]) => !hiddenKey.includes(key)) // Filter data
            .map(([key, value]) => (
              <div key={key} className="flex flex-col border-b border-border-color/50 pb-1">
                <span className="text-xs text-text-secondary uppercase tracking-wider">{key}</span>
                <span className="text-sm font-medium text-text-primary">
                  {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                </span>
              </div>
            ))}
        </div>
      ) : (
        // JIKA KOSONG (EMPTY STATE)
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center opacity-70">
          <LuInfo className="text-4xl text-text-secondary mb-3 opacity-50" />
          <p className="text-sm text-text-secondary font-medium">
            Klik icon di peta untuk melihat detail informasi {activeMode === 'Ship' ? 'kapal' : 'pesawat'}.
          </p>
        </div>
      )}

    </div>
  );
}

export default DetailPanel;
