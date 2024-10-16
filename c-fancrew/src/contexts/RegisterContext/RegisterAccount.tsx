"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  ChangeEvent,
} from "react";

interface RegisterAccountFields {
  email: string;
  lastName: string;
  firstName: string;
  password: string;
  birthday: Date;
  gender: string;
  zipcode: string;
  mailDelivery: boolean;
  secret: Number;
  secretAnswer: string;
  tel: number | null;
}

interface RegisterAccountContextType extends RegisterAccountFields {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setFormValues: React.Dispatch<React.SetStateAction<RegisterAccountFields>>;
}

const RegisterAccountContext = createContext<
  RegisterAccountContextType | undefined
>(undefined);

interface RegisterAccountProviderProps {
  children: ReactNode;
}

export const RegisterAccountProvider: React.FC<
  RegisterAccountProviderProps
> = ({ children }) => {
  const [formValues, setFormValues] = useState<RegisterAccountFields>({
    email: "",
    lastName: "",
    firstName: "",
    password: "",
    birthday: new Date(),
    gender: "",
    zipcode: "",
    mailDelivery: false,
    secret: 0,
    secretAnswer: "",
    tel: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <RegisterAccountContext.Provider value={{ ...formValues, handleChange, setFormValues }}>
      {children}
    </RegisterAccountContext.Provider>
  );
};

export const useRegisterAccount = () => {
  const context = useContext(RegisterAccountContext);
  if (!context) {
    throw new Error(
      "RegisterAccountContext must be used within an RegisterAccountProvider"
    );
  }
  return context;
};
