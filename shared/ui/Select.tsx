import type { ReactNode, SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  children: ReactNode;
  label?: string;
  errorMessage?: string;
};

export function Select({
  children,
  className = "",
  errorMessage,
  id,
  label,
  ...props
}: SelectProps) {
  return (
    <label className="block space-y-2" htmlFor={id}>
      {label ? (
        <span className="text-sm font-medium text-neutral-800">{label}</span>
      ) : null}

      <select
        className={[
          "h-11 w-full rounded-xl border border-neutral-300 bg-white px-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-900",
          errorMessage ? "border-red-500 focus:border-red-500" : "",
          className,
        ].join(" ")}
        id={id}
        {...props}
      >
        {children}
      </select>

      {errorMessage ? (
        <p className="text-sm text-red-600">{errorMessage}</p>
      ) : null}
    </label>
  );
}