// "use client";

// import { useEffect, useRef } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";

// // The type is now properly inferred
// const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// // Set the access token
// mapboxgl.accessToken = MAPBOX_TOKEN;

// const AVEIRO_CENTER = {
//   lng: -8.6537,
//   lat: 40.6405,
//   zoom: 14,
// } as const;

// export function MapView() {
//   const mapContainer = useRef<HTMLDivElement>(null);
//   const map = useRef<mapboxgl.Map | null>(null);

//   useEffect(() => {
//     if (!mapContainer.current || map.current) return;

//     try {
//       const newMap = new mapboxgl.Map({
//         container: mapContainer.current,
//         style: "mapbox://styles/mapbox/light-v11",
//         center: [AVEIRO_CENTER.lng, AVEIRO_CENTER.lat],
//         zoom: AVEIRO_CENTER.zoom,
//       });

//       // Add navigation controls
//       newMap.addControl(new mapboxgl.NavigationControl(), "top-right");

//       // Store the map instance
//       map.current = newMap;
//     } catch (error) {
//       console.error("Error initializing map:", error);
//     }

//     return () => {
//       if (map.current) {
//         map.current.remove();
//         map.current = null;
//       }
//     };
//   }, []);

//   return (
//     <div className="flex-1 relative">
//       <div ref={mapContainer} className="absolute inset-0" />
//     </div>
//   );
// } 