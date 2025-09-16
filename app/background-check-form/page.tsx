"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaUpload } from "react-icons/fa";
import { IoCloudUploadSharp } from "react-icons/io5";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import {
  loadFilesFromLocalStorage,
  saveFilesToLocalStorage,
} from "../../utils/browserStorage";
import { generatePDFFromSections } from "../../utils/pdfGenerator";

interface BackgroundCheckProps {
  fullName: string;
  contactNumbers: string;
  currentAddress: string;
  previousOrganizationName: string;
  dateEmployed: string;
  exitDate: string;
  supervisorLinManagerName: string;
  supervisorLinManagerContact: string;
  hrContact: string;
  hrEmailContact: string;
  document: FileList | null;
  firstInstitution: string;
  secondInstitution: string;
  thirdInstitution: string;
  firstCourse: string;
  secondCourse: string;
  thirdCourse: string;
  signature: string;
  date: string;
  matricNo: string;
}

type CertFile = File & { preview?: string };

export default function BackgroundCheck() {
  const [loading, setLoading] = useState(false);
  const [uploadedEmploymentLetter, setUploadedEmploymentLetter] =
    useState<File | null>(null);
  const [degrees, setDegrees] = useState<string[]>(["Degree 1"]);
  const [certFiles, setCertFiles] = useState<(CertFile | null)[]>([null]);

  const router = useRouter();

  const methods = useForm<BackgroundCheckProps>({
    defaultValues: {
      fullName: "",
      contactNumbers: "",
      currentAddress: "",
      previousOrganizationName: "",
      dateEmployed: "",
      exitDate: "",
      supervisorLinManagerName: "",
      supervisorLinManagerContact: "",
      hrContact: "",
      hrEmailContact: "",
      document: null,
      firstInstitution: "",
      secondInstitution: "",
      thirdInstitution: "",
      firstCourse: "",
      secondCourse: "",
      thirdCourse: "",
      signature: "",
      date: "",
      matricNo: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: BackgroundCheckProps): Promise<void> => {
    setLoading(true);
    console.log(certFiles);

    try {
      // Generate PDF from the three sections
      const sectionIds = ["section-1"];
      const pdf = await generatePDFFromSections(sectionIds);

      // Convert PDF to blob
      const pdfBlob = pdf.output("blob");

      const formData = new FormData();
      formData.append("file", pdfBlob, "background-check-form.pdf");
      formData.append("fullName", data.fullName);

      localStorage.setItem("employeeFullName", data.fullName);

      // Append empoloyemt letter
      if (uploadedEmploymentLetter) {
        formData.append("attachment_1", uploadedEmploymentLetter);
      }

      // ✅ Append certificate files as well
      certFiles.forEach((file, i) => {
        if (file) {
          // ✅ file is guaranteed to be a Blob (File) here
          formData.append(`attachment_cert_${i + 1}`, file);
        }
      });

      const existingFiles = loadFilesFromLocalStorage();

      // extract only the File objects
      const combinedFiles: File[] = [...existingFiles];
      formData.forEach((value) => {
        if (value instanceof File) {
          combinedFiles.push(value);
        }
      });

      await saveFilesToLocalStorage(combinedFiles);

      alert("Background Check Form Successfully Completed!");

      //update the number of forms completed
      const prev = JSON.parse(localStorage.getItem("completedForms") || "[]");
      prev.push("Background Check Form");
      localStorage.setItem("completedForms", JSON.stringify(prev));

      setUploadedEmploymentLetter(null);
      setCertFiles([]);
      router.push("/");
    } catch (error) {
      console.error("Error storing files:", error);
    } finally {
      setLoading(false);
    }
  };

  const addDegree = () => {
    if (degrees.length < 3) {
      const num = degrees.length + 1;
      setDegrees((prev) => [...prev, `Degree ${num}`]);
      setCertFiles((prev) => [...prev, null]);
    }
  };

  const removeDegree = (index: number) => {
    setDegrees((prev) => prev.filter((_, i) => i !== index));
    setCertFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const personalInfo: { id: keyof BackgroundCheckProps; title: string }[] = [
    { id: "fullName", title: "Full Name" },
    { id: "contactNumbers", title: "Contact Numbers" },
    { id: "currentAddress", title: "Current Address" },
  ];

  const qualifications: {
    id1: keyof BackgroundCheckProps;
    id2: keyof BackgroundCheckProps;
    title: string;
  }[] = [
    { id1: "firstInstitution", id2: "firstCourse", title: "Frist Degree" },
    { id1: "secondInstitution", id2: "secondCourse", title: "Second Degree" },
    { id1: "thirdInstitution", id2: "thirdCourse", title: "Third Degree" },
  ];

  const fields: {
    id: keyof BackgroundCheckProps;
    title: string;
    type: string;
    placeholder?: string;
  }[] = [
    {
      id: "previousOrganizationName",
      title: "Previous Organization Name",
      type: "text",
    },
    {
      id: "dateEmployed",
      title: "Date Employed",
      type: "date",
    },
    {
      id: "exitDate",
      title: "Exit Date",
      type: "date",
    },
    {
      id: "supervisorLinManagerName",
      title: "Supervisor / Lin Manager Name",
      type: "text",
    },
    {
      id: "supervisorLinManagerContact",
      title: "Supervisor / Lin Manager Contact Number & Email",
      type: "text",
    },
    {
      id: "hrContact",
      title: "HR Contact (Name & Designation)",
      type: "text",
    },
    {
      id: "hrEmailContact",
      title: "HR Email Address & Contact Number",
      type: "text",
    },
    {
      id: "document",
      title: "Document",
      placeholder:
        "Submit the front page of your previous employment offer letter ",
      type: "file",
    },
  ];

  return (
    <>
      <Header />
      <div
        className="flex items-center justify-center min-h-screen px-6 pt-10 pb-16"
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
              className="w-full py-8 px-8 border space-y-6"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                borderColor: "#e5e7eb",
              }}
            >
              <div className="flex justify-end mb-10 mr-16">
                <Image
                  src="/starsightLogo1.png"
                  alt="starsight logo"
                  width="117"
                  height="42"
                />
              </div>
              <h2 className="text-[1.3rem] font-bold text-center uppercase underline">
                Background Check Form
              </h2>

              <p className="font-medium">
                Kindly provide the information below to help us carry out basic
                background check.
              </p>

              {/* Personal Information */}
              <div>
                <h2 className="font-bold uppercase text-[14px]">
                  <span className="title">Personal Information</span>
                </h2>
                <div className="border border-black border-b-0 text-sm font-medium">
                  {personalInfo.map((info, index) => (
                    <div
                      key={index}
                      className="flex w-full items-center border-b border-black"
                    >
                      {" "}
                      <label
                        className=" pl-2 border-r border-black w-[22%] py-0.5"
                        htmlFor={info.id}
                      >
                        <span className="title">{info.title}</span>
                      </label>
                      <div className="relative w-[78%] pl-2 py-0.5">
                        <input
                          {...register(info.id, {
                            required: `${info.title} is required`,
                          })}
                          className="w-full outline-none"
                          id={info.id}
                          type="text"
                        />

                        {errors[info.id] && (
                          <p className="absolute top-1 left-1 text-red-500 text-xs">
                            {errors[info.id]?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PREVIOUS EMPLOYER DETAILS */}
              <div className="pb-4">
                <h2 className="font-bold uppercase text-[14px]">
                  <span className="title">PREVIOUS EMPLOYER DETAILS</span>
                </h2>
                <div className="border border-black border-b-0 text-sm font-medium">
                  {fields.map((info, index) => (
                    <div
                      key={index}
                      className="relative flex w-full items-center border-b border-black"
                    >
                      {" "}
                      <label
                        className="text-center px-2.5 border-r border-black w-[18%] py-1.5"
                        htmlFor={info.id}
                      >
                        <span className="title">{info.title}</span>
                      </label>
                      <div className="relative w-[82%] pl-2 py-1.5">
                        {/* <input
                        {...register(info?.id, {
                          required: `${info.title} is required`,
                        })}
                        className="w-full outline-none"
                        id={info.id}
                        type={info.type}
                        
                      /> */}
                        <input
                          {...register(info?.id, {
                            required:
                              index < 5 ? `${info.title} is required` : false,
                          })}
                          className="w-full outline-none"
                          id={info.id}
                          type={info.type}
                          {...(info.type === "file"
                            ? {
                                onChange: (
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  const file = e.target.files?.[0] || null;
                                  setUploadedEmploymentLetter(file);
                                },
                              }
                            : {})}
                        />

                        {errors[info.id] && (
                          <p className="absolute -top-1 left-1 text-red-500 text-xs">
                            {errors[info.id]?.message}
                          </p>
                        )}
                        {info?.placeholder && (
                          <span className="absolute left-2 -bottom-4 text-xs font-semibold uppercase">
                            Upload the front page of your previous employment
                            offer letter in the document field
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* EDUCATIONAL QUALIFICATION DETAILS */}
              <div>
                <h2 className="font-bold uppercase text-[14px]">
                  <span className="title">
                    EDUCATIONAL QUALIFICATION DETAILS
                  </span>
                </h2>
                <div className="border border-black border-b-0 text-sm font-medium">
                  <div className="font-bold flex w-full border-b border-black">
                    <p className=" pl-2 border-r border-black w-[18%] py-0.5"></p>
                    <p className="w-[50%] outline-none pl-2 py-0.5 border-r border-black ">
                      <span className="title">Institutions</span>
                    </p>
                    <p className="w-[32%] outline-none pl-2 py-0.5">
                      <span className="title">Course Studied</span>
                    </p>
                  </div>
                  {qualifications.map((info, index) => (
                    <div
                      key={index}
                      className="flex w-full items-center border-b border-black"
                    >
                      {" "}
                      <label
                        className=" pl-2 border-r border-black w-[18%] py-2.5"
                        htmlFor={info.id1}
                      >
                        <span className="title">{info.title}</span>
                      </label>
                      <>
                        <div className="relative w-[50%] pl-2 py-2.5 border-r border-black">
                          <input
                            {...register(info.id1, {
                              required:
                                index < 1
                                  ? `${info.title} institution is required`
                                  : false,
                            })}
                            className="w-full outline-none"
                            id={info.id1}
                            type="text"
                          />

                          {errors[info.id1] && (
                            <p className="absolute top-1 left-1 text-red-500 text-xs">
                              {errors[info.id1]?.message}
                            </p>
                          )}
                        </div>
                      </>
                      <>
                        <div className="relative w-[32%] pl-2 py-2.5">
                          <input
                            {...register(info.id2, {
                              required:
                                index < 1
                                  ? `${info.title} course is required`
                                  : false,
                            })}
                            className="w-full outline-none"
                            id={info.id1}
                            type="text"
                          />
                          {errors[info.id2] && (
                            <p className="absolute top-1 left-1 text-red-500 text-xs">
                              {errors[info.id2]?.message}
                            </p>
                          )}{" "}
                        </div>
                      </>
                    </div>
                  ))}
                  <div className="font-bold flex w-full border-b border-black">
                    <p className=" pl-2 border-r border-black w-[18%] py-0.5">
                      <span className="title">Certifcates</span>
                    </p>
                    <p className="w-[50%] outline-none pl-2 py-0.5 border-r border-black ">
                      <span className="title">
                        Kindly attached certificates as stated above
                      </span>
                    </p>
                    <div className="relative flex items-center font-semibold w-[32%] outline-none pl-2 py-0.5">
                      <span className="title shrink-0">Matrix No:</span>
                      <div className="pl-2">
                        <input
                          {...register("matricNo")}
                          className="w-full outline-none"
                          id="matricNo"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* signature */}
              <div className="text-sm font-medium mb-10">
                {(["signature", "date"] as const).map((info, index) => (
                  <div key={index} className="flex w-full">
                    {" "}
                    <label className="px-1 py-1" htmlFor={info}>
                      <span className="title">
                        {info === "date" ? "Date" : "Signature"}:
                      </span>
                    </label>
                    <div className="pl-2 border-b border-black mb-4">
                      <input
                        {...register(info, {
                          required: `${info} is required`,
                        })}
                        className="outline-none"
                        id={info}
                        type={info === "date" ? "date" : "text"}
                      />
                    </div>
                    {errors[info] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[info]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* <section
            className="w-full py-8 px-8 border space-y-6 rounded-lg"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              borderColor: "#e5e7eb",
            }}
          >
            <h2 className="text-xl font-semibold text-gray-800 uppercase">
              Upload Certificates
            </h2>

            <div className="grid gap-6">
              {qualifications.map((cert, index) => (
                <div key={index} className="space-y-2">
                  <small className="font-semibold">
                    {cert.title} <span className="text-red-500">*</span>
                  </small>

                  <input
                    type="file"
                    id={`certificate-${index}`}
                    className="hidden"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const withPreview = Object.assign(file, {
                          preview: URL.createObjectURL(file),
                        });

                        setCertFiles((prev) => {
                          const updated = [...prev];
                          updated[index] = withPreview;
                          return updated;
                        });
                      }
                    }}
                  />

                  {certFiles[index] ? (
                    <div className="flex p-4 flex-col md:flex-row md:items-end gap-6">
                   
                      <div
                        className="h-[20rem] w-full md:w-64 md:aspect-square rounded-lg bg-contain bg-no-repeat bg-center border  border-[#333232]"
                        style={{
                          backgroundImage: certFiles[index]?.type.startsWith(
                            "image/"
                          )
                            ? `url(${certFiles[index]?.preview})`
                            : "none",
                        }}
                      >
                        {!certFiles[index]?.type.startsWith("image/") && (
                          <div className="flex items-center justify-center h-full text-gray-400">
                            📄 {certFiles[index]?.name}
                          </div>
                        )}
                      </div>

                      <div className="grid gap-4 md:gap-8">
                        <div className="grid gap-1">
                          <p className="text-black/60">
                            <span className="text-baseblue">Name: </span>
                            {certFiles[index]?.name}
                          </p>
                          <p className="text-black/60">
                            <span className="text-baseblue">Size: </span>
                            {(certFiles[index]?.size / (1024 * 1024)).toFixed(
                              2
                            )}{" "}
                            MB
                          </p>
                        </div>

                        <label
                          className="bg-baseblue justify-center flex gap-4 w-full md:w-fit text-black rounded-md py-2 cursor-pointer"
                          htmlFor={`certificate-${index}`}
                        >
                          Change File{" "}
                          <span className="">
                            <FaUpload />
                          </span>
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label
                        htmlFor={`certificate-${index}`}
                        className="grid place-content-center bg-[#fff] h-[182px] cursor-pointer rounded-sm text-6xl justify-center transition-all duration-200 border  border-[#333232]"
                      >
                        <IoCloudUploadSharp className="mx-auto text-baseblue text-[#333232]" />
                        <p className="text-sm text-center">
                          Click to upload file
                        </p>
                        <p className="text-sm text-center">
                          maximum size{" "}
                          <span className="text-baseblue">2MB</span>
                        </p>
                      </label>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section> */}

            <section
              className="w-full py-8 px-8 border space-y-6 rounded-lg"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                borderColor: "#e5e7eb",
              }}
            >
              <h2 className="text-xl font-semibold text-gray-800 uppercase">
                Upload Certificates
              </h2>

              <div className="grid gap-6">
                {degrees.map((title, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <small className="font-semibold">
                        {title} <span className="text-red-500">*</span>
                      </small>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeDegree(index)}
                          className="
                        inline-flex items-center justify-center
                        px-3 py-1.5
                        text-sm font-medium
                        text-white
                        bg-red-600
                        rounded-md
                        shadow-sm
                        hover:bg-red-700
                        active:scale-95
                        transition
                      "
                        >
                          Delete
                        </button>
                      )}
                    </div>

                    <input
                      type="file"
                      id={`certificate-${index}`}
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const withPreview = Object.assign(file, {
                            preview: URL.createObjectURL(file),
                          });
                          setCertFiles((prev) => {
                            const updated = [...prev];
                            updated[index] = withPreview;
                            return updated;
                          });
                        }
                      }}
                    />

                    {certFiles[index] ? (
                      <div className="flex p-4 flex-col md:flex-row md:items-end gap-6">
                        <div
                          className="h-[20rem] w-full md:w-64 rounded-lg bg-contain bg-no-repeat bg-center border border-[#333232]"
                          style={{
                            backgroundImage: certFiles[index]?.type.startsWith(
                              "image/"
                            )
                              ? `url(${certFiles[index]?.preview})`
                              : "none",
                          }}
                        >
                          {!certFiles[index]?.type.startsWith("image/") && (
                            <div className="flex items-center justify-center h-full text-gray-400">
                              📄 {certFiles[index]?.name}
                            </div>
                          )}
                        </div>

                        <div className="grid gap-4 md:gap-8">
                          <div className="grid gap-1">
                            <p className="text-black/60">
                              <span className="text-baseblue">Name: </span>
                              {certFiles[index]?.name}
                            </p>
                            <p className="text-black/60">
                              <span className="text-baseblue">Size: </span>
                              {(
                                (certFiles[index]?.size ?? 0) /
                                (1024 * 1024)
                              ).toFixed(2)}{" "}
                              MB
                            </p>
                          </div>

                          <label
                            className="bg-baseblue flex justify-center gap-4 w-full md:w-fit text-[#333232] rounded-md py-2 cursor-pointer"
                            htmlFor={`certificate-${index}`}
                          >
                            Change File <FaUpload />
                          </label>
                        </div>
                      </div>
                    ) : (
                      <label
                        htmlFor={`certificate-${index}`}
                        className="grid place-content-center bg-[#fff] h-[182px] cursor-pointer rounded-sm text-6xl border border-[#333232]"
                      >
                        <IoCloudUploadSharp className="mx-auto text-[#333232]" />
                        <p className="text-sm text-center">
                          Click to upload file
                        </p>
                        <p className="text-sm text-center">
                          maximum size{" "}
                          <span className="text-baseblue">2MB</span>
                        </p>
                      </label>
                    )}
                  </div>
                ))}
              </div>

              {degrees.length < 3 && (
                <button
                  type="button"
                  onClick={addDegree}
                  className="mt-4 px-4 py-2 bg-[#333232] text-white rounded-md hover:bg-[#444343] transition"
                >
                  + Add Degree
                </button>
              )}
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
      <Footer />
    </>
  );
}
