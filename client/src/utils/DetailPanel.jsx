import { useMonitoring } from '../services/MonitoringContext';
import { LuNavigation } from 'react-icons/lu';

function DetailPanel() {
  const { activeMarkers, activeMode } = useMonitoring();

  const markersArray = Object.values(activeMarkers);
  const totalEntities = markersArray.length;

  const title = activeMode === 'Ship' ? 'Daftar Kapal' : 'Daftar Pesawat';

  return (
    <div className="w-full bg-surface-color/90 backdrop-blur-md border border-border-color p-4 flex flex-col flex-1 min-h-0 overflow-hidden shadow-lg rounded-xl">

      {/* Header & Counter */}
      <div className="pb-4 border-b border-border-color/50 mb-4 shrink-0">
        <h2 className="text-lg font-bold text-text-primary">{title}</h2>
        <div className="flex items-center gap-2 mt-2">
          <span className="bg-accent-color/20 text-accent-color px-3 py-1 rounded-full text-sm font-semibold">
            Total: {totalEntities} Entitas
          </span>
        </div>
      </div>

      {/* List Entitas Minimalis */}
      {/* PERBAIKAN: Hapus max-h-100 dan tambahkan min-h-0 agar flex-1 bisa memicu overflow-y-auto */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar min-h-0">
        {totalEntities === 0 ? (
          <p className="text-sm text-text-secondary text-center mt-10">
            Belum ada data yang termonitor.
          </p>
        ) : (
          markersArray.map((data) => {
            const id = data.mmsi || data.Callsign || data.icao24;
            const displayName = data.shipname || data.callsign || id;
            const heading = data.heading || data.cog || data.Heading || 0;
            const speed = data.velocity || data.sog || data.Speed || 0;
            const speedUnit = activeMode === 'Ship' ? 'kn' : 'm/s';

            const originCountry = data.origin_country || 'Unknown';

            return (
              <div
                key={id}
                className="bg-bg-color p-3 rounded-lg border border-border-color/50 hover:border-accent-color/50 transition-colors"
              >
                <div className="font-bold text-text-primary text-sm truncate mb-2" title={displayName}>
                  {displayName}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-text-secondary">
                  <div className="flex flex-col bg-surface-color p-1.5 rounded">
                    <span className="text-[10px] uppercase opacity-70">Arah</span>
                    <span className="font-semibold flex items-center gap-1">
                      <LuNavigation className="rotate-45" style={{ transform: `rotate(${heading}deg)` }} />
                      {Math.round(heading)}°
                    </span>
                  </div>
                  <div className="flex flex-col bg-surface-color p-1.5 rounded">
                    <span className="text-[10px] uppercase opacity-70">Kecepatan</span>
                    <span className="font-semibold">{Math.round(speed)} {speedUnit}</span>
                  </div>

                  {activeMode !== 'Ship' && (
                    <div className="col-span-2 flex flex-col bg-surface-color p-1.5 rounded">
                      <span className="text-[10px] uppercase opacity-70">Origin Country</span>
                      <span className="font-semibold truncate">{originCountry}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}

export default DetailPanel;
