import { Zap, Fuel, Flame, Atom } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FuelType } from "@/lib/data/all-products";

const config: Record<
  string,
  {
    label: string;
    icon: typeof Zap;
    sm: string;
    md: string;
  }
> = {
  Electrica: {
    label: "Eléctrica",
    icon: Zap,
    sm: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
    md: "bg-emerald-500 text-white",
  },
  Diesel: {
    label: "Diésel",
    icon: Fuel,
    sm: "bg-amber-500/20 text-amber-400 border-amber-500/40",
    md: "bg-amber-500 text-white",
  },
  "Diesel / GLP": {
    label: "Diésel / GLP",
    icon: Fuel,
    sm: "bg-amber-500/20 text-amber-400 border-amber-500/40",
    md: "bg-amber-500 text-white",
  },
  GLP: {
    label: "Gas (GLP)",
    icon: Flame,
    sm: "bg-sky-500/20 text-sky-400 border-sky-500/40",
    md: "bg-sky-500 text-white",
  },
  Hidrogeno: {
    label: "Hidrógeno Verde",
    icon: Atom,
    sm: "bg-teal-500/20 text-teal-400 border-teal-500/40",
    md: "bg-teal-500 text-white",
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
        "inline-flex items-center gap-1 rounded-full font-semibold",
        size === "sm" && cn("border px-2 py-0.5 text-[10px]", cfg.sm),
        size === "md" && cn("px-3 py-1 text-xs", cfg.md),
        className
      )}
    >
      <Icon className={cn(size === "sm" ? "h-2.5 w-2.5" : "h-3.5 w-3.5")} />
      {cfg.label}
    </span>
  );
}
