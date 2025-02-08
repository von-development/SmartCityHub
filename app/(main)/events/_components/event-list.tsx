"use client";


import type { Event } from "@/types";
import { EventCard } from "./event-card";

const EVENTS: Event[] = [
  {
    id: "1",
    title: "Exposição Diálogos",
    description: "Galeria Morgados da Pedricosa - AveiroArte",
    date: "11 Jan - 04 Fev",
    location: "Galeria Morgados da Pedricosa",
    image: "/img/events/dialogos_1_600_1067.jpg"
  },
  {
    id: "2",
    title: "Inspetor-Rasto | Oficinas com Vida",
    description: "CMIA - Centro Municipal de Interpretação Ambiental",
    date: "15 Jan",
    location: "CMIA",
    image: "/img/events/inspetor_rasto_divulgacao_1_600_1067.png"
  },
  {
    id: "3",
    title: "Festas de São Gonçalinho de Aveiro",
    description: "Bairro da Beira Mar | Capela de São Gonçalinho",
    date: "09 - 13 Jan",
    location: "Capela de São Gonçalinho",
    image: "/img/events/cartaz_festas_sgoncalinho_1_600_1067.jpg"
  },
  {
    id: "4",
    title: "Sessão de contos e musicoterapia para bebés",
    description: "Atlas Aveiro",
    date: "18 Jan",
    location: "Atlas Aveiro",
    image: "/img/events/bebeteca_1_600_1067.JPG"
  },
  {
    id: "5",
    title: "Solstício de Inverno",
    description: "Teatro Aveirense",
    date: "18 Jan",
    location: "Teatro Aveirense",
    image: "/img/events/solsticio_de_inverno_1_600_1067.jpg"
  },
  {
    id: "6",
    title: "Engenho e Arte",
    description: "Museu da Cidade",
    date: "18 Jan",
    location: "Museu da Cidade",
    image: "/img/events/engenho_e_arte_1_600_1067.jpg"
  },
  {
    id: "7",
    title: "Concerto de Ano Novo | Banda Amizade",
    description: "Centro de Congressos de Aveiro",
    date: "18 Jan",
    location: "Centro de Congressos",
    image: "/img/events/cartaz_anonovo2025_bandaamizade_1_600_1067.jpg"
  },
  {
    id: "8",
    title: "Conversas d'alguidar | Rir é o melhor remédio",
    description: "Quarteirão das Artes e Cultura: Casa de Música, Aradas",
    date: "21 Jan",
    location: "Casa de Música",
    image: "/img/events/conversas_d_alguidar_1_600_1067.jpg"
  },
  {
    id: "9",
    title: "Origami da Ria | Oficinas com Vida",
    description: "CMIA - Centro Municipal de Interpretação Ambiental",
    date: "22 Jan",
    location: "CMIA",
    image: "/img/events/origami_da_ria_1_600_1067.jpg"
  },
  {
    id: "10",
    title: "Biblioteca Municipal Itinerante",
    description: "Centro Hospitalar do Baixo Vouga | CHBV",
    date: "22 Jan",
    location: "CHBV",
    image: "/img/events/bmi_hospital_1_600_1067.jpg"
  }
]

export function EventList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {EVENTS.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
} 