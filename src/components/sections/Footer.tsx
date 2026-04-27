import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const equiposLinks = [
  { label: "Grúas Eléctricas", href: "/productos?tipo=electrica" },
  { label: "Grúas Diésel", href: "/productos?tipo=diesel" },
  { label: "Grúas GLP", href: "/productos?tipo=glp" },
  { label: "Grúas Hidrógeno", href: "/productos?tipo=hidrogeno" },
  { label: "Todos los equipos", href: "/productos" },
];

const serviciosLinks = [
  { label: "Venta", href: "/servicios/venta" },
  { label: "Arriendo", href: "/servicios/arriendo" },
  { label: "Servicio Técnico", href: "/servicios/servicio-tecnico" },
  { label: "Repuestos", href: "/servicios/repuestos" },
  { label: "Equipos Usados", href: "/servicios/usados" },
];

const empresaLinks = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Certificaciones", href: "/nosotros" },
  { label: "Noticias", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
];

const contactInfo = [
  {
    icon: MapPin,
    text: "Av. Américo Vespucio 1445, Quilicura",
    href: "https://maps.google.com/?q=Av+Américo+Vespucio+1445+Quilicura",
    external: true,
  },
  {
    icon: Phone,
    text: "+56 9 5818 7035",
    href: "tel:+56958187035",
    external: false,
  },
  {
    icon: Mail,
    text: "contacto@heliforklift.cl",
    href: "mailto:contacto@heliforklift.cl",
    external: false,
  },
  {
    icon: Clock,
    text: "Lun-Vie: 8:00 - 18:00 | Emergencias 24/7",
    href: null,
    external: false,
  },
];

const socialLinks = [
  { icon: FacebookIcon, href: "https://facebook.com/heliforkliftCL", label: "Facebook" },
  { icon: InstagramIcon, href: "https://instagram.com/heliforkliftcl/", label: "Instagram" },
  { icon: LinkedinIcon, href: "https://linkedin.com/company/heliforkliftcl/", label: "LinkedIn" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-heading text-lg tracking-wider text-steel-100">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-steel-400 transition-colors duration-200 hover:text-heli-red"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      className="relative"
      style={{ backgroundColor: "#0a0a0f" }}
    >
      {/* Top border accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-heli-red/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top section: Logo + Tagline */}
        <div className="flex flex-col items-start gap-4 border-b border-steel-800 py-8 sm:py-12 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/assets/legacy/logos/heli-chile-logo.png"
              alt="Helifork Lift"
              width={160}
              height={48}
              className="h-auto w-[160px] brightness-0 invert"
            />
          </div>
          <p className="max-w-md text-sm leading-relaxed text-steel-400">
            Especialistas en grúas horquillas en Chile desde 1958
          </p>
        </div>

        {/* Main columns */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <FooterColumn title="EQUIPOS" links={equiposLinks} />
          <FooterColumn title="SERVICIOS" links={serviciosLinks} />
          <FooterColumn title="EMPRESA" links={empresaLinks} />

          {/* Contact column */}
          <div>
            <h3 className="font-heading text-lg tracking-wider text-steel-100">
              CONTACTO
            </h3>
            <ul className="mt-4 space-y-4">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const content = (
                  <span className="flex items-start gap-3 text-sm text-steel-400 transition-colors duration-200 group-hover:text-heli-red">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-heli-red" />
                    <span>{item.text}</span>
                  </span>
                );

                return (
                  <li key={item.text} className="group">
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                      >
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Social media row */}
        <div className="flex items-center justify-center gap-4 border-t border-steel-800 py-8">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-steel-800 text-steel-400 transition-all duration-200 hover:bg-heli-red hover:text-white"
              >
                <Icon className="h-5 w-5" />
              </a>
            );
          })}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-steel-800 py-8 text-center">
          <p className="text-sm text-steel-500">
            &copy; 2026 Helifork Lift. Todos los derechos reservados.
          </p>
          <p className="mx-auto mt-3 max-w-3xl text-xs leading-relaxed text-steel-600">
            Helifork Lift — Venta y arriendo de grúas horquillas en Santiago y
            todo Chile. Servicio técnico, repuestos originales y capacitación
            para montacargas, apiladores y transpaletas.
          </p>
        </div>
      </div>
    </footer>
  );
}
