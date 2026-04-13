"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Measures the first and last dot positions to draw the line exactly between them.
 */
function DesktopLine({
  fillHeight,
  count,
}: {
  fillHeight: MotionValue<string>;
  count: number;
}) {
  const lineRef = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    function measure() {
      const parent = lineRef.current?.parentElement;
      if (!parent) return;
      const dots = parent.querySelectorAll("[data-timeline-dot]");
      if (dots.length < 2) return;
      const firstDot = dots[0] as HTMLElement;
      const lastDot = dots[dots.length - 1] as HTMLElement;
      const parentRect = parent.getBoundingClientRect();
      const firstRect = firstDot.getBoundingClientRect();
      const lastRect = lastDot.getBoundingClientRect();
      const t = firstRect.top + firstRect.height / 2 - parentRect.top;
      const b = lastRect.top + lastRect.height / 2 - parentRect.top;
      setTop(t);
      setHeight(b - t);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [count]);

  return (
    <div
      ref={lineRef}
      className="absolute left-1/2 -translate-x-1/2"
      style={{ top: `${top}px`, height: `${height}px` }}
    >
      <div className="h-full w-[2px] bg-steel-800" />
      <motion.div
        className="absolute left-0 top-0 w-[2px] bg-heli-red"
        style={{ height: fillHeight }}
      />
    </div>
  );
}

function MobileLine({
  fillHeight,
  count,
}: {
  fillHeight: MotionValue<string>;
  count: number;
}) {
  const lineRef = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    function measure() {
      const parent = lineRef.current?.parentElement;
      if (!parent) return;
      const dots = parent.querySelectorAll("[data-mobile-dot]");
      if (dots.length < 2) return;
      const firstDot = dots[0] as HTMLElement;
      const lastDot = dots[dots.length - 1] as HTMLElement;
      const parentRect = parent.getBoundingClientRect();
      const fR = firstDot.getBoundingClientRect();
      const lR = lastDot.getBoundingClientRect();
      const t = fR.top + fR.height / 2 - parentRect.top;
      const b = lR.top + lR.height / 2 - parentRect.top;
      setTop(t);
      setHeight(b - t);
    }
    measure();
    window.addEventListener("resize", measure);
    // Re-measure after a short delay for layout to settle
    const timer = setTimeout(measure, 500);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(timer);
    };
  }, [count]);

  return (
    <div
      ref={lineRef}
      className="absolute left-[7px]"
      style={{ top: `${top}px`, height: `${height}px` }}
    >
      <div className="h-full w-[2px] bg-steel-800" />
      <motion.div
        className="absolute left-0 top-0 w-[2px] bg-heli-red"
        style={{ height: fillHeight }}
      />
    </div>
  );
}

interface Milestone {
  year: number;
  event: string;
}

