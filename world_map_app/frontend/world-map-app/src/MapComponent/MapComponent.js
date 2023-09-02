import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import '../libs/leaflet/leaflet.css';

const MapComponent = ({ visitedCountries, markCountry, activeButton, homeCountry }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  let legendRef = useRef(null); // Store reference to the legend

  useEffect(() => {
    if (!mapInstanceRef.current && mapRef.current) {
      mapInstanceRef.current = L.map(mapRef.current, {
        minZoom: 2.2,
      }).setView([25.505, -0.09], 2);
  
      // Max bound for horizontal moving
      const bounds = L.latLngBounds([[82, -180], [-82, 180]]);
      mapInstanceRef.current.setMaxBounds(bounds);
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstanceRef.current);
  
      const geoJsonStyle = (feature) => {
        let fillColor;
        let strokeColor;
  
        if (homeCountry && feature.properties.ADMIN === homeCountry.value) {
          fillColor = '#90ee90';
          strokeColor = 'green';
        } else if (visitedCountries.has(feature.properties.ISO_A3)) {
          fillColor = 'yellow';
          strokeColor = 'orange';
        } else {
          fillColor = 'gray';
          strokeColor = 'black';
        }
  
        return {
          color: strokeColor,
          weight: 2,
          opacity: 0.8,
          fillColor: fillColor,
          fillOpacity: 0.8,
        };
      };
  
      fetch('/geojson/countries.geojson')
        .then((response) => response.json())
        .then((data) => {
          L.geoJSON(data, {
            style: geoJsonStyle,
            onEachFeature: (feature, layer) => {
              layer.on('click', () => {
                const countryId = feature.properties.ISO_A3;
                if (activeButton === 'mark' || activeButton === 'unmark') {
                  markCountry(countryId, activeButton);
                }
              });
              layer.on('mouseover', () => {
                layer.bindTooltip(feature.properties.ADMIN, {permanent: false, direction: "top"}).openTooltip();
              });
              layer.on('mouseout', () => {
                layer.closeTooltip();
              });
            },
          }).addTo(mapInstanceRef.current);

          // Remove existing legend
          if (legendRef.current) {
            legendRef.current.remove();
          }
  
          // Legend code starts here
          const legend = L.control({ position: 'bottomleft' });
          legend.onAdd = function() {
            const div = L.DomUtil.create('div', 'map-legend');
            div.innerHTML += `
              <div class="map-legend-item">
              <div class="map-legend-box" style="background-color: yellow; border: 2px solid orange;"></div>
                <span class="legend-visited-disc">Visited Countries</span>
              </div>
              <div class="map-legend-item">
              <div class="map-legend-box" style="background-color: #90ee90; border: 2px solid darkgreen;"></div>
                <span>Home Country</span>
              </div>
            `;
            return div;
          };          
          legend.addTo(mapInstanceRef.current);

           // Save reference to the new legend
          legendRef.current = legend;
        });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      // Remove legend when component unmounts
      if (legendRef.current) {
        legendRef.current.remove();
      }
    };
  }, [visitedCountries, markCountry, activeButton, homeCountry]);
  

  return <div ref={mapRef} style={{ height: '100vh', width: '100%', border: '2px solid rgb(255, 166, 0)'}} />;
};

export default MapComponent;
