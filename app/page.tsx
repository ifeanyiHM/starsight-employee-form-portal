"use client";

import { documents, forms } from "@/data/forms";
import { slugify } from "@/utils/slugify";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ListDetails from "../components/ListDetails";
import useForm from "../context/useForm";
import { loadFilesFromLocalStorage } from "../utils/browserStorage";

export default function HomePage() {
  const { searchTerm } = useForm();

  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [completedForms, setCompletedForms] = useState<string[]>([]);
  const [remountKey, setRemountKey] = useState(0);

  useEffect(() => {
    // This runs only in the browser
    const stored = localStorage.getItem("completedForms");
    setCompletedForms(stored ? JSON.parse(stored) : []);
  }, []);

  // Filter forms based on search and category
  const filteredForms = forms.filter((form) => {
    const matchesSearch = form.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" ||
      (activeCategory === "hr" && form.includes("HR")) ||
      (activeCategory === "it" && form.includes("IT")) ||
      (activeCategory === "finance" && form.includes("Expense"));

    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: "all", name: "All Forms" },
    // { id: "hr", name: "Human Resources" },
    // { id: "it", name: "IT Services" },
    // { id: "finance", name: "Finance" },
  ];

  function checkDownload(): void {
    const prev = JSON.parse(localStorage.getItem("completedForms") || "[]");
    prev.push("Old Starsight- Employee Handbook");
    localStorage.setItem("completedForms", JSON.stringify(prev));
  }

  const required = [
    "Background Check Form",
    "Employee Data Form",
    "Starsight- Employee Handbook Acknowlegement Form",
  ];

  const hasMatch = required.every((r) => completedForms.includes(r));
  function countRequiredCompleted(completedForms: string[]): number {
    const matched = required.filter((req) =>
      completedForms.includes(req)
    ).length;

    return matched;
  }
  const completedCount = countRequiredCompleted(completedForms);

  const finalSubmit = async () => {
    setLoading(true);
    try {
      const allFiles = loadFilesFromLocalStorage();

      const formData = new FormData();

      // 1️⃣ Find the PDF in the array
      const pdfFile = allFiles.find((f) => f.type === "application/pdf");
      if (pdfFile) {
        // append with the key the server expects
        formData.append("file", pdfFile, pdfFile.name || "form-data.pdf");
      }

      // 2️⃣ Add the rest of the files
      allFiles.forEach((file, i) => {
        // skip the one we already added as "file"
        if (file !== pdfFile) {
          formData.append(`attachment_${i + 1}`, file);
        }
      });

      // ➡️ Get full name from localStorage and append it
      const fullName = localStorage.getItem("employeeFullName") || "";
      formData.append("fullName", fullName);

      const res = await fetch("/api/send-pdf", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        localStorage.removeItem("storedFiles");
        localStorage.removeItem("completedForms");
        localStorage.removeItem("fullName");
        alert("All files successfully uploaded!");
        setRemountKey((k) => k + 1);
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
    <div key={remountKey} className="min-h-screen bg-gray-50">
      {/* Header */}

      <Header />

      {/* Main content */}
      <main className="max-w-7xl mx-auto mb-12 px-4 sm:px-6 lg:px-8 py-8">
        {/* Page title and stats */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Employee Forms Portal
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Access all company forms and documents in one place
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {[
            "Total Forms",
            "Completed Forms",
            "Not Completed Forms",
            "Reference Documents",
          ].map((form, index) => (
            <div
              key={index}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-[#44b276] rounded-md p-3">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {form}
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {form === "Completed Forms"
                            ? completedCount
                            : form === "Not Completed Forms"
                            ? forms.length - completedCount
                            : form === "Reference Documents"
                            ? 2
                            : forms.length}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Category filters */}
        <div className="mb-6">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-lg font-medium text-gray-900">
                Forms Library
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Select a form to get started
              </p>
            </div>
          </div>

          <div className="flex space-x-4 mt-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                  activeCategory === category.id
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Forms list */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredForms.map((form, index) => (
              <ListDetails
                key={index}
                title={form}
                subtitle="Fill and submit this form online"
                substitute="This form has been completed"
                linkTitle={`/${slugify(form)}`}
              />
            ))}
          </ul>
        </div>

        {hasMatch && completedForms.length < 5 ? (
          <div className="flex justify-between items-center mt-4 px-2">
            <p className="text-sm text-gray-700">
              To proceed, All reference documents must be downloaded before the
              Submit button is activated.
            </p>
          </div>
        ) : completedForms.length === 5 ? (
          <div className="flex justify-between items-center mt-4 px-2">
            <p className="text-sm text-gray-700">
              All forms have been successfully completed. Proceed to sumbit to
              the HR department.
            </p>
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              onClick={finalSubmit}
              className="w-auto py-2 px-5 text-white rounded-full transition-all font-medium cursor-pointer"
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
          </div>
        ) : (
          ""
        )}

        {/* Empty state */}
        {filteredForms.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No forms found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter to find what you&apos;re
              looking for.
            </p>
          </div>
        )}

        <div className="mt-18">
          <div className="mb-5 sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-lg font-medium text-gray-900">
                Reference Documents
              </h2>
            </div>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {documents.map((form, index) => (
                <ListDetails
                  key={index}
                  title={form.title}
                  subtitle={form.subtitle}
                  substitute="Document downloaded"
                  linkTitle={
                    index === 0
                      ? "Old-Starsight-Employee-Handbook.pdf"
                      : `/${slugify(form.title)}`
                  }
                  checkDownload={index === 0 ? checkDownload : undefined}
                />
              ))}
            </ul>
          </div>{" "}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
