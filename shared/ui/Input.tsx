import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  errorMessage?: string;
};

export function Input({
  className = "",
  errorMessage,
  id,
  label,
  ...props
}: InputProps) {
  return (
    <label className="block space-y-2" htmlFor={id}>
      {label ? (
        <span className="text-sm font-medium text-neutral-800">{label}</span>
      ) : null}

      <input
        className={[
          "h-11 w-full rounded-xl border border-neutral-300 bg-white px-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900",
          errorMessage ? "border-red-500 focus:border-red-500" : "",
          className,
        ].join(" ")}
        id={id}
        {...props}
      />

      {errorMessage ? (
        <p className="text-sm text-red-600">{errorMessage}</p>
      ) : null}
    </label>
  );
}