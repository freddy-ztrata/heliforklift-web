"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const OUTER_SIZE = 24;
const INNER_SIZE = 6;
const SPOTLIGHT_SIZE = 400;

const springConfig = { damping: 40, stiffness: 800, mass: 0.1 };
const outerSpringConfig = { damping: 35, stiffness: 600, mass: 0.15 };

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isOverForm, setIsOverForm] = useState(false);

  // Inner dot (faster)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Outer ring (slower / trailing)
  const outerX = useSpring(cursorX, outerSpringConfig);
  const outerY = useSpring(cursorY, outerSpringConfig);

  // Inner dot (slightly smoothed)
  const innerX = useSpring(cursorX, springConfig);
  const innerY = useSpring(cursorY, springConfig);

  // Spotlight (slowest for subtle feel)
  const spotX = useSpring(cursorX, { damping: 40, stiffness: 400, mass: 0.2 });
  const spotY = useSpring(cursorY, { damping: 40, stiffness: 400, mass: 0.2 });

  useEffect(() => {
    // Only enable on devices with fine pointer (no touch)
    const mediaQuery = window.matchMedia("(hover: hover)");
    setIsDesktop(mediaQuery.matches);

    function handleChange(e: MediaQueryListEvent) {
      setIsDesktop(e.matches);
    }

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Add/remove cursor-none class on body — solo cuando NO esta sobre el form
  useEffect(() => {
    if (isDesktop && !isOverForm) {
      document.body.classList.add("custom-cursor-active");
    } else {
      document.body.classList.remove("custom-cursor-active");
    }
    return () => {
      document.body.classList.remove("custom-cursor-active");
    };
  }, [isDesktop, isOverForm]);

  // Inject style for hiding default cursor — excluye el form HubSpot
  useEffect(() => {
    if (!isDesktop) return;

    const style = document.createElement("style");
    style.id = "custom-cursor-style";
    style.textContent = `
      .custom-cursor-active,
      .custom-cursor-active * {
        cursor: none !important;
      }
      /* Restaurar cursor nativo dentro del form HubSpot — siempre */
      .hubspot-form-container,
      .hubspot-form-container * {
        cursor: auto !important;
      }
      .hubspot-form-container input,
      .hubspot-form-container textarea {
        cursor: text !important;
      }
      .hubspot-form-container button,
      .hubspot-form-container [role="button"],
      .hubspot-form-container label,
      .hubspot-form-container select,
      .hubspot-form-container input[type="submit"],
      .hubspot-form-container input[type="checkbox"],
      .hubspot-form-container input[type="radio"] {
        cursor: pointer !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const el = document.getElementById("custom-cursor-style");
      if (el) el.remove();
    };
  }, [isDesktop]);

  // Mouse move handler
  useEffect(() => {
    if (!isDesktop) return;

    function handleMouseMove(e: MouseEvent) {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDesktop, cursorX, cursorY]);

  // Hover detection on interactive elements + deteccion de form HubSpot
  useEffect(() => {
    if (!isDesktop) return;

    function handleMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;

      // Si el mouse entra al form de HubSpot, desactivar cursor custom
      const inHubspotForm = target.closest(".hubspot-form-container");
      setIsOverForm(!!inHubspotForm);

      // Hover state para escalar el cursor (solo si NO esta sobre el form)
      if (!inHubspotForm) {
        const interactive = target.closest(
          'a, button, [data-cursor="pointer"], [role="button"], input, select, textarea, label'
        );
        setIsHovering(!!interactive);
      } else {
        setIsHovering(false);
      }
    }

    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    return () => document.removeEventListener("mouseover", handleMouseOver);
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Spotlight effect */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          x: spotX,
          y: spotY,
          width: SPOTLIGHT_SIZE,
          height: SPOTLIGHT_SIZE,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border-2 border-[#CE142D]"
        style={{
          x: outerX,
          y: outerY,
          width: OUTER_SIZE,
          height: OUTER_SIZE,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isOverForm ? 0 : isHovering ? 1.5 : 1,
          opacity: isOverForm ? 0 : isHovering ? 0.8 : 0.6,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        aria-hidden="true"
      />

      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-white"
        style={{
          x: innerX,
          y: innerY,
          width: INNER_SIZE,
          height: INNER_SIZE,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isOverForm ? 0 : isHovering ? 0.5 : 1,
          opacity: isOverForm ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        aria-hidden="true"
      />
    </>
  );
}
