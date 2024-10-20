import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  style?: React.CSSProperties; 
  addClass?: string;
}

export const Input = forwardRef
  <HTMLInputElement, InputProps>(({ style, inputMode = "text", addClass, ...props }, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={`${addClass} w-full font-normal pt-4 py-4 text-[0.9rem] leading-[1.4] shadow-none border border-solid border-[#ccc] p-4 rounded-sm`}
      inputMode={inputMode || undefined}
      style={{
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        ...style,
      }}
    />
  );
});

Input.displayName = 'Input';
