"use client";
import { createContext, ReactNode, useEffect, useState } from "react";

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

  // Initialise localStorage with an empty array if not already present
  useEffect(() => {
    if (!localStorage.getItem("storedFiles")) {
      localStorage.setItem("storedFiles", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("completedForms")) {
      localStorage.setItem("completedForms", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("employeeFullName") === null) {
      localStorage.setItem("employeeFullName", "");
    }
  }, []);

  // if (typeof window !== "undefined") {
  //   if (!localStorage.getItem("storedFiles")) {
  //     localStorage.setItem("storedFiles", JSON.stringify([]));
  //   }
  // }

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
