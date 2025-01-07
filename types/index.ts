export interface Event {
  id: string;
  title: string;
  description: string;
  image?: string;
  date: string;
  location: string;
}

export interface Agent {
  name: string;
  avatar: string;
  greeting: string;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
} 