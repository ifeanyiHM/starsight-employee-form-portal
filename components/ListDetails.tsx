import Link from "next/link";
import { useEffect, useState } from "react";

interface ListDetailsProps {
  title: string;
  subtitle: string;
  substitute: string;
  linkTitle: string;
  checkDownload?: () => void;
}

function ListDetails({
  title,
  subtitle,
  substitute,
  linkTitle,
  checkDownload,
}: ListDetailsProps) {
  const [completedForms, setCompletedForms] = useState<string[]>([]);

  useEffect(() => {
    // This runs only in the browser
    const stored = localStorage.getItem("completedForms");
    setCompletedForms(stored ? JSON.parse(stored) : []);
  }, []);

  return (
    <>
      <li>
        <Link
          href={linkTitle}
          onClick={checkDownload}
          className={`block group ${
            completedForms.includes(title) ? "pointer-events-none" : ""
          }`}
        >
          <div
            className={`${
              completedForms.includes(title) && ""
            } px-4 py-4 flex items-center sm:px-6`}
          >
            <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
              <div className="truncate">
                <div className="flex text-sm">
                  <p
                    className={`${
                      completedForms.includes(title)
                        ? "line-through opacity-50"
                        : "group-hover:text-green-600"
                    } font-medium text-gray-900 truncate`}
                  >
                    {title}
                  </p>
                </div>
                <div className="mt-2 flex">
                  <div
                    className={`${
                      completedForms.includes(title) && "opacity-50"
                    } flex items-center text-sm text-gray-500`}
                  >
                    <p>
                      {completedForms.includes(title) ? substitute : subtitle}
                    </p>
                  </div>
                </div>
              </div>
              {completedForms.includes(title) && (
                <span
                  className="
                inline-flex items-center justify-center
                w-6 h-6 p-3.5
                rounded-full
                bg-green-600
                text-white
                text-lg
                font-bold
                "
                >
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
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </Link>
      </li>
    </>
  );
}

export default ListDetails;
