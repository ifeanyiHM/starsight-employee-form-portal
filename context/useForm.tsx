import { useContext } from "react";
import { FormContext } from "./FormContext";

function useForm() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useAuth must be used within a FormProvider");
  }
  return context;
}

export default useForm;
