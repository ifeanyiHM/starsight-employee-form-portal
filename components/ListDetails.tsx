"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ListDetailsProps {
  title: string;
  subtitle: string;
  substitute: string;
  linkTitle: string;
  checkDownload?: () => void;
}

type ModalStep = "idle" | "verifying";

function ListDetails({
  title,
  subtitle,
  substitute,
  linkTitle,
  checkDownload,
}: ListDetailsProps) {
  const router = useRouter();
  const [completedForms, setCompletedForms] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState<ModalStep>("idle");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("completedForms");
    setCompletedForms(stored ? JSON.parse(stored) : []);
  }, []);

  const isVerifiedThisSession = (): boolean => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("portalAccessGranted") === "true";
  };

  const navigate = () => {
    if (checkDownload) checkDownload();
    if (linkTitle.endsWith(".pdf")) {
      window.open(`/${linkTitle}`, "_blank");
    } else {
      router.push(linkTitle);
    }
  };

  const handleItemClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (completedForms.includes(title)) return;

    // Already verified this session — go straight through
    if (isVerifiedThisSession()) {
      navigate();
      return;
    }

    setShowModal(true);
    setStep("idle");
    setCode("");
    setError("");
  };

  const handleVerifyCode = async () => {
    if (!code || code.length < 6) {
      setError("Please enter the full 6-digit code.");
      return;
    }
    setError("");
    setStep("verifying");
    try {
      const res = await fetch("/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        sessionStorage.setItem("portalAccessGranted", "true");
        setShowModal(false);
        navigate();
      } else {
        setStep("idle");
        setError(data.error || "Invalid code. Please try again.");
      }
    } catch {
      setStep("idle");
      setError("Network error. Please try again.");
    }
  };

  const isCompleted = completedForms.includes(title);
  const isVerifying = step === "verifying";

  return (
    <>
      {/* ── List row ─────────────────────────────────────────────────────── */}
      <li>
        <a
          href="#"
          onClick={isCompleted ? (e) => e.preventDefault() : handleItemClick}
          className={`block group ${isCompleted ? "pointer-events-none" : "cursor-pointer"}`}
        >
          <div className="px-4 py-4 flex items-center sm:px-6">
            <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
              <div className="truncate">
                <p
                  className={`text-sm font-medium truncate ${
                    isCompleted
                      ? "line-through opacity-50 text-gray-900"
                      : "text-gray-900 group-hover:text-green-600"
                  }`}
                >
                  {title}
                </p>
                <p
                  className={`mt-2 text-sm text-gray-500 ${
                    isCompleted ? "opacity-50" : ""
                  }`}
                >
                  {isCompleted ? substitute : subtitle}
                </p>
              </div>
              {isCompleted && (
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-600 text-white text-sm font-bold flex-shrink-0">
                  ✓
                </span>
              )}
            </div>
            <div className="ml-5 flex-shrink-0">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </a>
      </li>

      {/* ── Access-code modal ─────────────────────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            {/* Accent bar */}
            <div className="h-1.5 bg-[#44b276]" />

            <div className="px-7 py-8">
              {/* Lock icon */}
              <div className="flex justify-center mb-5">
                <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-[#44b276]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-900 text-center mb-1">
                Enter Access Code
              </h2>
              <p className="text-sm text-gray-500 text-center mb-6">
                Enter the 6-digit code provided by HR to access{" "}
                <span className="font-medium text-gray-700">{title}</span>.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Access Code
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value.replace(/\D/g, "").slice(0, 6));
                      setError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleVerifyCode()}
                    placeholder="000000"
                    maxLength={6}
                    disabled={isVerifying}
                    autoFocus
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-center tracking-[0.6em] font-mono focus:outline-none focus:ring-2 focus:ring-[#44b276] disabled:opacity-60 disabled:bg-gray-50"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600 flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {error}
                  </p>
                )}

                <button
                  onClick={handleVerifyCode}
                  disabled={isVerifying}
                  className="w-full py-3 bg-[#44b276] hover:bg-[#3a9d67] text-white font-medium rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isVerifying ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      Verifying…
                    </span>
                  ) : (
                    "Verify & Access Form"
                  )}
                </button>

                <button
                  onClick={() => {
                    setShowModal(false);
                    setCode("");
                    setError("");
                  }}
                  className="w-full py-2.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ListDetails;
