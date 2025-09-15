"use client";
import Image from "next/image";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { generatePDFFromSections } from "../../utils/pdfGenerator";

export interface EmployeeFormDataProp {
  surname: string;
  otherNames: string;
  dateOfEmployment: string;
  designation: string;
  nationality: string;
  stateOfOrigin: string;
  placeOfBirth: string;
  gender: string;
  dateOfBirth: string;
  maritalStatus: string;
  numberOfChildren: string;
  namesOfChildren: string;
  residentialAddress: string;
  contactAddress: string;
  permanentAddress: string;
  emailAddress: string;
  phoneNumber: string;
  nextOfKin: string;
  relationshipWithNextOfKin: string;
  addressOfNextOfKin: string;
  phoneNumberOfNextOfKin: string;
  emergencyContactNumber: string;
  rsaNumber: string;
  rsaProvider: string;
  bankAccountDetails: string;
  payeRemittanceId: string;
}

export default function EmployeeData() {
  const [loading, setLoading] = useState(false);

  const methods = useForm<EmployeeFormDataProp>({
    defaultValues: {
      surname: "",
      otherNames: "",
      dateOfEmployment: "",
      designation: "",
      nationality: "",
      stateOfOrigin: "",
      placeOfBirth: "",
      gender: "",
      dateOfBirth: "",
      maritalStatus: "",
      numberOfChildren: "",
      namesOfChildren: "",
      residentialAddress: "",
      contactAddress: "",
      permanentAddress: "",
      emailAddress: "",
      phoneNumber: "",
      nextOfKin: "",
      relationshipWithNextOfKin: "",
      addressOfNextOfKin: "",
      phoneNumberOfNextOfKin: "",
      emergencyContactNumber: "",
      rsaNumber: "",
      rsaProvider: "",
      bankAccountDetails: "",
      payeRemittanceId: "",
    },
  });

  // ✅ Destructure only what you need from methods
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
    watch,
  } = methods;

  //   const selectedFile = watch("document");

  const onSubmit = async (data: EmployeeFormDataProp): Promise<void> => {
    setLoading(true);

    try {
      // Generate PDF from the three sections
      const sectionIds = ["section-1", "section-2", "section-3"];
      const pdf = await generatePDFFromSections(sectionIds);

      // Convert PDF to blob
      const pdfBlob = pdf.output("blob");

      // Send to backend API for emailing
      const formData = new FormData();
      formData.append("file", pdfBlob, "form-data.pdf");
      formData.append("email", `Surname Name: ${data.surname}`);

      const response = await fetch("/api/send-pdf", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("PDF sent successfully!");
        // ✅ Clear all inputs including textareas
        reset();
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate or send PDF");
    } finally {
      setLoading(false);
    }
  };

  const employeeFormFields1: {
    id: keyof EmployeeFormDataProp;
    title: string;
  }[] = [
    { id: "surname", title: "SURNAME" },
    { id: "otherNames", title: "OTHER NAMES" },
    { id: "dateOfEmployment", title: "DATE OF EMPLOYMENT" },
    { id: "designation", title: "DESIGNATION" },
    { id: "nationality", title: "NATIONALITY" },
  ];

  const employeeFormFields2: {
    id: keyof EmployeeFormDataProp;
    title: string;
  }[] = [
    { id: "stateOfOrigin", title: "STATE OF ORIGIN" },
    { id: "placeOfBirth", title: "PLACE OF BIRTH" },
    { id: "gender", title: "GENDER" },
    { id: "dateOfBirth", title: "DATE OF BIRTH" },
    { id: "maritalStatus", title: "MARITAL STATUS" },
    { id: "numberOfChildren", title: "NUMBER OF CHILDREN" },
  ];

  const employeeFormFields3: {
    id: keyof EmployeeFormDataProp;
    title: string;
  }[] = [
    { id: "namesOfChildren", title: "NAMES OF CHILDREN" },
    { id: "residentialAddress", title: "RESIDENTIAL ADDRESS" },
    {
      id: "contactAddress",
      title: "CONTACT ADDRESS (If different from above)",
    },
    { id: "permanentAddress", title: "PERMANENT ADDRESS" },
    { id: "emailAddress", title: "EMAIL ADDRESS" },
    { id: "phoneNumber", title: "PHONE NUMBER" },
    { id: "nextOfKin", title: "NEXT OF KIN" },
    { id: "relationshipWithNextOfKin", title: "RELATIONSHIP WITH NEXT OF KIN" },
    { id: "addressOfNextOfKin", title: "ADDRESS OF NEXT OF KIN" },
    { id: "phoneNumberOfNextOfKin", title: "PHONE NUMBER OF NEXT OF KIN" },
  ];
  const employeeFormFields4: {
    id: keyof EmployeeFormDataProp;
    title: string;
  }[] = [
    {
      id: "emergencyContactNumber",
      title: "Contact Number (In case of emergency)",
    },
    { id: "rsaNumber", title: "RSA NUMBER (PENSION)" },
    { id: "rsaProvider", title: "RSA PROVIDER" },
    { id: "bankAccountDetails", title: "BANK ACCOUNT DETAILS" },
    { id: "payeRemittanceId", title: "PAYE REMITANCE I.D (TAX ID NUMBER)" },
  ];

  return (
    <div
      className="flex items-center justify-center min-h-screen p-6"
      style={{ backgroundColor: "#f1f5f9" }}
      // style={{ backgroundColor: "#000" }}
    >
      <FormProvider {...methods}>
        <form
          id="form-container"
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-3xl flex flex-col gap-8"

          // ref={formRef}
        >
          <section
            id="section-1"
            className="w-full py-8 pl-8 pr-44 border space-y-6"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              borderColor: "#e5e7eb",
            }}
          >
            <div className="flex justify-center m-0">
              <Image
                src="/starsight-empData-logo.png"
                alt="starsight logo"
                width="186"
                height="64"
              />
            </div>
            <h1 className="text-[0.9rem] font-bold text-center uppercase">
              EMPLOYEE PERSONAL DATA FORM
            </h1>

            <div>
              <h2 className="font-bold uppercase text-[14px]">SECTION A</h2>
              <div className="text-[14px] font-medium pl-2">
                {employeeFormFields1.map((field, index) => (
                  <div className="flex items-end py-2 gap-1" key={index}>
                    <label className="shrink-0 pl-2" htmlFor={field.id}>
                      <span className="pr-2">{index + 1}.</span> {field.title} :
                    </label>

                    <input
                      {...register(field.id, {
                        required: "Customer's Name is required",
                      })}
                      className="w-full outline-none pl-2 border-b-2 border-dotted border-black -translate-y-1.5"
                      id={field.id}
                      type="text"
                    />
                    {errors[field.id] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[field.id]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-x-1 w-full text-[14px] font-medium pl-2">
                {employeeFormFields2.map((field, index) => (
                  <div className="flex items-end py-2 gap-1" key={index}>
                    <label className="shrink-0 pl-2" htmlFor={field.id}>
                      <span className="pr-2">
                        {index === 0
                          ? "6."
                          : index === 2
                          ? "7."
                          : index === 4
                          ? "8."
                          : ""}
                      </span>
                      {field.title} :
                    </label>

                    <input
                      {...register(field.id, {
                        required: "Customer's Name is required",
                      })}
                      className="w-full outline-none pl-2 border-b-2 border-dotted border-black -translate-y-1.5"
                      id={field.id}
                      type="text"
                    />
                    {errors[field.id] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[field.id]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <div className="text-[14px] font-medium pl-2">
                {employeeFormFields3.map((field, index) => (
                  <>
                    <div className="flex items-end py-2 gap-1" key={index}>
                      <label className="shrink-0 pl-2" htmlFor={field.id}>
                        <span className="pr-2">{index + 9}.</span> {field.title}{" "}
                        :
                      </label>

                      <input
                        {...register(field.id, {
                          required: "Customer's Name is required",
                        })}
                        className="w-full outline-none pl-2 border-b-2 border-dotted border-black -translate-y-1.5"
                        id={field.id}
                        type="text"
                      />
                      {errors[field.id] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors[field.id]?.message}
                        </p>
                      )}
                    </div>
                    {[0, 1, 2, 3, 8].includes(index) && (
                      <input
                        {...register(field.id, {
                          required: "Customer's Name is required",
                        })}
                        className="w-[calc(100%-2rem)] outline-none ml-8 utline-none pl-2 border-b-2 border-dotted border-black -translate-y-1.5"
                        id={field.id}
                        type="text"
                      />
                    )}
                  </>
                ))}
              </div>
            </div>
          </section>
          <section
            id="section-2"
            className="w-full py-8 pl-8 pr-44 border space-y-6"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              borderColor: "#e5e7eb",
            }}
          >
            {/* Personal Information */}
            <div>
              <h2 className="font-bold uppercase text-[14px]">SECTION A</h2>
              <div className="text-[14px] font-medium pl-2">
                {employeeFormFields1.map((field, index) => (
                  <div className="flex items-end py-2 gap-1" key={index}>
                    <label className="shrink-0 pl-2" htmlFor={field.id}>
                      <span className="pr-2">{index + 1}.</span> {field.title} :
                    </label>

                    <input
                      {...register(field.id, {
                        required: "Customer's Name is required",
                      })}
                      className="w-full outline-none pl-2 border-b-2 border-dotted border-black -translate-y-1.5"
                      id={field.id}
                      type="text"
                    />
                    {errors[field.id] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[field.id]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* EDUCATIONAL QUALIFICATION DETAILS */}
            {/* <div>
              <h2 className="font-bold uppercase text-[14px]">
                EDUCATIONAL QUALIFICATION DETAILS
              </h2>
              <div className="border border-black border-b-0 text-sm font-medium">
                <div className="font-bold flex w-full border-b border-black">
                  <p className=" pl-2 border-r border-black w-[18%] py-0.5"></p>
                  <p className="w-[50%] outline-none pl-2 py-0.5 border-r border-black ">
                    Institutions
                  </p>
                  <p className="w-[32%] outline-none pl-2 py-0.5">
                    Course Studied
                  </p>
                </div>
                {qualifications.map((info, index) => (
                  <div
                    key={index}
                    className="flex w-full border-b border-black"
                  >
                    {" "}
                    <label
                      className=" pl-2 border-r border-black w-[18%] py-0.5"
                      htmlFor={info.id1}
                    >
                      {info.title}
                    </label>
                    <>
                      <input
                        {...register(info.id1, {
                          required: "Customer's Name is required",
                        })}
                        className="w-[50%] outline-none pl-2 py-2.5 border-r border-black "
                        id={info.id1}
                        type="text"
                      />
                      {errors[info.id1] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors[info.id1]?.message}
                        </p>
                      )}
                    </>
                    <>
                      <input
                        {...register(info.id2, {
                          required: "Customer's Name is required",
                        })}
                        className="w-[32%] outline-none pl-2 py-2.5"
                        id={info.id1}
                        type="text"
                      />
                      {errors[info.id2] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors[info.id2]?.message}
                        </p>
                      )}
                    </>
                  </div>
                ))}
                <div className="font-bold flex w-full border-b border-black">
                  <p className=" pl-2 border-r border-black w-[18%] py-0.5">
                    Certifcates
                  </p>
                  <p className="w-[50%] outline-none pl-2 py-0.5 border-r border-black ">
                    Kindly attached certificates as stated above
                  </p>
                  <p className="font-semibold w-[32%] outline-none pl-2 py-0.5">
                    Matrix No:
                  </p>
                </div>
              </div>
            </div> */}
          </section>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white rounded-lg transition-all font-bold uppercase"
            style={{
              backgroundColor: "#333232",
            }}
            onMouseOver={(e) => {
              if (!loading) {
                (e.target as HTMLButtonElement).style.backgroundColor =
                  "#444343";
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                (e.target as HTMLButtonElement).style.backgroundColor =
                  "#333232";
              }
            }}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>{" "}
      </FormProvider>
    </div>
  );
}
