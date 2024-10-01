import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  style?: React.CSSProperties; 
}

export const Input = forwardRef
  <HTMLInputElement, InputProps>(({ style, inputMode = "text", ...props }, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className="w-full font-normal pt-4 py-4 text-[0.9rem] leading-[1.4] shadow-none border border-solid border-[#ccc] p-4 rounded-sm"
      inputMode={inputMode}
      style={{
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        ...style,
      }}
    />
  );
});

Input.displayName = 'Input';
