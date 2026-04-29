"use client";

import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const SERVICE_OPTIONS = [
  "Comprar",
  "Servicio técnico",
  "Repuestos",
  "Otro",
] as const;

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledService?: string;
}

export default function QuoteModal({
  isOpen,
  onClose,
  prefilledService = "",
}: QuoteModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(prefilledService);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  // Sync prefilled service when prop changes
  useEffect(() => {
    if (prefilledService) {
      setService(prefilledService);
    }
  }, [prefilledService]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setName("");
      setPhone("");
      setService(prefilledService || "");
      setIsSubmitting(false);
      setIsSuccess(false);
      setErrors({});
    }
  }, [isOpen, prefilledService]);

  function validate(): boolean {
    const newErrors: { name?: string; phone?: string } = {};
    if (!name.trim()) newErrors.name = "El nombre es obligatorio";
    if (!phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio";
    } else if (!/^[\d\s+()-]{7,}$/.test(phone.trim())) {
      newErrors.phone = "Ingresa un teléfono válido";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Auto-close after success
    setTimeout(() => {
      onClose();
    }, 2500);
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            {/* Backdrop */}
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            {/* Content */}
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, y: 80, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 80, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className={cn(
                  "fixed inset-x-4 bottom-4 z-[61] mx-auto max-w-lg",
                  "sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2",
                  "rounded-2xl border border-steel-700 bg-steel-900 p-6 shadow-2xl shadow-black/50",
                  "focus:outline-none"
                )}
              >
                {/* Close button */}
                <Dialog.Close asChild>
                  <button
                    className="absolute right-4 top-4 rounded-full p-1.5 text-steel-400 transition-colors hover:bg-steel-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-heli-red"
                    aria-label="Cerrar"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </Dialog.Close>

                {/* Title */}
                <Dialog.Title className="mb-1 font-heading text-2xl tracking-wide text-white">
                  COTIZACIÓN RÁPIDA
                </Dialog.Title>
                <Dialog.Description className="mb-6 text-sm text-steel-400">
                  Completa tus datos y te contactaremos a la brevedad.
                </Dialog.Description>

                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-3 py-8 text-center"
                    >
                      <CheckCircle2 className="h-14 w-14 text-green-500" />
                      <p className="text-lg font-semibold text-white">
                        ¡Solicitud enviada!
                      </p>
                      <p className="text-sm text-steel-400">
                        Nos comunicaremos contigo pronto.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                      noValidate
                    >
                      {/* Nombre */}
                      <div>
                        <label
                          htmlFor="quote-name"
                          className="mb-1.5 block text-sm font-medium text-steel-300"
                        >
                          Nombre
                        </label>
                        <input
                          id="quote-name"
                          type="text"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                          }}
                          placeholder="Tu nombre"
                          className={cn(
                            "w-full rounded-lg border bg-steel-800 px-4 py-2.5 text-sm text-white placeholder:text-steel-500",
                            "transition-colors focus:outline-none focus:ring-2 focus:ring-heli-red",
                            errors.name
                              ? "border-red-500"
                              : "border-steel-700 hover:border-steel-600"
                          )}
                        />
                        {errors.name && (
                          <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                        )}
                      </div>

                      {/* Teléfono */}
                      <div>
                        <label
                          htmlFor="quote-phone"
                          className="mb-1.5 block text-sm font-medium text-steel-300"
                        >
                          Teléfono <span className="text-heli-red">*</span>
                        </label>
                        <input
                          id="quote-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                          }}
                          placeholder="+56 9 1234 5678"
                          required
                          className={cn(
                            "w-full rounded-lg border bg-steel-800 px-4 py-2.5 text-sm text-white placeholder:text-steel-500",
                            "transition-colors focus:outline-none focus:ring-2 focus:ring-heli-red",
                            errors.phone
                              ? "border-red-500"
                              : "border-steel-700 hover:border-steel-600"
                          )}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
                        )}
                      </div>

                      {/* Servicio */}
                      <div>
                        <label
                          htmlFor="quote-service"
                          className="mb-1.5 block text-sm font-medium text-steel-300"
                        >
                          ¿Qué necesitas?
                        </label>
                        <select
                          id="quote-service"
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className={cn(
                            "w-full appearance-none rounded-lg border border-steel-700 bg-steel-800 px-4 py-2.5 text-sm text-white",
                            "transition-colors hover:border-steel-600 focus:outline-none focus:ring-2 focus:ring-heli-red",
                            !service && "text-steel-500"
                          )}
                        >
                          <option value="" disabled>
                            Selecciona una opción
                          </option>
                          {SERVICE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={cn(
                          "flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3",
                          "text-sm font-bold uppercase tracking-wider text-white",
                          "bg-heli-red transition-all duration-300",
                          "hover:bg-heli-red-dark active:scale-[0.98]",
                          "glow-red",
                          "disabled:cursor-not-allowed disabled:opacity-70"
                        )}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          "ENVIAR SOLICITUD"
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
