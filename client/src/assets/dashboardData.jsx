import { RiHistoryLine, RiLiveLine } from "react-icons/ri";
import { LuPlane, LuShip } from "react-icons/lu";

export const dashboardData = [
  {
    id: "historis-kapal",
    typeData: "Data Historis",
    nameData: "Riwayat Pergerakan Kapal",
    icon: RiHistoryLine,
    description:
      "Data yang saya kumpulkan menggunakan sistem IoT AIS Receiver pada kegiatan magang di PT IndoMega Teknologi.",
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
      "Dataset log penerbangan pesawat saya dapatkan pada kegiatan magang di PT IndoMega Teknologi.",
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
      "Data real-time yang saya dapatkan dari integrasi API eksternal, Aisstream.IO dan Open Sky Network.",
    exampleData: (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <LuShip className="text-sm text-text-secondary" />
          <span className="text-base font-bold">14</span>
          <span className="text-[10px] text-text-secondary">Kapal</span>
        </div>
        <span className="text-border-color">|</span>
        <div className="flex items-center gap-1">
          <LuPlane className="text-sm text-text-secondary" />
          <span className="text-base font-bold">8</span>
          <span className="text-[10px] text-text-secondary">Pesawat</span>
        </div>
      </div>
    ),
  },
];
