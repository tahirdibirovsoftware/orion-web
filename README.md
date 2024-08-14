# Orion CanSat Tracker

## Overview

Orion CanSat Tracker is a web application designed to track and display real-time telemetry data from a CanSat (Can Sized Satellite). This project fetches data sent from the CanSat and visualizes it through an interactive map and detailed logs.

## Features

- **Real-time Tracking**: Displays the current location of the CanSat on a satellite map.
- **Distance Calculation**: Shows the distance between the user's location and the CanSat.
- **Detailed Telemetry Logs**: Presents a comprehensive table of all telemetry data received from the CanSat.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Dark Theme**: Sleek, modern interface inspired by Vercel/Next.js design.

## Technology Stack

- React
- TypeScript
- SCSS for styling
- Leaflet for map rendering
- Vite as the build tool

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/orion-cansat-tracker.git
   cd orion-cansat-tracker
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Create a `.env` file in the root directory and add your MapTiler API key:
   ```
   VITE_MAPTILER_API_KEY=your_maptiler_api_key_here
   ```

4. Start the development server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

5. Open `http://localhost:5173` in your browser to view the application.

## Project Structure

```
orion-cansat-tracker/
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── Map/
│   │   └── Logs/
│   ├── styles/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Data Structure

The application fetches telemetry data from the CanSat with the following structure:

```typescript
interface TelemetryData {
  packetid: number;
  packetnumber: number;
  satellitestatus: number;
  errorcode: string;
  missiontime: string;
  pressure1: string;
  pressure2: string;
  altitude1: string;
  altitude2: string;
  altitudedifference: string;
  descentrate: string;
  temp: string;
  voltagelevel: string;
  gps1latitude: string;
  gps1longitude: string;
  gps1altitude: string;
  pitch: string;
  roll: string;
  yaw: string | null;
  lnln: string;
  iotdata: string;
  teamid: number;
}
```

## API Endpoints

- Latest telemetry data: `https://orion-server-oek4.onrender.com/api/telemetry/latest`
- All telemetry logs: `https://orion-server-oek4.onrender.com/api/telemetry`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React Leaflet](https://react-leaflet.js.org/) for map integration
- [MapTiler](https://www.maptiler.com/) for satellite imagery
- [Vite](https://vitejs.dev/) for the fast development experience

---

For any additional information or queries, please open an issue in the GitHub repository.