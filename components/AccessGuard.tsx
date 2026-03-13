"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AccessGuardProps {
  children: React.ReactNode;
}

const STORAGE_KEY = "portalAccess";
const TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export function markAccessGranted() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ grantedAt: Date.now() }));
}

export function isAccessValid(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const { grantedAt } = JSON.parse(raw) as { grantedAt: number };
    return Date.now() - grantedAt < TTL_MS;
  } catch {
    return false;
  }
}

export default function AccessGuard({ children }: AccessGuardProps) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (isAccessValid()) {
      setAllowed(true);
    } else {
      localStorage.removeItem(STORAGE_KEY);
      router.replace("/");
    }
  }, [router]);

  if (!allowed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <svg className="animate-spin h-8 w-8" viewBox="0 0 24 24" fill="none">
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
          <p className="text-sm">Checking access…</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
