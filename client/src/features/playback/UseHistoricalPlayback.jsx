import { useEffect, useRef } from 'react';
import { useMonitoring } from '../../services/MonitoringContext';

export function useHistoricalPlayback(speedMs = 100) {
  const {
    isPlaying,
    setIsPlaying,
    playbackIndex,
    setPlaybackIndex,
    rawDataRef,
    entityKey,
    setActiveMarkers
  } = useMonitoring();

  // Ref memory for tracking index in interval 
  const currentIndexRef = useRef(playbackIndex);

  // Synchronize ref with state react (for manual slider soon)
  useEffect(() => {
    currentIndexRef.current = playbackIndex;
  }, [playbackIndex]);

  useEffect(() => {
    let intervalId;

    if (isPlaying) {
      intervalId = setInterval(() => {
        const dataLength = rawDataRef.current.length;

        // Checking index if reach last array data
        if (currentIndexRef.current >= dataLength) {
          clearInterval(intervalId);
          setIsPlaying(false);
          return;
        }

        // Read data from useRef 
        const currentData = rawDataRef.current[currentIndexRef.current];

        // Get unique key like mmsi or callsign 
        if (currentData && entityKey) {
          const uniqueId = currentData[entityKey];

          // Upsert data, to update marker 
          if (uniqueId) {
            setActiveMarkers(prevMarkers => ({
              ...prevMarkers,
              [uniqueId]: currentData
            }));
          }
        }

        currentIndexRef.current += 1;

        // Notify UI index changed 
        setPlaybackIndex(currentIndexRef.current);

      }, speedMs);
    }

    // Cleanup data if intervalID stop 
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, speedMs, rawDataRef, entityKey, setIsPlaying, setActiveMarkers, setPlaybackIndex]);
}
