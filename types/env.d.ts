declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_OPENAI_API_KEY: string;
      NEXT_SERP_API_KEY: string;
      NEXT_PUBLIC_MAPBOX_TOKEN: string;
      NEXT_PUBLIC_OPENWEATHERMAP_API_KEY: string;
      // Add other environment variables here
    }
  }
}

// Add any other custom type declarations here

export {}; 