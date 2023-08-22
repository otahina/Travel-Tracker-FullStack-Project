import React from 'react';
import MapComponent from './MapComponent/MapComponent';

const App = () => {
  // You may manage state or other logic here
  return (
    <div>
        <header className="app-header">
        <h1>GlobeMarks: Where Have You Been in the World?</h1>
      </header>
      <MapComponent />
    </div>
  );
};

export default App;
