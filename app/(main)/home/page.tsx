import { WeatherSection } from "./_components/weather-section";
import { FeaturedHighlights } from "./_components/featured-highlights";
import { PopularServices } from "./_components/popular-services";
import { ServiceCategories } from "./_components/service-categories";
import { UserCategories } from "./_components/user-categories";


export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 pb-16">
      <WeatherSection />
      <FeaturedHighlights />
      <PopularServices />
      <ServiceCategories />
      <UserCategories />
    </div>
  );
} 