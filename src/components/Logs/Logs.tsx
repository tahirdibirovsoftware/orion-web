import React, { useState, useEffect, useRef } from 'react';
import { TelemetryData } from '../../types/telemetry';
import './Logs.scss';

const formatTitle = (key: string): string => {
  // Split the key by capital letters and numbers
  const words = key.split(/(?=[A-Z0-9])/).map(word => word.toLowerCase());
  
  // Capitalize the first letter of each word
  const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  
  // Join the words and replace specific acronyms
  return formattedWords.join(' ')
    .replace(/Id\b/g, 'ID')
    .replace(/Gps/g, 'GPS')
    .replace(/Iot/g, 'IoT');
};

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

  if (logs.length === 0) {
    return <div className="Logs">Loading...</div>;
  }

  return (
    <div className="Logs">
      <div className="table-container" ref={tableRef}>
        <table>
          <thead>
            <tr>
              {Object.keys(logs[0]).map((key) => (
                <th key={key}>{formatTitle(key)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.packetid}>
                {Object.entries(log).map(([key, value]) => (
                  <td key={key} className={key}>
                    {value?.toString() || 'N/A'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { Logs };