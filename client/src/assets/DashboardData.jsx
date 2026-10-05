import { RiHistoryLine, RiLiveLine } from "react-icons/ri";
import { LuPlane, LuShip } from "react-icons/lu";

export const DashboardData = [
  {
    id: "historis-kapal",
    typeData: "Data Historis",
    nameData: "Riwayat Pergerakan Kapal",
    icon: RiHistoryLine,
    description:
      "Data yang diperoleh menggunakan sistem IoT AIS Receiver pada kegiatan internship di PT IndoMega Teknologi.",
    exampleData: (
      <div className="flex items-baseline gap-1">
        <span>125+</span>
        <span className="text-xs font-normal text-text-secondary">kapal tercatat</span>
      </div>
    ),
  },
  {
    id: "historis-pesawat",
    typeData: "Data Historis",
    nameData: "Riwayat Pergerakan Pesawat",
    icon: RiHistoryLine,
    description:
      "Dataset log penerbangan pesawat di dapatkan pada kegiatan internship di PT IndoMega Teknologi.",
    exampleData: (
      <div className="flex items-baseline gap-1">
        <span>3</span>
        <span className="text-xs font-normal text-text-secondary">penerbangan terekam</span>
      </div>
    ),
  },
  {
    id: "realtime-traffic",
    typeData: "Real-Time Data",
    nameData: "Live Stream Traffic",
    icon: RiLiveLine,
    description:
      "Data real-time yang di dapatkan dari integrasi API eksternal, Aisstream.IO dan Open Sky Network.",
    exampleData: (
      <div className="flex items-center gap-3">
        {/* Static Ship Indicator */}
        <div className="flex items-center gap-1.5">
          <LuShip className="text-sm text-text-secondary" />
          <div className="flex items-center gap-1.5 px-1.5 py-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            <span className="text-xs font-bold text-green-500 tracking-wide">Connected</span>
          </div>
        </div>

        <span className="text-border-color/50">|</span>

        {/* Indikator Status Pesawat */}
        <div className="flex items-center gap-1.5">
          <LuPlane className="text-sm text-text-secondary" />
          <div className="flex items-center gap-1.5 px-1.5 py-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            <span className="text-xs font-bold text-green-500 tracking-wide">Connected</span>
          </div>
        </div>
      </div>
    ),
  },
];
