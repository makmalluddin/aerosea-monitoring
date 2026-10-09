<img width="1920" height="480" alt="Cover" src="https://github.com/user-attachments/assets/c12c5b3c-02cc-4577-aa8b-ef6628751635" />

# Aerosea Monitoring

Aplikasi web-based yang dibangun sebagai platform monitoring pergerakan vessel dan pesawat, baik secara real-time maupun historis. Platform ini 
memungkinkan user melakukan pemantauan setiap objek dengan jelas disertai informasi detailnya, ditambah dengan integrasi layanan pihak ketiga membuat
scope pengamatan tidak terbatas pada data historis saja.
<div align="center">
  <img width="720" alt="image" src="https://github.com/user-attachments/assets/39d2b0ec-a739-4381-b972-9b74e3e5e0e7" />
</div>

## Key Features
- <b> Dual Mode & SubMode Monitoring </b> : Monitoring dinamis sesuai preferensi user.
- <b> Smart Data Fetching </b> : Menerapkan sistem batching dalam pengambilan data untuk menghindari limitasi.
- <b> Playback System </b> : Playback system berperan seperti media player.

## Workflow Aplikasi
Untuk memastikan data mengalir secara efisien dari layanan pihak ketiga + database hingga ke layar pengguna, sistem ini dirancang dengan alur sebagai berikut:
- Ingestion : Backend Node.js sebagai pusat kontrol data (proxy tunggal) untuk konsumsi data dari Aisstream.io dan OpenSky Network. Hal ini untuk mencegah hal yang
  diinginkan terekspos di client dan mencegah potensi rate limitting dari penyedia layanan pihak ketiga.
- Event Driven Broadcast : Alih-alih request berulang (HTPP polling), backend mengirimkan data terus menerus melalui Socket.io dalam interval yang ditentukan. Client
  melakukan request terbatas pada fitur historis.
- Client Rendering : React menerima payload melalui REST API untuk data historis, dan menerima data terus menerus melalui Websocket untuk data real time sesuai dengan
  submode yang dipilih. Data yang diterima dipetakan ke dalam visualisasi marker dinamis di Leaflet.

## Installation 
Pastikan anda memiliki docker & docker compose terinstal, install dari [Docker Official Website](https://docs.docker.com/get-started/get-docker/)

Selain itu anda juga perlu memiliki kredensial dari [Aisstream](https://aisstream.io/account) dan [OpenSky Network](https://opensky-network.org/). Silahkan buat akun dan dapatkan kredensial
1. Verify Docker
   ```bash
   docker --version && docker compose version
   ```
2. Fork repository
   
   Silahkan fork (garpu) repository dengan klik fork di kanan atas page ini
3. Clone repository
   ```bash
   git clone https://github.com/makmalluddin/aerosea-monitoring.git
   ```
4. Create .env file
   ```bash
   cd aerosea-monitoring
   touch .env
   ```
   Di dalam file .env isi dengan
   ```bash
   OPENSKY_CLIENT_ID=your-api-client
   OPENSKY_CLIENT_SECRET=your-client-secret
   AISSTREAM_API_KEY=your-aisstream-key
   ```
5. Run Docker Compose
   ```bash
   docker compose up -d --build
   ```
6. Stop Docker Compose

   Untuk menghentikan service, gunakan command
   ```bash
   docker compose down # mematikan service
   # or
   docker compose down -v # hati-hati menghapus volume data

## Appreciate For Resource
Ucapan terimakasih kepada penyedia data
- PT IndoMega Teknologi (Internship Host)
- [Aisstream.io](https://aisstream.io/) (Vessel Data Real-time)
- [OpenSky Network](https://opensky-network.org/) (Aircraft Data Real-time)
