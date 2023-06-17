import React, { useState } from "react";

const DiscoverComponent = () => {
  const [CurrentMenu, setCurrentMenu] = React.useState("Popular Places");
  const [allPopularPlaces, setallPopularPlaces] = useState([
    {
      img: "/sikkim.webp",
      title: "Sikkim",
      desc: `Sikkim is a beautiful state located in northeastern India, bordered by Nepal, Bhutan, and Tibet. It is known for its natural beauty, serene landscapes, and rich cultural heritage. The state is often referred to as the "Land of Mystical Splendor" due to its stunning mountains, lush forests, and pristine lakes.`,
      price: "₹1000/day",
    },
    {
      img: "/himachal.webp",
      title: "Himachal",
      desc: `Himachal Pradesh is a beautiful state located in northern India, known for its picturesque landscapes, snow-capped mountains, dense forests, and rich cultural heritage. The state is often referred to as the "Land of Gods" due to its numerous ancient temples and religious sites.`,
      price: "₹1000/day",
    },
    {
      img: "/rajasthan.webp",
      title: "Rajasthan",
      desc: "Stunning forts and havelis; admirable people music; heap stories of gallantry and mouth-watering food invite you to the socially well off province of Rajasthan",
      price: "₹1000/day",
    },
    {
      img: "/kerala.webp",
      title: "Kerala",
      desc: `Kerala is a state located in the southwestern region of India, known for its scenic beauty, diverse culture, and rich history. The state is often referred to as "God's Own Country" due to its stunning natural landscapes, including palm-lined beaches, serene backwaters, and lush green hills.`,
      price: "₹1000/day",
    },
    {
      img: "/madhya_pradesh.webp",
      title: "Madhya Pradesh",
      desc: `Madhya Pradesh is a state located in central India, known for its rich history, diverse culture, and natural beauty. The state is often referred to as the "Heart of India" due to its geographical location and its significance in the country's history and culture.`,
      price: "₹1000/day",
    },
  ]);
  return (
    <div className="my-[0.5rem]">
      <div className="flex flex-col gap-[0.5rem]">
        <div>
          <h3
            className="font-semibold text-2xl"
            style={{ fontFamily: "kanit" }}
          >
            Discover World🌈
          </h3>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-[1rem] text-gray-400 font-medium">
            <button
              onClick={() => {
                setCurrentMenu("Popular Places");
              }}
              className={`${
                CurrentMenu == "Popular Places" ? "text-green-600" : ""
              }`}
            >
              Popular Places
            </button>
            <button
              onClick={() => {
                setCurrentMenu("Recommended");
              }}
              className={`${
                CurrentMenu == "Recommended" ? "text-green-600" : ""
              }`}
            >
              Recommended
            </button>
            <button
              onClick={() => {
                setCurrentMenu("Near Me");
              }}
              className={`${CurrentMenu == "Near Me" ? "text-green-600" : ""}`}
            >
              Near Me
            </button>
          </div>
          <button className="flex items-center justify-center gap-[0.2rem] font-medium text-green-600">
            <h3>View All</h3>
            <i class="fi fi-rr-arrow-small-right align-middle flex items-center justify-center"></i>
          </button>
        </div>
      </div>
      <div className="my-[1rem]">
        <div className="flex 1grid grid-cols-5 gap-[1rem]">
          {allPopularPlaces.map((el) => (
            <div className="relative group cursor-pointer overflow-hidden w-[15rem] h-[20rem]">
              <img
                src={el.img}
                className="h-full rounded-xl object-cover"
                alt=""
              />
              <div className="p-3 overflow-hidden absolute  bottom-0  left-0 right-0 cursor-pointer">
                <div className=" 1backdrop-blur-[2px] 1border-[1px] 1border-[rgba(255,255,255,0.2)] group-hover:bg-white bg-transparent cursor-pointer rounded-lg 1group-hover:bg-[rgba(0,0,0,0.3)] group-hover:h-[11rem] h-[3rem] transition-all duration-300 p-2">
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <span
                        className="text-lg tracking-wider group-hover:text-black text-white flex gap-[0.3rem] font-semibold"
                        style={{ fontFamily: "kanit" }}
                      >
                        <h3>{el.title}</h3>
                        <i
                          className={`fi hidden group-hover:flex cursor-pointer scale-[0.9] fi-rr-star 1flex items-center justify-center`}
                        ></i>
                      </span>
                      <h3 className="text-xs group-hover:opacity-100 transition-all duration-200 delay-200 opacity-0 text-gray-500  1line-clamp-6 1group-hover:line-clamp-[6]">
                        {el.desc.length > 180
                          ? el.desc.substring(0, 180) + "..."
                          : el.desc}
                      </h3>
                    </div>
                    <div className="group-hover:opacity-100 items-end delay-200 flex gap-[0.2rem] opacity-0 transition-all duration-200">
                      <h3 className="text-lg text-green-600">
                        {el.price.split("/")[0]}
                      </h3>
                      <h3>{"/"}</h3>
                      <h3>{el.price.split("/")[1]}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverComponent;
