"use client";

import Image from "next/image";
import { useState } from "react";
import { CiCircleMinus, CiSearch } from "react-icons/ci";
import { HiArrowUpRight } from "react-icons/hi2";
import { PiNotePencilThin, PiStarFourFill } from "react-icons/pi";
import { VscBell } from "react-icons/vsc";

//for you
import { FaComment, FaHandsClapping } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import Link from "next/link";

const mediumFeed = [
  {
    category: "Language Lab",
    author: "Benbon",
    title:
      "How Knowledge of Languages Is More Valuable Than Ever on the Job Market",
    excerpt: "It’s not a skill issue, but a marketing issue",
    stats: { date: "5d ago", claps: "1.2k", comments: 45 },
    image: "/images/language-lab.jpg",
  },
  {
    category: "Level Up Coding",
    author: "Attila Vago",
    title: "Welcome To Dream-Driven Development Where Nothing Works",
    excerpt:
      "Half-baked diagrams, features that make no sense, Mikado architecture...",
    stats: { date: "4d ago", claps: "709", comments: 16 },
    image: "/images/dream-driven.jpg",
    tag: "tag",
  },
  {
    category: "Predict",
    author: "lawya writes",
    title:
      "Future-Proof Careers in the Age of AI: What You Should Learn in 2026",
    excerpt:
      "What if I told you that by this time next year, you could land a job that pays...",
    stats: { date: "Jul 30", claps: "3.7k", comments: 165 },
    image: "/images/future-proof.jpg",
  },
  {
    author: "Clean Coder",
    title: "10 Java Collections Tricks Only Seniors Know",
    excerpt:
      "If you’ve been coding in Java for a while, you probably use List, Set, and...",
    stats: { date: "3d ago", claps: "52", comments: 5 },
    image: "/images/java-tricks.jpg",
  },
  {
    category: "The Generator",
    author: "Jim the AI Whisperer",
    title:
      "Want to see how insanely stupid AI really is? Ask ChatGPT to answer these riddles in just one word",
    excerpt: "Limiting output length reveals AI isn’t intelligent—it’s chatty!",
    stats: { date: "3d ago", claps: "2k", comments: 36 },
    image: "/images/ai-riddles.jpg",
  },
];

const staffPicks = [
  {
    title:
      "How this brand strategist uses Medium to explore ideas, repurpose content, and land clients",
    author: "Zulie @ Medium",
    category: "The Medium Handbook",
    stats: { date: "2d ago" },
    tag: "tag",
  },
  {
    title:
      'From "I Have To" to "I Get To": How One Word Change Rewires Your Brain',
    author: "Jud Brewer MD PhD",
    stats: { date: "5d ago" },
  },
  {
    title: "Golden Design Lessons from Tokyo Metro",
    author: "Linh Nguyen",
    stats: { date: "Sep 11" },
  },
];
const recommendedTopics = [
  "Data Science",
  "React",
  "Coding",
  "Mental Health",
  "UX",
  "Python",
  "Productivity",
];
const whoToFollow = [
  {
    name: "Dr. Derek Austin",
    description: "AI Content Engineer I teach LLMs to think. Full...",
    verified: true,
  },
  {
    name: "ITNEXT",
    type: "Publication",
    description: "ITNEXT is a platform for IT developers & software...",
  },
  {
    name: "Oliver Foster",
    description: "Primarily proficient in the Java programming...",
  },
];
const links = [
  "Help",
  "Status",
  "About",
  "Careers",
  "Press",
  "Blog",
  "Privacy",
  "Rules",
  "Terms",
  "Text to speech",
];

