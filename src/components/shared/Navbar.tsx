"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Equipos", href: "/productos" },
  { label: "Servicios", href: "/servicios" },
  { label: "Noticias", href: "/noticias" },
  { label: "Contacto", href: "/contacto" },
];

const PHONE_NUMBER = "+56 9 9320 9186";
const PHONE_HREF = "tel:+56993209186";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5 py-2"
            : "bg-[#0a0a0f]/50 backdrop-blur-md py-4"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-10 flex-shrink-0">
              <Image
                src="/assets/legacy/logos/heli-chile-logo.png"
                alt="HELI Chile - Grúas Horquillas"
                width={140}
                height={48}
                className={cn(
                  "transition-all duration-300 brightness-0 invert",
                  scrolled ? "h-8 w-auto" : "h-10 w-auto"
                )}
                priority
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium tracking-wide uppercase",
                    "text-steel-300 hover:text-white transition-colors duration-200",
                    "group"
                  )}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-[#CE142D] transition-all duration-300 group-hover:w-3/4" />
                </Link>
              ))}
            </div>

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Phone */}
              <a
                href={PHONE_HREF}
                className="flex items-center gap-2 text-sm text-steel-300 hover:text-white transition-colors duration-200"
              >
                <Phone className="h-4 w-4 text-[#CE142D]" />
                <span className="font-medium">{PHONE_NUMBER}</span>
              </a>

              {/* CTA Button */}
              <Link
                href="/contacto"
                className={cn(
                  "relative px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider",
                  "bg-[#CE142D] text-white",
                  "glow-red",
                  "hover:bg-[#A8102A] transition-all duration-300",
                  "hover:scale-105 active:scale-95"
                )}
              >
                COTIZAR AHORA
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative z-10 lg:hidden p-2.5 -mr-2 text-steel-300 hover:text-white transition-colors"
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className={cn(
                "fixed top-0 right-0 z-50 h-full w-[80vw] max-w-sm",
                "bg-[#0a0a0f]/95 backdrop-blur-2xl",
                "border-l border-white/5",
                "flex flex-col lg:hidden"
              )}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <Image
                  src="/assets/legacy/logos/heli-chile-logo.png"
                  alt="HELI Chile"
                  width={120}
                  height={40}
                  className="h-8 w-auto brightness-0 invert"
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-steel-400 hover:text-white transition-colors"
                  aria-label="Cerrar menú"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex-1 overflow-y-auto py-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center px-6 py-4 text-lg font-medium uppercase tracking-wider",
                        "text-steel-300 hover:text-white hover:bg-white/5",
                        "border-b border-white/5 transition-colors duration-200"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Drawer Footer */}
              <div className="p-6 space-y-4 border-t border-white/5">
                {/* Phone */}
                <a
                  href={PHONE_HREF}
                  className="flex items-center gap-3 text-steel-300 hover:text-white transition-colors"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#CE142D]/10 border border-[#CE142D]/20">
                    <Phone className="h-4 w-4 text-[#CE142D]" />
                  </div>
                  <div>
                    <p className="text-xs text-steel-500 uppercase tracking-wider">
                      Llámanos
                    </p>
                    <p className="font-medium text-white">{PHONE_NUMBER}</p>
                  </div>
                </a>

                {/* CTA */}
                <Link
                  href="/contacto"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center justify-center w-full px-6 py-3.5 rounded-lg",
                    "text-sm font-bold uppercase tracking-wider",
                    "bg-[#CE142D] text-white",
                    "glow-red",
                    "hover:bg-[#A8102A] transition-all duration-300",
                    "active:scale-95"
                  )}
                >
                  COTIZAR AHORA
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
