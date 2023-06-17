import React, { useState } from "react";
import Link from "next/link";

const blog = () => {
  const [allBlogs, setallBlogs] = useState([
    {
      img: "https://www.trickytravellers.com/uploads/posts/24441a37-54c1-4189-a9c7-54c45ab41bb8.webp",
      user: {
        image:
          "https://www.trickytravellers.com/uploads/avatars/9291f48f-6dcb-4727-8b00-f675512b9b9a.jpg",
        title: "TRICKY TRAVELLERS",
        desc: "The Trickest Travel Community",
      },
      title: "Explore the Charm of Winters in Dubai",
      desc: "",
      views: 103,
      time: "13 hours ago",
    },
    {
      img: "https://www.trickytravellers.com/uploads/posts/24441a37-54c1-4189-a9c7-54c45ab41bb8.webp",
      user: {
        image:
          "https://www.trickytravellers.com/uploads/avatars/9291f48f-6dcb-4727-8b00-f675512b9b9a.jpg",
        title: "TRICKY TRAVELLERS",
        desc: "The Trickest Travel Community",
      },
      title: "Explore the Charm of Winters in Dubai",
      desc: "",
      views: 103,
      time: "13 hours ago",
    },
    {
      img: "https://www.trickytravellers.com/uploads/posts/24441a37-54c1-4189-a9c7-54c45ab41bb8.webp",
      user: {
        image:
          "https://www.trickytravellers.com/uploads/avatars/9291f48f-6dcb-4727-8b00-f675512b9b9a.jpg",
        title: "TRICKY TRAVELLERS",
        desc: "The Trickest Travel Community",
      },
      title: "Explore the Charm of Winters in Dubai",
      desc: "",
      views: 103,
      time: "13 hours ago",
    },
    {
      img: "https://www.trickytravellers.com/uploads/posts/24441a37-54c1-4189-a9c7-54c45ab41bb8.webp",
      user: {
        image:
          "https://www.trickytravellers.com/uploads/avatars/9291f48f-6dcb-4727-8b00-f675512b9b9a.jpg",
        title: "TRICKY TRAVELLERS",
        desc: "The Trickest Travel Community",
      },
      title: "Explore the Charm of Winters in Dubai",
      desc: "",
      views: 103,
      time: "13 hours ago",
    },
    {
      img: "https://www.trickytravellers.com/uploads/posts/24441a37-54c1-4189-a9c7-54c45ab41bb8.webp",
      user: {
        image:
          "https://www.trickytravellers.com/uploads/avatars/9291f48f-6dcb-4727-8b00-f675512b9b9a.jpg",
        title: "TRICKY TRAVELLERS",
        desc: "The Trickest Travel Community",
      },
      title: "Explore the Charm of Winters in Dubai",
      desc: "",
      views: 103,
      time: "13 hours ago",
    },
    {
      img: "https://www.trickytravellers.com/uploads/posts/24441a37-54c1-4189-a9c7-54c45ab41bb8.webp",
      user: {
        image:
          "https://www.trickytravellers.com/uploads/avatars/9291f48f-6dcb-4727-8b00-f675512b9b9a.jpg",
        title: "TRICKY TRAVELLERS",
        desc: "The Trickest Travel Community",
      },
      title: "Explore the Charm of Winters in Dubai",
      desc: "",
      views: 103,
      time: "13 hours ago",
    },
    {
      img: "https://www.trickytravellers.com/uploads/posts/24441a37-54c1-4189-a9c7-54c45ab41bb8.webp",
      user: {
        image:
          "https://www.trickytravellers.com/uploads/avatars/9291f48f-6dcb-4727-8b00-f675512b9b9a.jpg",
        title: "TRICKY TRAVELLERS",
        desc: "The Trickest Travel Community",
      },
      title: "Explore the Charm of Winters in Dubai",
      desc: "",
      views: 103,
      time: "13 hours ago",
    },
    {
      img: "https://www.trickytravellers.com/uploads/posts/24441a37-54c1-4189-a9c7-54c45ab41bb8.webp",
      user: {
        image:
          "https://www.trickytravellers.com/uploads/avatars/9291f48f-6dcb-4727-8b00-f675512b9b9a.jpg",
        title: "TRICKY TRAVELLERS",
        desc: "The Trickest Travel Community",
      },
      title: "Explore the Charm of Winters in Dubai",
      desc: "",
      views: 103,
      time: "13 hours ago",
    },
    {
      img: "https://www.trickytravellers.com/uploads/posts/24441a37-54c1-4189-a9c7-54c45ab41bb8.webp",
      user: {
        image:
          "https://www.trickytravellers.com/uploads/avatars/9291f48f-6dcb-4727-8b00-f675512b9b9a.jpg",
        title: "TRICKY TRAVELLERS",
        desc: "The Trickest Travel Community",
      },
      title: "Explore the Charm of Winters in Dubai",
      desc: "",
      views: 103,
      time: "13 hours ago",
    },
    {
      img: "https://www.trickytravellers.com/uploads/posts/24441a37-54c1-4189-a9c7-54c45ab41bb8.webp",
      user: {
        image:
          "https://www.trickytravellers.com/uploads/avatars/9291f48f-6dcb-4727-8b00-f675512b9b9a.jpg",
        title: "TRICKY TRAVELLERS",
        desc: "The Trickest Travel Community",
      },
      title: "Explore the Charm of Winters in Dubai",
      desc: "",
      views: 103,
      time: "13 hours ago",
    },
    {
      img: "https://www.trickytravellers.com/uploads/posts/24441a37-54c1-4189-a9c7-54c45ab41bb8.webp",
      user: {
        image:
          "https://www.trickytravellers.com/uploads/avatars/9291f48f-6dcb-4727-8b00-f675512b9b9a.jpg",
        title: "TRICKY TRAVELLERS",
        desc: "The Trickest Travel Community",
      },
      title: "Explore the Charm of Winters in Dubai",
      desc: "",
      views: 103,
      time: "13 hours ago",
    },
    {
      img: "https://www.trickytravellers.com/uploads/posts/24441a37-54c1-4189-a9c7-54c45ab41bb8.webp",
      user: {
        image:
          "https://www.trickytravellers.com/uploads/avatars/9291f48f-6dcb-4727-8b00-f675512b9b9a.jpg",
        title: "TRICKY TRAVELLERS",
        desc: "The Trickest Travel Community",
      },
      title: "Explore the Charm of Winters in Dubai",
      desc: "",
      views: 103,
      time: "13 hours ago",
    },
    {
      img: "https://www.trickytravellers.com/uploads/posts/24441a37-54c1-4189-a9c7-54c45ab41bb8.webp",
      user: {
        image:
          "https://www.trickytravellers.com/uploads/avatars/9291f48f-6dcb-4727-8b00-f675512b9b9a.jpg",
        title: "TRICKY TRAVELLERS",
        desc: "The Trickest Travel Community",
      },
      title: "Explore the Charm of Winters in Dubai",
      desc: "",
      views: 103,
      time: "13 hours ago",
    },
    {
      img: "https://www.trickytravellers.com/uploads/posts/24441a37-54c1-4189-a9c7-54c45ab41bb8.webp",
      user: {
        image:
          "https://www.trickytravellers.com/uploads/avatars/9291f48f-6dcb-4727-8b00-f675512b9b9a.jpg",
        title: "TRICKY TRAVELLERS",
        desc: "The Trickest Travel Community",
      },
      title: "Explore the Charm of Winters in Dubai",
      desc: "",
      views: 103,
      time: "13 hours ago",
    },
    {
      img: "https://www.trickytravellers.com/uploads/posts/24441a37-54c1-4189-a9c7-54c45ab41bb8.webp",
      user: {
        image:
          "https://www.trickytravellers.com/uploads/avatars/9291f48f-6dcb-4727-8b00-f675512b9b9a.jpg",
        title: "TRICKY TRAVELLERS",
        desc: "The Trickest Travel Community",
      },
      title: "Explore the Charm of Winters in Dubai",
      desc: "",
      views: 103,
      time: "13 hours ago",
    },
    {
      img: "https://www.trickytravellers.com/uploads/posts/24441a37-54c1-4189-a9c7-54c45ab41bb8.webp",
      user: {
        image:
          "https://www.trickytravellers.com/uploads/avatars/9291f48f-6dcb-4727-8b00-f675512b9b9a.jpg",
        title: "TRICKY TRAVELLERS",
        desc: "The Trickest Travel Community",
      },
      title: "Explore the Charm of Winters in Dubai",
      desc: "",
      views: 103,
      time: "13 hours ago",
    },
    {
      img: "https://www.trickytravellers.com/uploads/posts/24441a37-54c1-4189-a9c7-54c45ab41bb8.webp",
      user: {
        image:
          "https://www.trickytravellers.com/uploads/avatars/9291f48f-6dcb-4727-8b00-f675512b9b9a.jpg",
        title: "TRICKY TRAVELLERS",
        desc: "The Trickest Travel Community",
      },
      title: "Explore the Charm of Winters in Dubai",
      desc: "",
      views: 103,
      time: "13 hours ago",
    },
  ]);
  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <div className="flex w-[72rem] h-[40rem] ">
        <div className="w-[25rem]">
          <form
            style={{
              filter:
                "drop-shadow(0 10px 8px rgb(0 150 0 / 0.15)) drop-shadow(0 4px 3px rgb(0 150 0 / 0.2)",
            }}
            className=""
          >
            <label
              for="default-search"
              class="mb-2 text-sm  font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class="relative ">
              <div class="absolute  inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  ariaHidden="true"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                class="block w-full p-4 pl-10 text-sm rounded-full"
                placeholder="Search"
                required
              />
              <button
                type="submit"
                class="text-white  absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  ariaHidden="true"
                  class="w-5 h-5 text-white "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
            </div>
          </form>
          <div className="rounded-3xl shadow-md">
            <div className="py-[2rem] px-[1rem] flex flex-col gap-[1rem]">
              <div className="flex cursor-pointer hover:bg-green-200 hover:translate-x-[5px] transition-all duration-300 gap-[0.8rem] items-center  px-4 py-3 rounded-xl text-[#059669] text-xl font-base">
                <i class="fi fi-rr-signal-alt-2 mt-[0.3rem]"></i>
                <h3>Weekly chart</h3>
              </div>
              <div className="flex cursor-pointer hover:bg-green-200 hover:translate-x-[5px] transition-all duration-300 gap-[0.8rem] items-center  px-4 py-3 rounded-xl text-[#059669] text-xl font-base">
                <i class="fi fi-rr-flame mt-[0.3rem]"></i>
                <h3>Top trends</h3>
              </div>
              <div className="flex cursor-pointer hover:bg-green-200 hover:translate-x-[5px] transition-all duration-300 gap-[0.8rem] items-center  px-4 py-3 rounded-xl text-[#059669] text-xl font-base">
                <i class="fi fi-sr-arrow-trend-up mt-[0.3rem]"></i>
                <h3>Most Viewed</h3>
              </div>
              <div className="flex cursor-pointer hover:bg-green-200 hover:translate-x-[5px] transition-all duration-300 gap-[0.8rem] items-center  px-4 py-3 rounded-xl text-[#059669] text-xl font-base">
                <i class="fi fi-rs-resources"></i>
                <h3>Categories</h3>
              </div>
              <div className="flex cursor-pointer hover:bg-green-200 hover:translate-x-[5px] transition-all duration-300 gap-[0.8rem] items-center  px-4 py-3 rounded-xl text-[#059669] text-xl font-base">
                <i class="fi fi-rr-graphic-style"></i>
                <h3>Destinations</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full pl-[1.5rem] pt-[1rem] grid grid-cols-3 /gap-y-[rem] overflow-y-auto scrollbar-hide">
          {allBlogs.map((el) => (
            <div>
              <div className="flex cursor-pointer flex-col gap-[0.5rem] w-[17rem] hover:shadow-md transition-all duration-300 rounded-lg p-4">
                <Link href="/event">
                  {" "}
                  <img className="object-fit w-full" src={el.img} alt="" />
                </Link>

                <div className="flex gap-[0.5rem]">
                  <img
                    className="w-[2.7rem] h-[2.7rem] rounded-full object-cover"
                    src={el.user.image}
                    alt=""
                  />
                  <div className="flex flex-col ">
                    <h3 className="font-medium">{el.user.title}</h3>
                    <h3 className="font-thin text-sm">{el.user.desc}</h3>
                  </div>
                </div>
                <hr />
                <h3 className="text-md font-medium">{el.title}</h3>
                <div className="flex gap-[0.4rem] text-sm">
                  <h3>{el.views + " Views"}</h3>
                  <h3>{"•"}</h3>
                  <h3>{el.time}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default blog;
