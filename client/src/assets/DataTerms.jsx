export const shipTerms = [
  { term: "MMSI", desc: "Nomor identifikasi unik 9 digit yang diberikan kepada stasiun radio VHF dan perangkat AIS kapal." },
  { term: "Shipname", desc: "Nama resmi atau identitas teks dari kapal laut yang bersangkutan." },
  { term: "Long & Lat", desc: "Koordinat geografis bujur (Longitude) dan lintang (Latitude) posisi titik koordinat kapal saat ini." },
  { term: "COG (Course Over Ground)", desc: "Arah atau haluan pergerakan aktual kapal terhadap permukaan bumi (dalam derajat sudut 0° hingga 360°)." },
  { term: "Heading", desc: "Arah hadap fisik haluan kapal saat ini (biasanya diperoleh dari kompas gyro)." },
  { term: "SOG (Speed Over Ground)", desc: "Kecepatan aktual pergerakan kapal relatif terhadap dasar bumi, diukur dalam satuan knot." }
];

// Data Terminologi Pesawat
export const aircraftTerms = [
  { term: "Callsign", desc: "Kode panggil resmi penerbangan yang menggabungkan identitas maskapai dan nomor rute penerbangan." },
  { term: "ICAO 24-bit", desc: "Kode unik internasional berbasis heksadesimal yang merepresentasikan identitas fisik transponder pesawat." },
  { term: "Origin Country", desc: "Negara asal tempat pesawat tersebut terdaftar secara internasional." },
  { term: "Last Contact", desc: "Timestamp atau waktu terakhir paket data diterima dari transponder pesawat." },
  { term: "Geo Altitude", desc: "Ketinggian geometris pesawat dari permukaan laut, diukur dalam satuan kaki (feet)." },
  { term: "Vertical Rate", desc: "Laju kecepatan vertikal pesawat saat naik (climbing) atau turun (descending)." },
  { term: "Heading", desc: "Arah hadap moncong pesawat terhadap utara kompas (dalam derajat)." },
  { term: "Velocity", desc: "Kecepatan laju udara atau darat pesawat (ground speed)." },
  { term: "Long & Lat", desc: "Posisi titik koordinat bujur dan lintang dari lokasi terkini pesawat." }
];

// Komponen Reusable untuk setiap baris istilah
export const DataTerms = ({ term, desc }) => (
  <li>
    <span className="font-medium text-text-primary">{term}</span>
    <p className="text-sm mt-0.5 leading-relaxed">{desc}</p>
  </li>
);
