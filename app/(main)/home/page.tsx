import { WeatherSection } from "./_components/weather-section";
import { FeaturedHighlights } from "./_components/featured-highlights";
import { PopularServices } from "./_components/popular-services";
import { ServiceCategories } from "./_components/service-categories";
import { UserCategories } from "./_components/user-categories";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <div className="flex-grow relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url(/img/grid.svg)] opacity-[0.02] pointer-events-none" />
        
        {/* Weather Section */}
        <section className="relative py-4 sm:py-6 md:py-8">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
          <WeatherSection />
        </section>

        {/* Featured Highlights */}
        <section className="relative py-4 sm:py-6 md:py-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background">
          <div className="absolute inset-0 bg-[url(/img/dots.svg)] opacity-[0.02] pointer-events-none" />
          <FeaturedHighlights />
        </section>

        {/* Popular Services */}
        <section className="relative py-4 sm:py-6 md:py-8">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
          <PopularServices />
        </section>

        {/* Service Categories */}
        <section className="relative py-4 sm:py-6 md:py-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background">
          <div className="absolute inset-0 bg-[url(/img/grid.svg)] opacity-[0.02] pointer-events-none rotate-180" />
          <ServiceCategories />
        </section>

        {/* User Categories */}
        <section className="relative py-4 sm:py-6 md:py-8">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-[url(/img/dots.svg)] opacity-[0.02] pointer-events-none" />
          <UserCategories />
        </section>
      </div>

      {/* Floating Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </div>
    </main>
  );
}
