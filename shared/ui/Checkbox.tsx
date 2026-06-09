import type { InputHTMLAttributes, ReactNode } from "react";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: ReactNode;
  errorMessage?: string;
};

export function Checkbox({
  className = "",
  errorMessage,
  id,
  label,
  ...props
}: CheckboxProps) {
  return (
    <div className="space-y-2">
      <label
        className="flex cursor-pointer items-start gap-3 text-sm text-neutral-800"
        htmlFor={id}
      >
        <input
          className={[
            "mt-0.5 h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900",
            className,
          ].join(" ")}
          id={id}
          type="checkbox"
          {...props}
        />

        <span>{label}</span>
      </label>

      {errorMessage ? (
        <p className="text-sm text-red-600">{errorMessage}</p>
      ) : null}
    </div>
  );
}