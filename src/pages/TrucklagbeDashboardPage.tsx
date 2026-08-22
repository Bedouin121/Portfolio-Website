import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Github,
  Download,
  Truck,
  TrendingUp,
  Users,
  PackageCheck,
} from "lucide-react";

/* -----------------------------------------------------------------------
   Config
----------------------------------------------------------------------- */
const LINKS = {
  // Google Drive direct-download link (converted from /view to /uc?export=download)
  pbixDownload:
    "https://drive.google.com/uc?export=download&id=1VrMSRC8G_ziWALT_gHuSsFra6C5BlVFu",
  etlRepo: "https://github.com/Bedouin121/Trucklagbe-ETL-Pipeline",
  publishedView: "", // paste your "Publish to web" iframe src here if you have one
};

/* -----------------------------------------------------------------------
   Content
----------------------------------------------------------------------- */
const METRICS = [
  { label: "Shipments analyzed", value: "8K", icon: <Truck className="w-4 h-4" /> },
  { label: "Revenue analyzed (BDT)", value: "৳96.07M", icon: <TrendingUp className="w-4 h-4" /> },
  { label: "On-time delivery rate", value: "58.9%", icon: <PackageCheck className="w-4 h-4" /> },
  { label: "Active drivers", value: "122", icon: <Users className="w-4 h-4" /> },
];

const SCREENSHOTS = [
  {
    src: "/images/truck1.jpg",
    alt: "Executive overview page showing shipment volume, revenue trend, and delivery volume by district",
    caption:
      "Executive overview — KPI cards feed from DAX measures over a star-schema model; the revenue trend uses a custom date table with a YearMonthSort helper column so it plots chronologically rather than alphabetically.",
  },
  {
    src: "/images/truck2.jpg",
    alt: "Delivery performance page showing delivery status split, delay distribution, and worst-delayed shipments table",
    caption:
      "Delivery performance — on-time rate broken out by destination district and a binned delay-hours histogram surface where the operation is actually losing time, not just whether it's on time in aggregate.",
  },
];

const FINDINGS = [
  "Just under a third of shipments (32.4%) arrive delayed, and delay severity is bimodal — most delays resolve within a few hours, but a distinct cluster of shipments consistently run 17–18 hours late regardless of route, suggesting a systemic cause rather than one-off traffic or weather variance.",
  "On-time performance varies meaningfully by destination district — Tangail and Barishal lead, while high-volume hubs like Khulna and Chattogram lag, meaning delay risk isn't evenly spread across the network and volume alone doesn't predict reliability.",
  "Mymensingh receives the highest shipment volume of any destination district by a wide margin, well ahead of the next-largest hubs — worth checking whether capacity there matches that demand.",
];

const RECOMMENDATIONS = [
  "Investigate the ~18-hour delay cluster as a specific operational issue (e.g. a recurring route, driver shift pattern, or handoff point) rather than treating all delays as random variance.",
  "Prioritize on-time-rate improvement efforts at Khulna and Chattogram given their combination of high volume and below-average reliability.",
  "Monitor Mymensingh capacity given its outsized share of destination volume relative to other districts.",
];

const TECH_STACK = [
  "PostgreSQL (source)",
  "Power Query (cleaning)",
  "Star-schema modeling",
  "DAX measures",
  "Apache NiFi (orchestration)",
];

/* -----------------------------------------------------------------------
   Page
----------------------------------------------------------------------- */
export default function TrucklagbeDashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── top bar ── */}
      <header className="border-b border-border/40 sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <span className="text-muted-foreground/40">|</span>
          <span className="text-sm font-mono text-primary">
            Trucklagbe Logistics Dashboard
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-14">
        {/* ── hero / executive summary ── */}
        <div>
          <p className="text-xs font-mono text-primary mb-1">case study</p>
          <h1 className="text-3xl font-bold">
            Trucklagbe Logistics Analytics Dashboard
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            A Power BI layer on top of a simulated Bangladeshi trucking
            operation's data pipeline — built to identify where delivery delays
            actually originate and which districts and vehicles drive cost, using
            the cleaned tables from a NiFi-orchestrated pandas ETL pipeline
            feeding PostgreSQL.
          </p>

          {/* metric row */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {METRICS.map((m) => (
              <div
                key={m.label}
                className="rounded-lg border border-border/60 bg-muted/30 p-4"
              >
                <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                  {m.icon}
                </div>
                <div className="text-2xl font-bold font-mono">{m.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── visual showcase ── */}
        <div className="space-y-8">
          <h2 className="text-base font-semibold">Dashboard</h2>
          {SCREENSHOTS.map((s) => (
            <figure key={s.src} className="space-y-2">
              <div className="rounded-lg border border-border/60 overflow-hidden bg-muted/20">
                <img src={s.src} alt={s.alt} className="w-full" />
              </div>
              <figcaption className="text-sm text-muted-foreground">
                {s.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* ── findings ── */}
        <div className="space-y-4">
          <h2 className="text-base font-semibold">Key findings</h2>
          <ul className="space-y-3">
            {FINDINGS.map((f, i) => (
              <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                <span className="text-primary font-mono shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── recommendations ── */}
        <div className="space-y-4">
          <h2 className="text-base font-semibold">Recommendations</h2>
          <ul className="space-y-3">
            {RECOMMENDATIONS.map((r, i) => (
              <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                <span className="text-primary shrink-0">→</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── tech stack + access ── */}
        <div className="border-t border-border/40 pt-10 space-y-6">
          <div>
            <h2 className="text-base font-semibold text-foreground mb-3">
              Tech stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {TECH_STACK.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-muted/50 border border-border/40 font-mono text-xs text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={LINKS.pbixDownload}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Download className="w-4 h-4" />
              Download .pbix
            </a>
            <a
              href={LINKS.etlRepo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border/60 px-5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              View ETL pipeline
            </a>
            {LINKS.publishedView && (
              <a
                href={LINKS.publishedView}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border/60 px-5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                View live dashboard
              </a>
            )}
          </div>

          <p className="text-sm text-muted-foreground max-w-2xl">
            The .pbix file opens directly in Power BI Desktop (free) — no
            license required to view or interact with it locally. Data is fully
            synthetic; no real drivers, vehicles, or shipment records are
            represented.
          </p>
        </div>
      </main>
    </div>
  );
}
