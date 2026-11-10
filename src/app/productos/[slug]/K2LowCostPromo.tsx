import Image from "next/image";
import { Banknote, CalendarDays, Handshake } from "lucide-react";
import HapeeForm from "@/components/shared/HapeeForm";

// Hapee form 131, "Promo Diesel CPCD25-Q13K2 2.5T — HELI".
// Mismo formId que /promo/heli-diesel-k2-25t. HapeeForm lo monta como
// data-zentru-form + https://beta.hapee.ai/static/form-embed.js.
// El redirect post-envío sigue yendo a /promo/heli-diesel-k2-25t/gracias.
const HAPEE_FORM_ID =
  "heliforklift chile/contacto-home-heli-forklift-chile-copia-4";

const models = [
  {
    code: "CPCD25-Q13K2",
    capacity: "2,5 t",
    price: "$12.500.000",
    // Mismo recorte de la promo 2.5T. En el archivo la calcomanía dice 30;
    // no hay un render K2 marcado 25 en el repo.
    image: "/assets/promo/heli-diesel-k2-25t-hero.webp",
  },
  {
    code: "CPCD30-Q13K2",
    capacity: "3,0 t",
    price: "$13.490.000",
    // Recorte con calcomanía 30. El hero frontal de la serie trae un 35.
    image: "/assets/promo/heli-diesel-k2-side.webp",
  },
];

const terms = [
  {
    icon: Handshake,
    title: "Alianza con Progreso",
    text: "Financiamiento a través de la alianza con Progreso.",
  },
  {
    icon: Banknote,
    title: "Tasa especial",
    text: "Condiciones con tasa especial para esta promo Low Cost K2.",
  },
  {
    icon: CalendarDays,
    title: "Primera cuota en 2027",
    text: "Empiezas a pagar la primera cuota en 2027.",
  },
];

export default function K2LowCostPromo() {
  return (
    <section
      id="cotiza-k2"
      className="scroll-mt-24 border-b border-white/[0.06] bg-gradient-to-br from-steel-900 via-steel-950 to-steel-900"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-widest text-heli-red">
          Promo Low Cost K2
        </p>
        <h2 className="font-heading mt-2 text-[clamp(2rem,5vw,3.5rem)] leading-none text-white">
          PRECIOS DE NOVIEMBRE
        </h2>
        <p className="mt-3 max-w-2xl text-base text-steel-300">
          Dos modelos diésel de la serie K2, con precios + IVA. Cotiza el
          equipo que necesitas.
        </p>

        <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {models.map((model) => (
                <article
                  key={model.code}
                  className="overflow-hidden rounded-3xl border border-white/[0.08] bg-steel-900/80"
                >
                  <div className="relative aspect-[4/3] bg-gradient-to-b from-steel-800/80 to-steel-950">
                    <Image
                      src={model.image}
                      alt={`Grúa horquilla diésel HELI ${model.code}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 30vw"
                      className="object-contain p-4"
                    />
                  </div>
                  <div className="border-t border-white/[0.06] p-5">
                    <p className="font-mono text-sm font-bold tracking-wide text-white">
                      {model.code}
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-widest text-steel-400">
                      Capacidad {model.capacity}
                    </p>
                    <p className="font-heading mt-3 text-3xl leading-none text-white">
                      {model.price}
                    </p>
                    <p className="mt-1 text-sm font-bold text-steel-300">+ IVA</p>
                  </div>
                </article>
              ))}
            </div>

            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {terms.map((term) => (
                <li
                  key={term.title}
                  className="rounded-2xl border border-white/[0.08] bg-steel-950/60 p-4"
                >
                  <term.icon className="h-5 w-5 text-heli-red" />
                  <p className="mt-3 text-sm font-bold text-white">{term.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-steel-400">
                    {term.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-1 rounded-3xl border border-white/[0.08] bg-[#0d0d18] p-4 sm:p-5 lg:order-2">
            <div className="mb-4 border-b border-white/[0.08] px-2 pb-4">
              <p className="font-heading text-2xl leading-none text-white">
                COTIZA ESTA PROMO
              </p>
              <p className="mt-2 text-sm text-steel-400">
                Promo Diesel CPCD25-Q13K2. Si te interesa el CPCD30-Q13K2,
                indícalo en el mensaje. Te contactamos en horario hábil.
              </p>
            </div>
            <HapeeForm
              formId={HAPEE_FORM_ID}
              className="hapee-form-container w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
