import { ChangeEventHandler, forwardRef } from "react";
import { UseFormRegister } from "react-hook-form";
import { Input } from "./Input";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<any>;
  requiredProps: string;
  item: { id: string; name: string, value: string }; 
  radioName: string
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const Radio = forwardRef<HTMLInputElement, InputProps>(
  ({ register, requiredProps, item, radioName, onChange, ...props }, ref) => {
    return (
      <label
        htmlFor={item.id}
        className="inline-flex mr-6 items-center cursor-pointer align-middle ml-[-11px]"
      >
        <span className="py-[5px] px-[9px] cursor-pointer">
          <input
            {...props}
            {...register(item.name, {
              required: requiredProps,
            })}
            id={item.id}
            name={radioName}
            ref={ref}
            value={item.value}
            type="radio"
            className="cursor-pointer"
            onChange={onChange}
          />
        </span>
        <span>{item.name}</span>
      </label>
    );
  }
);

Input.displayName = "Input";
