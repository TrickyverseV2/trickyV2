import React, { useState, useEffect } from "react";
import Moment from "moment";
import { useRouter } from "next/router";

const events = () => {
  var router = useRouter();
  const [valueToFilterOn, setValueToFilterOn] = useState();

  const [allEventTypes, setAllEventTypes] = useState([
    {
      img: "/musical-notes.svg",
      title: "Music",
      color: "from-red-500 to-red-200",
      hover: "hover:border-red-500",
    },
    {
      img: "/walk.svg",
      title: "Day Outing",
      color: "from-yellow-500 to-yellow-200",
      hover: "hover:border-yellow-500",
    },
    {
      img: "/bio.svg",
      title: "Environment",
      color: "from-green-500 to-green-200",
      hover: "hover:border-green-500",
    },
    {
      img: "/firework.svg",
      title: "Festivals",
      color: "from-blue-500 to-blue-200",
      hover: "hover:border-blue-500",
    },
    {
      img: "/laptop.svg",
      title: "Online",
      color: "from-pink-500 to-pink-200",
      hover: "hover:border-pink-500",
    },
  ]);
  const [filteredEvents, setAllFilteredEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  useEffect(() => {
    fetchAllEvents();
  }, []);

  useEffect(() => {
    if (valueToFilterOn == "") {
      setAllFilteredEvents(allEvents);
    }
  }, [valueToFilterOn]);

  const handleFilter = (e) => {
    e.preventDefault();

    let tempArray = [];

    for (const event of allEvents) {
      const value = valueToFilterOn.toLowerCase();
      if (
        event?.title.toLowerCase().includes(value) ||
        event?.venue.toLowerCase().includes(value) ||
        event?.location.toLowerCase().includes(value)
      ) {
        tempArray.push(event);
      }
    }

    setAllFilteredEvents(tempArray);
  };

  const fetchAllEvents = async () => {
    const response = await fetch("/api/event/get/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlBheWFsXzcxIiwiZW1haWwiOiJ5b3VqanUyMDEyQGdtYWlsLmNvbSIsImlhdCI6MTY4MTYzMTM0Mn0.E8HDYPMP5goQiWQh2Ib8Uev8BXCPNRsnlFgLumIYaKGe_QTlvLMZESQvXLyy8om8UMVMQOUl3QZCN92h3ZpCS1mbcxhmMs2I5wYSH0v5MU8OTHvaDnfcVQ_mD7Q6laGvIG8Wdy-fj3W5o7gKDgLIlsCQ69D062uv_CFq89bo6epgSEb4pPdmmEiShKzfHIJ6i644v6kEYxyJuiprT3dQ1W4AJoeYYqTRizhbC4xABFL3a2PbTLfsHDoAur4WK6nY8jFCuA2fOXkP1YRkvjuiqHGTdh4lgid6Xcp_lmnrqh3xvdrxJO4iYQPo8PHnR7Dv2JhQwjQpRUdZeAdP0hPcig",
      },
    });
    const res = await response.json();

    setAllFilteredEvents(res.data);
    setAllEvents(res.data);
  };
  const handleEventTypeClick = async (eventType) => {
    const response = await fetch("/api/event/get/by-event-type", {
      method: "POST",
      body: JSON.stringify({ eventType }),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlBheWFsXzcxIiwiZW1haWwiOiJ5b3VqanUyMDEyQGdtYWlsLmNvbSIsImlhdCI6MTY4MTYzMTM0Mn0.E8HDYPMP5goQiWQh2Ib8Uev8BXCPNRsnlFgLumIYaKGe_QTlvLMZESQvXLyy8om8UMVMQOUl3QZCN92h3ZpCS1mbcxhmMs2I5wYSH0v5MU8OTHvaDnfcVQ_mD7Q6laGvIG8Wdy-fj3W5o7gKDgLIlsCQ69D062uv_CFq89bo6epgSEb4pPdmmEiShKzfHIJ6i644v6kEYxyJuiprT3dQ1W4AJoeYYqTRizhbC4xABFL3a2PbTLfsHDoAur4WK6nY8jFCuA2fOXkP1YRkvjuiqHGTdh4lgid6Xcp_lmnrqh3xvdrxJO4iYQPo8PHnR7Dv2JhQwjQpRUdZeAdP0hPcig",
      },
    });
    const res = await response.json();

    setAllFilteredEvents(res.data);
  };

  return (
    <div className="flex justify-center items-center w-[80vw] h-[100vh]">
      <div className="flex w-[75rem] h-[40rem] ">
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
                value={valueToFilterOn}
                onChange={(e) => setValueToFilterOn(e.target.value)}
                required
              />
              <button
                onClick={(e) => handleFilter(e)}
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
          {/* <div className="rounded-3xl shadow-md">
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
          </div> */}
        </div>

        <div
          className="w-full 
        h-full grid-rows-2 overflow-y-auto scrollbar-hide"
        >
          <h1 className="pl-[1rem] text-lg font-medium">Types</h1>
          <div className="w-full pl-[1rem] pt-[1rem] grid grid-cols-5 gap-x-[1.3rem] /gap-y-[rem] overflow-y-auto scrollbar-hide">
            {allEventTypes.map((el) => (
              <div onClick={() => handleEventTypeClick(el.title)}>
                <div
                  className={`flex cursor-pointer flex-col gap-[0.2rem] h-[10rem] w-[10rem] hover:shadow-md transition-all hover:border-double hover:border-4 ${el.hover} duration-300 rounded-lg p-4 ${el.color} bg-gradient-to-tl w-full block`}
                >
                  <h3 className="text-xl font-bold">{el.title}</h3>
                  <div className="flex justify-center">
                    <img
                      className="object-fit w-[4rem] mt-3"
                      src={el.img}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className="w-full pl-[1rem] grid grid-cols-3 gap-y-[1rem] gap-x-[1.5rem] mt-4"
            style={{ fontFamily: "kanit" }}
          >
            {filteredEvents.length > 0 &&
              filteredEvents.map((event) => (
                <div
                  className="flex cursor-pointer flex-col gap-[0.5rem] w-[17rem] shadow-md hover:shadow-2xl transition-all duration-300 rounded-lg "
                  onClick={() =>
                    router.push(
                      {
                        pathname: `${event._id}`,
                        query: { eventDetails: JSON.stringify(event) },
                      },
                      `${event._id}`
                    )
                  }
                >
                  <img
                    className="object-fit w-full rounded-lg"
                    src={event.thumbnail}
                    alt=""
                  />
                  <div className="px-4 pb-4">
                    <div className="flex gap-[0.5rem]">
                      <div className="flex flex-col ">
                        <h3 className="font-semibold text-lg">
                          {event?.title}
                        </h3>
                      </div>
                    </div>
                    <hr />
                    <div className="flex mt-1 ">
                      <span class="bg-green-100 text-green-500 p-1 rounded-xl material-icons mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
                        </svg>
                      </span>
                      <h3 className="pt-2 text-xs font-bold transition-all duration-200 text-gray-500 1line-clamp-6">
                        {Moment(event?.eventDate).format("MMM DD, YYYY")}
                      </h3>
                    </div>
                    <div class="flex mt-2">
                      <span class="bg-green-100 text-green-500 p-1 rounded-xl material-icons mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          enable-background="new 0 0 24 24"
                          height="20"
                          viewBox="0 0 24 24"
                          width="20"
                        >
                          <g>
                            <path d="M0,0h24v24H0V0z" fill="none" />
                          </g>
                          <g>
                            <path d="M12,2c-4.2,0-8,3.22-8,8.2c0,3.32,2.67,7.25,8,11.8c5.33-4.55,8-8.48,8-11.8C20,5.22,16.2,2,12,2z M12,12c-1.1,0-2-0.9-2-2 c0-1.1,0.9-2,2-2c1.1,0,2,0.9,2,2C14,11.1,13.1,12,12,12z" />
                          </g>
                        </svg>
                      </span>
                      <h3 className="text-sm text-gray-500 font-semibold">
                        {event?.venue}
                      </h3>
                    </div>
                    {/* <div class="flex items-center my-1">
                    <div class="p-1 bg-yellow-100 rounded-lg">
                      <svg
                        width="20"
                        height="20"
                        fill="rgba(251, 191, 36)"
                        class=""
                      >
                        <path d="M9.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.784-.57-.381-1.81.587-1.81H7.03a1 1 0 00.95-.69L9.05 3.69z" />
                      </svg>
                    </div>
                    <div class="ml-1">
                      <span class="text-black">{`${stay?.rating ?? "0"}.0 (${
                        stay?.reviews ? stay?.reviews?.length : "0"
                      } reviews)`}</span>
                    </div> */}
                    {/* </div> */}
                    <div className="flex mt-2 justify-between gap-[0.4rem] text-lg font-bold text-green-600">
                      <h3>{"₹" + event?.price}</h3>
                      {/* <button
                      type="button"
                      class="mr-2 bg-green-500 text-white text-sm font-semibold px-6 py-1.5 rounded-lg hover:bg-green-400 duration-200 focus:ring bg-gradient-to-tl from-black to-green-900 z-10"
                      onClick={(e) => addRecord(e, stay)}
                    >
                      Book now
                    </button> */}
                    </div>
                    {/* <div
                    className={`relative group cursor-pointer overflow-hidden w-[17rem] h-[12rem]`}
                  >
                    <img
                      src={event.thumbnail}
                      className="h-full rounded-xl object-fill"
                      alt=""
                    />
                    <div className="p-3 overflow-hidden absolute  bottom-0  left-0 right-0 cursor-pointer">
                      <div className=" 1backdrop-blur-[2px] 1border-[1px] 1border-[rgba(255,255,255,0.2)] group-hover:bg-green-100 bg-transparent cursor-pointer rounded-lg 1group-hover:bg-[rgba(0,0,0,0.3)] group-hover:h-[7rem] h-[3rem] transition-all duration-300 p-2">
                        <div className="flex flex-col justify-between h-full">
                          <div>
                            <span
                              className="text-lg tracking-wider group-hover:text-black group-hover:visible invisible flex gap-[0.3rem] font-semibold"
                              style={{ fontFamily: "kanit" }}
                            >
                              <h3>{event.title}</h3>
                              <i
                                className={`fi hidden group-hover:flex cursor-pointer scale-[0.9] fi-rr-star 1flex items-center justify-center`}
                              ></i>
                            </span>

                            <h3 className="text-xs font-bold group-hover:opacity-100 transition-all duration-200 delay-200 opacity-0 text-gray-500 1line-clamp-6 1group-hover:line-clamp-[6]">
                              {Moment(event.eventDate).format("MMM DD, YYYY")}
                            </h3>
                            <div className="flex flex-row gap-x-[0.3rem]">
                              <i className="fa fa-map-marker fill-red"></i>
                              <h3 className="text-xs font-bold group-hover:opacity-100 transition-all duration-200 delay-200 opacity-0 text-gray-500 1line-clamp-6 1group-hover:line-clamp-[6]">
                                {event.venue}
                              </h3>
                            </div>
                          </div>
                          <div className="group-hover:opacity-100 items-end delay-200 flex gap-[0.2rem] opacity-0 transition-all duration-200">
                            <h3 className="text-lg font-bold text-green-600">
                              {"₹" + event.price}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default events;
