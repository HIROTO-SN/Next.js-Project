import { forwardRef } from "react";
import { Input } from "./Input";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  item: { id: string; name: string, value: string }; 
  radioName: string
}

export const Radio = forwardRef<HTMLInputElement, InputProps>(
  ({ item, radioName, ...props }, ref) => {
    return (
      <label
        htmlFor={item.id}
        className="inline-flex mr-6 items-center cursor-pointer align-middle ml-[-11px]"
      >
        <span className="py-[5px] px-[9px] cursor-pointer">
          <input
            {...props}
            id={item.id}
            name={radioName}
            ref={ref}
            value={item.value}
            type="radio"
            className="cursor-pointer"
          />
        </span>
        <span>{item.name}</span>
      </label>
    );
  }
);

Input.displayName = "Input";