function TimelineItem({
  milestone,
  index,
  total,
  progress,
}: {
  milestone: Milestone;
  index: number;
  total: number;
  progress: ReturnType<typeof useTransform<number, number>>;
}) {
  const isLeft = index % 2 === 0;
  const threshold = index / (total - 1);

  const dotScale = useTransform(
    progress,
    [Math.max(0, threshold - 0.05), threshold],
    [0.4, 1]
  );
  const dotBg = useTransform(
    progress,
    [Math.max(0, threshold - 0.05), threshold],
    ["#1a1a2e", "#CE142D"]
  );
  const dotBorder = useTransform(
    progress,
    [Math.max(0, threshold - 0.05), threshold],
    ["#2a2a3e", "#CE142D"]
  );
  const cardOpacity = useTransform(
    progress,
    [Math.max(0, threshold - 0.08), threshold],
    [0, 1]
  );
  const cardX = useTransform(
    progress,
    [Math.max(0, threshold - 0.08), threshold],
    [isLeft ? -30 : 30, 0]
  );

  return (
    <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-6">
      {/* Left side */}
      <div className={cn("py-4", isLeft ? "flex justify-end" : "")}>
        {isLeft && (
          <motion.div
            style={{ opacity: cardOpacity, x: cardX }}
            className="w-full max-w-md"
          >
            <div className="rounded-xl border border-steel-700/50 bg-steel-900/80 p-5 text-right transition-all duration-300 hover:border-heli-red/30 hover:bg-steel-900">
              <div className="font-heading text-3xl text-heli-red lg:text-4xl">
                {milestone.year}
              </div>
              <p className="mt-1 text-sm text-steel-300 lg:text-base">
                {milestone.event}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Center dot */}
      <div data-timeline-dot className="relative z-10 flex items-center justify-center">
        <motion.div
          className="flex h-5 w-5 items-center justify-center rounded-full border-2"
          style={{
            scale: dotScale,
            backgroundColor: dotBg,
            borderColor: dotBorder,
          }}
        >
          <motion.div
            className="h-2 w-2 rounded-full bg-white"
            style={{
              scale: useTransform(
                progress,
                [threshold, threshold + 0.02],
                [0, 1]
              ),
            }}
          />
        </motion.div>
      </div>

      {/* Right side */}
      <div className={cn("py-4", !isLeft ? "" : "")}>
        {!isLeft && (
          <motion.div
            style={{ opacity: cardOpacity, x: cardX }}
            className="w-full max-w-md"
          >
            <div className="rounded-xl border border-steel-700/50 bg-steel-900/80 p-5 transition-all duration-300 hover:border-heli-red/30 hover:bg-steel-900">
              <div className="font-heading text-3xl text-heli-red lg:text-4xl">
                {milestone.year}
              </div>
              <p className="mt-1 text-sm text-steel-300 lg:text-base">
                {milestone.event}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function MobileTimelineItem({
  milestone,
  index,
  total,
  progress,
}: {
  milestone: Milestone;
  index: number;
  total: number;
  progress: ReturnType<typeof useTransform<number, number>>;
}) {
  const threshold = index / (total - 1);

  const dotBg = useTransform(
    progress,
    [Math.max(0, threshold - 0.05), threshold],
    ["#1a1a2e", "#CE142D"]
  );
  const dotBorder = useTransform(
    progress,
    [Math.max(0, threshold - 0.05), threshold],
    ["#2a2a3e", "#CE142D"]
  );
  const cardOpacity = useTransform(
    progress,
    [Math.max(0, threshold - 0.08), threshold],
    [0, 1]
  );

  return (
    <div className="relative flex gap-5">
      {/* Dot */}
      <div data-mobile-dot className="relative z-10 flex shrink-0 pt-5">
        <motion.div
          className="h-4 w-4 rounded-full border-2"
          style={{ backgroundColor: dotBg, borderColor: dotBorder }}
        />
      </div>
      {/* Card */}
      <motion.div style={{ opacity: cardOpacity }} className="flex-1 pb-8">
        <div className="rounded-xl border border-steel-700/50 bg-steel-900/80 p-5 transition-all hover:border-heli-red/30">
          <div className="font-heading text-2xl text-heli-red">
            {milestone.year}
          </div>
          <p className="mt-1 text-sm text-steel-300">{milestone.event}</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function AnimatedTimeline({
  milestones,
}: {
  milestones: Milestone[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.7", "end 0.5"],
  });

  // Remap to 0-1 range with some padding
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Desktop: each row is py-4 (16px top+bottom = 32px padding) and the dot is vertically centered.
  // The line should start at the center of the first row and end at the center of the last row.
  // Using CSS: top = center of first item, bottom = center of last item.
  // Each grid row auto-sizes to content. We use first-child/last-child center via JS measurement.

  return (
    <div ref={containerRef}>
      {/* Desktop */}
      <div className="relative hidden md:block">
        {/* Center vertical line — clamped between first and last dot */}
        <DesktopLine fillHeight={fillHeight} count={milestones.length} />

        {milestones.map((m, i) => (
          <TimelineItem
            key={m.year}
            milestone={m}
            index={i}
            total={milestones.length}
            progress={progress}
          />
        ))}
      </div>

      {/* Mobile */}
      <div className="relative md:hidden">
        <MobileLine fillHeight={fillHeight} count={milestones.length} />

        {milestones.map((m, i) => (
          <MobileTimelineItem
            key={m.year}
            milestone={m}
            index={i}
            total={milestones.length}
            progress={progress}
          />
        ))}
      </div>
    </div>
  );
}
