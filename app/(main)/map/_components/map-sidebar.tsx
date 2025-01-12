// "use client";

// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Building2,
//   Coffee,
//   Hotel,
//   Landmark,
//   MapPin,
//   UtensilsCrossed,
// } from "lucide-react";

// const categories = [
//   {
//     id: "attractions",
//     name: "Attractions",
//     icon: Landmark,
//   },
//   {
//     id: "restaurants",
//     name: "Restaurants",
//     icon: UtensilsCrossed,
//   },
//   {
//     id: "hotels",
//     name: "Hotels",
//     icon: Hotel,
//   },
//   {
//     id: "cafes",
//     name: "Cafes",
//     icon: Coffee,
//   },
//   {
//     id: "services",
//     name: "Services",
//     icon: Building2,
//   },
// ];

// const places = [
//   {
//     id: "1",
//     name: "Costa Nova Beach",
//     category: "attractions",
//     address: "Costa Nova, Aveiro",
//     description: "Famous striped houses and beautiful beach",
//     image: "https://placekitten.com/300/200",
//   },
//   // Add more places...
// ];

// export function MapSidebar() {
//   return (
//     <Card className="w-80 border-r rounded-none">
//       <Tabs defaultValue="places" className="h-full">
//         <div className="p-4 border-b">
//           <TabsList className="w-full">
//             <TabsTrigger value="places" className="flex-1">
//               Places
//             </TabsTrigger>
//             <TabsTrigger value="routes" className="flex-1">
//               Routes
//             </TabsTrigger>
//           </TabsList>
//         </div>

//         <TabsContent value="places" className="m-0">
//           <div className="p-4 border-b grid grid-cols-3 gap-2">
//             {categories.map((category) => (
//               <Button
//                 key={category.id}
//                 variant="ghost"
//                 className="flex flex-col h-auto gap-2 p-2"
//               >
//                 <category.icon className="h-4 w-4" />
//                 <span className="text-xs">{category.name}</span>
//               </Button>
//             ))}
//           </div>

//           <ScrollArea className="h-[calc(100vh-14rem)]">
//             <div className="p-4 space-y-4">
//               {places.map((place) => (
//                 <Card key={place.id} className="p-4">
//                   <div className="flex gap-4">
//                     <div
//                       className="w-20 h-20 rounded-lg bg-cover bg-center"
//                       style={{ backgroundImage: `url(${place.image})` }}
//                     />
//                     <div className="flex-1">
//                       <h3 className="font-semibold">{place.name}</h3>
//                       <p className="text-sm text-muted-foreground mb-2">
//                         {place.description}
//                       </p>
//                       <div className="flex items-center text-xs text-muted-foreground">
//                         <MapPin className="h-3 w-3 mr-1" />
//                         {place.address}
//                       </div>
//                     </div>
//                   </div>
//                 </Card>
//               ))}
//             </div>
//           </ScrollArea>
//         </TabsContent>

//         <TabsContent value="routes" className="m-0 p-4">
//           <div className="text-center text-muted-foreground p-4">
//             Routes feature coming soon...
//           </div>
//         </TabsContent>
//       </Tabs>
//     </Card>
//   );
// } 