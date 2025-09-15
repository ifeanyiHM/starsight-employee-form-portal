// "use client";

// import { forms } from "@/data/forms";
// import { slugify } from "@/utils/slugify";
// import Link from "next/link";

// export default function HomePage() {
//   return (
//     <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
//       <div className="max-w-2xl w-full text-center">
//         <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
//           Starsight Employee Forms
//         </h1>
//         <p className="text-gray-600 mb-8">
//           Select a form below to get started:
//         </p>

//         <ul className="space-y-4">
//           {forms.map((form, index) => (
//             <li key={index}>
//               <Link
//                 href={
//                   index === 2
//                     ? "Old-Starsight-Employee-Handbook.pdf"
//                     : `/${slugify(form)}`
//                 }
//                 className="block w-full bg-[#444343] hover:bg-[#333232] text-white text-lg py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
//               >
//                 {form}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </main>
//   );
// }

// "use client";

// import { forms } from "@/data/forms";
// import { slugify } from "@/utils/slugify";
// import Link from "next/link";

// export default function HomePage() {
//   return (
//     <main className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
//       {/* Header */}
//       <header className="w-full bg-white shadow-md">
//         <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
//           <h1 className="text-2xl font-bold text-gray-800">Starsight</h1>
//           <nav>
//             <ul className="flex space-x-6 text-gray-600 font-medium">
//               <li>
//                 <Link href="/">Home</Link>
//               </li>
//               <li>
//                 <Link href="/about">About</Link>
//               </li>
//               <li>
//                 <Link href="/contact">Contact</Link>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="flex flex-col items-center text-center py-16 px-4">
//         <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
//           Starsight Employee Forms
//         </h2>
//         <p className="text-lg text-gray-600 max-w-xl">
//           Access and manage all your employee forms in one place. Select a form
//           below to get started.
//         </p>
//       </section>

//       {/* Forms List */}
//       <section className="max-w-4xl mx-auto w-full px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {forms.map((form, index) => (
//           <Link
//             key={index}
//             href={
//               index === 2
//                 ? "Old-Starsight-Employee-Handbook.pdf"
//                 : `/${slugify(form)}`
//             }
//             className="bg-white p-6 rounded-xl shadow hover:shadow-lg border hover:border-gray-300 transition-all flex flex-col items-center text-center"
//           >
//             <span className="text-xl font-semibold text-gray-800 mb-2">
//               {form}
//             </span>
//             <p className="text-sm text-gray-500">
//               {index === 2
//                 ? "Download the employee handbook"
//                 : "Fill and submit this form online"}
//             </p>
//           </Link>
//         ))}
//       </section>

//       {/* Footer */}
//       <footer className="mt-auto bg-white border-t py-6">
//         <div className="max-w-6xl mx-auto px-6 flex justify-between items-center text-sm text-gray-500">
//           <p>© {new Date().getFullYear()} Starsight. All rights reserved.</p>
//           <p>Built with Next.js & Tailwind CSS</p>
//         </div>
//       </footer>
//     </main>
//   );
// }

"use client";

import { documents, forms } from "@/data/forms";
import { slugify } from "@/utils/slugify";
import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ListDetails from "../components/ListDetails";
import useForm from "../context/useForm";

export default function HomePage() {
  const { searchTerm } = useForm();

  const [activeCategory, setActiveCategory] = useState("all");

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
    { id: "hr", name: "Human Resources" },
    { id: "it", name: "IT Services" },
    { id: "finance", name: "Finance" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
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
                          {forms.length}
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
                linkTitle={`/${slugify(form)}`}
              />
            ))}
          </ul>
        </div>

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
                  linkTitle={
                    index === 0
                      ? "Old-Starsight-Employee-Handbook.pdf"
                      : `/${slugify(form.title)}`
                  }
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
