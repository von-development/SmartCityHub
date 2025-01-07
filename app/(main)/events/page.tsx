import { EventFilters } from "./_components/event-filters";
import { EventList } from "./_components/event-list";
import { EventsHeader } from "./_components/events-header";

export default function EventsPage() {
  return (
    <div className="flex flex-col gap-8 pb-16">
      <EventsHeader />
      <div className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
          <EventFilters />
          <EventList />
        </div>
      </div>
    </div>
  );
} 