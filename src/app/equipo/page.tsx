import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/sections/Footer";
import CTASection from "@/components/sections/CTASection";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import ScrollProgress from "@/components/shared/ScrollProgress";
import {
  contact,
  teamByBranch,
  strategicPartners,
  partsTeam,
  serviceTeam,
} from "@/lib/data/company";
import {
  Phone,
  Mail,
  MapPin,
  User,
  Wrench,
  Cog,
  Building2,
  Globe2,
  Briefcase,
  Handshake,
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

        {/* Vendedores agrupados por sucursal */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-12">
            <p className="text-sm font-medium uppercase tracking-widest text-steel-400">
              Equipo comercial
            </p>
            <h2 className="font-heading mt-2 text-[clamp(2rem,5vw,3.5rem)] leading-none text-white">
              VENDEDORES POR SUCURSAL
            </h2>
            <p className="mt-3 max-w-2xl text-steel-400">
              Encuentra al ejecutivo de tu zona y agenda una asesoría
              personalizada.
            </p>
          </div>

          <div className="space-y-12">
            {teamByBranch.map((branch) => (
              <div key={branch.branch}>
                <div className="mb-6 flex flex-col gap-2 border-l-4 border-heli-red pl-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-heli-red">
                      Sucursal
                    </p>
                    <h3 className="font-heading text-3xl sm:text-4xl text-white leading-none mt-1">
                      {branch.branch.toUpperCase()}
                    </h3>
                  </div>
                  <p className="flex items-start gap-2 text-sm text-steel-400">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-heli-red" />
                    {branch.address}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {branch.contacts.map((person) => {
                    const isParts = person.role
                      .toLowerCase()
                      .includes("repuesto");
                    const isManager = person.role
                      .toLowerCase()
                      .includes("gerente");
                    const Icon = isParts ? Cog : isManager ? Briefcase : User;
                    return (
                      <div
                        key={person.email}
                        className="rounded-2xl border border-steel-700/50 bg-steel-900/60 p-5 sm:p-6 transition-all hover:border-heli-red/40 hover:bg-steel-900"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                              isParts ? "bg-amber-500/10" : "bg-heli-red/10"
                            }`}
                          >
                            <Icon
                              className={`h-5 w-5 ${
                                isParts ? "text-amber-400" : "text-heli-red"
                              }`}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base font-bold text-white truncate">
                              {person.name}
                            </h4>
                            <p
                              className={`text-xs font-semibold uppercase tracking-wider ${
                                isParts
                                  ? "text-amber-400"
                                  : "text-heli-red-light"
                              }`}
                            >
                              {person.role}
                            </p>
                            {person.zone && (
                              <p className="mt-1 text-xs text-steel-400">
                                {person.zone}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 space-y-2 border-t border-steel-800 pt-4">
                          <a
                            href={`mailto:${person.email}`}
                            className="flex items-center gap-2 text-sm text-steel-300 transition-colors hover:text-heli-red-light"
                          >
                            <Mail className="h-3.5 w-3.5 shrink-0 text-heli-red" />
                            <span className="break-all">{person.email}</span>
                          </a>
                          <a
                            href={`tel:${person.phone.replace(/\s/g, "")}`}
                            className="flex items-center gap-2 text-sm text-steel-300 transition-colors hover:text-heli-red-light"
                          >
                            <Phone className="h-3.5 w-3.5 shrink-0 text-heli-red" />
                            {person.phone}
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Socios estrategicos */}
        <section className="bg-steel-900/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 sm:mb-12">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-heli-red/10">
                <Handshake className="h-6 w-6 text-heli-red" />
              </div>
              <p className="text-sm font-medium uppercase tracking-widest text-steel-400">
                Cobertura nacional
              </p>
              <h2 className="font-heading mt-2 text-[clamp(2rem,5vw,3.5rem)] leading-none text-white">
                SOCIOS ESTRATÉGICOS
              </h2>
              <p className="mt-3 max-w-2xl text-steel-400">
                Red de socios estratégicos en distintas regiones de Chile para
                llegar más cerca de ti.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
              {strategicPartners.map((partner) => (
                <div
                  key={partner.name}
                  className={`flex flex-col rounded-2xl border p-6 sm:p-7 transition-all hover:-translate-y-1 ${
                    partner.isOwn
                      ? "border-heli-red/30 bg-gradient-to-br from-heli-red/10 via-steel-900 to-steel-900 hover:border-heli-red/50"
                      : "border-steel-700/50 bg-steel-900 hover:border-heli-red/30"
                  }`}
                >
                  <div className="mb-4 flex items-start gap-3">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                        partner.isOwn ? "bg-heli-red/20" : "bg-steel-800"
                      }`}
                    >
                      {partner.isOwn ? (
                        <Building2 className="h-6 w-6 text-heli-red" />
                      ) : (
                        <Handshake className="h-6 w-6 text-heli-red-light" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                        {partner.name}
                      </h3>
                      {partner.isOwn && (
                        <span className="mt-1 inline-block rounded-full bg-heli-red/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-heli-red">
                          Sucursal Helifork
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="flex items-start gap-2 text-sm text-steel-300">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-heli-red" />
                    <span>
                      {partner.address}
                      <br />
                      <span className="text-steel-400">
                        {partner.city}, {partner.region}
                      </span>
                    </span>
                  </p>

                  <div className="mt-4 space-y-2 border-t border-steel-800 pt-4 text-sm">
                    <p className="flex items-center gap-2 text-steel-400">
                      <User className="h-3.5 w-3.5 shrink-0 text-heli-red" />
                      <span className="font-semibold text-white">
                        {partner.contactName}
                      </span>
                    </p>
                    {partner.contactEmail && (
                      <a
                        href={`mailto:${partner.contactEmail}`}
                        className="flex items-center gap-2 text-steel-300 transition-colors hover:text-heli-red-light"
                      >
                        <Mail className="h-3.5 w-3.5 shrink-0 text-heli-red" />
                        <span className="break-all">{partner.contactEmail}</span>
                      </a>
                    )}
                    <a
                      href={`tel:${partner.contactPhone.replace(/\s/g, "")}`}
                      className="flex items-center gap-2 text-steel-300 transition-colors hover:text-heli-red-light"
                    >
                      <Phone className="h-3.5 w-3.5 shrink-0 text-heli-red" />
                      {partner.contactPhone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
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
