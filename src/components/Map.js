import React from 'react';

const Map = ({ routes, airports }) => {
  // x1
  const sourceLong = (route) => {
    const airport = airports.find(airport => route.src === airport.code);
    return airport.long;
  };
  // y1
  const sourceLat = (route) => {
    const airport = airports.find(airport => route.src === airport.code);
    return airport.lat;
  };
  // x2
  const destLong = (route) => {
    const airport = airports.find(airport => route.dest === airport.code);
    return airport.long;
  };
  // y2
  const destLat = (route) => {
    const airport = airports.find(airport => route.dest === airport.code);
    return airport.lat;
  };

  console.log(routes);

  return (
    <svg className="map" viewBox="-180 -90 360 180">
      <g transform="scale(1 -1)">
        <image xlinkHref="equirectangular_world.jpg"
          href="equirectangular_world.jpg" x="-180" y="-90" height="100%"
          width="100%" transform="scale(1 -1)"/>

        {routes.map(route =>
          <g key={`${route.airline}${route.src}${route.dest}`}>
            <circle className="source" cx={sourceLong(route)}
              cy={sourceLat(route)}>
              <title></title>
            </circle> 
            <circle className="destination" cx={destLong(route)}
              cy={destLat(route)}>
              <title></title>
            </circle>
            <path d={`M${sourceLong(route)} ${sourceLat(route)} L
              ${destLong(route)} ${destLat(route)}`} />
          </g>
        )}        
      </g>
    </svg>
  );
};

export default Map;