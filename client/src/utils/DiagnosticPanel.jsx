import { useState } from 'react';
import { io } from 'socket.io-client';
import { IoSync, IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';

function DiagnosticPanel({ serviceType }) { // 'api' | 'ship' | 'aircraft'
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(0);

  // Dictionary config and logic services
  const serviceConfigs = {
    api: {
      title: "REST API Health",
      subtitle: "GET /api/health",
      buttonText: "Ping API",
      buttonColor: "bg-accent-color/20 text-text-secondary hover:bg-accent-color hover:text-bg-color",
      run: async (updateCountdown, setMsg) => {
        const response = await fetch('http://localhost:5000/api/health');
        if (response.ok) {
          const data = await response.text();
          setMsg(data);
          return true;
        }
        throw new Error('API Error');
      }
    },
    ship: {
      title: "Aisstream (Kapal)",
      subtitle: "WSS Room: 'ship-room'",
      buttonText: "Connect",
      buttonColor: "bg-teal-500/20 text-teal-500 hover:bg-teal-500 hover:text-white",
      run: (updateCountdown) => {
        return new Promise((resolve) => {
          const tempSocket = io('http://localhost:5000');
          tempSocket.on('connect', () => {
            tempSocket.emit('join-room', 'ship-room');
            let currentCountdown = 10;
            updateCountdown(currentCountdown);

            const timer = setInterval(() => {
              currentCountdown -= 1;
              updateCountdown(currentCountdown);

              if (currentCountdown <= 0) {
                clearInterval(timer);
                tempSocket.emit('leave-room', 'ship-room');
                tempSocket.disconnect();
                resolve();
              }
            }, 1000);
          });

          tempSocket.on('connect_error', () => {
            alert("Gagal terhubung ke Socket Node.js (Ship)");
            tempSocket.disconnect();
            resolve();
          });
        });
      }
    },
    aircraft: {
      title: "OpenSky (Pesawat)",
      subtitle: "WSS Room: 'aircraft-room'",
      buttonText: "Connect",
      buttonColor: "bg-sky-500/20 text-sky-500 hover:bg-sky-500 hover:text-white",
      run: (updateCountdown) => {
        return new Promise((resolve) => {
          const tempSocket = io('http://localhost:5000');
          tempSocket.on('connect', () => {
            tempSocket.emit('join-room', 'aircraft-room');
            let currentCountdown = 10;
            updateCountdown(currentCountdown);

            const timer = setInterval(() => {
              currentCountdown -= 1;
              updateCountdown(currentCountdown);

              if (currentCountdown <= 0) {
                clearInterval(timer);
                tempSocket.emit('leave-room', 'aircraft-room');
                tempSocket.disconnect();
                resolve();
              }
            }, 1000);
          });

          tempSocket.on('connect_error', () => {
            alert("Gagal terhubung ke Socket Node.js (Aircraft)");
            tempSocket.disconnect();
            resolve();
          });
        });
      }
    }
  };

  const config = serviceConfigs[serviceType];

  const handleClick = async () => {
    setStatus('loading');
    try {
      if (serviceType === 'api') {
        const success = await config.run(null, (msg) => setMessage(msg));
        setStatus(success ? 'success' : 'error');
      } else {
        await config.run((remainingSeconds) => {
          setCountdown(remainingSeconds);
          setStatus('success');
        });

        setStatus('idle')
      }
    } catch (err) {
      setStatus('error');
      setMessage(serviceType === 'api' ? 'API Offline' : 'Gagal');
    }
  };

  if (!config) return null;

  return (
    <div className="bg-bg-color p-3 border border-border-color/50 rounded-md shadow-sm flex flex-col justify-between min-h-30 min-w-60">
      <div>
        <div className="font-semibold text-text-primary text-sm mb-1">{config.title}</div>
        <div className="text-xs text-text-secondary mb-4">{config.subtitle}</div>
      </div>

      <div className="flex items-center justify-between h-8">
        <button
          onClick={handleClick}
          disabled={status === 'loading' || status === 'success'}
          className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors disabled:opacity-50 cursor-pointer ${config.buttonColor}`}
        >
          {status === 'success' ? 'Connected' : config.buttonText}
        </button>

        {status === 'loading' && <IoSync className="animate-spin text-accent-color text-lg" />}

        {status === 'success' && (
          <span className="flex items-center gap-1 text-[11px] font-bold text-green-500">
            <IoCheckmarkCircle className="text-sm" />
            {message ? message : `Connection Ok! (${countdown}s)`}
          </span>
        )}

        {status === 'error' && (
          <span className="flex items-center gap-1 text-[11px] font-bold text-red-500 whitespace-nowrap">
            <IoCloseCircle className="text-sm" /> {message || 'Offline'}
          </span>
        )}
      </div>
    </div>
  );
}

export default DiagnosticPanel;
