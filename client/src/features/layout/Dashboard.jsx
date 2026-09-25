import { useState, useEffect } from "react"
import "leaflet/dist/leaflet.css"
import Sidebar from "./Sidebar";
import MapCanvas from "../maps/MapCanvas";
import InformationBox from "../../utils/InformationBox";
import { LuLayers2, LuActivity, LuCompass } from "react-icons/lu";
import { RiLiveLine, RiHistoryLine } from "react-icons/ri";
import { dashboardData } from "../../assets/dashboardData";

function Dashboard() {
  const centerMap = [-2.548926, 118.014863];
  const [mode, setMode] = useState('dashboard')

  return (
    <div className="flex relative w-full h-full overflow-hidden">
      {/* Sidebar  */}
      <Sidebar />

      {/* Main Menu */}
      <div className="flex-1 h-full w-full relative">
        <MapCanvas />

        {/* Layer Blur */}
        <div
          className="absolute inset-y-0 left-0 z-10 w-3/5 pointer-events-none"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',

            maskImage: 'linear-gradient(to right, black 30%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, black 30%, transparent 100%)',

            background: 'linear-gradient(to right, rgba(243, 244, 246, 0.85) 0%, rgba(243, 244, 246, 0) 100%)'
          }}
        />

        {/* Layer Menu  */}
        <div className="absolute top-20 left-20 z-20">
          <h1 className="text-3xl text-text-primary">
            Aerosea Monitoring
          </h1>
          <div className="w-2/5">
            <p className="my-2 text-text-secondary">
              Platform monitoring yang menggabungkan data
              real-time dan historis dari lalu lintas udara
              dan perairan di wilayah Indonesia.
            </p>

            <div className="flex flex-col justify-between gap-2">
              <div className="flex item-center gap-2">
                <div className="p-1">
                  <LuLayers2 />
                </div>
                <div>
                  <h3 className="text-md text-text-primary-">Dual Mode</h3>
                  <p className="text-sm text-text-secondary">Menampilkan data historis dan data real-time</p>
                </div>
              </div>

              <div className="flex item-center gap-2">
                <div className="p-1">
                  <LuActivity />
                </div>
                <div>
                  <h3 className="text-md text-text-primary-">Real-time Stream</h3>
                  <p className="text-sm text-text-secondary">Integrasi API eksternal untuk real-time data</p>
                </div>
              </div>

              <div className="flex item-center gap-2">
                <div className="p-1">
                  <LuCompass />
                </div>
                <div>
                  <h3 className="text-md text-text-primary-">Air & Sea Scope</h3>
                  <p className="text-sm text-text-secondary">Monitoring dua jenis armada, laut dan udara</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Layer Informasi */}
        <div className="absolute bottom-20 left-20 z-20">
          <div className="flex gap-4">
            {dashboardData.map((item) => (
              <InformationBox
                key={item.id}
                typeData={item.typeData}
                nameData={item.nameData}
                icon={item.icon}
                description={item.description}
                exampleData={item.exampleData}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
