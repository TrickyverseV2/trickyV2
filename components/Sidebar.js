import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Sidebar = () => {
  var router = useRouter();
  const [currentMenus, setcurrentMenus] = useState("Dashboard");
  const [AllMenus, setAllMenus] = useState([
    { label: "Dashboard", slug: "Dashboard", img: "home", path: "/" },
    { label: "Discover", slug: "Discover", img: "paper-plane", path: "/blog" },
    { label: "Events", slug: "Events", img: "paper-plane", path: "/events/allEvents" },
    {
      label: "Stays",
      slug: "Stays",
      img: "paper-plane",
      path: "/stays/allStays",
    },
    // {
    //   label: "Events",
    //   slug: "Events",
    //   img: "paper-plane",
    //   path: "/createEvent",
    // },
    { label: "Ticket", slug: "Ticket", img: "ticket" },
    { label: "Favorite", slug: "Favorite", img: "bookmark" },
    { label: "Message", slug: "Message", img: "envelope" },
    { label: "Profile", slug: "profile", img: "user", path: "/profile" },
  ]);
  return (
    <div className="h-[100vh] 1w-[18.8%] w-[18rem]">
      <div
        // style={{ backgroundColor: "rgb(23, 30, 23)" }}
        className="bg-gradient-to-t to-black 1to-[rgb(23,40,30)] from-green-900 flex flex-col justify-between px-[1.2rem] py-[1.3rem]  h-full items-center"
      >
        <div className="flex flex-col gap-[2rem] w-full">
          <div className="w-full items-center flex justify-start ml-[1rem]">
            <img
              src="/trickyTravellers.svg"
              className="h-[2.7rem] w-fit"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-[0.3rem]">
            {AllMenus.map((el) => (
              <div key={Math.random() + JSON.stringify(el)}>
                <button
                  onClick={() => {
                    router.push({ pathname: el.path });
                    setcurrentMenus(el.slug);
                  }}
                  className={`${
                    router.pathname == el.path
                      ? "bg-green-600 "
                      : "bg-transparent 1text-slate-700 hover:translate-x-[0.4rem]"
                  } rounded-lg text-gray-200 w-[13rem]  transition-all duration-300`}
                >
                  <div className="p-3 flex gap-[0.5rem] items-center ">
                    <i className={`fi fi-rr-${el.img} mt-[0.2rem]`}></i>
                    <div className="font-semibold">{el.label}</div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full">
          <button
            onClick={() => {
              router.push({ pathname: "login" });
            }}
            className={
              "bg-black -700 rounded-lg text-gray-200 w-[13rem]  transition-all duration-300"
            }
          >
            <div className="p-3 flex gap-[0.5rem] items-center ">
              <i className={`fi fi-rr-sign-in-alt mt-[0.3rem]`}></i>
              <div className="font-semibold">Login</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
