import { forwardRef } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className="w-full font-normal pt-4 py-4 text-[0.9rem] leading-[1.4] shadow-none border border-solid border-[#ccc] p-4 rounded-sm"
      style={{
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      }}
    />
  );
});

Input.displayName = 'Input';