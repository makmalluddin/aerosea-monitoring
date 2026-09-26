import { useState } from 'react';
import { useMonitoring } from '../../services/MonitoringContext';
import { useHistoricalPlayback } from './UseHistoricalPlayback';
import { LuPlay, LuPause, LuSquare, LuFastForward } from 'react-icons/lu';

function PlaybackControls() {
  const {
    activeSubMode,
    isDataReady,
    isPlaying,
    setIsPlaying,
    playbackIndex,
    setPlaybackIndex,
    rawDataRef,
    resetPlayback
  } = useMonitoring();

  // Local state to manage speed 
  const [speedMs, setSpeedMs] = useState(100);

  // Call custom hooks 
  useHistoricalPlayback(speedMs);

  const totalData = rawDataRef.current ? rawDataRef.current.length : 0;

  // Hide panel if not historical mode 
  if (!isDataReady || totalData === 0) return null;

  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-1000 w-[90%] max-w-3xl">
      <div className="bg-surface-color/85 backdrop-blur-md border border-border-color rounded-xl p-4 shadow-2xl flex items-center gap-6">

        <div className="flex items-center gap-3 border-r border-border-color pr-6">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 flex items-center justify-center bg-accent-color text-bg-color rounded-full hover:opacity-80 transition-opacity"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <LuPause className="text-2xl" fill="currentColor" /> : <LuPlay className="text-2xl ml-1" fill="currentColor" />}
          </button>

          <button
            onClick={resetPlayback}
            className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
            title="Stop & Reset"
          >
            <LuSquare className="text-xl" fill="currentColor" />
          </button>
        </div>

        {/* Timeline Slider */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs font-mono text-text-secondary font-semibold">
            <span>Indeks Data: {playbackIndex}</span>
            <span>Total: {totalData}</span>
          </div>

          <input
            type="range"
            min="0"
            max={totalData > 0 ? totalData - 1 : 0}
            value={playbackIndex}
            onChange={(e) => setPlaybackIndex(Number(e.target.value))}
            className="w-full h-2 bg-bg-color rounded-lg appearance-none cursor-pointer accent-accent-color"
          />
        </div>

        {/* Speed Control */}
        <div className="flex items-center gap-2 border-l border-border-color pl-6">
          <LuFastForward className="text-text-secondary" />
          <select
            value={speedMs}
            onChange={(e) => setSpeedMs(Number(e.target.value))}
            className="bg-bg-color border border-border-color text-text-primary text-sm rounded-md p-1.5 cursor-pointer outline-none focus:border-accent-color"
          >
            <option value={1000}>1x (Lambat)</option>
            <option value={500}>2x (Santai)</option>
            <option value={100}>10x (Normal)</option>
            <option value={20}>50x (Ngebut)</option>
          </select>
        </div>

      </div>
    </div>
  );
}

export default PlaybackControls;
