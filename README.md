# Aveiro Smart City Platform

A modern Next.js 14 application serving as the digital platform for Aveiro's smart city initiatives, providing citizens with easy access to municipal services, events, and city information.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS, Stylus Modules
- **UI Components:** Shadcn UI, Radix UI
- **State Management:** Zustand
- **Maps:** Mapbox GL JS
- **Font:** Inter (Variable Font)

## Project Structure

```
├── app/
│   ├── fonts/
│   │   ├── GeistMonoVF.woff
│   │   └── GeistVF.woff
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
├── styles/
└── public/
```

## Features

- 🏛️ **Municipal Services:** Comprehensive access to city services and information
- 🗺️ **Interactive City Map:** Explore Aveiro with Mapbox integration
- 📅 **Event Management:** Browse and search city events
- 🤖 **AI Assistant:** Smart chatbot for city-related queries
- 📱 **Responsive Design:** Mobile-first approach with Tailwind CSS
- 🎨 **Modern UI:** Built with Shadcn UI and Radix UI
- 🔄 **State Management:** Efficient state handling with Zustand
- ⚡ **Performance:** Optimized for Core Web Vitals

## Development Checklist

- [x] Project setup with Next.js 14
- [x] UI components implementation
- [x] Responsive layout design
- [x] Map integration with Mapbox
- [x] Events listing and filtering
- [x] Chat interface implementation
- [ ] Backend API integration
- [ ] Authentication system
- [ ] User preferences
- [ ] Service workers for offline support
- [ ] Analytics integration
- [ ] E2E testing setup
- [ ] CI/CD pipeline
- [ ] Language server integration
- [ ] Monitoring and error tracking

## TODO

### High Priority
- [ ] Integrate with language server for enhanced development
- [ ] Complete API endpoints for events system
- [ ] Implement user authentication
- [ ] Add error boundaries and fallbacks

### Medium Priority
- [ ] Add more interactive map features
- [ ] Enhance chat AI capabilities
- [ ] Implement service worker
- [ ] Add PWA support

### Low Priority
- [ ] Add more language options
- [ ] Implement advanced search features
- [ ] Add more city service integrations

## Development

- **Styling:** Hybrid approach with Tailwind CSS for utilities and Stylus Modules for components
- **Components:** React Server Components (RSC) by default, with 'use client' directives only where necessary
- **Performance:** Optimized with proper image optimization and code splitting
- **State:** Global state management with Zustand, URL state with nuqs


## Codebase

This project is part of the Aveiro Tech City initiative, aiming to modernize municipal services through digital transformation.
