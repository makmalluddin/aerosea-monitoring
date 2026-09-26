import { createContext, useContext, useState, useRef, useCallback } from 'react';

const MonitoringContext = createContext();

export function MonitoringProvider({ children }) {
  // Gunakan useRef untuk simpan data 
  const rawDataRef = useRef([]);

  // Status UI Global
  const [activeMode, setActiveMode] = useState('Dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  // Status Playback & Marker
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackIndex, setPlaybackIndex] = useState(0);
  const [entityKey, setEntityKey] = useState('');
  const [isDataReady, setIsDataReady] = useState(false);

  // Kamus Data untuk Leaflet (Format: { "666543210": { ...data } })
  const [activeMarkers, setActiveMarkers] = useState({});

  // Fungi untuk fetch data dari backend 
  const loadHistoricalData = useCallback(async (mode) => {
    // Loading with overlay 
    setIsLoading(true);
    setLoadingMessage(`Menghubungkan ke server untuk data ${mode}...`);
    setActiveMode(mode);

    // Reset state playback 
    setIsPlaying(false);
    setPlaybackIndex(0);
    setActiveMarkers({});
    setIsDataReady(false);

    try {
      // Endpoint fetch data API 
      let endpoint = '';
      if (mode === 'Ship') {
        endpoint = '/api/ship';
        setEntityKey('mmsi');
      } else if (mode === 'Aircraft') {
        endpoint = '/api/aircraft';
        setEntityKey('callsign');
      }

      setLoadingMessage(`Sedang Mengunduh Data  ${mode}...`);

      // Fetch data 
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        cache: 'no-store'
      });
      const responseJson = await response.json();
      const data = responseJson.data;

      // Save data to useRef
      rawDataRef.current = data;

      await new Promise(resolve => setTimeout(resolve, 800));

      if (data && data.length > 0) {
        setIsDataReady(true);
      } else {
        alert("Data berhasil diunduh, tetapi kosong.");
      }

    } catch (error) {
      console.error("Gagaal Memuat data: ", error);
      alert("Gagal memuat data!");
    } finally {
      // Matikan Loading 
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, []);

  // Fungsi untuk reset playback 
  const resetPlayback = useCallback(() => {
    setIsPlaying(false);
    setPlaybackIndex(0);
    setActiveMarkers({}); // Kosongkan peta
  }, []);

  // Export all value 
  const value = {
    // State
    activeMode, setActiveMode,
    isLoading, loadingMessage,
    isDataReady, setIsDataReady,
    isPlaying, setIsPlaying,
    playbackIndex, setPlaybackIndex,
    entityKey, activeMarkers, setActiveMarkers,
    // Ref
    rawDataRef,
    // Actions
    loadHistoricalData, resetPlayback
  };

  return (
    <MonitoringContext.Provider value={value}>
      {children}
    </MonitoringContext.Provider>
  );
}

// Custom hook for easier get context 
export function useMonitoring() {
  return useContext(MonitoringContext);
}
