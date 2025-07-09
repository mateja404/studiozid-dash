"use client"

import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface coordinates {
  lng: number
  lat: number
}

const Mapica = ({ lng, lat }: coordinates) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (mapInstanceRef.current) return;

    if (mapContainerRef.current && process.env.NEXT_PUBLIC_MAPTILER_KEY) {
      mapInstanceRef.current = new maplibregl.Map({
        container: mapContainerRef.current,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`,
        center: [lng, lat],
        zoom: 10,
        pitch: 0,
        bearing: 0,
      });

      mapInstanceRef.current.addControl(new maplibregl.NavigationControl({}));

      new maplibregl.Marker()
        .setLngLat([lng, lat])
        .addTo(mapInstanceRef.current);

      return () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
      };
    } else {
      console.log("Error");
    }
  }, []);


  return <div ref={mapContainerRef} style={{ width: '90%', height: '90%', borderRadius: "10px" }} />;
};

export default Mapica;