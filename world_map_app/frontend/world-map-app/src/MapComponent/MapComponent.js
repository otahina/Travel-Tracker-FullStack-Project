import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import '../libs/leaflet/leaflet.css';

const MapComponent = ({ visitedCountries, markCountry, activeButton }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapInstanceRef.current && mapRef.current) {
      mapInstanceRef.current = L.map(mapRef.current, {
        minZoom: 2.2,
      }).setView([51.505, -0.09], 2);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstanceRef.current);

      const geoJsonStyle = (feature) => ({
        color: visitedCountries.has(feature.properties.ISO_A3) ? 'orange' : 'black',
        weight: 2,      // Thickness of the border
        opacity: 0.8,     // Opacity of the border
        fillColor: visitedCountries.has(feature.properties.ISO_A3) ? 'yellow' : 'gray', // Fill color
        fillOpacity: 0.8 // Opacity of the fill color
      });

      // Fetch the GeoJSON file
      // GeoJson allows to access to the feture data associated with each country
      fetch('/geojson/countries.geojson')
      .then((response) => response.json())
      .then((data) => {
        L.geoJSON(data, {
          style: geoJsonStyle,
          onEachFeature: (feature, layer) => {
            layer.on('click', () => {
              if (activeButton === 'mark') {
                console.log('Clicked country:', feature.properties.ADMIN, feature.properties.ISO_A3);
                markCountry(feature.properties.ISO_A3);
              } else {
                console.log('Marking disabled'); 
              }
            });
          },
        }).addTo(mapInstanceRef.current);
      });    
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [visitedCountries, markCountry, activeButton]); // Added dependencies to update styles

  return <div ref={mapRef} style={{ height: '100vh', width: '100%', border: '1px solid red' }} />;
};

export default MapComponent;
