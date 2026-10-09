import { IoWarningOutline } from "react-icons/io5";
import ToogleButton from '../utils/ToogleButton';
import DiagnosticPanel from '../utils/DiagnosticPanel';
import { TechStackData } from '../assets/TechStackData';
import { DataTerms, shipTerms, aircraftTerms } from "../assets/DataTerms";
import { imageGalery, GalleryCard } from "../utils/GaleryCard";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

function About() {
  return (
    <div className="flex relative w-full p-10 justify-center bg-bg-color">
      <div className="max-w-5xl w-full space-y-6">

        {/* Header Section */}
        <div className="flex items-center gap-5 pb-2 border-b border-border-color/50">
          <div>
            <h1 className="text-4xl font-bold text-text-primary tracking-tight mt-18">
              Aerosea Monitoring
            </h1>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-300 rounded-md p-4 flex gap-4 items-start md:items-center flex-col md:flex-row">
          <div className='flex flex-col'>
            <div className='flex items-center justify-start gap-2 text-amber-500'>
              <span>
                <IoWarningOutline />
              </span>
              <span>
                Penting!!
              </span>
            </div>
            <div className='text-amber-500'>
              Pastikan anda telah membuat akun OpenSky Network dan Aisstream.io untuk mendapatkan kredensial
              agar sub-mode live dapat bekerja
            </div>
          </div>
        </div>

        {/* About Project Section */}
        <div className='flex flex-col gap-4 leading-relaxed'>
          <h1 className='text-3xl text-text-primary font-semibold'>
            About Project
          </h1>
          <p className='text-justify text-text-secondary'>
            Aerosea Monitoring adalah bentuk pengembangan dari aplikasi <span className='italic'>vessel monitoring </span>
            yang saya bangun untuk tujuan visualisasi vessel dan aircraft dalam kegiatan internship di <span className='font-bold'>PT IndoMega Teknologi</span>.
            Aplikasi ini saya bangun dengan tujuan untuk memperkuat fundamental Javascript melalui eksplorasi pada ekosistem
            MERN (MongoDB, Express, React, Node.js).
          </p>

          {/* Resource Data Sub-Section */}
          <div className='flex flex-col gap-2'>
            <h2 className='text-xl'>Resource Data</h2>
            <ul className='list-none space-y-1 text-text-secondary'>
              <ToogleButton title='Historis'>
                <p className='text-justify text-md'>
                  Data historis kapal saya dapatkan dari perangkat IoT Ais Receiver yang saya rakit untuk mengumpulkan data AIS kapal di sekitar kantor.
                  Sementara itu, data historis rute penerbangan pesawat adalah dataset penerbangan pesawat secara utuh untuk keperluan pembelajaran.
                </p>
                {/* Placeholder Image*/}
                <div className='w-full mt-6'>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {imageGalery.map((item) => (
                      <GalleryCard
                        key={item.id}
                        src={item.src}
                        alt={item.alt}
                        caption={item.caption}
                      />
                    ))}
                  </div>
                </div>
              </ToogleButton>

              <ToogleButton title='Live'>
                <p className='text-justify text-md leading-relaxed'>
                  Data live real-time saya dapatkan melalui koneksi Socket.io yang saya build di Node.js dan terintegrasi dengan layanan API
                  pihak ketiga. Aplikasi ini menghubungkan aliran data websocket dari <span className='font-bold text-teal-600'>Aisstream.io </span>
                  untuk pergerakan kapal yang terupdate setiap 2 detik, lalu saya menggunakan smart pooling ke REST API dari
                  <span className='font-bold text-sky-600'> OpenSky Network </span> untuk pergerakan pesawat yang terupdate setiap 15 detik.
                </p>
              </ToogleButton>
            </ul>
          </div>

          {/* Tech Stack Sub-Section */}
          <div className='flex flex-col gap-2'>
            <h2 className='text-xl text-text-primary'>Tech Stack</h2>
            <div className='flex flex-wrap gap-6 text-text-secondary ml-2'>
              {TechStackData.map((tech, index) => {
                const Icon = tech.icon;

                return (
                  <div
                    key={index}
                    className={`flex flex-col items-center gap-2 transition-colors cursor-default ${tech.hoverColor}`}
                    title={tech.title}
                  >
                    <Icon className="text-4xl" />
                    <span className="text-xs font-medium">{tech.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Features Sub-Section */}
          <div className='flex flex-col gap-2'>
            <h2 className='text-xl text-text-primary'>Key Features</h2>
            <ul className='list-none space-y-2 text-text-secondary'>
              <ToogleButton title='Dual Mode & Sub-Mode Monitoring'>
                <p>
                  Aplikasi mampu melakukan monitoring untuk 2 Mode (Vessel dan Aircraft), serta mampu beralih antara 2 Sub-Mode yaitu
                  live dan historis dengan pemuatan data dinamis sesuai konten yang diinginkan.
                </p>
              </ToogleButton>

              <ToogleButton title='Smart Data Fetching'>
                <p>
                  Mengimplementasikan logic smart pooling pada Socket.io dengan memastikan client mengambil data sesuai room masing -
                  masing, mengatur interval pooling data vessel (2s) dan aircraft (15s) untuk menghindari limitaion dari provider.
                </p>
              </ToogleButton>

              <ToogleButton title='Playback System'>
                <p>
                  Pada mode historis terdapat player media mencakup fungsi : play, pause, stop, speed control, dan timeline slider
                </p>
              </ToogleButton>

            </ul>
          </div>
        </div>

        {/* Connection Status Section */}
        <div className='flex flex-col gap-4 leading-relaxed'>
          <h1 className='text-3xl font-bold'>
            Connection Status
          </h1>
          <p className='text-text-secondary'>
            Dalam aplikasi ini, saya coba menggunakan 2 koneksi ke backend yaitu via REST API dan Websocket. Alasan saya tidak menggunakan
            Websocket sebagai aliran data tunggal karena kembali ke tujuan aplikasi ini dibangun, yaitu sebagai implementasi pembelajaran ulang
            saya tentang Javascript. REST API saya gunakan untuk data historis yang disimpan di MongoDB, Websocket saya gunakan
            untuk data real-time yang memerlukan aliran data konstan.
          </p>

          {/* Check Connection Sub-Section */}
          <h2 className='text-xl'>
            Check Connection
          </h2>

          <p className='text-text-secondary'>
            Di bawah ini saya buat sebuah card untuk cek koneksi REST API maupun Websocket. Karena limitation dari pihak penyedia layanan ketiga,
            aliran Websocket akan terputus dalam 10 detik setelah koneksi berhasil.
          </p>

          <div className='flex gap-2'>
            <DiagnosticPanel serviceType="api" />
            <DiagnosticPanel serviceType="ship" />
            <DiagnosticPanel serviceType="aircraft" />
          </div>
        </div>

        {/* Glosarium Section */}
        <div className="flex flex-col gap-4 leading-relaxed">
          <h1 className="text-3xl font-bold"> Glosarium </h1>
          <p>
            Berikut adalah daftar istilah yang digunakan dalam aplikasi berdasarkan dokumentasi dari Aisstream.io dan OpenSky Network
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">

            {/* Kolom Ship */}
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-xl text-text-primary border-b border-border-color/50 pb-2">
                Vessel
              </h3>
              <ul className="space-y-4 text-md text-text-secondary">
                {shipTerms.map((item, index) => (
                  <DataTerms key={index} term={item.term} desc={item.desc} />
                ))}
              </ul>
            </div>

            {/* Kolom Aircraft */}
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-xl text-text-primary border-b border-border-color/50 pb-2">
                Aircraft
              </h3>
              <ul className="space-y-4 text-md text-text-secondary">
                {aircraftTerms.map((item, index) => (
                  <DataTerms key={index} term={item.term} desc={item.desc} />
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Footer Section */}
        <div className="flex justify-between items-center mt-16 pt-8 border-t border-border-color/50 text-text-secondary">
          {/* Copyright & Disclaimer */}
          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-medium text-text-primary">
              © 2026 Muhammad Akmalluddin.
            </p>
            <p className="text-xs opacity-75">
              Data provided by <span className="font-medium">PT IndoMega Teknologi,</span>{' '}
              <a
                href="https://aisstream.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-text-primary hover:underline transition-colors"
              >
                Aisstream.io,
              </a>{' '}
              and{' '}
              <a
                href="https://opensky-network.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-text-primary hover:underline transition-colors"
              >
                OpenSky Network
              </a>
              . Used for educational and non-commercial purposes.
            </p>
          </div>

          {/*  Social Links */}
          <div className="flex items-center gap-5">
            {[
              { id: 'github', icon: FaGithub, url: 'https://github.com/makmalluddin', hover: 'hover:text-text-primary' },
              { id: 'linkedin', icon: FaLinkedin, url: 'https://linkedin.com/in/makmalluddin', hover: 'hover:text-[#0A66C2]' },
              { id: 'email', icon: IoMail, url: 'mailto:makmalluddin123@gmail.com', hover: 'hover:text-[#EA4335]' }
            ].map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xl text-text-secondary transition-colors duration-200 cursor-pointer ${social.hover}`}
                >
                  <Icon />
                </a>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}

export default About;
