import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

function Map() {
  const mapContainerStyle = {
    width: '100%',
    height: '800px',
  };

  const center = {
    lat: 6.5244, // Lagos latitude
    lng: 3.3792, // Lagos longitude
  };

  const mechanics = [
    { lat: 6.5244, lng: 3.3792, name: 'Mechanic 6' },
    { lat: 6.48045, lng: 3.35098, name: 'Oyingbo Mechanic Village' },
    { lat: 6.4302959, lng: 3.4259789, name: 'Fast Repairs Auto Garage' },
    { lat: 6.521231, lng: 3.3795608, name: 'Nenis Auto Care' },
    { lat: 6.42979, lng: 3.4239399, name: 'Globe Motors' },
    { lat: 6.45306, lng: 3.39583, name: '3 Point Auto Tech Nig1' },
    { lat: 6.57491136, lng: 3.392802115, name: 'Volvo SMT ' },
    { lat: 6.44056077527, lng: 3.46126198769, name: 'D.T Autocafe' },
    { lat: 6.5245, lng: 3.3792, name: 'Mechanic 1' },
    { lat: 6.5246, lng: 3.3792, name: 'Mechanic 2' },
    { lat: 6.5249, lng: 3.3792, name: 'Mechanic 3' },
    // Add more mechanic objects with their coordinates and names
  ];
  const [selectedMechanic, setSelectedMechanic] = useState(null);

  const [map, setMap] = useState(null);

  const onLoad = (map) => {
    setMap(map);
  };

  useEffect(() => {
    if (map) {
      mechanics.forEach((mechanic) => {
        new window.google.maps.Marker({
          position: { lat: mechanic.lat, lng: mechanic.lng },
          map: map,
          title: mechanic.name,
        });
      });
    }
  }, [map, mechanics]);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCesJ17qITXGLfr2PLEPUFUwj9o3ie7GhU" // Replace with your actual Google Maps API key
    >

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
      >
        {mechanics.map((mechanic, index) => (
          <Marker
            key={`${mechanic.name}-${index}`}
            position={{ lat: mechanic.lat, lng: mechanic.lng }}
            onClick={() => setSelectedMechanic(mechanic)}
          />
        ))}

        {selectedMechanic && (
          <InfoWindow
            position={{ lat: selectedMechanic.lat, lng: selectedMechanic.lng }}
            onCloseClick={() => setSelectedMechanic(null)}
          >
            <div>{selectedMechanic.name}</div>
          </InfoWindow>
        )}
      </GoogleMap>



    </LoadScript>
  );
}

export default Map;
