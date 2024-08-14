/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { TelemetryData } from '../../types/telemetry';
import './Map.scss';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Position {
  lat: number;
  lng: number;
}

const MapUpdater: React.FC<{ center: Position }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

const Map: React.FC = () => {
  const [telemetryData, setTelemetryData] = useState<TelemetryData | null>(null);
  const [userPosition, setUserPosition] = useState<Position | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://orion-server-oek4.onrender.com/api/telemetry/latest');
        const data: TelemetryData = await response.json();
        setTelemetryData(data);
      } catch (error) {
        console.error('Error fetching telemetry data:', error);
      }
    };

    const getUserPosition = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        (error) => {
          console.error('Error getting user position:', error);
        }
      );
    };

    fetchData();
    getUserPosition();
    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  const calculateDistance = (pos1: Position, pos2: Position): number => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (pos2.lat - pos1.lat) * (Math.PI / 180);
    const dLon = (pos2.lng - pos1.lng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(pos1.lat * (Math.PI / 180)) * Math.cos(pos2.lat * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  if (!telemetryData || !userPosition) return <div>Loading...</div>;

  const satellitePosition: Position = {
    lat: parseFloat(telemetryData.gps1latitude),
    lng: parseFloat(telemetryData.gps1longitude)
  };
  const distance = calculateDistance(userPosition, satellitePosition);

  return (
    <div className="Map">
      <MapContainer center={userPosition} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
  attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
/>
        <Marker position={userPosition} />
        <Marker position={satellitePosition} />
        <Polyline positions={[userPosition, satellitePosition]} />
        <MapUpdater center={satellitePosition} />
      </MapContainer>
      <div className="distance-info">
        Distance: {distance.toFixed(2)} km
      </div>
    </div>
  );
};

export { Map };