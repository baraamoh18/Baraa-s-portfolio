import { useState, type ChangeEvent, type FocusEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FloatingFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "textarea";
  placeholder?: string;
  required?: boolean;
  rows?: number;
  error?: string;
  className?: string;
}

/**
 * A text field with a focus-tracked gradient underline sweep — the
 * "micro-interaction" input treatment used throughout the contact form.
 */
export const FloatingField = ({
  id,
  name,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  rows = 5,
  error,
  className,
}: FloatingFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const isTextarea = type === "textarea";

  const handleFocus = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    void event;
    setIsFocused(true);
  };
  const handleBlur = () => setIsFocused(false);
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  const fieldClassName = cn(
    "w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-foreground outline-none",
    "transition-colors duration-200 placeholder:text-muted-foreground/60",
    "focus:border-white/25 focus:bg-white/[0.04]",
    isTextarea && "resize-none",
  );

  return (
    <div className={cn("relative", className)}>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground"
      >
        {label}
        {required && <span className="text-foreground/60"> *</span>}
      </label>

      <div className="relative">
        {isTextarea ? (
          <textarea
            id={id}
            name={name}
            required={required}
            rows={rows}
            value={value}
            placeholder={placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            className={fieldClassName}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            required={required}
            value={value}
            placeholder={placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            className={fieldClassName}
          />
        )}

        <motion.span
          initial={false}
          animate={{ scaleX: isFocused ? 1 : 0, opacity: isFocused ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="pointer-events-none absolute inset-x-4 -bottom-px h-px origin-left bg-gradient-to-r from-white via-white/50 to-transparent rtl:origin-right"
        />
      </div>

      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
};
