declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_MAPBOX_TOKEN: string;
      // Add other environment variables here
    }
  }
}

// Add any other custom type declarations here

export {}; 