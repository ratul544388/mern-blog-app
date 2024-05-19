import { FaBriefcase, FaGithub, FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { placeholderImage } from "../../constants";

const Test = () => {
  return (
    <div className="w-[800px] overflow-hidden bg-background flex flex-col">
      <div className="flex relative items-center justify-center h-[140px] bg-neutral-800">
        <span
          className="absolute -bottom-[253px] -left-1.5 size-[254px] bg-inherit"
          style={{ clipPath: "polygon(0 0, 50% 15%, 100% 0)" }}
        />
        <img
          src={placeholderImage}
          alt="image"
          className="absolute size-28 rounded-full left-[70px] mt-3"
        />
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl text-white">Ratul Hossain</h1>
          <p className="text-gray-300">Full Stack Web Developer</p>
        </div>
      </div>
      <div className="flex">
        <div className="h-[950px] py-12 px-5 w-[335px] bg-blue-50 flex flex-col">
          <h2 className="text-xl font-medium">Contact Details</h2>
          <div className="flex flex-col gap-3 mt-3">
            <div className="p-1.5 rounded-full bg-neutral-800 w-fit text-white">
              <IoIosMail className="size-3.5" />
            </div>
            <div className="p-1.5 rounded-full bg-neutral-800 w-fit text-white">
              <FaPhone className="size-3.5" />
            </div>
            <div className="p-1.5 rounded-full bg-neutral-800 w-fit text-white">
              <FaLocationDot className="size-3.5" />
            </div>
            <div className="p-1.5 rounded-full bg-neutral-800 w-fit text-white">
              <FaBriefcase className="size-3.5" />
            </div>
            <div className="p-1.5 rounded-full bg-neutral-800 w-fit text-white">
              <FaGithub className="size-3.5" />
            </div>
          </div>
          <h2 className="mt-7 font-medium text-xl">Education</h2>
          <div className="flex gap-2 mt-2">
            <div className="flex flex-col items-center gap-1.5 mt-1">
              <span className="size-2.5 min-w-3 rounded-full block bg-neutral-800" />
              <span className="block h-[120px] rounded-full w-0.5 bg-neutral-800" />
            </div>
            <div>
              <h4 className="font-medium">
                Bachelor of Science in Computer Science & Engineering (CSE)
              </h4>
              <p className="text-gray-600 text-sm mt-2">
                Sheikh Burhanuddin Post Graduate Collage
              </p>
              <p className="text-gray-600 text-sm mt-1">2021 - 2024</p>
            </div>
          </div>
          <h2 className="text-xl font-medium mt-7">Skills</h2>
          <div className="ml-5 mt-2">
            <h3 className="text-lg font-medium">Frontend</h3>
            <p className="text-sm mt-2">HTML - CSS - Tailwind CSS</p>
            <p className="text-sm mt-2">JavaScript - TypeScript</p>
            <p className="text-sm mt-2">React - Next.js</p>
            <p className="text-sm mt-2">Any UI libraries</p>
            <p className="text-sm mt-2">Framer Motion</p>
          </div>
          <div className="ml-5 mt-2">
            <h3 className="text-lg font-medium">Backend</h3>
            <p className="text-sm mt-2">Node Js - Express</p>
            <p className="text-sm mt-2">Next Js</p>
            <p className="text-sm mt-2">MongoDB - MySQL - PostgreSQL</p>
            <p className="text-sm mt-2">Prisma</p>
            <p className="text-sm mt-2">JWT - Session</p>
            <p className="text-sm mt-2">Verious Auth Providers</p>
          </div>
        </div>
        <div className="flex flex-col w-full px-8 py-12">
          <h2 className="text-xl font-medium">Summary</h2>
          <span className="block w-full h-0.5 bg-neutral-800" />
          <p className="mt-3">
            Detail-oriented and self-taught Full Stack Web Developer with over 2
            years of hands-on practice. Proficient in both frontend and backend
            technologies, with a strong portfolio of projects ranging from
            eCommerce apps to social media platforms. Adept at problem-solving
            and known for adaptability in learning new technologies.
          </p>
          <h2 className="text-xl font-medium mt-8">Work Experience</h2>
          <span className="block w-full h-0.5 bg-neutral-800" />
          <h3 className="mt-3 text-lg font-medium leading-5">
            Full Stack Gym Admin Management Project
          </h3>
          <p className="text-muted-foreground text-sm">September 2023</p>
          <div className="mt-2 pl-6">
            <div className="flex gap-2">
              <span className="flex size-1.5 min-w-1.5 mt-2.5 rounded-full bg-neutral-800" />
              <p>
                Developed a gym admin management project for a local customer
                using React and Next.js.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="flex size-1.5 min-w-1.5 mt-2.5 rounded-full bg-neutral-800" />
              <p>
                Implemented features for admission, deletion, and renewal of
                members.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="flex size-1.5 min-w-1.5 mt-2.5 rounded-full bg-neutral-800" />
              <p>
                Designed a comprehensive member tracking system with detailed
                member information.
              </p>
            </div>
          </div>
          <h3 className="text-lg font-medium leading-5 mt-8">
            Waffle and Drinks Ordering App
          </h3>
          <p className="text-muted-foreground text-sm">April 2024</p>
          <div className="mt-2 pl-6">
            <div className="flex gap-2">
              <span className="flex size-1.5 min-w-1.5 mt-2.5 rounded-full bg-neutral-800" />
              <p>
                Created a waffle and drinks ordering app for a local restaurant.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="flex size-1.5 min-w-1.5 mt-2.5 rounded-full bg-neutral-800" />
              <p>
                Implemented chat functionality for visitors to communicate with
                the restaurant.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="flex size-1.5 min-w-1.5 mt-2.5 rounded-full bg-neutral-800" />
              <p>
                Developed an intuitive ordering system for visitors to place
                orders conveniently.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
