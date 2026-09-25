import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import Dashboard from './pages/Dashboard';
import Sidebar from './features/layout/Sidebar';
import Ship from './pages/Ship';

function App() {
  return (
    <BrowserRouter>
      <div className='flex bg-bg-color h-screen w-full overflow-hidden'>
        <Sidebar />
        <main className='flex-1'>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/ship' element={<Ship />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App;
