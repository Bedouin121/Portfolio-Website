import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { validateBatch } from "@/lib/codeValidation/validator";
import { codeLookup } from "@/lib/codeValidation/loadCodeData";
import type { BatchValidationSummary, CodeSystem } from "@/lib/codeValidation/types";

/* -----------------------------------------------------------------------
   Status styles
----------------------------------------------------------------------- */
const STATUS_META: Record<
  string,
  { label: string; classes: string; icon: React.ReactNode }
> = {
  valid: {
    label: "valid",
    classes: "text-green-700 bg-green-50 border-green-200",
    icon: <CheckCircle className="w-3.5 h-3.5" />,
  },
  unknown: {
    label: "unknown",
    classes: "text-amber-700 bg-amber-50 border-amber-200",
    icon: <AlertCircle className="w-3.5 h-3.5" />,
  },
  malformed: {
    label: "malformed",
    classes: "text-red-700 bg-red-50 border-red-200",
    icon: <XCircle className="w-3.5 h-3.5" />,
  },
};

/* -----------------------------------------------------------------------
   Page
----------------------------------------------------------------------- */
export default function CodeValidatorPage() {
  const [system, setSystem] = useState<CodeSystem>("ICD10");
  const [rawText, setRawText] = useState("");
  const [summary, setSummary] = useState<BatchValidationSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleValidate() {
    const codes = rawText
      .split(/[\n,]/)
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    if (codes.length === 0) {
      setError("Paste at least one code first.");
      return;
    }
    if (codes.length > 5000) {
      setError("Limited to 5 000 codes per request.");
      return;
    }

    setError(null);
    setSummary(validateBatch(codes, system, codeLookup));
  }

  function handleClear() {
    setRawText("");
    setSummary(null);
    setError(null);
  }

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
            ICD-10 / HCPCS Code Validator
          </span>
        </div>
      </header>

      {/* ── main content ── */}
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        {/* intro */}
        <div>
          <p className="text-xs font-mono text-primary mb-1">tool</p>
          <h1 className="text-3xl font-bold">ICD-10 / HCPCS Code Validator</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Two-layer validation for medical billing codes — format checking via
            regex, then existence checking against real CMS-published code lists.
            Paste codes below, one per line or comma-separated.
          </p>
        </div>

        {/* system toggle */}
        <div className="flex gap-1 p-1 rounded-lg border border-border/60 w-fit">
          {(["ICD10", "HCPCS"] as CodeSystem[]).map((s) => (
            <button
              key={s}
              onClick={() => setSystem(s)}
              className={`px-4 py-1.5 rounded-md text-sm font-mono transition-colors ${
                system === s
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s === "ICD10" ? "ICD-10" : "HCPCS"}
            </button>
          ))}
        </div>

        {/* textarea + actions */}
        <div className="space-y-3">
          <textarea
            className="w-full rounded-lg border border-border/60 bg-muted/30 p-4 font-mono text-sm
                       placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2
                       focus:ring-primary/40 resize-y"
            rows={8}
            placeholder={
              system === "ICD10"
                ? "A00\nB18.1\nE11.9\nZZZ99"
                : "J1100\nE0100\nA4550\nZZZ99"
            }
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            aria-label="Paste codes here"
          />

          <div className="flex gap-3">
            <button
              onClick={handleValidate}
              className="rounded-lg bg-primary text-primary-foreground px-5 py-2 text-sm font-medium
                         hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              Validate codes
            </button>
            {(rawText || summary) && (
              <button
                onClick={handleClear}
                className="rounded-lg border border-border/60 px-5 py-2 text-sm font-medium
                           text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {error && (
            <p className="text-sm text-red-600 flex items-center gap-1.5">
              <XCircle className="w-4 h-4 shrink-0" />
              {error}
            </p>
          )}
        </div>

        {/* results */}
        {summary && (
          <div className="space-y-6">
            {/* summary pills */}
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 rounded-full bg-muted/50 border border-border/40 font-mono">
                {summary.total} checked
              </span>
              <span className="px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 font-mono">
                {summary.valid} valid
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-mono">
                {summary.unknown} unknown
              </span>
              <span className="px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 font-mono">
                {summary.malformed} malformed
              </span>
            </div>

            {/* results table */}
            <div className="rounded-lg border border-border/60 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 bg-muted/30">
                    <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                      Code
                    </th>
                    <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                      Description / Reason
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {summary.results.map((r, i) => {
                    const meta = STATUS_META[r.status];
                    return (
                      <tr
                        key={i}
                        className="border-b border-border/30 last:border-0 hover:bg-muted/20 transition-colors"
                      >
                        <td className="px-4 py-2.5 font-mono font-medium">
                          {r.normalizedCode}
                        </td>
                        <td className="px-4 py-2.5">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-medium ${meta.classes}`}
                          >
                            {meta.icon}
                            {meta.label}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          {r.description ?? r.reason}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* about section */}
        <div className="border-t border-border/40 pt-10 space-y-4 text-sm text-muted-foreground">
          <h2 className="text-base font-semibold text-foreground">About this tool</h2>
          <p>
            Validates ICD-10-CM and HCPCS Level II billing codes in two steps:
            first a regex format check, then a lookup against CMS-published code
            lists bundled at build time — no server round-trip required.
          </p>
          <p>
            CPT codes are omitted because the AMA holds copyright on the full
            list. HCPCS Level II covers the same billing domain (procedures,
            supplies, equipment) and is freely redistributable.
          </p>
          <p>
            The sample code lists are a subset of the full CMS data. Replacement of
            <code className="mx-1 px-1.5 py-0.5 rounded bg-muted font-mono text-xs text-foreground">
              icd10-codes.json
            </code>
            and
            <code className="mx-1 px-1.5 py-0.5 rounded bg-muted font-mono text-xs text-foreground">
              hcpcs-codes.json
            </code>
            with the full CMS exports would be required for production use.
          </p>
        </div>
      </main>
    </div>
  );
}
