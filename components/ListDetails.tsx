import Link from "next/link";

interface ListDetailsProps {
  title: string;
  subtitle: string;
  linkTitle: string;
}

function ListDetails({ title, subtitle, linkTitle }: ListDetailsProps) {
  return (
    <>
      <li>
        <Link href={linkTitle} className="block group">
          <div className="px-4 py-4 flex items-center sm:px-6">
            <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
              <div className="truncate">
                <div className="flex text-sm">
                  <p className="font-medium text-gray-900 group-hover:text-green-600 truncate">
                    {title}
                  </p>
                </div>
                <div className="mt-2 flex">
                  <div className="flex items-center text-sm text-gray-500">
                    <p>{subtitle}</p>
                  </div>
                </div>
              </div>
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
