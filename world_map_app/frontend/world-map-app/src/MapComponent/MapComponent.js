import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

const MapComponent = () => {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
  
    useEffect(() => {
      // Only initialize the map if it hasn't been initialized
      if (!mapInstanceRef.current && mapRef.current) {
        mapInstanceRef.current = L.map(mapRef.current, {
            minZoom: 2.2
        }).setView([51.505, -0.09], 2);
  
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstanceRef.current);
      }
  
      return () => {
        // Cleanup function to remove the map instance if it exists
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null; // Reset the map instance reference
        }
      };
    }, []); // Empty dependency array ensures this runs only on mount and unmount
  
    return (
      <div ref={mapRef} style={{ height: '100vh', width: '100%', border: '1px solid red' }} />
    );
  };  

export default MapComponent;
