import { useMonitoring } from '../services/MonitoringContext';
import { LuNavigation2 } from 'react-icons/lu';

function DetailPanel() {
  const { activeMarkers, activeMode } = useMonitoring();

  const markersArray = Object.values(activeMarkers);
  const totalEntities = markersArray.length;

  const title = activeMode === 'Ship' ? 'Vessel' : 'Aircraft';

  return (
    <div className="w-full bg-surface-color/90 backdrop-blur-md border border-border-color p-4 flex flex-col flex-1 min-h-0 overflow-hidden shadow-md rounded-md">

      {/* Header & Counter */}
      <div className="pb-4 border-b border-border-color/50 mb-4 shrink-0">
        <h2 className="text-lg font-bold text-text-primary">{title} List</h2>
        <div className=''>
          Total {title} : {totalEntities}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar min-h-0">
        {totalEntities === 0 ? (
          <p className="text-sm text-text-secondary text-center mt-10">
            Belum ada objek di layar
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
                className="bg-bg-color p-3 border border-border-color/50 hover:border-black/20 transition-colors"
              >
                <div className="font-bold text-text-primary text-sm truncate mb-2" title={displayName}>
                  {displayName}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-text-secondary">
                  <div className="flex flex-col bg-surface-color p-1.5 rounded">
                    <span className="text-[10px] uppercase opacity-70">Arah</span>
                    <span className="font-semibold flex items-center gap-1">
                      <LuNavigation2 style={{ transform: `rotate(${heading}deg)` }} />
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
