"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CiCamera } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import {
  loadFilesFromLocalStorage,
  saveFilesToLocalStorage,
} from "../../utils/browserStorage";
import { generatePDFFromSections } from "../../utils/pdfGenerator";

export interface EmployeeFormDataProp {
  surname: string;
  otherNames: string;
  passport: string;
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
  nationalHouingFund: string;
  nhfNumber: string;
}

type IdRow =
  | "DRIVER’S LICENCE"
  | "INTERNATIONAL PASSPORT"
  | "NATIONAL IDENTITY"
  | "OTHERS (SPECIFY)";

export default function EmployeeData() {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [rows, setRows] = useState([
    { qualification: "", school: "", year: "" },
  ]);
  const [preview, setPreview] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<IdRow, "yes" | "no" | null>>({
    "DRIVER’S LICENCE": null,
    "INTERNATIONAL PASSPORT": null,
    "NATIONAL IDENTITY": null,
    "OTHERS (SPECIFY)": null,
  });

  const router = useRouter();

  const toggleAnswer = (row: IdRow, value: "yes" | "no") => {
    setAnswers((prev) => ({
      ...prev,
      [row]: prev[row] === value ? null : value, // deselect if clicked twice
    }));
  };

  const addRow = () => {
    setRows([...rows, { qualification: "", school: "", year: "" }]);
  };

  const methods = useForm<EmployeeFormDataProp>({
    defaultValues: {
      surname: "",
      otherNames: "",
      passport: "",
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
      nationalHouingFund: "",
      nhfNumber: "",
    },
  });

  // ✅ Destructure only what you need from methods
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: EmployeeFormDataProp): Promise<void> => {
    setLoading(true);

    try {
      // Generate PDF from the three sections
      const sectionIds = ["section-1", "section-2"];
      const pdf = await generatePDFFromSections(sectionIds);

      // Convert PDF to blob
      const pdfBlob = pdf.output("blob");

      // Send to backend API for emailing
      const formData = new FormData();
      formData.append("file", pdfBlob, "employee-data-form.pdf");
      formData.append("email", `Employee Name: ${data.surname}`);

      const existingFiles = loadFilesFromLocalStorage();

      // extract only the File objects
      const combinedFiles: File[] = [...existingFiles];
      formData.forEach((value) => {
        if (value instanceof File) {
          combinedFiles.push(value);
        }
      });

      await saveFilesToLocalStorage(combinedFiles);

      alert("Employee Biodata Successfully Completed!");

      //update the number of forms completed
      const prev = JSON.parse(localStorage.getItem("completedForms") || "[]");
      prev.push("Employee Data Form");
      localStorage.setItem("completedForms", JSON.stringify(prev));

      reset();
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate or send PDF");
    } finally {
      setLoading(false);
    }
  };

  const employeeFormFields: {
    id: keyof EmployeeFormDataProp;
    title: string;
  }[] = [
    { id: "surname", title: "SURNAME" },
    { id: "otherNames", title: "OTHER NAMES" },
    { id: "dateOfEmployment", title: "DATE OF EMPLOYMENT" },
    { id: "designation", title: "DESIGNATION" },
    { id: "nationality", title: "NATIONALITY" },
    { id: "stateOfOrigin", title: "STATE OF ORIGIN" },
    { id: "placeOfBirth", title: "PLACE OF BIRTH" },
    { id: "gender", title: "GENDER" },
    { id: "dateOfBirth", title: "DATE OF BIRTH" },
    { id: "maritalStatus", title: "MARITAL STATUS" },
    { id: "numberOfChildren", title: "NUMBER OF CHILDREN" },
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
    {
      id: "emergencyContactNumber",
      title: "Contact Number (In case of emergency)",
    },
    { id: "rsaNumber", title: "RSA NUMBER (PENSION)" },
    { id: "rsaProvider", title: "RSA PROVIDER" },
    { id: "bankAccountDetails", title: "BANK ACCOUNT DETAILS" },
    { id: "payeRemittanceId", title: "PAYE REMITANCE I.D (TAX ID NUMBER)" },
    { id: "nationalHouingFund", title: "NATIONAL HOUSING FUND" },
    { id: "nhfNumber", title: "IF YES, NHF NUMBER" },
  ];

  return (
    <>
      <Header />
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
          >
            <section
              id="section-1"
              className="relative w-full py-8 pl-8 border"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                borderColor: "#e5e7eb",
              }}
            >
              <div className="flex justify-center m-0">
                <Image
                  src="/starsightEmpdataLogo.png"
                  alt="starsight logo"
                  width="186"
                  height="64"
                />
              </div>
              <h1 className="text-[0.9rem] font-bold text-center uppercase">
                EMPLOYEE PERSONAL DATA FORM
              </h1>

              <div className="pr-40">
                <h2 className="font-bold uppercase text-[14px]">SECTION A</h2>
                <div className="text-[14px] font-medium pl-2">
                  {employeeFormFields.map((field, index) => {
                    if (index > 20) return null;
                    return (
                      <React.Fragment key={index}>
                        <div
                          className={`${
                            [5, 6, 7, 8, 9, 10].includes(index)
                              ? "w-1/2 inline-flex"
                              : "flex"
                          } items-end py-2 gap-1`}
                        >
                          <label className="shrink-0 pl-2" htmlFor={field.id}>
                            <span className="title">
                              <span className="pr-2">
                                {[6, 8, 10].includes(index)
                                  ? ""
                                  : index === 7
                                  ? "7."
                                  : index === 9
                                  ? "8."
                                  : index > 10
                                  ? `${index - 2}.`
                                  : `${index + 1}.`}
                              </span>{" "}
                              {field.title} :
                            </span>
                          </label>

                          <div className="w-full pl-2 border-b-2 border-dotted border-black -translate-y-1.5">
                            <input
                              {...register(field.id, {
                                required: `{${field.title} is required}`,
                              })}
                              className="w-full outline-none"
                              id={field.id}
                              type={
                                field.id.startsWith("date")
                                  ? "date"
                                  : field.id.startsWith("number")
                                  ? "number"
                                  : "text"
                              }
                            />
                            {errors[field.id] && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors[field.id]?.message}
                              </p>
                            )}
                          </div>
                        </div>
                        {[11, 12, 13, 14, 19].includes(index) && (
                          <input
                            className="w-[calc(100%-2rem)] outline-none ml-8 utline-none pl-2 border-b-2 border-dotted border-black -translate-y-1.5"
                            id={field.id}
                            type="text"
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
              <div className="text-center mt-32 mb-16">1</div>

              <div className="absolute top-15 right-1">
                <div className="w-[148px] h-[164px] border-2 bg-[#4472c4] border-[#192f56] flex flex-col items-center justify-center overflow-hidden relative">
                  {preview ? (
                    <Image
                      src={preview}
                      alt="Passport Preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                      <p className="text-center text-sm font-bold px-2">
                        Insert passport photograph.
                      </p>
                      <CiCamera size={24} />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    {...register("passport")}
                    onChange={handleFileChange}
                    className="absolute opacity-0 cursor-pointer w-full h-full"
                  />
                </div>
              </div>
            </section>
            <section
              id="section-2"
              className="w-full py-8 pl-8 border"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                borderColor: "#e5e7eb",
              }}
            >
              <div className="pr-40 space-y-6">
                <div>
                  <div className="text-[14px] font-medium pl-2">
                    {employeeFormFields.map((field, index) => {
                      if (index < 21) return null;
                      return (
                        <div
                          className={`${
                            [22, 23].includes(index)
                              ? "w-1/2 inline-flex"
                              : "flex"
                          } items-end py-2 gap-1`}
                          key={index}
                        >
                          <label
                            className={`${
                              index === 27 ? "pl-7" : "pl-2"
                            } shrink-0`}
                            htmlFor={field.id}
                          >
                            <span className="title">
                              <span className="pr-2">
                                {" "}
                                {index === 21
                                  ? "19."
                                  : index === 22
                                  ? "20."
                                  : index === 24
                                  ? "21."
                                  : index === 25
                                  ? "22."
                                  : index === 26
                                  ? "23."
                                  : ""}
                              </span>{" "}
                              {field.title} :
                            </span>
                          </label>

                          {index === 26 ? (
                            <div className="ml-8 flex items-center space-x-8">
                              {["Yes", "No"].map((opt) => {
                                const isSelected = selected === opt;
                                return (
                                  <label
                                    key={opt}
                                    className="flex items-center gap-2 cursor-pointer"
                                    onClick={() => setSelected(opt)}
                                  >
                                    {" "}
                                    <span className="title">{opt}</span>
                                    <div
                                      className={`w-6 h-6 flex items-center justify-center border rounded transition-colors
                                    ${
                                      isSelected
                                        ? "bg-green-600 border-green-600"
                                        : "border-gray-400"
                                    }`}
                                    >
                                      {isSelected && (
                                        <FaCheck className="text-white text-sm" />
                                      )}
                                    </div>
                                  </label>
                                );
                              })}{" "}
                            </div>
                          ) : (
                            <div className="w-full pl-2 border-b-2 border-dotted border-black -translate-y-1.5">
                              <input
                                {...register(field.id, {
                                  required: "Customer's Name is required",
                                })}
                                className="w-full outline-none"
                                id={field.id}
                                type="text"
                              />{" "}
                            </div>
                          )}
                          {errors[field.id] && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors[field.id]?.message}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <h2 className="font-bold uppercase text-[14px]">SECTION A</h2>
                  <p className="font-bold uppercase text-[14px]">
                    EMPLOYMENT STATUS (TICK AS APPROPRAITE)
                  </p>
                  {/* <span className="border px-1 text-xl">✓</span> */}

                  <div className="mt-2 flex items-center space-x-8">
                    {["FULL TIME", "PART TIME", "TEMPORARY"].map((opt) => {
                      const isSelected = selectedStatus === opt;
                      return (
                        <label
                          key={opt}
                          className="flex text-sm font-medium items-center gap-2 cursor-pointer"
                          onClick={() => setSelectedStatus(opt)}
                        >
                          {" "}
                          <span className="block w-1.5 h-1.5 bg-black rounded-full ml-1.5"></span>{" "}
                          <span className="title">{opt}</span>
                          <div
                            className={`w-6 h-6 flex items-center justify-center border rounded transition-colors
                          ${
                            isSelected
                              ? "bg-green-600 border-green-600"
                              : "border-gray-400"
                          }`}
                          >
                            {isSelected && (
                              <FaCheck className="text-white text-sm" />
                            )}
                          </div>
                        </label>
                      );
                    })}{" "}
                  </div>
                </div>
                <div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={addRow}
                      className="flex items-center gap-1 mb-1 px-2 py-1 border border-black text-xs font-semibold hover:bg-gray-100"
                    >
                      {/* <Plus size={14} /> */}{" "}
                      <span className="title">+ Add Row</span>
                    </button>
                  </div>
                  <div className="border border-black border-b-0 text-sm font-medium">
                    {/* Table headings */}
                    <div className="font-bold text-center flex w-full border-b border-black">
                      <p className="border-r border-black w-[7%] py-1.5">
                        <span className="title">S/N</span>
                      </p>
                      <p className="w-[40%] py-1.5 border-r border-black">
                        <span className="title">QUALIFICATIONS</span>
                      </p>
                      <p className="w-[40%] py-1.5 border-r border-black">
                        <span className="title">SCHOOL</span>
                      </p>
                      <p className="w-[13%] py-1.5">
                        <span className="title">YEAR</span>
                      </p>
                    </div>

                    {/* Dynamic rows */}
                    {rows.map((row, index) => (
                      <div
                        key={index}
                        className="flex w-full border-b border-black"
                      >
                        <label className="text-center border-r border-black w-[7%] py-2.5">
                          <span className="title">{index + 1}.</span>
                        </label>
                        <div className="w-[40%] py-2.5 pl-2 border-r border-black">
                          <input
                            className="w-full outline-none"
                            type="text"
                            value={row.qualification}
                            onChange={(e) => {
                              const newRows = [...rows];
                              newRows[index].qualification = e.target.value;
                              setRows(newRows);
                            }}
                          />{" "}
                        </div>
                        <div className="w-[40%] py-2.5 pl-2 border-r border-black">
                          <input
                            className="w-full outline-none"
                            type="text"
                            value={row.school}
                            onChange={(e) => {
                              const newRows = [...rows];
                              newRows[index].school = e.target.value;
                              setRows(newRows);
                            }}
                          />{" "}
                        </div>
                        <div className="w-[13%] py-2.5 pl-2">
                          <input
                            className="w-full outline-none"
                            type="text"
                            value={row.year}
                            onChange={(e) => {
                              const newRows = [...rows];
                              newRows[index].year = e.target.value;
                              setRows(newRows);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* <div className="border border-black border-b-0 text-sm font-medium">
                <div className="font-bold flex w-full border-b border-black">
                  <p className="border-r border-black w-[40%] py-1.5 pl-2">
                    <span className="title">MEANS OF IDENTIFICATION</span>
                  </p>
                  <p className="w-[10%] text-center py-1.5 border-r border-black ">
                    <span className="title">YES</span>
                  </p>
                  <p className="w-[10%] text-center py-1.5 border-r border-black">
                    <span className="title">NO</span>
                  </p>
                  <p className="w-[40%] py-1.5 pl-2">
                    <span className="title">DATE OF EXPIRY</span>
                  </p>
                </div>
                {[
                  "DRIVER’S LICENCE",
                  "INTERNATIONAL PASSPORT",
                  "NATIONAL IDENTITY",
                  "OTHERS (SPECIFY)",
                ].map((info, index) => (
                  <div
                    key={index}
                    className="flex w-full border-b border-black"
                  >
                    {" "}
                    <label
                      className="pl-2 border-r border-black w-[40%] py-2.5"
                      // htmlFor={info}
                    >
                      <span className="title">{info}.</span>
                    </label>
                    <div className="w-[10%] pl-2 py-2.5 border-r border-black">
                      <input className="w-full outline-none" type="text" />
                    </div>
                    <div className="w-[10%] pl-2 py-2.5 border-r border-black">
                      <input className="w-full outline-none" type="text" />
                    </div>
                    <div className="w-[40%] pl-2 py-2.5">
                      <input className="w-full outline-none" type="date" />
                    </div>
                  </div>
                ))}
              </div> */}
                <div className="border border-black border-b-0 text-sm font-medium">
                  {/* Header row */}
                  <div className="font-bold flex w-full border-b border-black">
                    <p className="border-r border-black w-[40%] py-1.5 pl-2">
                      <span className="title">MEANS OF IDENTIFICATION</span>
                    </p>
                    <p className="w-[10%] text-center py-1.5 border-r border-black">
                      <span className="title">YES</span>
                    </p>
                    <p className="w-[10%] text-center py-1.5 border-r border-black">
                      <span className="title">NO</span>
                    </p>
                    <p className="w-[40%] py-1.5 pl-2">
                      <span className="title">DATE OF EXPIRY</span>
                    </p>
                  </div>

                  {/* Body rows */}
                  {[
                    "DRIVER’S LICENCE",
                    "INTERNATIONAL PASSPORT",
                    "NATIONAL IDENTITY",
                    "OTHERS (SPECIFY)",
                  ].map((info) => (
                    <div
                      key={info}
                      className="flex w-full border-b border-black"
                    >
                      {/* Name column */}
                      <label className="pl-2 border-r border-black w-[40%] py-2.5">
                        <span className="title">{info}</span>
                      </label>

                      {/* YES checkmark */}
                      <div
                        className="w-[10%] flex items-center justify-center py-2.5 border-r border-black cursor-pointer"
                        onClick={() => toggleAnswer(info as IdRow, "yes")}
                      >
                        <div
                          className={`w-6 h-6 flex items-center justify-center border rounded 
                        ${
                          answers[info as IdRow] === "yes"
                            ? "bg-black border-black"
                            : "border-gray-400"
                        }
                      `}
                        >
                          {answers[info as IdRow] === "yes" && (
                            <FaCheck className="text-white text-sm" />
                          )}
                        </div>
                      </div>

                      {/* NO checkmark */}
                      <div
                        className="w-[10%] flex items-center justify-center py-2.5 border-r border-black cursor-pointer"
                        onClick={() => toggleAnswer(info as IdRow, "no")}
                      >
                        <div
                          className={`w-6 h-6 flex items-center justify-center border rounded
                        ${
                          answers[info as IdRow] === "no"
                            ? "bg-black border-black"
                            : "border-gray-400"
                        }
                      `}
                        >
                          {answers[info as IdRow] === "no" && (
                            <FaCheck className="text-white text-sm" />
                          )}
                        </div>
                      </div>

                      {/* Date input */}
                      <div className="w-[40%] pl-2 py-2.5">
                        <input
                          type="date"
                          className="w-full outline-none"
                          // optional: disable if neither yes nor no is selected
                          disabled={!answers[info as IdRow]}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center justify-between w-full text-[14px] font-medium pl-2">
                    {["EMPLOYEE SIGNATURE/DATE", "EMPLOYER SIGNATURE/DATE"].map(
                      (field, index) => (
                        <div
                          className={`${
                            index === 1 && "text-end"
                          } py-2 flex flex-col space-y-2`}
                          key={index}
                        >
                          <label className="shrink-0" htmlFor={field}>
                            <span className="title"> {field}</span>
                          </label>

                          <div className="pl-2 border-b-2 border-dotted border-black -translate-y-1.5">
                            <input
                              className="w-full outline-none"
                              id={field}
                              type="text"
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>{" "}
              </div>

              <div className="text-center mt-44 mb-16">2</div>
            </section>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-white rounded-lg transition-all font-bold uppercase mb-10"
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
      <Footer />
    </>
  );
}
