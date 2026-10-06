import aisBuilt from '../assets/ais_built.webp'
import aisReceiver from '../assets/ais_receiver.webp'
import antenaBuilt from '../assets/antena_built.webp'

export const imageGalery = [
  {
    id: 1,
    src: aisReceiver,
    alt: "Komponen AIS Receiver",
    caption: "IoT Ais Receiver"
  },
  {
    id: 2,
    src: aisBuilt,
    alt: "Perakitan Komponen",
    caption: "Perakitan Komponen"
  },
  {
    id: 3,
    src: antenaBuilt,
    alt: "Pemasangan Antena",
    caption: "Pemasangan Antena"
  }
];

export const GalleryCard = ({ src, alt, caption }) => (
  <div className="flex flex-col gap-2 group cursor-default">
    <div className="h-60 overflow-hidden rounded-xl border border-border-color/50 bg-bg-color/50 flex items-center justify-center p-2">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <span className="text-[11px] text-text-secondary text-center font-medium">
      {caption}
    </span>
  </div>
);
