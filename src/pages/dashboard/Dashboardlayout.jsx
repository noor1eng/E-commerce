import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

/* ── Sparkline SVG ── */
function Sparkline({ data, color, fill }) {
  const w = 80,
    h = 28;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * w,
    h - ((v - min) / range) * (h - 4) - 2,
  ]);
  const d = pts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`)
    .join(" ");
  const fillPath = d + ` L ${w} ${h} L 0 ${h} Z`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <path d={fillPath} fill={fill} opacity="0.15" />
      <path
        d={d}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={pts[pts.length - 1][0]}
        cy={pts[pts.length - 1][1]}
        r="2.5"
        fill={color}
      />
    </svg>
  );
}

const CARDS = [
  {
    key: "revenue",
    label: "Total Revenue",
    value: "$1,250.00",
    change: "+12.5%",
    up: true,
    footer: "Trending up this month",
    sub: "Visitors for the last 6 months",
    data: [30, 45, 38, 60, 55, 80, 75, 90],
    accent: "#6366f1",
    fill: "#6366f1",
    bg: "from-violet-50/60 to-white",
    dot: "bg-violet-500",
  },
  {
    key: "customers",
    label: "New Customers",
    value: "1,234",
    change: "-20%",
    up: false,
    footer: "Down 20% this period",
    sub: "Acquisition needs attention",
    data: [80, 70, 65, 55, 60, 45, 50, 40],
    accent: "#f43f5e",
    fill: "#f43f5e",
    bg: "from-rose-50/60 to-white",
    dot: "bg-rose-500",
  },
  {
    key: "accounts",
    label: "Active Accounts",
    value: "45,678",
    change: "+12.5%",
    up: true,
    footer: "Strong user retention",
    sub: "Engagement exceed targets",
    data: [40, 50, 48, 62, 58, 70, 68, 82],
    accent: "#10b981",
    fill: "#10b981",
    bg: "from-emerald-50/60 to-white",
    dot: "bg-emerald-500",
  },
  {
    key: "growth",
    label: "Growth Rate",
    value: "4.5%",
    change: "+4.5%",
    up: true,
    footer: "Steady performance increase",
    sub: "Meets growth projections",
    data: [35, 40, 42, 45, 48, 52, 50, 56],
    accent: "#f59e0b",
    fill: "#f59e0b",
    bg: "from-amber-50/60 to-white",
    dot: "bg-amber-500",
  },
];

export default function Dashboardlayout() {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {CARDS.map((card, i) => (
        <div
          key={card.key}
          className={`
            group relative overflow-hidden rounded-2xl border border-slate-200/80
            bg-gradient-to-br ${card.bg}
            p-5 shadow-sm
            transition-all duration-300
            hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300
          `}
          style={{ animationDelay: `${i * 60}ms` }}
        >
          {/* Subtle corner glow */}
          <div
            className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-20"
            style={{ background: card.accent }}
          />

          {/* Top row */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              {/* Label */}
              <p className="text-xs font-medium tracking-wide text-slate-400 uppercase mb-2">
                {t(card.label)}
              </p>

              {/* Value */}
              <p className="text-2xl font-bold tabular-nums text-slate-800 leading-none mb-3">
                {card.value}
              </p>

              {/* Badge */}
              <span
                className={`
                  inline-flex items-center gap-1 rounded-full px-2 py-0.5
                  text-xs font-semibold
                  ${
                    card.up
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-rose-50 text-rose-600 border border-rose-200"
                  }
                `}
              >
                {card.up ? (
                  <IconTrendingUp className="size-3" />
                ) : (
                  <IconTrendingDown className="size-3" />
                )}
                {card.change}
              </span>
            </div>

            {/* Sparkline */}
            <div className="shrink-0 mt-1">
              <Sparkline
                data={card.data}
                color={card.accent}
                fill={card.fill}
              />
            </div>
          </div>

          {/* Divider */}
          <div className="my-4 h-px bg-slate-100" />

          {/* Footer */}
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700 truncate">
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full shrink-0 ${card.dot}`}
              />
              {t(card.footer)}
            </div>
            <p className="text-xs text-slate-400 pl-3">{t(card.sub)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
