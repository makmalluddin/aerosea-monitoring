import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import Dashboard from './pages/Dashboard';
import Sidebar from './features/layout/Sidebar';
import Ship from './pages/Ship';
import Example from './pages/Example';
import { MonitoringProvider } from './services/MonitoringContext';
import LoadingOverlay from './features/layout/LoadingOverlay';

function App() {
  return (
    <MonitoringProvider>
      <BrowserRouter>
        <LoadingOverlay />
        <div className='flex bg-bg-color h-screen w-full overflow-hidden'>
          <Sidebar />
          <main className='flex-1'>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/ship' element={<Ship />} />
              <Route path='/example' element={<Example />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </MonitoringProvider>
  )
}

export default App;
