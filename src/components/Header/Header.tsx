import React from 'react';
import './Header.scss';

interface HeaderProps {
  activeComponent: 'map' | 'logs';
  setActiveComponent: (component: 'map' | 'logs') => void;
}

const Header: React.FC<HeaderProps> = ({ activeComponent, setActiveComponent }) => {
  return (
    <header className="Header">
      <h1>Orion</h1>
      <div className="button-container">
        <button
          className={activeComponent === 'map' ? 'active' : ''}
          onClick={() => setActiveComponent('map')}
        >
          Map
        </button>
        <button
          className={activeComponent === 'logs' ? 'active' : ''}
          onClick={() => setActiveComponent('logs')}
        >
          Logs
        </button>
      </div>
    </header>
  );
};

export { Header };