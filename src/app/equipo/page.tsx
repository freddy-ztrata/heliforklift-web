import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/sections/Footer";
import CTASection from "@/components/sections/CTASection";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import ScrollProgress from "@/components/shared/ScrollProgress";
import { contact, salesTeam, partsTeam, serviceTeam } from "@/lib/data/company";
import {
  Phone,
  Mail,
  MapPin,
  User,
  Wrench,
  Cog,
  Building2,
  Globe2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Equipo y Vendedores — Helifork Lift",
  description:
    "Conoce a nuestros ejecutivos de venta por zona en Chile, área de repuestos y servicio técnico, y nuestros puntos de venta en Santiago, Antofagasta y Copiapó.",
  alternates: { canonical: "/equipo" },
  openGraph: {
    title: "Equipo y Vendedores — Helifork Lift",
    description:
      "Vendedores por zona, repuestos, servicio técnico y puntos de venta en Chile.",
  },
};

export default function EquipoPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="relative overflow-hidden bg-steel-950 py-16 sm:py-20">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-steel-400">
              Quiénes somos
            </p>
            <h1 className="font-heading mt-2 text-[clamp(2.5rem,6vw,5rem)] leading-none text-white">
              NUESTRO EQUIPO
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-steel-300">
              Contamos con ejecutivos de venta especializados por zona en todo
              Chile, un área de repuestos con stock permanente y un equipo
              técnico certificado por el fabricante.
            </p>
          </div>
        </section>

        {/* Vendedores */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-12">
            <p className="text-sm font-medium uppercase tracking-widest text-steel-400">
              Equipo comercial
            </p>
            <h2 className="font-heading mt-2 text-[clamp(2rem,5vw,3.5rem)] leading-none text-white">
              VENDEDORES POR ZONA
            </h2>
            <p className="mt-3 max-w-2xl text-steel-400">
              Encuentra al ejecutivo de tu zona y agenda una asesoría
              personalizada. Respuesta en menos de 2 horas.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {salesTeam.map((person) => (
              <div
                key={person.email}
                className="rounded-2xl border border-steel-700/50 bg-steel-900/60 p-5 sm:p-6 transition-all hover:border-heli-red/40 hover:bg-steel-900"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-heli-red/10">
                    <User className="h-6 w-6 text-heli-red" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white truncate">
                      {person.name}
                    </h3>
                    <p className="text-sm text-heli-red-light">{person.role}</p>
                    {person.zone && (
                      <p className="mt-1 inline-flex items-center gap-1 text-xs text-steel-400">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span className="truncate">{person.zone}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-5 space-y-2 border-t border-steel-800 pt-4">
                  <a
                    href={`mailto:${person.email}`}
                    className="flex items-center gap-2 text-sm text-steel-300 transition-colors hover:text-heli-red-light break-all"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-heli-red" />
                    <span className="break-all">{person.email}</span>
                  </a>
                  <a
                    href={`tel:${person.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 text-sm text-steel-300 transition-colors hover:text-heli-red-light"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-heli-red" />
                    {person.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Repuestos y servicio tecnico */}
        <section className="bg-steel-900/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 sm:mb-12">
              <p className="text-sm font-medium uppercase tracking-widest text-steel-400">
                Postventa
              </p>
              <h2 className="font-heading mt-2 text-[clamp(2rem,5vw,3.5rem)] leading-none text-white">
                REPUESTOS Y SERVICIO TÉCNICO
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
              {/* Repuestos */}
              <div className="rounded-2xl border border-steel-700/50 bg-steel-900 p-6 sm:p-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-heli-red/10">
                  <Cog className="h-7 w-7 text-heli-red" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Área de Repuestos
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-400">
                  {partsTeam.description}
                </p>
                <div className="mt-6 space-y-2 border-t border-steel-800 pt-5">
                  <a
                    href={`mailto:${partsTeam.email}`}
                    className="flex items-center gap-2 text-sm text-steel-300 hover:text-heli-red-light transition-colors"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-heli-red" />
                    {partsTeam.email}
                  </a>
                  <a
                    href={`tel:${partsTeam.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 text-sm text-steel-300 hover:text-heli-red-light transition-colors"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-heli-red" />
                    {partsTeam.phone}
                  </a>
                </div>
              </div>

              {/* Servicio tecnico */}
              <div className="rounded-2xl border border-steel-700/50 bg-steel-900 p-6 sm:p-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-heli-red/10">
                  <Wrench className="h-7 w-7 text-heli-red" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Servicio Técnico
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-400">
                  {serviceTeam.description}
                </p>
                <div className="mt-6 space-y-2 border-t border-steel-800 pt-5">
                  <a
                    href={`mailto:${serviceTeam.email}`}
                    className="flex items-center gap-2 text-sm text-steel-300 hover:text-heli-red-light transition-colors"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-heli-red" />
                    {serviceTeam.email}
                  </a>
                  <a
                    href={`tel:${serviceTeam.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 text-sm text-steel-300 hover:text-heli-red-light transition-colors"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-heli-red" />
                    {serviceTeam.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Puntos de venta / Sucursales */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-12">
            <p className="text-sm font-medium uppercase tracking-widest text-steel-400">
              Puntos de venta
            </p>
            <h2 className="font-heading mt-2 text-[clamp(2rem,5vw,3.5rem)] leading-none text-white">
              NUESTRAS SUCURSALES
            </h2>
            <p className="mt-3 max-w-2xl text-steel-400">
              Atención presencial en Santiago, Antofagasta y Copiapó.
              Cobertura nacional para servicio técnico y repuestos.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
            {contact.locations.map((loc) => (
              <div
                key={loc.city}
                className="rounded-2xl border border-steel-700/50 bg-steel-900/60 p-6 transition-all hover:border-heli-red/40"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-heli-red/10">
                  {"isMain" in loc && loc.isMain ? (
                    <Building2 className="h-6 w-6 text-heli-red" />
                  ) : (
                    <Globe2 className="h-6 w-6 text-heli-red" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-white">
                  {loc.city}
                  {"isMain" in loc && loc.isMain && (
                    <span className="ml-2 align-middle rounded-full bg-heli-red/15 px-2 py-0.5 text-xs text-heli-red">
                      Principal
                    </span>
                  )}
                </h3>
                <p className="mt-2 text-sm text-steel-400">{loc.address}</p>
              </div>
            ))}
          </div>

          {/* Horario destacado */}
          <div className="mt-10 rounded-2xl border border-heli-yellow/20 bg-heli-yellow/5 p-6 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-heli-yellow">
              Horario de atención
            </p>
            <p className="mt-2 text-xl sm:text-2xl font-bold text-white">
              {contact.hours}
            </p>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
