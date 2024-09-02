import { ReactNode } from "react";

interface FormErrorMessageProps {
  children: ReactNode;
}

export const FormErrorMessage: React.FC<FormErrorMessageProps> = ({
  children,
}) => {
  return (
    <p
      role="alert"
      className="my-[0.2rem] mx-0 text-[1rem] leading-5 text-[#ee3300] font-bold"
    >
      {children}
    </p>
  );
};
