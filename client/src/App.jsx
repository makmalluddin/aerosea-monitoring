import 'leaflet/dist/leaflet.css';
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
