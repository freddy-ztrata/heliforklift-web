"use client";

import { useState, useRef, useEffect, type FormEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, Send, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormData {
  nombre: string;
  empresa: string;
  telefono: string;
  email: string;
  servicio: string;
  mensaje: string;
}

interface FormErrors {
  nombre?: string;
  telefono?: string;
  email?: string;
}

const SERVICE_OPTIONS = [
  { value: "", label: "Selecciona un servicio" },
  { value: "comprar", label: "Comprar grúa horquilla" },
  { value: "arrendar", label: "Arrendar grúa horquilla" },
  { value: "servicio-tecnico", label: "Servicio técnico" },
  { value: "repuestos", label: "Repuestos" },
  { value: "otro", label: "Otro" },
];

const TRUST_ELEMENTS = [
  { text: "Respuesta en menos de 2 horas", emoji: "\u26A1", href: null },
  { text: "+1,100 empresas ya confían en nosotros", emoji: "\uD83C\uDFC6", href: null },
  { text: "¿Prefieres llamar? +56 9 5818 7035", emoji: "\uD83D\uDCDE", href: "tel:+56958187035" },
  { text: "Tus datos están seguros. No spam.", emoji: "\uD83D\uDD12", href: null },
];

function validatePhone(phone: string): boolean {
  // Accept Chilean phone formats: +56 9 XXXX XXXX, 56912345678, 912345678, etc.
  const cleaned = phone.replace(/[\s\-().]/g, "");
  return /^(\+?56)?9\d{8}$/.test(cleaned);
}

function validateEmail(email: string): boolean {
  if (!email) return true; // Email is optional
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ---- Custom Select Dropdown ---- */
function CustomSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <label className="mb-1.5 block text-sm font-medium text-steel-300">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left text-sm transition-all",
          "bg-steel-800/60 border-steel-700",
          "hover:border-steel-500",
          isOpen && "border-heli-red ring-1 ring-heli-red/30",
          selected?.value ? "text-white" : "text-steel-500"
        )}
      >
        <span>{selected?.label || "Selecciona un servicio"}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-steel-400 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-50 mt-2 w-full overflow-hidden rounded-lg border border-steel-700 bg-steel-900 shadow-xl shadow-black/40"
          >
            {options.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center px-4 py-3 text-left text-sm transition-colors",
                    option.value === value
                      ? "bg-heli-red/10 text-heli-red"
                      : "text-steel-300 hover:bg-steel-800 hover:text-white",
                    !option.value && "text-steel-500"
                  )}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CTASection() {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    empresa: "",
    telefono: "",
    email: "",
    servicio: "",
    mensaje: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validate(): FormErrors {
    const newErrors: FormErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es obligatorio";
    } else if (!validatePhone(formData.telefono)) {
      newErrors.telefono = "Formato inválido. Ej: +56 9 1234 5678";
    }

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = "Email inválido";
    }

    return newErrors;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  }

  const inputBaseClasses =
    "w-full rounded-lg border border-steel-700 bg-steel-800 px-4 py-3 text-sm text-steel-100 placeholder-steel-500 outline-none transition-all duration-200 focus:border-heli-red focus:ring-2 focus:ring-heli-red/30";

  return (
    <section
      id="cotizar"
      className="relative overflow-hidden py-16 md:py-32"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-steel-950 via-steel-900 to-steel-950" />

      {/* Red accent gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-heli-red/5 via-transparent to-heli-red/5" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Spotlight / lamp glow effect */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[800px]"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(206, 20, 45, 0.15) 0%, rgba(206, 20, 45, 0.05) 40%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="font-heading text-[clamp(2.5rem,7vw,6rem)] text-white leading-none">
            COTIZA TU GRÚA HORQUILLA HOY
          </h2>
          <p className="mt-4 text-lg md:text-xl text-steel-300">
            Respuesta garantizada en menos de 2 horas. Sin compromiso.
          </p>
        </motion.div>

        {/* Trust elements - top row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          {TRUST_ELEMENTS.slice(0, 2).map((item) => {
            const content = (
              <>
                <span className="text-base">{item.emoji}</span>
                {item.text}
              </>
            );
            return item.href ? (
              <a
                key={item.text}
                href={item.href}
                className="flex items-center gap-2 text-sm text-steel-300 hover:text-white transition-colors"
              >
                {content}
              </a>
            ) : (
              <span
                key={item.text}
                className="flex items-center gap-2 text-sm text-steel-300"
              >
                {content}
              </span>
            );
          })}
        </motion.div>

        {/* Form container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative mx-auto max-w-2xl rounded-2xl border border-steel-700/50 bg-steel-900/80 p-4 sm:p-6 md:p-10 backdrop-blur-sm"
        >
          {/* Subtle glow behind form */}
          <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-b from-heli-red/10 via-transparent to-transparent opacity-60" />

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative space-y-5"
              >
                {/* Name + Company row */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="nombre"
                      className="mb-1.5 block text-sm font-medium text-steel-300"
                    >
                      Nombre completo <span className="text-heli-red">*</span>
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      placeholder="Juan Pérez"
                      value={formData.nombre}
                      onChange={handleChange}
                      className={cn(
                        inputBaseClasses,
                        errors.nombre && "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                      )}
                    />
                    {errors.nombre && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.nombre}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="empresa"
                      className="mb-1.5 block text-sm font-medium text-steel-300"
                    >
                      Empresa
                    </label>
                    <input
                      id="empresa"
                      name="empresa"
                      type="text"
                      placeholder="Mi Empresa S.A."
                      value={formData.empresa}
                      onChange={handleChange}
                      className={inputBaseClasses}
                    />
                  </div>
                </div>

                {/* Phone + Email row */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="telefono"
                      className="mb-1.5 block text-sm font-medium text-steel-300"
                    >
                      Teléfono <span className="text-heli-red">*</span>
                    </label>
                    <input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      placeholder="+56 9 1234 5678"
                      value={formData.telefono}
                      onChange={handleChange}
                      className={cn(
                        inputBaseClasses,
                        errors.telefono && "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                      )}
                    />
                    {errors.telefono && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.telefono}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium text-steel-300"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="correo@empresa.cl"
                      value={formData.email}
                      onChange={handleChange}
                      className={cn(
                        inputBaseClasses,
                        errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                      )}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Service select — custom dropdown */}
                <CustomSelect
                  label="Tipo de servicio"
                  options={SERVICE_OPTIONS}
                  value={formData.servicio}
                  onChange={(val) =>
                    setFormData((prev) => ({ ...prev, servicio: val }))
                  }
                />

                {/* Message textarea */}
                <div>
                  <label
                    htmlFor="mensaje"
                    className="mb-1.5 block text-sm font-medium text-steel-300"
                  >
                    Mensaje{" "}
                    <span className="text-steel-500">(opcional)</span>
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={4}
                    placeholder="Cuéntanos más sobre lo que necesitas..."
                    value={formData.mensaje}
                    onChange={handleChange}
                    className={cn(inputBaseClasses, "resize-none")}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "glow-red flex w-full items-center justify-center gap-2 rounded-lg bg-heli-red px-6 sm:px-8 py-4 font-heading text-lg sm:text-xl tracking-wider text-white transition-all duration-300",
                    "hover:bg-heli-red-light hover:scale-[1.01] active:scale-[0.99]",
                    "disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      ENVIANDO...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      ENVIAR COTIZACIÓN
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative flex flex-col items-center py-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.2,
                  }}
                >
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </motion.div>
                <h3 className="mt-6 font-heading text-[clamp(1.8rem,5vw,2.5rem)] text-white">
                  ¡COTIZACIÓN ENVIADA!
                </h3>
                <p className="mt-3 text-lg text-steel-300">
                  Gracias{" "}
                  <span className="font-semibold text-white">
                    {formData.nombre.split(" ")[0]}
                  </span>
                  . Un asesor te contactará en breve.
                </p>
                <p className="mt-1 text-sm text-steel-400">
                  Revisamos cada solicitud en menos de 2 horas.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Trust elements - bottom row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          {TRUST_ELEMENTS.slice(2).map((item) => {
            const content = (
              <>
                <span className="text-base">{item.emoji}</span>
                {item.text}
              </>
            );
            return item.href ? (
              <a
                key={item.text}
                href={item.href}
                className="flex items-center gap-2 text-sm text-steel-300 hover:text-white transition-colors"
              >
                {content}
              </a>
            ) : (
              <span
                key={item.text}
                className="flex items-center gap-2 text-sm text-steel-300"
              >
                {content}
              </span>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
