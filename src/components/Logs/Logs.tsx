import React, { useState, useEffect, useRef } from 'react';
import { TelemetryData } from '../../types/telemetry';
import './Logs.scss';

const formatTitle = (key: string): string => {
  if (typeof key !== 'string') return 'Unknown';
  
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
  const [error, setError] = useState<string | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('https://orion-server-oek4.onrender.com/api/telemetry');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: TelemetryData[] = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received');
        }
        setLogs(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching logs:', error);
        setError('Failed to fetch logs. Please try again later.');
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

  if (error) {
    return <div className="Logs error">{error}</div>;
  }

  if (logs.length === 0) {
    return <div className="Logs">Loading...</div>;
  }

  const safeKeys = Object.keys(logs[0] || {});

  return (
    <div className="Logs">
      <div className="table-container" ref={tableRef}>
        <table>
          <thead>
            <tr>
              {safeKeys.map((key) => (
                <th key={key}>{formatTitle(key)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={log.packetid || index}>
                {safeKeys.map((key) => {
                  const value = log[key as keyof TelemetryData];
                  return (
                    <td key={key} className={key}>
                      {value != null ? String(value) : 'N/A'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { Logs };