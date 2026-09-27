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
    if (Math.abs(currentIndexRef.current - playbackIndex) > 1) {

      const rebuiltMarkers = {};

      for (let i = 0; i <= playbackIndex; i++) {
        const data = rawDataRef.current[i];
        if (data && entityKey && data[entityKey]) {
          rebuiltMarkers[data[entityKey]] = data;
        }
      }
      setActiveMarkers(rebuiltMarkers);
    }
    currentIndexRef.current = playbackIndex;
  }, [playbackIndex, rawDataRef, entityKey, setActiveMarkers]);

  useEffect(() => {
    let intervalId;

    if (isPlaying) {
      const TICK_RATE = Math.max(speedMs, 100);

      // Speed control by data read, not rendering data 
      const stepsPerTick = speedMs < 100 ? Math.floor(100 / speedMs) : 1;

      intervalId = setInterval(() => {
        const dataLength = rawDataRef.current.length;

        if (currentIndexRef.current >= dataLength) {
          clearInterval(intervalId);
          setIsPlaying(false);
          return;
        }

        const batchedUpdates = {};
        let stepCount = 0;

        while (stepCount < stepsPerTick && currentIndexRef.current < dataLength) {
          const currentData = rawDataRef.current[currentIndexRef.current];

          if (currentData && entityKey) {
            const uniqueId = currentData[entityKey];
            if (uniqueId) {
              batchedUpdates[uniqueId] = currentData;
            }
          }
          currentIndexRef.current += 1;
          stepCount++;
        }

        setActiveMarkers(prevMarkers => ({
          ...prevMarkers,
          ...batchedUpdates
        }));

        setPlaybackIndex(currentIndexRef.current);

      }, TICK_RATE);
    }

    // Cleanup data if intervalID stop 
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, speedMs, rawDataRef, entityKey, setIsPlaying, setActiveMarkers, setPlaybackIndex]);
}
