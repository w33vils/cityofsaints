"use client";
import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface Props {
  eventId: number;
  eventDocumentId?: string;
  eventSlug: string;
  hasFood?: boolean;
  offersChildcare?: boolean;
}

function FloatingInput({ label, name, type = "text", required, value, onChange }: {
  label: string; name: string; type?: string; required?: boolean; value: string; onChange: (v: string) => void;
}) {
  const filled = value.length > 0;
  return (
    <div className="relative mb-6">
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="peer w-full border-0 border-b-2 border-black/10 bg-transparent pt-5 pb-2 text-[var(--color-heading)] focus:border-[var(--color-green)] focus:outline-none transition-colors"
        placeholder=" "
      />
      <label
        htmlFor={name}
        className={`absolute left-0 transition-all duration-200 pointer-events-none ${
          filled
            ? "top-0 text-xs text-[var(--color-green)] font-[family-name:var(--font-accent)] tracking-wider uppercase"
            : "top-5 text-[var(--color-muted)] peer-focus:top-0 peer-focus:text-xs peer-focus:text-[var(--color-green)] peer-focus:font-[family-name:var(--font-accent)] peer-focus:tracking-wider peer-focus:uppercase"
        }`}
      >
        {label}{required && " *"}
      </label>
    </div>
  );
}

export function RegistrationForm({ eventId, eventDocumentId, eventSlug, hasFood, offersChildcare }: Props) {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    num_attendees: "1",
    dietary_restrictions: "",
    childcare_needed: false,
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = (field: string) => (val: string) => setForm((p) => ({ ...p, [field]: val }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
      const res = await fetch(`${STRAPI_URL}/api/event-registrations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            event: eventDocumentId || eventId,
            first_name: form.first_name,
            last_name: form.last_name,
            email: form.email,
            phone: form.phone || undefined,
            num_attendees: parseInt(form.num_attendees) || 1,
            dietary_restrictions: form.dietary_restrictions || undefined,
            childcare_needed: form.childcare_needed,
            notes: form.notes || undefined,
          },
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error?.message || `Registration failed (${res.status})`);
      }

      setStatus("success");
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  // Success state
  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="text-center py-16"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 15 }}
        >
          <CheckCircle size={64} className="mx-auto text-[var(--color-green)] mb-6" />
        </motion.div>
        <h2 className="text-2xl font-[family-name:var(--font-heading)] mb-3">You&apos;re registered!</h2>
        <p className="text-[var(--color-muted)] mb-8">
          Thank you, {form.first_name}. We&apos;ve received your registration and you&apos;ll receive a confirmation email shortly.
        </p>
        <a
          href={`/events/${eventSlug}`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-green)] text-white rounded font-[family-name:var(--font-accent)] text-xs font-semibold tracking-[0.15em] uppercase hover:bg-[var(--color-green-light)] transition-colors"
        >
          Back to Event
        </a>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-x-6">
        <FloatingInput label="First Name" name="first_name" required value={form.first_name} onChange={update("first_name")} />
        <FloatingInput label="Last Name" name="last_name" required value={form.last_name} onChange={update("last_name")} />
      </div>
      <FloatingInput label="Email Address" name="email" type="email" required value={form.email} onChange={update("email")} />
      <FloatingInput label="Phone Number" name="phone" type="tel" value={form.phone} onChange={update("phone")} />
      <FloatingInput label="Number of Attendees" name="num_attendees" type="number" required value={form.num_attendees} onChange={update("num_attendees")} />

      {hasFood && (
        <FloatingInput label="Dietary Restrictions" name="dietary_restrictions" value={form.dietary_restrictions} onChange={update("dietary_restrictions")} />
      )}

      {offersChildcare && (
        <label className="flex items-center gap-3 mb-6 cursor-pointer">
          <input
            type="checkbox"
            checked={form.childcare_needed}
            onChange={(e) => setForm((p) => ({ ...p, childcare_needed: e.target.checked }))}
            className="w-5 h-5 accent-[var(--color-green)]"
          />
          <span className="text-[var(--color-text)]">I need childcare</span>
        </label>
      )}

      <div className="relative mb-6">
        <textarea
          name="notes"
          value={form.notes}
          onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
          rows={3}
          className="w-full border-0 border-b-2 border-black/10 bg-transparent pt-5 pb-2 text-[var(--color-heading)] focus:border-[var(--color-green)] focus:outline-none transition-colors resize-none"
          placeholder="Anything else we should know?"
        />
      </div>

      {/* Error */}
      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
          >
            <AlertCircle size={20} className="text-[var(--color-error)] shrink-0" />
            <p className="text-sm text-[var(--color-error)]">{errorMsg}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[var(--color-green)] text-white rounded-lg font-[family-name:var(--font-accent)] text-sm font-semibold tracking-[0.15em] uppercase hover:bg-[var(--color-green-light)] hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Registering...
          </>
        ) : (
          "REGISTER NOW"
        )}
      </button>
    </form>
  );
}
