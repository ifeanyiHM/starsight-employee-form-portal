"use client";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export default function CodeOfConduct() {
  function checkDownload() {
    //update the number of forms completed
    const prev = JSON.parse(localStorage.getItem("completedForms") || "[]");
    prev.push("Starsight- Code of Conduct");
    localStorage.setItem("completedForms", JSON.stringify(prev));
  }
  return (
    <>
      <Header />
      <div
        className="flex items-center justify-center min-h-screen md:p-6"
        style={{ backgroundColor: "#f1f5f9" }}
      >
        <div className="w-full max-w-3xl flex flex-col gap-8">
          <section
            id="section-1"
            className="relative w-full py-10 md:py-20 border"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              borderColor: "#e5e7eb",
            }}
          >
            <div className="flex justify-center m-0">
              <Image
                src="/starsightLogo3.png"
                alt="starsight logo"
                width="250"
                height="80"
              />
            </div>
            <h1 className="mt-8 text-[0.9rem] font-bold text-center uppercase">
              CODE OF CONDUCT
            </h1>
            <div className="text-sm font-medium px-4 md:px-20 space-y-6 text-justify">
              <div>
                <p>
                  Starsight considers you a valued employee and as such you are
                  entrusted with our reputation in the broader marketplace.{" "}
                  <br />
                  <br />
                  We are continually evaluated by our current and potential
                  future clients based on our ability to deliver professional
                  and efficient customer service. As a key member of our team
                  you are a Starsight representative and a Company ambassador.
                  <br />
                  <br />
                  Our expectation is that you will promote the interest of
                  Starsight at all times and protect and promote our reputation.
                  <br />
                  <br />
                  The company expects all employees to adhere to the highest
                  standards of personal and professional integrity and to avoid
                  any conduct that might reflect unfavorably upon them, other
                  employees and upon the Company. You are therefore expected to
                  abide by Starsight’s code of conduct, as condition of your
                  employment.
                </p>
              </div>
              <div>
                <h2 className="font-bold">
                  Honest, Lawful and Ethical Conduct
                </h2>
                <p>
                  Starsight complies with all legal requirements in its
                  operations and expects its employees and follow suit. We will
                  honor all our commitments and show all stakeholders respect
                  and honesty. You are expected to conduct yourself with
                  integrity at all times. Integrity requires, among other
                  things, being honest and candid within the constraints of
                  company confidentiality, and dealing fairly and respectfully
                  with clients, contractors, vendors, other employees and other
                  third parties. Starsight will not tolerate discrimination of
                  any kind and or abuse of human rights.
                </p>
              </div>
              <div>
                <h2 className="font-bold">Theft or Fraudulent Activities</h2>
                <p>
                  Any employee engaging in or assisting in an act of theft will
                  be terminated. Consciously knowing of an act of theft and
                  failing to report it can also lead to termination of
                  employment
                </p>
              </div>
              <div>
                <h2 className="font-bold">Corporate Image</h2>
                <p>
                  Working for Starsight puts you in a special position of trust
                  and responsibility. Your attitude and behavior both to
                  customers and to the communities in which we operate, and the
                  impression you make are of prime importance to Starsight Power
                  Utility Limited. You must therefore continuously seek to
                  provide the highest level of quality product, support and
                  services that meets or exceed our customers’ needs and
                  expectations, and maintain the highest levels of professional
                  conduct in your interactions with each other and in
                  representing Starsight in the wider community.
                </p>
              </div>
              <div>
                <h2 className="font-bold">Corporate Image</h2>
                <p>
                  Working for Starsight puts you in a special position of trust
                  and responsibility. Your attitude and behavior both to
                  customers and to the communities in which we operate, and the
                  impression you make are of prime importance to Starsight Power
                  Utility Limited. You must therefore continuously seek to
                  provide the highest level of quality product, support and
                  services that meets or exceed our customers’ needs and
                  expectations, and maintain the highest levels of professional
                  conduct in your interactions with each other and in
                  representing Starsight in the wider community.
                </p>
              </div>
              <div>
                <h2 className="font-bold">Confidentiality</h2>
                <p>
                  Employees shall be required to maintain the confidentiality of
                  the Company and must not divulge information about the Company
                  to any third parties or unauthorized employees. Information
                  relating to the Company’s transactions, operations and clients
                  should not be divulged during your service with the Company
                  and after you leave the services of the Company. You should
                  review carefully the confidentiality obligations set out in
                  your employment contract and ensure that you are always in
                  compliance with them.
                </p>
              </div>
            </div>
          </section>
          <section
            id="section-1"
            className="relative w-full py-10 md:py-20 border"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              borderColor: "#e5e7eb",
            }}
          >
            <div className="text-sm font-medium px-4 md:px-20 space-y-6 text-justify">
              <div>
                <h2 className="font-bold">Personal Appearance & Hygiene</h2>
                <p>
                  As representatives of the Company, you must remember that the
                  image of the Company is to a large extent dependent on you.
                  Whether dealing with customers, members of the public or with
                  fellow employees it is important therefore that you ensure
                  your conduct, grooming, personal hygiene and personal
                  appearance convey professionalism and reflect the values of
                  your employer. Your dress must be smart, tidy, clean and
                  decent at all times during working hours. Trainers,
                  flip-flops, sandals, shorts, sportswear and revealing clothes
                  are inappropriate and may not be worn at any time during
                  working hours. There is no need for men to wear ties in the
                  office, but you must have one available to wear for meetings.{" "}
                  <br />
                  <br />
                  The Company operates a &quot;dress down day&quot; on Friday
                  and mode of dress may be casual (and may include the wearing
                  of jeans), provided it is smart. In some jurisdictions, the
                  wearing of African wear on Friday is encouraged but employees
                  must ensure that the choice of dress conforms to the policy as
                  stated above. <br />
                  <br />
                  Starsight recognizes the challenges of working in a tropical
                  climate and that perspiration is a part of the body’s system
                  for keeping cool, we respectfully request you ensure you
                  manage your personal hygiene so as not to offend your fellow
                  workers. <br />
                  <br />
                  If you have any queries about what is appropriate, these
                  should be directed to your supervisor.
                </p>
              </div>
              <div>
                <h2 className="font-bold">Dignity at Work</h2>
                <p>
                  Starsight believes that the working environment should at all
                  times be supportive of the dignity and respect of individuals.
                  If a complaint of harassment is brought to the attention of
                  management, it will be investigated promptly and appropriate
                  action will be taken.
                  <br />
                  <br />
                  Harassment can be defined as conduct, which is unwanted and
                  offensive and affects the dignity of an individual or group of
                  individuals. Sexual harassment is defined as “unwanted conduct
                  of a sexual nature, or other conduct based on sex, affecting
                  the dignity of women and men at work”. This can include
                  unwelcome physical, verbal or non-verbal conduct. People can
                  be subject to harassment on a wide variety of grounds
                  including race / ethnic origin, nationality or skin colour /
                  sex or sexual orientation / religious or political convictions
                  / willingness to challenge harassment, leading to
                  victimisation/ disabilities, sensory impairments or learning
                  difficulties / status as ex-offenders / age / real or
                  suspected infection with a blood borne virus (eg AIDS/HIV) /
                  membership of a trade union or activities associated with
                  membership.
                  <br />
                  <br />
                  Starsight will not tolerate any acts of harassment or
                  discrimination by an employee. It is your responsibility in
                  your daily actions, decisions and behaviour to ensure that you
                  are not guilty of harassment or discrimination of your
                  colleagues, customers, suppliers or any other person
                  associated with the Company.
                </p>
              </div>
              <div>
                <h2 className="font-bold">Valuing Diversity</h2>
                <p>
                  Starsight is committed to valuing diversity and seeks to
                  provide all staff with the opportunity for employment, career
                  and personal development on the basis of ability,
                  qualifications and suitability for the work as well as their
                  potential to be developed into the job.
                  <br />
                  <br />
                  We believe that people from different backgrounds can bring
                  fresh ideas, thinking and approaches which make the way work
                  is undertaken more effective and efficient.
                </p>
              </div>
            </div>
          </section>
          <section
            id="section-1"
            className="relative w-full py-10 md:py-20 border"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              borderColor: "#e5e7eb",
            }}
          >
            <div className="text-sm font-medium px-4 md:px-20 space-y-6 text-justify">
              <div>
                <p>
                  Starsight will not tolerate direct or indirect discrimination
                  against any person on grounds of age, disability, gender /
                  gender reassignment, marriage / civil partnership, pregnancy /
                  maternity, race, religion or belief, sex, or sexual
                  orientation whether in the field of recruitment, terms and
                  conditions of employment, career progression, training,
                  transfer or dismissal. <br />
                  <br />
                  It is also your responsibility in your daily actions,
                  decisions and behavior to endeavor to promote these concepts,
                  to comply with all relevant legislation and to ensure that you
                  do not discriminate against colleagues, clients’ and suppliers
                  or any other person associated with the Company.
                </p>
              </div>
              <div>
                <h2 className="font-bold"> Smoking at Work</h2>
                <p>
                  Smoking is strictly prohibited on all Starsight premises
                  (including entrances and exits) and in all Starsight vehicles.
                </p>
              </div>
              <div>
                <h2 className="font-bold">Drugs and Alcohol</h2>
                <p>
                  Bringing alcohol or any unlawful substances to the workplace,
                  and / or imbibing them there is strictly prohibited as is the
                  imbibing of alcohol or any unlawful substances during a period
                  prior to work where the effects carry over to the workplace.
                  Any such instances will be dealt with under the disciplinary
                  procedure and may lead to your summary dismissal.
                  <br />
                  <br />
                  The Company reserves the right to carry out random searches
                  for narcotic drugs, and random testing of people in the
                  workplace or operating Company vehicles and equipment to
                  identify those persons affected by drugs and/or alcohol. If
                  you are found in possession of narcotic drugs or affected by
                  alcohol and/or drugs, you will be subject to disciplinary
                  action which may include summary dismissal depending on the
                  severity and circumstance of the incident.
                  <br />
                  <br />
                  All staff must make themselves familiar with the Company’s
                  Alcohol and Unlawful Substances Policy available from your
                  supervisor.
                </p>
              </div>
              <div>
                <h2 className="font-bold">Attendance at work</h2>
                <p>
                  Starsight values good attendance at work and is committed to
                  improving the general wellbeing of its employees to achieve
                  this. Although we aim to secure regular attendance, we do not
                  expect employees to attend when they are unwell.
                </p>
                <div className="relative ml-10 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-black absolute -left-6 top-1.5"></div>
                  <h2 className="font-bold">Notification of Absence</h2>
                  <p className="mt-1">
                    If you are unable to attend work due to sickness or injury,
                    your supervisor must be notified by phone before your normal
                    start time on the first day of absence, if possible,
                    indicating a date of return. Notification should be made by
                    you personally unless impossible due to the nature of the
                    illness, in which case you should arrange for someone else
                    to call on your behalf. During prolonged periods of absence,
                    your supervisor should be kept informed of progress and an
                    expected date of return. <br />
                    <br />
                    Your supervisor should be notified as early as possible if
                    absence from work is anticipated for hospitalisation and
                    other medical treatment. <br />
                    <br />
                    Any employee who has been absent due to sickness and is
                    found not to have been genuinely ill will be subject to
                    disciplinary action, which could include dismissal.
                  </p>
                </div>
                <div className="relative ml-10 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-black absolute -left-6 top-1.5"></div>
                  <h2 className="font-bold"> Absence During Working Hours</h2>
                  <p className="mt-1">
                    If you wish to leave your place of work during working hours
                    for any reason you must first seek permission from your
                    supervisor. If you leave your place of work without
                    permission, you will be committing an offence of misconduct
                    and will be subject to disciplinary action.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section
            id="section-1"
            className="relative w-full py-10 md:py-20 border"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              borderColor: "#e5e7eb",
            }}
          >
            <div className="text-sm font-medium px-4 md:px-20 space-y-6 text-justify">
              <div>
                <div className="relative ml-10 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-black absolute -left-6 top-1.5"></div>
                  <h2 className="font-bold">Vacation of Post</h2>
                  <p className="mt-1">
                    If you are absent without the written permission and
                    approval of your supervisor for more than seven (7)
                    consecutive working days, you will be regarded as having
                    resigned from your employment without notice. A notice in
                    writing to this effect will be sent to you at your last
                    known address by the Company. Accordingly, you shall be
                    liable to pay to the Company a sum equal to your salary for
                    the period of notice required for your resignation.
                  </p>
                </div>
              </div>
              <div>
                <h2 className="font-bold">Transfers</h2>
                <p>
                  You may be transferred from one site to another within the
                  country of your operation. In such instances, the Company
                  shall provide you with reasonable notice of such transfer. A
                  relocation allowance at the prevailing rate at the time of
                  transfer and as per local law will be granted if we are
                  satisfied that your relocation is required in order for you to
                  undertake the duties of the post for which you have been
                  employed. Eligibility and any sums paid are purely at the
                  discretion of the Company, and this is not a contractual
                  right. You will be required to sign a written undertaking to
                  repay all or some of the relocation allowance if you leave
                  within 24 months of receipt of this allowance.
                </p>
              </div>
              <div>
                <h2 className="font-bold"> Time and attendance recording</h2>
                <p>
                  An attendance register is maintained by the Administration
                  department for the sole purpose of monitoring staff presence
                  in the company on a daily basis. Every employee is required to
                  sign the attendance register when he/she resumes work in the
                  morning. Employees should note as follows <br /> <br />{" "}
                  Failure to sign – in shall result in being marked absent for
                  the day.
                  <br /> <br />
                  Malpractices like logging another employee’s name on his
                  behalf or false time recording amount to fraudulence and shall
                  be dealt with according to the disciplinary procedures of the
                  firm.
                  <br /> <br />
                  Lateness and absenteeism are not condoned by management
                </p>
                <div className="relative ml-10">
                  <div className="absolute -left-6 top-1.5">i</div>
                  <p className="">
                    If an employee is late for no acceptable reason, he shall be
                    sent home and lose the day’s pay
                  </p>
                </div>
                <div className="relative ml-10 mt-1">
                  <div className="absolute -left-6 top-1.5">ii</div>
                  <p className="">
                    Lateness to work 3 times in a month attracts an automatic
                    warning letter from the administration department and other
                    disciplinary measures management may deem fit.
                  </p>
                </div>
                <div className="relative ml-10 mt-1">
                  <div className="absolute -left-6 top-1.5">iii</div>
                  <p className="">
                    Absence from duty up to three times in a month without
                    permission shall also attract a warning letter from the
                    administration department and other disciplinary measures as
                    deemed fit by management.
                  </p>
                </div>
              </div>
              <div>
                <h2 className="font-bold">Staff Discipline</h2>
                <p>
                  Disciplinary actions may be taken against employees to
                  maintain adherence to policy as well as correcting or
                  reforming employees. Disciplinary actions are guided by the
                  principle of fairness and firmness and all employees are
                  expected to obey the rules and regulations of the firm.
                  Subject to the discretion of the management, an employee may
                  be issued a warning letter, sent on suspension or dismissed
                  but each measure taken by the management shall be commensurate
                  with the level and gravity of the offence.
                </p>
              </div>
              <div>
                <h2 className="font-bold">Warning</h2>
                <p>
                  A warning letter will be issued to an employee for
                  non-adherence to policy and for any offence that is not strong
                  enough to warrant a suspension or termination/summary
                  dismissal.
                </p>
              </div>
              <div>
                <h2 className="font-bold">Suspension</h2>
                <p>
                  An employee may be sent on suspension where the offence is not
                  grave enough to warrant termination subject to the management
                  decision investigating grave charges. All suspensions shall be
                  without pay except in a situation where investigation into
                  grave charges is being conducted in which case unless the
                  employee is found guilty will ‘without pay’ punishment hold.
                </p>
              </div>
            </div>
          </section>
          <section
            id="section-1"
            className="relative w-full py-10 md:py-20 border"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              borderColor: "#e5e7eb",
            }}
          >
            <div className="text-sm font-medium px-4 md:px-20 space-y-6 text-justify">
              <div>
                <p>
                  which case unless the employee is found guilty will ‘without
                  pay’ punishment hold.
                </p>
              </div>
              <div>
                <h2 className="font-bold">Summary Dismissal and Termination</h2>

                <div className="relative ml-10">
                  <div className="absolute -left-6 top-1.5">i</div>
                  <p className="">
                    As guaranteed by the labor statutes, management reserves the
                    prerogative to terminate any employee without assigning any
                    reason thereto. However, any terminated employee shall get
                    all his entitlements including appropriate notice.
                  </p>
                </div>
                <div className="relative ml-10 mt-1">
                  <div className="absolute -left-6 top-1.5">ii</div>
                  <p className="">
                    No notice shall be given to an employee who is summarily
                    dismissed in addition to his having to lose some other
                    benefits. “For an act to justify summary dismissal it must
                    be repudiatory. In other words, it must be grave in
                    substance and consequence thus preventing further
                    satisfactory continuance of relationship between the firm
                    and the concerned employee.’’ Example of offences which may
                    qualify for summary dismissal are:
                  </p>
                  <div className="flex flex-col">
                    <span>- Abandonment of work</span>
                    <span>
                      - Unfaithfulness — divulging the firm’s business secrets;
                      poor attitude to work leading to a loss to the company
                    </span>
                    <span>- Theft and Fraudulent act</span>
                    <span>- Demanding or accepting bribes</span>
                    <span>
                      - Making use of the firm’s property for unauthorized or
                      personal work.
                    </span>
                    <span>- Stealing and pilfering</span>
                    <span>- Acts of sabotage etc.</span>
                  </div>{" "}
                </div>
              </div>
              <div>
                <p>
                  Having carefully read through this policy, I hereby confirm my
                  understanding of the details herein contained and agree to
                  abide by the tenets.
                </p>
              </div>

              <div className="w-1/2 md:w-full mb-64 flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-16 text-[14px] font-medium">
                {["Staff Name", "Signature", "Date"].map((field, index) => (
                  <div className="py-2 flex flex-col space-y-2" key={index}>
                    <input
                      className="outline-none border-b-2 border-dotted border-black -translate-y-1.5"
                      id={field}
                      type="text"
                    />{" "}
                    <label className="shrink-0" htmlFor={field}>
                      {field}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <button
            className="w-[90%] mx-auto md:w-full py-3 text-white rounded-lg transition-all font-bold uppercase mb-10"
            style={{
              backgroundColor: "#333232",
            }}
          >
            <Link
              href="Starsight-Code-of-Conduct.pdf"
              className="flex items-center gap-2 justify-center"
              onClick={checkDownload}
            >
              <MdOutlineLocalPrintshop size={20} /> Download
            </Link>
          </button>{" "}
        </div>
      </div>{" "}
      <Footer />
    </>
  );
}
