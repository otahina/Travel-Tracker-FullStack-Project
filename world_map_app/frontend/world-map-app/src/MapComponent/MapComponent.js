import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import '../libs/leaflet/leaflet.css'; // Importing the Leaflet CSS
// Importing the GeoJSON file
//import * as countries110m from '../geojson/countries.geojson';

const MapComponent = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Only initialize the map if it hasn't been initialized
    if (!mapInstanceRef.current && mapRef.current) {
      mapInstanceRef.current = L.map(mapRef.current, {
        minZoom: 2.2,
      }).setView([51.505, -0.09], 2);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstanceRef.current);

    const geoJsonStyle = {
        color: 'black', // Set the border color to black
        weight: 1,      // Set the border thickness (optional)
    };

    // Fetch the GeoJSON file
    fetch('/geojson/countries.geojson')
      .then(response => response.json())
      .then(data => {
        L.geoJSON(data, { style: geoJsonStyle }).addTo(mapInstanceRef.current);
      });
    }

    return () => {
      // Cleanup function to remove the map instance if it exists
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null; // Reset the map instance reference
      }
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  return <div ref={mapRef} style={{ height: '100vh', width: '100%', border: '1px solid red' }} />;
};

export default MapComponent;
