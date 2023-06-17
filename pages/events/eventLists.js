import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import { useRouter } from "next/router";
import { Tooltip } from "@nextui-org/react";

const eventLists = () => {
  var router = useRouter();

  const [eventName, setEventName] = useState();
  const [allListedEvents, setAllListedEvents] = useState([]);
  const [allFilteredEvents, setAllFilteredEvents] = useState([]);

  useEffect(() => {
    fetchAllEvents();
  }, []);

  useEffect(() => {
    if (eventName == "") {
      setAllFilteredEvents([]);
    }
  }, [eventName]);

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

    setAllListedEvents(res.data);
  };

  const updateEvent = async (event) => {
    console.log(event, "event");

    const response = await fetch(`/api/event/update/${event._id}`, {
      method: "PUT",
      body: JSON.stringify({ isPublished: !event.isPublished }),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlBheWFsXzcxIiwiZW1haWwiOiJ5b3VqanUyMDEyQGdtYWlsLmNvbSIsImlhdCI6MTY4MTYzMTM0Mn0.E8HDYPMP5goQiWQh2Ib8Uev8BXCPNRsnlFgLumIYaKGe_QTlvLMZESQvXLyy8om8UMVMQOUl3QZCN92h3ZpCS1mbcxhmMs2I5wYSH0v5MU8OTHvaDnfcVQ_mD7Q6laGvIG8Wdy-fj3W5o7gKDgLIlsCQ69D062uv_CFq89bo6epgSEb4pPdmmEiShKzfHIJ6i644v6kEYxyJuiprT3dQ1W4AJoeYYqTRizhbC4xABFL3a2PbTLfsHDoAur4WK6nY8jFCuA2fOXkP1YRkvjuiqHGTdh4lgid6Xcp_lmnrqh3xvdrxJO4iYQPo8PHnR7Dv2JhQwjQpRUdZeAdP0hPcig",
      },
    });
    const res = await response.json();

    console.log(res);

    fetchAllEvents();
  };

  const deleteEvent = async (event) => {
    console.log(event, "event");

    const response = await fetch(`/api/event/delete/${event._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlBheWFsXzcxIiwiZW1haWwiOiJ5b3VqanUyMDEyQGdtYWlsLmNvbSIsImlhdCI6MTY4MTYzMTM0Mn0.E8HDYPMP5goQiWQh2Ib8Uev8BXCPNRsnlFgLumIYaKGe_QTlvLMZESQvXLyy8om8UMVMQOUl3QZCN92h3ZpCS1mbcxhmMs2I5wYSH0v5MU8OTHvaDnfcVQ_mD7Q6laGvIG8Wdy-fj3W5o7gKDgLIlsCQ69D062uv_CFq89bo6epgSEb4pPdmmEiShKzfHIJ6i644v6kEYxyJuiprT3dQ1W4AJoeYYqTRizhbC4xABFL3a2PbTLfsHDoAur4WK6nY8jFCuA2fOXkP1YRkvjuiqHGTdh4lgid6Xcp_lmnrqh3xvdrxJO4iYQPo8PHnR7Dv2JhQwjQpRUdZeAdP0hPcig",
      },
    });
    const res = await response.json();

    console.log(res);

    fetchAllEvents();
  };

  const filterEvents = (e) => {
    e.preventDefault();

    let tempArray = [];

    for (const event of allListedEvents) {
      if (event?.title.toLowerCase().includes(eventName.toLowerCase())) {
        tempArray.push(event);
      }
    }

    setAllFilteredEvents(tempArray);
  };

  const displayContent = (status) => {
    return (
      <span class="font-semibold">
        {status}
        <a class="text-xs block underline" href="">
          Learn More
        </a>
      </span>
    );
  };

  const displayEventList = (event) => {
    return (
      <div className="grid grid-cols-4 gap-4 border-b-2">
        <div className="w-full py-6">
          <img
            className="rounded-lg"
            src={event.thumbnail}
            width={80}
            height={80}
            alt=""
          />
        </div>
        <div className="w-full py-6">{event.title}</div>
        <div className="w-full py-6">
          {event.isPublished ? (
            <Tooltip
              rounded
              color="success"
              contentColor="black"
              content={displayContent("Published")}
            >
              <svg
                title="Published"
                data-toggle="tooltip"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 16 16"
                class="bi bi-check"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
                />
              </svg>
            </Tooltip>
          ) : (
            <Tooltip
              rounded
              color="success"
              contentColor="black"
              content={displayContent("Saved in draft")}
            >
              <svg
                title="Saved in draft"
                data-toggle="tooltip"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="bi bi-clock-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"
                />
              </svg>
            </Tooltip>
          )}
        </div>
        <div className="w-full p-6">
          <div></div>
          <Popup
            trigger={
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                </svg>
              </button>
            }
            position="right top"
          >
            <div class="grid grid-cols-1 divide-y border shadow-lg py-2 px-4">
              <div className="text-xs pb-2">Manage Events</div>
              <div
                className="text-sm font-medium text-gray-500 pb-1 cursor-pointer hover:text-green-500"
                onClick={() =>
                  router.push(
                    {
                      pathname: "createEvent",
                      query: { event: JSON.stringify(event) },
                    },
                    "createEvent"
                  )
                }
              >
                Edit
              </div>
              <div
                className="text-sm font-medium text-gray-500 pb-1 cursor-pointer hover:text-green-500"
                onClick={() => updateEvent(event)}
              >
                {event.isPublished ? "Move to draft" : "Publish"}
              </div>
              <div className="text-sm font-medium text-gray-500 pb-1 cursor-pointer hover:text-green-500">
                Tickets
              </div>
              <div
                className="text-sm font-medium text-gray-500 cursor-pointer hover:text-green-500"
                onClick={() => deleteEvent(event)}
              >
                Delete
              </div>
            </div>
          </Popup>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl pt-[1.5rem] mx-auto w-full">
      <h2 className="text-lg font-bold mb-4">Listed Events</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between">
          <div className="flex-1">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-gray-900 dark:text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                class="block w-full p-4 pl-10 text-sm text-gray-900 border border-green-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-300 dark:border-green-600 dark:placeholder-gray-900 dark:text-black dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="Enter event title"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
              />
              <button
                type="submit"
                class="text-white absolute right-2.5 bottom-2.5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 hover:opacity-90 duration-200 focus:ring bg-gradient-to-tl from-black to-green-900"
                onClick={(e) => filterEvents(e)}
              >
                Search
              </button>
            </div>
          </div>
          <div className="flex-1"></div>
          <div className="justify-center">
            <button onClick={() => router.push({ pathname: "createEvent" })}>
              <a
                // href="https://www.trickytravellers.com/listing/add/event"
                class="h-10 bg-green-500 flex hover:bg-opacity-90 duration-200 focus:ring-4 ring-green-200 px-4 py-2 text-white font-semibold rounded-lg"
              >
                Add
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </a>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="w-full py-6 text-gray-700 font-bold">Thumbnail</div>
          <div className="w-full py-6 text-gray-700 font-bold">Title</div>
          <div className="w-full py-6 text-gray-700 font-bold">Status</div>
          <div className="w-full py-6 text-gray-700 font-bold"></div>
        </div>
        {allFilteredEvents && allFilteredEvents.length > 0 ? (
          allFilteredEvents.map((event) => displayEventList(event))
        ) : allListedEvents && allListedEvents.length > 0 ? (
          allListedEvents.map((event) => displayEventList(event))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default eventLists;
