import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MapCanvas from './features/maps/MapCanvas';
import Navbar from './features/maps/Navbar';
import Footer from './features/maps/Footer';
import Sidebar from './features/layout/Sidebar';
import Dashboard from './features/layout/Dashboard';

function App() {
  const centerMap = [-2.548926, 118.014863];

  return (
    <div className='flex flex-col h-screen w-full overflow-hidden bg-white text-black'>
      <Dashboard />
    </div>
  )
}

export default App;
