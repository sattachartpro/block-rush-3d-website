import { type FormEvent, useState } from 'react';
import { Check, Copy, ExternalLink, Mail, Send, Shield } from 'lucide-react';
import { BRAND_INFO } from '../config/release';
import { Reveal } from './Reveal';

interface ContactFormState {
  name: string;
  email: string;
  topic: string;
  message: string;
}

const INITIAL_FORM: ContactFormState = {
  name: '',
  email: '',
  topic: 'General Support',
  message: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SupportSection() {
  const [form, setForm] = useState<ContactFormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormState, string>>>({});
  const [submittedSummary, setSubmittedSummary] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(BRAND_INFO.supportEmail);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  };

  const handleCopyDraft = async () => {
    if (!submittedSummary) return;
    try {
      await navigator.clipboard.writeText(submittedSummary);
      setCopiedDraft(true);
      window.setTimeout(() => setCopiedDraft(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  };

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof ContactFormState, string>> = {};
    if (!form.name.trim()) {
      nextErrors.name = 'Please enter your name.';
    }
    if (!form.email.trim()) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!EMAIL_PATTERN.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      nextErrors.message = 'Please provide a message of at least 10 characters.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    const subject = `[${BRAND_INFO.appName}] ${form.topic} — ${form.name.trim()}`;
    const bodyText = [
      `Name: ${form.name.trim()}`,
      `Reply Email: ${form.email.trim()}`,
      `Topic: ${form.topic}`,
      `Package ID: ${BRAND_INFO.packageId}`,
      '',
      form.message.trim(),
    ].join('\n');

    setSubmittedSummary(bodyText);

    const mailtoHref = `mailto:${BRAND_INFO.supportEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyText)}`;
    window.location.href = mailtoHref;
  };

  return (
    <section
      id="support"
      aria-labelledby="support-heading"
      className="border-b border-slate-800/70 bg-[#070B14] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Column: Official Verification, Privacy Policy & Direct Support */}
          <Reveal className="lg:col-span-5">
            <div className="flex h-full flex-col justify-between gap-8">
              <div>
                <p className="text-xs font-semibold tracking-wider text-violet-400">
                  Official Website & Legal
                </p>
                <h2
                  id="support-heading"
                  className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]"
                >
                  Privacy &amp; Player Support
                </h2>
                <p className="mt-3 text-base leading-relaxed text-slate-300">
                  This website is the official game website for{' '}
                  <strong className="font-semibold text-white">{BRAND_INFO.appName}</strong>,
                  published by{' '}
                  <strong className="font-semibold text-white">{BRAND_INFO.developer}</strong> (
                  <span className="font-mono text-sm text-sky-300">{BRAND_INFO.packageId}</span>).
                </p>
              </div>

              <div className="space-y-4">
                {/* Support Email Card */}
                <div className="rounded-2xl border border-slate-800/90 bg-[#0B1120] p-5">
                  <div className="flex items-center gap-2.5 text-xs font-medium text-sky-400">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    <span>Direct Support Email</span>
                  </div>
                  <div className="mt-2.5 flex flex-wrap items-center justify-between gap-3">
                    <a
                      href={`mailto:${BRAND_INFO.supportEmail}`}
                      className="font-mono text-sm font-medium text-white underline-offset-4 hover:text-sky-300 hover:underline break-all"
                    >
                      {BRAND_INFO.supportEmail}
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-sky-500/60 hover:text-white"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-sky-400" aria-hidden="true" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                          Copy Email
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Privacy Policy Card */}
                <div className="rounded-2xl border border-slate-800/90 bg-[#0B1120] p-5">
                  <div className="flex items-center gap-2.5 text-xs font-medium text-violet-400">
                    <Shield className="h-4 w-4" aria-hidden="true" />
                    <span>Privacy Policy</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    Review how {BRAND_INFO.appName} handles app permissions and privacy disclosures
                    in our official policy document.
                  </p>
                  <a
                    href={BRAND_INFO.privacyPolicyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 underline-offset-4 transition-colors hover:text-sky-200 hover:underline"
                  >
                    Read Official Privacy Policy
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Static-Compatible Validated Contact Form */}
          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-800/90 bg-[#0B1120] p-6 sm:p-8">
              <h3 className="font-display text-2xl font-bold tracking-tight text-white">
                Contact {BRAND_INFO.developer}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Have a bug report, device compatibility question, or privacy inquiry? Compose your
                message below to open an email draft directly to support—no account or form data is
                stored on this website.
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-slate-200"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, name: e.target.value }));
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      placeholder="Alex Rivera"
                      className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-slate-700/90 bg-[#05070D] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                    />
                    {errors.name && (
                      <p id="contact-name-error" className="mt-1.5 text-xs text-rose-400">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-slate-200"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, email: e.target.value }));
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      placeholder="you@example.com"
                      className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-slate-700/90 bg-[#05070D] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                    />
                    {errors.email && (
                      <p id="contact-email-error" className="mt-1.5 text-xs text-rose-400">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-topic"
                    className="block text-xs font-semibold text-slate-200"
                  >
                    Topic
                  </label>
                  <select
                    id="contact-topic"
                    name="topic"
                    value={form.topic}
                    onChange={(e) => setForm((prev) => ({ ...prev, topic: e.target.value }))}
                    className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-slate-700/90 bg-[#05070D] px-3.5 py-2.5 text-sm text-white focus:border-sky-400 focus:outline-none"
                  >
                    <option value="General Support">General Support</option>
                    <option value="APK Installation Help">APK Installation Help</option>
                    <option value="Bug Report">Bug Report</option>
                    <option value="Privacy Inquiry">Privacy Inquiry</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-slate-200"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, message: e.target.value }));
                      if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    placeholder="Share your Android device model or question..."
                    className="mt-1.5 block w-full rounded-xl border border-slate-700/90 bg-[#05070D] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="mt-1.5 text-xs text-rose-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <button
                    type="submit"
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(59,130,246,0.28)] transition-all duration-150 hover:from-blue-500 hover:to-violet-500"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Send via Email Client
                  </button>

                  <span className="text-xs text-slate-400">
                    Opens your email app addressed to {BRAND_INFO.supportEmail}
                  </span>
                </div>
              </form>

              {submittedSummary && (
                <div
                  role="status"
                  className="mt-6 rounded-xl border border-sky-500/40 bg-[#05070D] p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-sky-300">
                      Email draft prepared for {BRAND_INFO.supportEmail}
                    </p>
                    <button
                      type="button"
                      onClick={handleCopyDraft}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-sky-500/60 hover:text-white"
                    >
                      {copiedDraft ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-sky-400" aria-hidden="true" />
                          Copied Message
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                          Copy Message
                        </>
                      )}
                    </button>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                    If your browser did not open a mail app automatically, copy the message above
                    and send it to {BRAND_INFO.supportEmail}.
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
