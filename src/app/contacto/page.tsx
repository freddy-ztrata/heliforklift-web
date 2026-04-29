import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/sections/Footer";
import CTASection from "@/components/sections/CTASection";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import ScrollProgress from "@/components/shared/ScrollProgress";
import { contact } from "@/lib/data/company";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Building2,
  Globe2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto — Cotiza tu Grúa Horquilla",
  description:
    "Contáctanos para cotizar grúas horquillas, servicio técnico o repuestos. Respuesta en menos de 2 horas. Santiago, Antofagasta, Copiapó y todo Chile. +56 9 9320 9186.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto — Cotiza tu Grúa Horquilla",
    description:
      "Contáctanos para cotizar grúas horquillas. Respuesta en menos de 2 horas. Santiago, Antofagasta y todo Chile.",
  },
};

export default function ContactoPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="relative overflow-hidden bg-steel-950 pb-0 pt-16">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
          <div className="absolute -top-1/4 -right-1/4 h-1/2 w-1/2 bg-[radial-gradient(ellipse,rgba(206,20,45,0.06),transparent_70%)]" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-steel-400">
                Hablemos
              </p>
              <h1 className="font-heading mt-2 text-[clamp(2.5rem,6vw,5rem)] leading-none text-white">
                CONTÁCTANOS
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-lg text-steel-400">
                Respuesta garantizada en menos de 2 horas. Estamos listos para
                ayudarte con lo que necesites.
              </p>
            </div>

            {/* Quick action cards */}
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
              <a
                href={`tel:${contact.mainPhone.replace(/\s/g, "")}`}
                className="group flex items-center gap-4 rounded-2xl border border-steel-700/50 bg-steel-900/60 p-5 transition-all hover:border-heli-red/40 hover:bg-steel-900"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-heli-red/10 transition-colors group-hover:bg-heli-red/20">
                  <Phone className="h-5 w-5 text-heli-red" />
                </div>
                <div>
                  <p className="text-xs text-steel-400">Llámanos</p>
                  <p className="font-semibold text-white">{contact.mainPhone}</p>
                </div>
              </a>

              <a
                href={`mailto:${contact.mainEmail}`}
                className="group flex items-center gap-4 rounded-2xl border border-steel-700/50 bg-steel-900/60 p-5 transition-all hover:border-heli-red/40 hover:bg-steel-900"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-heli-red/10 transition-colors group-hover:bg-heli-red/20">
                  <Mail className="h-5 w-5 text-heli-red" />
                </div>
                <div>
                  <p className="text-xs text-steel-400">Escríbenos</p>
                  <p className="font-semibold text-white text-sm">{contact.mainEmail}</p>
                </div>
              </a>

              <a
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-green-500/20 bg-green-500/5 p-5 transition-all hover:border-green-500/40 hover:bg-green-500/10"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-500/10 transition-colors group-hover:bg-green-500/20">
                  <svg className="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-green-400">WhatsApp</p>
                  <p className="font-semibold text-white">Chat directo</p>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Main content: Map + Locations */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Map — takes 3 cols */}
            <div className="overflow-hidden rounded-2xl border border-steel-700/50 lg:col-span-3">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.8!2d-70.73!3d-33.37!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c2a2a2a2a2a%3A0x1234567890!2sAv+Am%C3%A9rico+Vespucio+1445%2C+Quilicura!5e0!3m2!1ses!2scl!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 400 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Helifork Lift Santiago"
              />
            </div>

            {/* Locations + Hours — takes 2 cols */}
            <div className="flex flex-col gap-4 lg:col-span-2">
              <h2 className="font-heading text-2xl text-white">
                NUESTRAS SUCURSALES
              </h2>

              {contact.locations.map((loc) => (
                <div
                  key={loc.city}
                  className="group flex gap-4 rounded-xl border border-steel-700/50 bg-steel-900/50 p-4 transition-all hover:border-heli-red/30"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-heli-red/10">
                    {"isInternational" in loc && loc.isInternational ? (
                      <Globe2 className="h-4 w-4 text-heli-red" />
                    ) : "isMain" in loc && loc.isMain ? (
                      <Building2 className="h-4 w-4 text-heli-red" />
                    ) : (
                      <MapPin className="h-4 w-4 text-heli-red" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      {loc.city}
                      {"isMain" in loc && loc.isMain && (
                        <span className="ml-2 rounded-full bg-heli-red/10 px-2 py-0.5 text-xs text-heli-red">
                          Principal
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 text-sm text-steel-400">
                      {loc.address}
                    </p>
                  </div>
                </div>
              ))}

              {/* Hours */}
              <div className="flex gap-4 rounded-xl border border-heli-yellow/20 bg-heli-yellow/5 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-heli-yellow/10">
                  <Clock className="h-4 w-4 text-heli-yellow" />
                </div>
                <div>
                  <p className="font-semibold text-white">Horario de atención</p>
                  <p className="mt-0.5 text-sm text-steel-300">
                    {contact.hours}
                  </p>
                </div>
              </div>

              {/* Social */}
              <div className="mt-2">
                <p className="mb-3 text-sm font-medium text-steel-400">
                  Síguenos en redes sociales
                </p>
                <div className="flex gap-3">
                  {Object.entries(contact.socialMedia).map(([name, url]) => (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-steel-700 bg-steel-900/50 text-steel-400 transition-all hover:border-heli-red hover:bg-heli-red/10 hover:text-heli-red"
                      aria-label={name}
                    >
                      {name === "facebook" && (
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                      )}
                      {name === "instagram" && (
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                      )}
                      {name === "linkedin" && (
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
