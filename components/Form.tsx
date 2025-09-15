"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { generatePDFFromSections } from "../utils/pdfGenerator";
import LinedTextarea from "./LinedTextarea";

type IncidentFormData = {
  siteId: string;
  customerName: string;
  siteAddress: string;
  incidentDate: string;
  incidentTime: string;
  reportedDate: string;
  reportedTime: string;
  incidentTypes: string[];
  incidentDetails: string;
  locationType: string;
  taskDetails: string;
  directCause: string;
  incidentAnalysis: string[];
  contributingCause: string[];
  contributingDetails: string;
  actionsTaken: string[];
  immediateAction: string;
  immediateActionWho: string;
  immediateActionWhen: string;
  longTermAction: string;
  longTermActionWho: string;
  longTermActionWhen: string;
  outcome: string;
  lostHours: string;
  completedByName: string;
  completedBySignature: string;
  completedByPosition: string;
  completedByDate: string;
  supervisorComments: string;
  supervisorName: string;
  supervisorSignature: string;
  supervisorDate: string;
  managerComments: string;
  managerName: string;
  managerSignature: string;
  managerDate: string;
  feedbackProvided: string;
  feedbackName: string;
  feedbackSignature: string;
  feedbackPosition: string;
  feedbackDate: string;
};

export default function Form() {
  const [loading, setLoading] = useState(false);

  const methods = useForm<IncidentFormData>({
    defaultValues: {
      siteId: "",
      customerName: "",
      siteAddress: "",
      incidentDate: "",
      incidentTime: "",
      reportedDate: "",
      reportedTime: "",
      incidentTypes: [],
      incidentDetails: "",
      locationType: "",
      taskDetails: "",
      directCause: "",
      incidentAnalysis: [],
      contributingCause: [],
      contributingDetails: "",
      actionsTaken: [],
      immediateAction: "",
      immediateActionWho: "",
      immediateActionWhen: "",
      longTermAction: "",
      longTermActionWho: "",
      longTermActionWhen: "",
      outcome: "",
      lostHours: "",
      completedByName: "",
      completedBySignature: "",
      completedByPosition: "",
      completedByDate: "",
      supervisorComments: "",
      supervisorName: "",
      supervisorSignature: "",
      supervisorDate: "",
      managerComments: "",
      managerName: "",
      managerSignature: "",
      managerDate: "",
      feedbackProvided: "",
      feedbackName: "",
      feedbackSignature: "",
      feedbackPosition: "",
      feedbackDate: "",
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

  // const formRef = useRef<HTMLFormElement | null>(null);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const siteId = watch("siteId") || "";

  const handleAutoFocus = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    if (/^[a-zA-Z0-9]?$/.test(value)) {
      // Get current values as array of characters
      const currentValues = siteId.split("").concat(Array(10).fill(""));
      currentValues[index] = value.toUpperCase();

      // Update the combined SITE ID value
      setValue("siteId", currentValues.join(""));

      // Move focus to next input automatically
      if (value && index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const onSubmit = async (data: IncidentFormData): Promise<void> => {
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
      formData.append(
        "email",
        `Site ID: ${data.siteId} Customer Name: ${data.customerName}`
      );

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

  const incidentOptions = [
    "Environmental",
    "Personal Injury",
    "Plant",
    "Property",
    "Subcontractor Property",
    "Subcontractor Plant",
    "Subcontractor Environment",
  ];

  const actionTaken = [
    "Equip / Mech Modifications",
    "Change to Work Procedures",
    "Change to Work Environment",
    "Equip / Mach Maintenance",
    "Other Job Redesign",
    "Other Prevent Action",
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
            className="w-full py-8 px-20 border space-y-6"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              borderColor: "#e5e7eb",
            }}
          >
            <div className="flex justify-center m-0">
              <Image
                src="/starsightLogo.png"
                alt="starsight logo"
                width="201"
                height="67"
              />
            </div>
            <h2
              className="text-2xl font-bold text-center uppercase"
              style={{ color: "#1f2937" }}
            >
              Incident Report Form
            </h2>

            {/* site id */}
            <div className="flex justify-end">
              {/* Left label cell */}
              <span className="h-8 flex items-center pl-2 pr-3 text-center text-sm border border-gray-400 bg-gray-200 font-semibold">
                SITE ID
              </span>

              {/* 10 input boxes */}
              {Array.from({ length: 10 }).map((_, index) => (
                <Controller
                  key={index}
                  name="siteId"
                  control={control}
                  render={() => (
                    <input
                      type="text"
                      maxLength={1}
                      ref={(el): void => {
                        inputsRef.current[index] = el;
                      }}
                      value={siteId[index] || ""}
                      onChange={(e) => handleAutoFocus(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-8 h-8 text-center text-xs border-y border-r border-black bg-[yellow] focus:outline-none"
                    />
                  )}
                />
              ))}
            </div>

            <div className="border-y border-black">
              {/* customer's name */}
              <div className="flex">
                {/* Left label cell */}
                <span className="shrink-0 text-start w-[25%] pl-3 py-1 text-sm border-x border-b border-black bg-gray-200">
                  Customer&apos;s Name
                </span>

                <input
                  {...register("customerName", {
                    required: " Customer's Name is required",
                  })}
                  className="w-full px-3 text-sm border-r border-b border-black bg-[yellow] focus:ring-2"
                />
                {errors.customerName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.customerName.message}
                  </p>
                )}
              </div>

              {/* siteAddress */}
              <div className="flex">
                {/* Left label cell */}
                <span className="shrink-0 text-start w-[25%] pl-3 py-1 text-sm border-x border-black bg-gray-200">
                  Site Name / Address
                </span>

                <input
                  {...register("siteAddress", {
                    required: " Site Address is required",
                  })}
                  className="w-full px-3 text-sm border-r border-black bg-[yellow] focus:ring-2"
                />
                {errors.siteAddress && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.siteAddress.message}
                  </p>
                )}
              </div>
            </div>

            <div className="">
              <div className="flex">
                <div className="w-[65%] border-y border-black">
                  {/* incident date */}
                  <div className="flex">
                    {/* Left label cell */}
                    <span className="shrink-0 w-[45.8%] text-start px-3 py-1 text-sm border-x border-b border-black bg-gray-200 font-semibold">
                      Incident Date*
                    </span>

                    <input
                      type="date"
                      {...register("incidentDate", {
                        required: "Incident Date is required",
                      })}
                      className="w-full px-3 text-sm border-b border-black bg-[yellow] focus:ring-2"
                    />
                    {errors.incidentDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.incidentDate.message}
                      </p>
                    )}
                  </div>

                  {/* report date */}
                  <div className="flex">
                    {/* Left label cell */}
                    <span className="shrink-0 w-[45.8%] text-start pl-3 py-1 text-sm border-x border-black bg-gray-200 font-semibold">
                      Report Date
                    </span>

                    <input
                      type="date"
                      {...register("reportedDate")}
                      className="w-full px-3 text-sm bg-[yellow] focus:ring-2"
                    />
                    {errors.reportedDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.reportedDate.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-[35%] border-y border-black">
                  {/* incident time */}
                  <div className="flex">
                    {/* Left label cell */}
                    <span className="shrink-0 text-start pl-2 pr-3 py-1 text-sm border-x border-b border-black bg-gray-200 font-semibold">
                      (3)Time
                    </span>

                    <input
                      {...register("incidentTime", {
                        required: "Incident Time is required",
                      })}
                      className="w-full px-3 text-sm border-r border-b border-black bg-[yellow] focus:ring-2"
                    />
                    {errors.incidentTime && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.incidentTime.message}
                      </p>
                    )}
                  </div>

                  {/* reported time */}
                  <div className="flex">
                    {/* Left label cell */}
                    <span className="shrink-0 text-start pl-2 pr-3 py-1 text-sm border-x border-black bg-gray-200 font-semibold">
                      (5)Time
                    </span>

                    <input
                      {...register("reportedTime")}
                      className="w-full px-3 text-sm border-r border-black bg-[yellow] focus:ring-2"
                    />
                    {errors.reportedTime && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.reportedTime.message}
                      </p>
                    )}
                  </div>
                </div>{" "}
              </div>

              {/* Incident types */}
              <div className="flex">
                {/* Left label cell */}
                <div className="bg-gray-200 w-[29.8%] px-3 border border-black border-t-0">
                  <h2 className="font-bold text-[0.9rem] mb-2 leading-none mt-1">
                    Incident Types{" "}
                    <span className="font-normal text-xs italic">
                      (please tick relevant type and complete details area)
                    </span>
                  </h2>

                  <div className="mb-2">
                    <Controller
                      control={control}
                      name="incidentTypes"
                      // rules={{
                      //   required: "Please select at least one incident type",
                      // }}
                      render={({ field }) => (
                        <div className="space-y-1">
                          {incidentOptions.map((option, index) => (
                            <label
                              key={index}
                              className={`${
                                index === incidentOptions.length - 1
                                  ? "font-medium"
                                  : "font-semibold"
                              }  flex text-xs items-center space-x-2 cursor-pointer`}
                            >
                              <input
                                type="checkbox"
                                value={option}
                                checked={field.value.includes(option)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    field.onChange([...field.value, option]);
                                  } else {
                                    field.onChange(
                                      field.value.filter(
                                        (item: string) => item !== option
                                      )
                                    );
                                  }
                                }}
                                className="w-3 h-3 border border-black text-blue-600 appearance-none checked:appearance-auto checked:bg-transparent focus:ring-blue-500"
                              />
                              <span className="text-gray-700">{option}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    />
                  </div>
                </div>

                <LinedTextarea
                  id="incidentDetails"
                  register={register("incidentDetails", {
                    required: "incidentDetails are required",
                  })}
                  placeholder="Click to enter details..."
                  maxLength={430}
                  lineCount={3}
                  error={errors.incidentDetails}
                  className="w-[70.2%] bg-[yellow] border-r border-b border-black"
                />
              </div>

              {/* location type */}
              <div className="flex">
                {/* Left label cell */}
                <div className="bg-gray-200 w-[29.8%] px-3 border border-black border-t-0">
                  <h2 className="font-bold text-[0.9rem] leading-none mt-1">
                    Location type*
                  </h2>

                  <hr className="mt-11 mb-16" />
                </div>

                <LinedTextarea
                  id="locationType"
                  register={register("locationType", {
                    required: "locationType details are required",
                  })}
                  placeholder="Click to enter details..."
                  maxLength={240}
                  lineCount={3}
                  error={errors.locationType}
                  className="w-[70.2%]  bg-[yellow] border-r border-b border-black"
                />
              </div>

              {/* task details */}
              <div className="flex">
                {/* Left label cell */}
                <div className="bg-gray-200 w-[29.8%] px-3 border border-black border-t-0">
                  <h2 className="font-bold text-[0.9rem] mb-16 leading-none mt-1">
                    Task Undertaken*
                    <span className="font-normal text-xs italic">
                      (please give full details of task undertaken at time of
                      incident)
                    </span>
                  </h2>
                </div>

                <LinedTextarea
                  id="taskDetails"
                  register={register("taskDetails", {
                    required: "taskDetails details are required",
                  })}
                  placeholder="Click to enter details..."
                  maxLength={180}
                  lineCount={2}
                  error={errors.taskDetails}
                  className="w-[70.2%]  bg-[yellow] border-r border-b border-black"
                  labelClass="mb-4"
                />
              </div>

              {/* direct cause */}
              <div className="flex">
                {/* Left label cell */}
                <div className="bg-gray-200 w-[29.8%] px-3 border border-black border-t-0">
                  <h2 className="font-bold text-[0.9rem] leading-none mt-1">
                    Direct Cause
                  </h2>

                  <hr className="mt-11 mb-16" />
                </div>

                <LinedTextarea
                  id="directCause"
                  register={register("directCause", {
                    required: "directCause details are required",
                  })}
                  placeholder="Click to enter details..."
                  maxLength={230}
                  lineCount={3}
                  error={errors.directCause}
                  className="w-[70.2%] bg-[yellow] border-r border-b border-black"
                />
              </div>
            </div>

            {/* footer image */}
            <div>
              <Image
                src="/analysis.png"
                alt="incident analysis"
                width="604"
                height="219"
              />
            </div>

            {/* footer pagination */}
            <div className="relative text-xs">
              <p className="absolute -translate-y-1/2 top-1/2 left-0">
                Starsight Limited
              </p>
              <div className="italic text-center">
                <p>Page 1</p>
              </div>
            </div>
          </section>

          <section
            id="section-2"
            className="w-full py-8 px-20 border space-y-6"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              borderColor: "#e5e7eb",
            }}
          >
            <div className="flex justify-center m-0">
              <Image
                src="/starsightLogo.png"
                alt="starsight logo"
                width="201"
                height="67"
              />
            </div>
            <h2
              className="text-2xl font-bold text-center uppercase"
              style={{ color: "#1f2937" }}
            >
              Incident Report Form
            </h2>

            <div className="">
              {/* Contributing cause */}
              <div className="flex border-t border-black">
                {/* Left label cell */}
                <div className="bg-gray-200 w-[29.8%] px-3 border-x border-black">
                  <h2 className="font-bold text-[0.85rem] mb-2 leading-none mt-1">
                    Contributing Cause
                    <span className="font-normal text-[0.7rem] italic">
                      (please tick relevant box and complete details area)
                    </span>
                  </h2>

                  {/* Checkbox Group */}
                  <div className="mb-1">
                    <Controller
                      control={control}
                      name="contributingCause"
                      // rules={{
                      //   required: "Please select at least one contributing cause",
                      // }}
                      render={({ field }) => (
                        <div className="space-y-[0.1rem]">
                          {[
                            "Environment",
                            "People",
                            "Plant & Equipment",
                            "System",
                          ].map((option, index) => (
                            <label
                              key={index}
                              className="font-semibold flex items-center text-xs space-x-2 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                value={option}
                                checked={field.value.includes(option)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    field.onChange([...field.value, option]);
                                  } else {
                                    field.onChange(
                                      field.value.filter(
                                        (item: string) => item !== option
                                      )
                                    );
                                  }
                                }}
                                className="w-2.5 h-2.5 border border-black text-blue-600 appearance-none checked:appearance-auto checked:bg-transparent focus:ring-blue-500"
                              />
                              <span className="text-gray-700">{option}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    />
                  </div>
                </div>

                <LinedTextarea
                  id="contributingDetails"
                  register={register("contributingDetails", {
                    required: "contributingDetails details are required",
                  })}
                  placeholder="Click to enter details..."
                  maxLength={230}
                  lineCount={3}
                  error={errors.contributingDetails}
                  className="w-[70.2%] border-r border-black"
                />
              </div>

              {/* action taken */}
              <div className="flex">
                <div className="flex w-[78%] border-y border-black">
                  <div className=" bg-gray-200 w-[38.2%] pl-3 border-x border-black pb-20">
                    <h2 className="font-bold text-[0.85rem] mb-2 leading-none mt-1">
                      Action Taken
                      <span className="font-normal text-[0.7rem] italic">
                        (please tick relevant box and complete details area)
                      </span>
                    </h2>

                    {/* Checkbox Group */}
                    <div className="mb-2">
                      <Controller
                        control={control}
                        name="actionsTaken"
                        // rules={{
                        //   required: "Please select at least one action taken",
                        // }}
                        render={({ field }) => (
                          <div className="space-y-[0.3rem]">
                            {actionTaken.map((option, index) => (
                              <label
                                key={index}
                                className={`${
                                  index === actionTaken.length - 4
                                    ? "font-medium"
                                    : "font-semibold"
                                } flex items-center text-[11.5px] space-x-2 cursor-pointer`}
                              >
                                <input
                                  type="checkbox"
                                  value={option}
                                  checked={field.value.includes(option)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      field.onChange([...field.value, option]);
                                    } else {
                                      field.onChange(
                                        field.value.filter(
                                          (item: string) => item !== option
                                        )
                                      );
                                    }
                                  }}
                                  className="w-2.5 h-2.5 border border-black text-blue-600 appearance-none checked:appearance-auto checked:bg-transparent focus:ring-blue-500"
                                />
                                <span className="text-gray-700">{option}</span>
                              </label>
                            ))}
                          </div>
                        )}
                      />
                    </div>
                  </div>

                  <div className="w-[61.8%] h-full border-r border-black flex flex-col">
                    {/* Immediately to address DIRECT CAUSES*: */}
                    <LinedTextarea
                      id="immediateAction"
                      register={register("immediateAction", {
                        required: "immediateAction details are required",
                      })}
                      placeholder="Click to enter details..."
                      maxLength={200}
                      lineCount={4}
                      error={errors.immediateAction}
                      className="w-full h-[143px] mt-1 border-b border-black"
                      labelClass="text-xs"
                      label="Immediately to address DIRECT CAUSES*:"
                    />

                    {/* (Long Term) to address CONTRIBUTING CAUSES*: */}

                    <LinedTextarea
                      id="longTermAction"
                      register={register("longTermAction", {
                        required: "longTermAction details are required",
                      })}
                      placeholder="Click to enter details..."
                      maxLength={160}
                      lineCount={3}
                      error={errors.longTermAction}
                      className="w-full h-[117px] mt-1.5"
                      labelClass="text-xs"
                      label="(Long Term) to address CONTRIBUTING CAUSES*:"
                    />
                  </div>
                </div>
                <div className="w-[22%] h-full border-y border-black flex flex-col">
                  <div className="w-full h-[147px] flex">
                    <LinedTextarea
                      id="immediateActionWho"
                      register={register("immediateActionWho")}
                      maxLength={30}
                      lineCount={4}
                      className="w-[50%] h-full border-r border-b border-black"
                      labelClass="bg-gray-200 text-xs pt-1"
                      label="By Whom"
                    />

                    <LinedTextarea
                      id="immediateActionWhen"
                      register={register("immediateActionWhen")}
                      maxLength={30}
                      lineCount={4}
                      className="w-[50%] h-full border-r border-b border-black"
                      labelClass="bg-gray-200 text-xs pt-1"
                      label="By When"
                    />
                  </div>

                  <div className="w-full h-[125px] flex">
                    <LinedTextarea
                      id="longTermActionWho"
                      register={register("longTermActionWho")}
                      maxLength={24}
                      lineCount={3}
                      className="w-[50%] h-full border-r border-black"
                      labelClass="pt-1.5 bg-gray-200 text-xs"
                      label="By Whom"
                    />

                    <LinedTextarea
                      id="longTermActionWhen"
                      register={register("longTermActionWhen")}
                      maxLength={24}
                      lineCount={3}
                      className="w-[50%] h-full border-r border-black"
                      labelClass="pt-1.5 bg-gray-200 text-xs"
                      label="By When"
                    />
                  </div>
                </div>
              </div>

              {/* Outcome */}
              <div className="flex">
                {/* Left label cell */}
                <div className="bg-gray-200 w-[29.8%] px-3 border border-black border-t-0">
                  <h2 className="font-bold text-[0.9rem] leading-none mt-1  mb-46">
                    Outcome
                  </h2>
                </div>

                <LinedTextarea
                  id="outcome"
                  register={register("outcome", {
                    required: "Details are required",
                  })}
                  placeholder="Click to enter details..."
                  maxLength={420}
                  lineCount={6}
                  lineHeight={25}
                  error={errors.outcome}
                  className="w-[70.2%] border-r border-b border-black"
                />
              </div>
            </div>

            {/* expected hours */}
            <div className="border-y border-black">
              <div className="flex">
                {/* Left label cell */}
                <span className="shrink-0 text-start w-[50%] pl-3 py-1 font-semibold text-sm border-x border-b border-black bg-gray-200">
                  Expected Lost Hours*
                </span>

                <input
                  {...register("lostHours", {
                    required: "lost hours is required",
                  })}
                  className="w-full px-3 text-sm border-r border-b border-black focus:ring-2"
                />
                {errors.lostHours && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.lostHours.message}
                  </p>
                )}
              </div>

              <div className="flex">
                <input
                  className="w-full px-3 py-1 border-x border-black bg-[yellow] focus:ring-2"
                  readOnly
                />
              </div>
            </div>

            {/* Person Completing this form */}
            <div>
              <h2 className="title uppercase text-sm font-bold">
                Person Completing this form
              </h2>
              <div className="flex">
                <div className="border-y w-1/2 border-black">
                  {/* name */}
                  <div className="flex">
                    {/* Left label cell */}
                    <span className="shrink-0 text-start w-[30%] pl-3 py-1 text-sm border-x border-b border-black bg-gray-200">
                      Name
                    </span>

                    <input
                      {...register("completedByName")}
                      className="w-full px-3 text-sm border-b border-black bg-[yellow] focus:ring-2"
                    />
                    {errors.completedByName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.completedByName.message}
                      </p>
                    )}
                  </div>

                  {/* signature */}
                  <div className="flex">
                    {/* Left label cell */}
                    <span className="shrink-0 text-start w-[30%] pl-3 py-1 text-sm border-x border-black bg-gray-200">
                      Signature
                    </span>

                    <input
                      {...register("completedBySignature")}
                      className="w-full px-3 text-sm border-black bg-[yellow] focus:ring-2"
                    />
                    {errors.completedBySignature && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.completedBySignature.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="border-y w-1/2 border-black">
                  {/* position held */}
                  <div className="flex">
                    {/* Left label cell */}
                    <span className="shrink-0 text-start w-[30%] pl-3 py-1 text-sm border-x border-b border-black bg-gray-200">
                      Position Held
                    </span>

                    <input
                      {...register("completedByPosition")}
                      className="w-full px-3 text-sm border-r border-b border-black bg-[yellow] focus:ring-2"
                    />
                    {errors.completedByPosition && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.completedByPosition.message}
                      </p>
                    )}
                  </div>

                  {/* Date */}
                  <div className="flex">
                    {/* Left label cell */}
                    <span className="shrink-0 text-start w-[30%] pl-3 py-1 text-sm border-x border-black bg-gray-200">
                      Date
                    </span>

                    <input
                      type="date"
                      {...register("completedByDate")}
                      className="w-full px-3 text-sm border-r border-black bg-[yellow] focus:ring-2"
                    />
                    {errors.completedByDate && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.completedByDate.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-44 text-xs">
              <p className="absolute -translate-y-1/2 top-1/2 left-0">
                Starsight Limited
              </p>
              <div className="italic text-center space-y-1">
                <p>
                  <strong>*</strong> Denotes fields included in Safety Alert
                </p>
                <p>Page 2</p>
              </div>
            </div>
          </section>

          <section
            id="section-3"
            className="w-full py-8 px-20 border space-y-6"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              borderColor: "#e5e7eb",
            }}
          >
            <div className="flex justify-center m-0">
              <Image
                src="/starsightLogo.png"
                alt="starsight logo"
                width="201"
                height="67"
              />
            </div>
            <h2
              className="text-2xl font-bold text-center uppercase"
              style={{ color: "#1f2937" }}
            >
              Incident Report Form
            </h2>

            <div className="">
              {/* supervisor's comment */}
              <div>
                <h2 className="title text-sm font-bold">
                  COMMENTS ON INCIDENT AND EFFECTIVENESS OF CORRECTIVE ACTIONS
                </h2>

                <LinedTextarea
                  id="supervisorComments"
                  register={register("supervisorComments")}
                  placeholder="Click to enter details..."
                  maxLength={340}
                  lineCount={3}
                  lineHeight={25}
                  label="Supervisor's Comments*:"
                  className="w-full border border-black"
                  style={{
                    minHeight: `${(3 + 1) * 25}px`,
                  }}
                />
              </div>
              {/* supervisor's details */}
              <div className="border-x border-black flex">
                {/* name */}
                <div className="flex border-r border-black w-1/2">
                  {/* Left label cell */}
                  <span className="deta shrink-0 text-start pl-1 py-1 text-sm ">
                    Supervisor&apos;s Name:
                  </span>

                  <input
                    className="outline-none pl-1 text-sm w-full"
                    type="text"
                    {...register("supervisorName")}
                  />
                </div>
                {/* signature*/}
                <div className="flex border-r border-black w-1/4">
                  {/* Left label cell */}
                  <span className="deta shrink-0 text-start pl-1 py-1 text-sm ">
                    Signature:
                  </span>

                  <input
                    className="outline-none pl-1 text-sm w-full"
                    type="text"
                    {...register("supervisorSignature")}
                  />
                </div>
                {/* date */}
                <div className="flex w-1/4">
                  {/* Left label cell */}
                  <span className="deta shrink-0 text-start pl-1 py-1 text-sm ">
                    Date:
                  </span>

                  <input
                    type="date"
                    className="outline-none pl-1 text-sm w-full"
                    {...register("supervisorDate")}
                  />
                </div>
              </div>
              {/* operation manager's comment */}
              <div>
                <LinedTextarea
                  id="managerComments"
                  register={register("managerComments")}
                  placeholder="Click to enter details..."
                  maxLength={340}
                  lineCount={3}
                  lineHeight={25}
                  label="Operation manager's Comments*:"
                  className="w-full border border-black"
                  style={{
                    minHeight: `${(3 + 1) * 25}px`,
                  }}
                />
              </div>
              {/* manager's details */}
              <div className="border-x border-b border-black flex">
                {/* name */}
                <div className="flex border-r border-black w-1/2">
                  {/* Left label cell */}
                  <span className="deta shrink-0 text-start pl-1 py-1 text-sm ">
                    Manager&apos;s Name:
                  </span>

                  <input
                    className="outline-none pl-1 text-sm w-full"
                    type="text"
                    {...register("managerName")}
                  />
                </div>
                {/* signature*/}
                <div className="flex border-r border-black w-1/4">
                  {/* Left label cell */}
                  <span className="deta shrink-0 text-start pl-1 py-1 text-sm ">
                    Signature:
                  </span>

                  <input
                    className="outline-none pl-1 text-sm w-full"
                    type="text"
                    {...register("managerSignature")}
                  />
                </div>
                {/* date */}
                <div className="flex w-1/4">
                  {/* Left label cell */}
                  <span className="deta shrink-0 text-start pl-1 py-1 text-sm ">
                    Date:
                  </span>

                  <input
                    type="date"
                    className="outline-none pl-1 text-sm w-full"
                    {...register("managerDate")}
                  />
                </div>
              </div>
              <p className="text-sm italic mb-1 leading-[20px]">
                <strong>Close out of Incident Report</strong>
              </p>
              <p className="text-sm leading-[16px] italic">
                <strong>
                  (To be completed once all relevant sections have been
                  completed.)
                </strong>{" "}
                This incident report, including investigation and corrective
                actions, has been adequately closed out. The effectiveness of
                the corrective actions has been evaluated.
              </p>{" "}
            </div>

            <div>
              {/* feedback provided */}
              <div className="flex items-center w-full bg-gray-200 px-3 border-x border-t border-black">
                <p className="w-[70%] text-sm mb-2 leading-none mt-1">
                  Has feedback of report been provided to personnel directly
                  involved?
                </p>

                {/* radio Group */}
                <div className="w-[30%]">
                  <Controller
                    control={control}
                    name="feedbackProvided"
                    // rules={{
                    //   required: "Please select yes or no",
                    // }}
                    render={({ field }) => (
                      <div className="flex items-center gap-4">
                        {["Yes", "No"].map((option, index) => (
                          <label
                            key={index}
                            className="flex items-center font-bold text-sm space-x-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              value={option}
                              checked={field.value === option}
                              onChange={() => field.onChange(option)}
                              className="w-3 h-3 text-xs border border-black accent-blue-600 cursor-pointer"
                            />
                            <span className="text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="flex">
                <div className="border-y w-1/2 border-black">
                  {/* name */}
                  <div className="flex">
                    {/* Left label cell */}
                    <span className="shrink-0 text-start w-[30%] pl-3 py-1 text-sm border-x border-b border-black bg-gray-200">
                      Name
                    </span>

                    <input
                      {...register("feedbackName")}
                      className="w-full px-3 text-sm border-b border-black focus:ring-2"
                    />
                  </div>

                  {/* signature */}
                  <div className="flex">
                    {/* Left label cell */}
                    <span className="shrink-0 text-start w-[30%] pl-3 py-1 text-sm border-x border-black bg-gray-200">
                      Signature
                    </span>

                    <input
                      {...register("feedbackSignature")}
                      className="w-full px-3 text-sm border-black focus:ring-2"
                    />
                  </div>
                </div>

                <div className="border-y w-1/2 border-black">
                  {/* position held */}
                  <div className="flex">
                    {/* Left label cell */}
                    <span className="shrink-0 text-start w-[30%] pl-3 py-1 text-sm border-x border-b border-black bg-gray-200">
                      Position Held
                    </span>

                    <input
                      {...register("feedbackPosition")}
                      className="w-full px-3 text-sm border-r border-b border-black focus:ring-2"
                    />
                  </div>

                  {/* Date */}
                  <div className="flex">
                    {/* Left label cell */}
                    <span className="shrink-0 text-start w-[30%] pl-3 py-1 text-sm border-x border-black bg-gray-200">
                      Date
                    </span>

                    <input
                      type="date"
                      {...register("feedbackDate")}
                      className="w-full px-3 text-xs border-r border-black focus:ring-2"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-96 text-xs">
              <p className="absolute -translate-y-1/2 top-1/2 left-0">
                Starsight Limited
              </p>
              <div className="italic text-center space-y-1">
                <p>
                  <strong>*</strong> Denotes fields included in Safety Alert
                </p>
                <p>Page 3</p>
              </div>
            </div>
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
