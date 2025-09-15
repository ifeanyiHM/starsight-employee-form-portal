"use client";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { generatePDFFromSections } from "../../utils/pdfGenerator";

export interface EmployeeAcknowlegementProp {
  Name: string;
  Designation: string;
  placeOfWork: string;
  Supervisor: string;
  signed: string;
  date: string;
}

export default function EmployeeAcknowlegement() {
  const [loading, setLoading] = useState(false);

  const methods = useForm<EmployeeAcknowlegementProp>({
    defaultValues: {
      Name: "",
      Designation: "",
      placeOfWork: "",
      Supervisor: "",
      signed: "",
      date: "",
    },
  });

  // ✅ Destructure only what you need from methods
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    // control,
    // setValue,
    // watch,
  } = methods;

  const onSubmit = async (data: EmployeeAcknowlegementProp): Promise<void> => {
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
      formData.append("email", `Employee Name: ${data.Name}`);

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

            // ref={formRef}
          >
            <section
              id="section-1"
              className="w-full py-8 px-20 border pt-28"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                borderColor: "#e5e7eb",
              }}
            >
              <h1 className="font-bold text-sm">
                CONFIRMATION OF RECEIPT OF EMPLOYEE HANDBOOK FORM
              </h1>
              <p className="text-sm mb-8 mt-16">
                Starsight Power Utility Limited
              </p>
              <div className="space-y-6">
                <div className="border border-black border-b-0 text-sm font-medium">
                  {(
                    [
                      "Name",
                      "Designation",
                      "placeOfWork",
                      "Supervisor",
                    ] as const
                  ).map((info, index) => (
                    <div
                      key={index}
                      className="flex w-full border-b border-black"
                    >
                      {" "}
                      <label
                        className="font-bold pl-2 border-r border-black w-[25%] py-6.5"
                        htmlFor={info}
                      >
                        <span className="title">
                          {info === "placeOfWork" ? "Place of Work" : info}:
                        </span>
                      </label>
                      <div className="w-[75%] pl-2 py-6.5">
                        <input
                          {...register(info, {
                            required: `${info} is required`,
                          })}
                          className="outline-none"
                          id={info}
                          type="text"
                        />
                        {errors[info] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors[info]?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium pt-4">
                  I confirm I have received a copy of the Starsight Employee
                  Handbook and that I have read this and understood the
                  contents. <br /> <br /> <br />I also confirm that I have
                  sought clarification from my supervisor on any issues outlined
                  in the Handbook which I am not clear about.
                </p>
                <div>
                  <div className="text-[14px] font-medium space-y-8 pt-8">
                    {(["signed", "date"] as const).map((field, index) => (
                      <div
                        className="w-1/2 flex items-end py-2 gap-1"
                        key={index}
                      >
                        <label className="shrink-0" htmlFor={field}>
                          <span className="title pr-2">{field} :</span>
                        </label>

                        <div className="w-full pl-2 border-b border-black -translate-y-1.5">
                          <input
                            {...register(field, {
                              required: `${field} is required`,
                            })}
                            className="outline-none"
                            id={field}
                            type={field === "date" ? "date" : "text"}
                          />

                          {errors[field] && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors[field]?.message}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-sm font-medium mt-14 mb-40">
                  Please return this form duly completed and signed to your
                  supervisor.
                </p>
              </div>
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
