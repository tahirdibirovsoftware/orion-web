import React, { useState } from 'react';
import { Header } from './components/Header/Header';
import { Map } from './components/Map/Map';
import { Logs } from './components/Logs/Logs';
import './App.scss';

const App: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<'map' | 'logs'>('map');

  return (
    <div className="App">
      <Header activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      {activeComponent === 'map' ? <Map /> : <Logs />}
    </div>
  );
};

export default App;