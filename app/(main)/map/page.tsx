import { MapHeader } from "./_components/map-header";
import { MapView } from "./_components/map-view";
import { MapSidebar } from "./_components/map-sidebar";

export default function MapPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <MapHeader />
      <div className="flex-1 flex">
        <MapSidebar />
        <MapView />
      </div>
    </div>
  );
} 