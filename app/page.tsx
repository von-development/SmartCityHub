import { Button } from "@/components/ui";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl font-bold sm:text-6xl">
          Welcome to Aveiro Smart City
        </h1>
        <p className="text-xl text-muted-foreground">
          Discover events, navigate the city, and connect with your community
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/home">Get Started</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/events">Explore Events</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
