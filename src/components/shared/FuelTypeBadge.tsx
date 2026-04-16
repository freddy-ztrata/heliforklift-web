import { Zap, Fuel, Flame, Atom } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FuelType } from "@/lib/data/all-products";

const config: Record<
  string,
  {
    label: string;
    icon: typeof Zap;
    classes: string;
  }
> = {
  Electrica: {
    label: "Electrica",
    icon: Zap,
    classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
  Diesel: {
    label: "Diesel",
    icon: Fuel,
    classes: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  },
  "Diesel / GLP": {
    label: "Diesel / GLP",
    icon: Fuel,
    classes: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  },
  GLP: {
    label: "Gas (GLP)",
    icon: Flame,
    classes: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  },
  Hidrogeno: {
    label: "Hidrogeno Verde",
    icon: Atom,
    classes: "bg-teal-500/15 text-teal-400 border-teal-500/30",
  },
};

interface FuelTypeBadgeProps {
  fuelType: FuelType;
  size?: "sm" | "md";
  className?: string;
}

export default function FuelTypeBadge({
  fuelType,
  size = "sm",
  className,
}: FuelTypeBadgeProps) {
  const cfg = config[fuelType];
  if (!cfg) return null;

  const Icon = cfg.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border font-medium",
        cfg.classes,
        size === "sm" && "px-2 py-0.5 text-[10px]",
        size === "md" && "px-3 py-1 text-xs",
        className
      )}
    >
      <Icon className={cn(size === "sm" ? "h-2.5 w-2.5" : "h-3.5 w-3.5")} />
      {cfg.label}
    </span>
  );
}
