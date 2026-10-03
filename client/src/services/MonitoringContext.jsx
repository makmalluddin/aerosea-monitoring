import { createContext, useContext, useState, useRef, useCallback } from 'react';
import { io } from 'socket.io-client'

const MonitoringContext = createContext();

export function MonitoringProvider({ children }) {
  // useRef to store data 
  const rawDataRef = useRef([]);

  // UI Status Global 
  const [activeMode, setActiveMode] = useState('Dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  // Playback & Marker Status
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackIndex, setPlaybackIndex] = useState(0);
  const [entityKey, setEntityKey] = useState('');
  const [isDataReady, setIsDataReady] = useState(false);
  const [selectedEntityId, setSelectedEntityId] = useState(null);

  // Live data ref 
  const socketRef = useRef(null);

  // Active Marker Logic 
  const [activeMarkers, setActiveMarkers] = useState({});

  // Function to fetch historical data  
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
        setEntityKey('Callsign');
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
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, []);

  // Function to handle socket.io data 
  // Function to disconnect socket.io 
  const disconnectSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.emit('leave-room', activeMode);
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  }, [activeMode]);

  // Functon to reset data 
  const resetPlayback = useCallback(() => {
    disconnectSocket();
    setIsPlaying(false);
    setPlaybackIndex(0);
    setActiveMarkers({});
    setIsDataReady(false);
    setSelectedEntityId(null);
    rawDataRef.current = [];
  }, [disconnectSocket]);

  // Function to connect socket.io by room 
  const connectLiveSocket = useCallback((mode) => {
    resetPlayback();
    setActiveMode(mode);
    setIsLoading(true);
    setLoadingMessage(`Menghubungkan ke server Live ${mode}...`);

    // Ganti URL dengan host backend Anda
    const socket = io('http://localhost:5000');
    socketRef.current = socket;

    socket.on('connect', () => {
      setIsLoading(false);
      setLoadingMessage('');
      setIsDataReady(true);
      // Panggil listener join-room dari backend Anda
      socket.emit('join-room', mode);
    });

    const eventName = mode === 'Ship' ? 'ship-pipe' : 'aircraft-pipe';
    const key = mode === 'Ship' ? 'mmsi' : 'Callsign';

    socket.on(eventName, (incomingData) => {
      const entityId = incomingData[key];

      if (entityId) {
        setActiveMarkers(prevMarkers => ({
          ...prevMarkers,
          [entityId]: incomingData
        }));
      }
    });

    socket.on('connect_error', () => {
      setIsLoading(false);
      alert('Gagal terhubung ke server Live');
    });

  }, [resetPlayback]);

  // Export all value 
  const value = {
    // State
    activeMode, setActiveMode,
    isLoading, loadingMessage,
    isDataReady, setIsDataReady,
    isPlaying, setIsPlaying,
    playbackIndex, setPlaybackIndex,
    entityKey, activeMarkers, setActiveMarkers,
    selectedEntityId, setSelectedEntityId,
    // Ref
    rawDataRef,
    // Actions
    loadHistoricalData, resetPlayback,
    connectLiveSocket, disconnectSocket
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
