import { createContext, ReactNode, useState } from "react";

interface FormProviderProps {
  children: ReactNode;
}

export interface FormContextProps {
  searchTerm: string;
  setSearchTerm: (type: string) => void;
}

export const defaultFormProps: FormContextProps = {
  searchTerm: "",
  setSearchTerm: () => {},
};

const FormContext = createContext<FormContextProps>(defaultFormProps);

function FormProvider({ children }: FormProviderProps) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <FormContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export { FormContext, FormProvider };
