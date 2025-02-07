import clsx from "clsx";
import React, { useState } from "react";
import { FaRecycle } from "react-icons/fa";
import { FaTruckPickup } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { IoGitPullRequestSharp } from "react-icons/io5";
import { ImBooks } from "react-icons/im";
import { RiDashboardFill } from "react-icons/ri";
import { LiaBookSolid } from "react-icons/lia";
import { FaBookReader } from "react-icons/fa";
// import { MdOutlinePendingActions } from "react-icons/md";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";


const linkData = [
  {
    label: "DashBoard",
    link: "dashboard",
    icon: <RiDashboardFill />,
  },
  {
    label: "All Books",
    link: "books",
    icon: <LiaBookSolid />,
  },
  {
    label: "My Books",
    link: "user/books",
    icon: <FaBookReader />,
  },
  {
    label: "Fine",
    link: "fine/fine",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "Users",
    link: "users/users",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "Borrowed Books",
    link: "borrowed/borrowed",
    icon: <MdOutlinePendingActions />,
  },
];


// const linkData = [
//   {
//     label: "DashBoard",
//     link: "dashboard",
//     icon: <RiDashboardFill />,
//     isLibrarian: true,
//   },
//   {
//     label: "All Books",
//     link: "books",
//     icon: <LiaBookSolid />,
//   },
//   {
//     label: "My Books",
//     link: "user/books",
//     icon: <FaBookReader />,
//     isLibrarian: true,
//   },
//   {
//     label: "Fine",
//     link: "fine/fine",
//     icon: <MdOutlinePendingActions />,
//   },
// ];

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  console.log(path);

  const closeSidebar = () => {};

  // Check the is_librarian value from localStorage
  const isLibrarian = localStorage.getItem("isLibrarian") === "1";
  console.log("Line 55:", localStorage.getItem("isLibrarian"));
  console.log("Line 56:",(isLibrarian));

  const NavLink = ({ el }) => {
    return (
      <Link
        to={el.link}
        onClick={closeSidebar}
        className={clsx(
          "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-white text-base hover:bg-white hover:text-black",
          path === el.link.split("/")[0]
            ? "bg-blue-700 text-white hover:text-black"
            : ""
        )}
      >
        {el.icon}
        <span className="hover:text-blue-700">{el.label}</span>
      </Link>
    );
  };
   const isL = localStorage.getItem("isLibrarian")=="1"; // Change this to false to test the other condition

   const filteredLinks = isL
     ? linkData.filter((link) =>
         ["dashboard", "books", "users/users", "borrowed/borrowed"].includes(
           link.link
         )
       )
     : linkData.filter((link) =>
         ["books", "user/books", "fine/fine"].includes(link.link)
       );


  return (
    <div className="w-full h-full flex flex-col gap-6 p-5">
      <h1 className="flex gap-1 items-center">
        <p className="bg-blue-600 p-2 rounded-full">
          <ImBooks className="text-white text-2xl font-black" />
        </p>
        <span className="ml-2 text-2xl font-bold text-white">My Library</span>
      </h1>
      <div className="flex-1 flex flex-col gap-y-5 py-8">
        {filteredLinks.map((link, ind) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
