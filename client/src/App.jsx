import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MapCanvas from './features/maps/MapCanvas';
import Navbar from './features/maps/Navbar';
import Footer from './features/maps/Footer';

function App() {
  const centerMap = [-2.548926, 118.014863];

  return (
    <div className='flex flex-col h-screen w-full overflow-hidden bg-white text-black'>
      <Navbar />
      <MapCanvas />
      <Footer />
    </div>
  )
}

export default App;
