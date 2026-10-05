import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import Dashboard from './pages/Dashboard';
import Sidebar from './features/layout/Sidebar';
import Ship from './pages/Ship';
import Aircraft from './pages/Aircraft';
import About from './pages/About';
import { MonitoringProvider } from './services/MonitoringContext';
import LoadingOverlay from './features/layout/LoadingOverlay';

function App() {
  return (
    <MonitoringProvider>
      <BrowserRouter>
        <LoadingOverlay />
        <div className='flex bg-bg-color h-screen w-full overflow-hidden'>
          <Sidebar />
          <main className='flex-1 h-full overflow-y-auto'>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/ship' element={<Ship />} />
              <Route path='/aircraft' element={<Aircraft />} />
              <Route path='/about' element={<About />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </MonitoringProvider>
  )
}

export default App;
