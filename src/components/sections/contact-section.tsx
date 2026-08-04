import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Clock, Loader2, Mail, MapPin, XCircle } from "lucide-react";
import { FloatingField } from "@/components/ui/form-field";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { SectionHeading } from "@/components/ui/section-heading";
import { SITE_CONFIG } from "@/data/site";
import type { ContactFormValues, FormStatus } from "@/types";

const INITIAL_VALUES: ContactFormValues = {
  name: "",
  email: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ContactSection = () => {
  const { t } = useTranslation();
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [status, setStatus] = useState<FormStatus>("idle");

  const isSubmitting = status === "submitting";

  const updateField = (field: keyof ContactFormValues) => (value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!values.name || !values.email || !values.message) return;
    if (!EMAIL_PATTERN.test(values.email)) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      // NOTE: no backend is wired up yet. Swap this simulated delay for a
      // real request (e.g. to Formspree, EmailJS, or your own API route).
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus("success");
      setValues(INITIAL_VALUES);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <AmbientBackground />

      <div className="container relative grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="flex flex-col gap-10">
          <SectionHeading
            align="start"
            eyebrow={t("contact.eyebrow")}
            title={t("contact.title")}
            description={t("contact.description")}
          />

          <div className="flex flex-col gap-5">
            <InfoRow
              icon={Mail}
              label={t("contact.info.emailLabel")}
              value={SITE_CONFIG.email}
              href={`mailto:${SITE_CONFIG.email}`}
            />
            <InfoRow
              icon={MapPin}
              label={t("contact.info.locationLabel")}
              value={t("contact.info.location")}
            />
            <InfoRow
              icon={Clock}
              label={t("contact.info.availabilityLabel")}
              value={t("contact.info.availability")}
            />
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="glass-panel relative flex flex-col gap-6 rounded-3xl p-6 sm:p-10"
        >
          <FloatingField
            id="contact-name"
            name="name"
            label={t("contact.form.name")}
            placeholder={t("contact.form.namePlaceholder")}
            value={values.name}
            onChange={updateField("name")}
            required
          />
          <FloatingField
            id="contact-email"
            name="email"
            type="email"
            label={t("contact.form.email")}
            placeholder={t("contact.form.emailPlaceholder")}
            value={values.email}
            onChange={updateField("email")}
            required
          />
          <FloatingField
            id="contact-message"
            name="message"
            type="textarea"
            rows={5}
            label={t("contact.form.message")}
            placeholder={t("contact.form.messagePlaceholder")}
            value={values.message}
            onChange={updateField("message")}
            required
          />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <MagneticButton type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t("contact.form.submitting")}
                </>
              ) : (
                t("contact.form.submit")
              )}
            </MagneticButton>

            <AnimatePresence mode="wait">
              {status === "success" && (
                <StatusMessage icon={CheckCircle2} text={t("contact.form.success")} />
              )}
              {status === "error" && (
                <StatusMessage icon={XCircle} text={t("contact.form.error")} isError />
              )}
            </AnimatePresence>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

interface InfoRowProps {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}

const InfoRow = ({ icon: Icon, label, value, href }: InfoRowProps) => {
  const content = (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 transition-colors hover:border-white/20 hover:bg-white/[0.04]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
        <Icon className="h-4 w-4 text-foreground" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs uppercase tracking-wide text-muted-foreground">{label}</span>
        <span className="text-sm font-medium text-foreground">{value}</span>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  return content;
};

interface StatusMessageProps {
  icon: typeof CheckCircle2;
  text: string;
  isError?: boolean;
}

const StatusMessage = ({ icon: Icon, text, isError }: StatusMessageProps) => (
  <motion.p
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.3 }}
    className={
      isError
        ? "flex items-center gap-2 text-sm text-destructive"
        : "flex items-center gap-2 text-sm text-foreground"
    }
  >
    <Icon className="h-4 w-4" />
    {text}
  </motion.p>
);