export default function Page() {
  const [category, setCategory] = useState("For you");
  return (
    <div>
      <div className="md:hidden flex justify-center items-center gap-1 text-[#6B6B6B] text-[0.906rem] py-2.5 border-y border-[#f2f2f2]">
        Open in app <HiArrowUpRight size={15} className="pb-1" />
      </div>
      <nav className="border-b border-[#f2f2f2] py-3 md:py-2.5 xl:py-2">
        <div className="flex items-center justify-between w-[86%] md:w-[94%] xl:w-[96%] mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex flex-col justify-between w-4.5 md:w-7.5 h-3.5">
              <span className="block h-0.5 w-full rounded bg-[#8f8d8d]"></span>
              <span className="block h-0.5 w-full rounded bg-[#8f8d8d]"></span>
              <span className="block h-0.5 w-full rounded bg-[#8f8d8d]"></span>
            </div>

            <Image
              src="/korna/medium-logo.png"
              alt="starsight logo"
              width="116"
              height="35"
            />
            <div className="relative hidden md:block xl:ml-2 bg-[#f9f9f9] rounded-[20px] w-full text-sm text-[#6b6b6b]">
              <CiSearch
                size={24}
                className="absolute -translate-y-1/2 top-1/2 left-4 xl:left-3"
              />
              <input
                type="text"
                placeholder="Search"
                className="py-2 xl:py-2.5 pl-13 xl:pl-12 outline-none w-full placeholder:text-[#6b6b6b]"
              />
            </div>
          </div>
          <div className="flex items-center gap-7 xl:gap-8 text-[#6b6b6b]">
            <CiSearch size={24} className="md:hidden" />
            <div className="hidden md:flex items-end gap-1 xl:gap-1.5">
              <PiNotePencilThin size={26} />
              <span className="xl:text-sm">Write</span>
            </div>
            <VscBell size={25} className="hidden md:inline" />

            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white"></span>
          </div>
        </div>
      </nav>
      <main className="w-[86%] md:w-[88%] lg:w-[94%] mx-auto lg:flex">
        <section className=" lg:w-[66%] xl:w-[73%] lg:pr-7">
          <div className="xl:w-[78%] mx-auto">
            <div className="flex items-center gap-5 border-b border-[#f2f2f2]">
              {["For you", "Featured"].map((item) => (
                <span
                  onClick={() => setCategory(item)}
                  className={`${
                    category === item ? " border-black " : "border-transparent"
                  } border-b pb-4 pt-10`}
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="divide-y divide-gray-200">
              {mediumFeed.map((item, index) => (
                <article
                  key={index}
                  className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 xl:gap-16 py-9"
                >
                  <div className="flex-1">
                    {index === 1 && (
                      <div className="flex items-center gap-1 text-xs md:text-base text-gray-500 mb-5 md:mb-8">
                        <FaHandsClapping size={14} />
                        <span className="text-[#242424]">
                          Trey Huffine
                        </span>{" "}
                        clapped
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-xs md:text-base text-gray-500 mb-1">
                      <Image
                        src={`/korna/profile${index + 1}.PNG`}
                        alt="profile"
                        width={27}
                        height={27}
                        className="object-cover w-4 h-4"
                      />
                      {item.category && "In"}{" "}
                      <span className="text-[#242424]">{item.category}</span>{" "}
                      {item.category && " by"}
                      <span className="text-[#242424]">{item.author}</span>{" "}
                      {item.tag && (
                        <Image
                          src={`/korna/${item.tag}.PNG`}
                          alt="tag"
                          width={27}
                          height={27}
                          className="object-cover w-4 h-4"
                        />
                      )}
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <h2
                          className="text-[14px] md:text-2xl font-bold text-[#242424]"
                          style={{
                            fontFamily:
                              '"Helvetica Neue", Helvetica, Arial, sans-serif',
                          }}
                        >
                          {item.title}
                        </h2>
                        <p className="text-sm md:text-base text-gray-600 mt-1 line-clamp-2">
                          {item.excerpt}
                        </p>
                      </div>
                      <div className="flex-shrink-0 md:hidden">
                        <Image
                          src={`/korna/articleImage${index + 1}.PNG`}
                          alt={item.title}
                          width={80}
                          height={53}
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-4 md:gap-5 text-gray-500 text-sm md:text-base">
                      <PiStarFourFill color="#ffc017" />
                      <span>{item.stats.date}</span>
                      <span className="flex items-center gap-1">
                        <FaHandsClapping size={16} /> {item.stats.claps}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaComment
                          size={16}
                          className="transform -scale-x-100"
                        />
                        {item.stats.comments}
                      </span>

                      <div className="flex items-center gap-4 md:gap-6 ml-auto">
                        <CiCircleMinus size={22} className="cursor-pointer" />
                        <MdOutlineBookmarkAdd
                          size={22}
                          className="hidden md:inline"
                        />
                        <HiDotsHorizontal size={20} />
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block flex-shrink-0">
                    <Image
                      src={`/korna/articleImage${index + 1}.PNG`}
                      alt={item.title}
                      width={160}
                      height={107}
                      className="object-cover"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <aside className="hidden lg:block pl-6 xl:pl-10 border-l border-[#f2f2f2] w-[34%] xl:w-[27%]">
          {/* staff pick */}
          <div className="mb-10">
            <h2 className="font-bold text-[#242424] mt-10 mb-2 text-base">
              Staff Pick
            </h2>
            <div>
              {staffPicks.map((item, index) => (
                <article key={index} className="py-2.5">
                  <div className="flex-1">
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                      <div className="shrink-0">
                        <Image
                          src={`/korna/staff${index + 1}.PNG`}
                          alt="profile"
                          width={22}
                          height={25}
                          className="object-cover"
                        />
                      </div>
                      {item.category && "In"}{" "}
                      <span className="shrink-0 text-[#242424]">
                        {item.category}
                      </span>{" "}
                      {item.category && " by"}
                      <span className="shrink-0 text-[#242424]">
                        {item.author}
                      </span>{" "}
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <h2
                          className="text-base font-bold text-[#242424]"
                          style={{
                            fontFamily:
                              '"Helvetica Neue", Helvetica, Arial, sans-serif',
                          }}
                        >
                          {item.title}
                        </h2>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-5 text-gray-500 text-sm">
                      {index === 1 && <PiStarFourFill color="#ffc017" />}
                      <span>{item.stats.date}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <button className="text-sm text-[#6b6b6b] font-medium">
              See the full list
            </button>{" "}
          </div>

          {/* Recommended Topics Section */}
          <div className="mb-10">
            <h2 className="text-lg font-medium text-[#242424] mb-4">
              Recommended topics
            </h2>
            <ul className="flex flex-wrap gap-2.5 mb-4">
              {recommendedTopics.map((topic) => (
                <li
                  key={topic}
                  className="px-4 py-2 rounded-full text-sm transition-colors bg-[#f2f2f2] text-[#242424] hover:bg-gray-200"
                >
                  {topic}
                </li>
              ))}
            </ul>
            <button className="text-sm text-[#6b6b6b] font-medium">
              See more topics
            </button>
          </div>

          {/* Who to Follow Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Who to follow
            </h2>
            <ul className="space-y-4">
              {whoToFollow.map((user, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className={`shrink-0`}>
                    <Image
                      src={`/korna/follow${index + 1}.PNG`}
                      alt="profile"
                      width={37}
                      height={33}
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1">
                      <h3 className="text-sm font-medium text-[#242424] truncate">
                        {user.name}
                      </h3>
                      {user.verified && (
                        <Image
                          src={`/korna/drTag.PNG`}
                          alt="profile"
                          width={20}
                          height={20}
                          className="object-cover"
                        />
                      )}
                    </div>
                    {user.type && (
                      <p className="text-xs text-[#242424] mb-1">{user.type}</p>
                    )}
                    <p className="text-sm text-[#6b6b6b] line-clamp-2">
                      {user.description}
                    </p>
                  </div>

                  {/* Follow Button */}
                  <button className="px-4 py-1.5 text-sm font-medium rounded-full border transition-colors flex-shrink-0 bg-white text-[#242424] border-[#242424] hover:border-gray-400">
                    Follow
                  </button>
                </li>
              ))}
            </ul>

            <button className="text-sm text-[#6b6b6b] font-medium mt-4">
              See more suggestions
            </button>
          </div>

          {/* Reading List Section */}
          <div className="mt-6 pt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              Reading list
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              <span>Click the</span>{" "}
              <MdOutlineBookmarkAdd size={22} className="inline" />
              <span>
                on any story to easily add it to your reading list or a custom
                list that you can share.
              </span>{" "}
            </p>
          </div>

          {/* links */}
          <div className="mb-10">
            <ul className="flex flex-wrap space-x-2 my-6">
              {links.map((link) => (
                <li key={link} className=" text-[11px]  text-[#6b6b6b]">
                  <Link href="#">{link}</Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}
