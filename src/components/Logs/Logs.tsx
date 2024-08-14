import React, { useState, useEffect, useRef } from 'react';
import { TelemetryData } from '../../types/telemetry';
import './Logs.scss';

const Logs: React.FC = () => {
  const [logs, setLogs] = useState<TelemetryData[]>([]);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('https://orion-server-oek4.onrender.com/api/telemetry');
        const data: TelemetryData[] = await response.json();
        setLogs(data);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollTop = tableRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="Logs">
      <div className="table-container" ref={tableRef}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Time</th>
              <th>Alt 1</th>
              <th>Alt 2</th>
              <th>Temp</th>
              <th>Lat</th>
              <th>Long</th>
              <th>GPS Alt</th>
              <th>Press 1</th>
              <th>Press 2</th>
              <th>Voltage</th>
              <th>Pitch</th>
              <th>Roll</th>
              <th>Yaw</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.packetid}>
                <td>{log.packetid}</td>
                <td>{log.missiontime}</td>
                <td>{log.altitude1}</td>
                <td>{log.altitude2}</td>
                <td>{log.temp}</td>
                <td>{log.gps1latitude}</td>
                <td>{log.gps1longitude}</td>
                <td>{log.gps1altitude}</td>
                <td>{log.pressure1}</td>
                <td>{log.pressure2}</td>
                <td>{log.voltagelevel}</td>
                <td>{log.pitch}</td>
                <td>{log.roll}</td>
                <td>{log.yaw ?? 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { Logs };