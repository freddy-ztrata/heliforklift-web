import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/sections/Footer";
import { contact } from "@/lib/data/company";
import { MapPin, Phone, Mail, Clock, Globe } from "lucide-react";

const WhatsAppButton = dynamic(
  () => import("@/components/shared/WhatsAppButton")
);
const ScrollProgress = dynamic(
  () => import("@/components/shared/ScrollProgress")
);
const CTASection = dynamic(() => import("@/components/sections/CTASection"));

export const metadata: Metadata = {
  title: "Contacto — Cotiza tu Grúa Horquilla",
  description:
    "Contáctanos para cotizar grúas horquillas, arriendo, servicio técnico o repuestos. Respuesta en menos de 2 horas. Santiago, Antofagasta y todo Chile. +56 9 5818 7035.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto — Helifork Lift",
    description:
      "Cotiza tu grúa horquilla hoy. Respuesta en menos de 2 horas.",
  },
};

export default function ContactoPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="pt-24">
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-steel-400">
              Hablemos
            </p>
            <h1 className="font-heading mt-2 text-[clamp(2.5rem,6vw,5rem)] leading-none text-white">
              CONTÁCTANOS
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-steel-400">
              Respuesta garantizada en menos de 2 horas. Estamos listos para
              ayudarte con lo que necesites.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Info de contacto */}
            <div className="space-y-8">
              {/* Sucursales */}
              <div>
                <h2 className="mb-6 text-xl font-bold text-white">
                  Nuestras Sucursales
                </h2>
                <div className="space-y-4">
                  {contact.locations.map((loc) => (
                    <div
                      key={loc.city}
                      className="flex gap-4 rounded-xl border border-steel-700 bg-steel-900/50 p-5"
                    >
                      <MapPin className="mt-1 h-5 w-5 shrink-0 text-heli-red" />
                      <div>
                        <div className="font-semibold text-white">
                          {loc.city}
                        </div>
                        <div className="text-sm text-steel-400">
                          {loc.address}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Datos de contacto */}
              <div className="space-y-4">
                <a
                  href={`tel:${contact.mainPhone.replace(/\s/g, "")}`}
                  className="flex items-center gap-4 rounded-xl border border-steel-700 bg-steel-900/50 p-5 transition-colors hover:border-heli-red/50"
                >
                  <Phone className="h-5 w-5 text-heli-red" />
                  <div>
                    <div className="text-sm text-steel-400">Teléfono</div>
                    <div className="font-semibold text-white">
                      {contact.mainPhone}
                    </div>
                  </div>
                </a>
                <a
                  href={`mailto:${contact.mainEmail}`}
                  className="flex items-center gap-4 rounded-xl border border-steel-700 bg-steel-900/50 p-5 transition-colors hover:border-heli-red/50"
                >
                  <Mail className="h-5 w-5 text-heli-red" />
                  <div>
                    <div className="text-sm text-steel-400">Email</div>
                    <div className="font-semibold text-white">
                      {contact.mainEmail}
                    </div>
                  </div>
                </a>
                <div className="flex items-center gap-4 rounded-xl border border-steel-700 bg-steel-900/50 p-5">
                  <Clock className="h-5 w-5 text-heli-red" />
                  <div>
                    <div className="text-sm text-steel-400">Horario</div>
                    <div className="font-semibold text-white">
                      {contact.hours}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div>
                <h3 className="mb-4 font-semibold text-white">Síguenos</h3>
                <div className="flex gap-3">
                  {Object.entries(contact.socialMedia).map(([name, url]) => (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-lg border border-steel-700 text-steel-400 transition-colors hover:border-heli-red hover:text-heli-red"
                    >
                      <Globe className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Mapa */}
            <div className="overflow-hidden rounded-2xl border border-steel-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.4!2d-70.7!3d-33.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDIxJzAwLjAiUyA3MMKwNDInMDAuMCJX!5e0!3m2!1ses!2scl!4v1"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Helifork Lift Santiago"
                className="h-[350px] sm:h-[500px]"
              />
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
