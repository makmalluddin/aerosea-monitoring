import { useMonitoring } from '../../services/MonitoringContext';
import { LuLoader } from 'react-icons/lu';

function LoadingOverlay() {
  // Fetch state from context 
  const { isLoading, loadingMessage } = useMonitoring();

  // If not loading, dont render anything to DOM
  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 z-9999 flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-sm pointer-events-auto transition-all">
      <div className="bg-surface-color border border-border-color p-8 rounded-xl shadow-2xl flex flex-col items-center max-w-sm text-center">

        <LuLoader className="text-accent-color text-5xl animate-spin mb-4" />

        <h3 className="text-xl font-bold text-text-primary mb-2">
          Memproses Data
        </h3>

        <p className="text-sm text-text-secondary font-mono animate-pulse">
          {loadingMessage || 'Mohon tunggu sebentar...'}
        </p>

      </div>
    </div>
  );
}

export default LoadingOverlay;
