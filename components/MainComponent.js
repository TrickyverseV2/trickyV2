import React from "react";
import DiscoverComponent from "./DiscoverComponent";
import EventsComponent from "./EventsComponent";
import StaysComponent from "./StaysComponent";
import SectionLandingPage from "./SectionLandingPage";

const MainComponent = () => {
  return (
    <div className="p-3 w-[78rem] h-[100vh] overflow-y-scroll 1h-auto">
      <div
        style={{ backgroundColor: "whitesmoke" }}
        className=" h-[100vh] w-full overflow-y-scroll scrollbar-hide rounded-xl drop-shadow-lg 1overflow-hidden border-[1px] border-[rgba(0,0,0,0.1)]"
      >
        <div className="py-4 h-full px-[1.5rem] overflow-y-scroll scrollbar-hide">
          <div className="flex h-full flex-col gap-[0.5rem] overflow-y-scroll scrollbar-hide">
            <div
              style={{ fontFamily: "kanit" }}
              className="flex gap-[0.4rem] font-semibold text-2xl"
            >
              <h3>Hello,</h3>
              <h3>Payal!🤙</h3>
            </div>
            <div>
              <h3 className="font-medium text-gray-500">
                Welcome back and explore the world
              </h3>
            </div>
            <div className="my-[0.5rem] drop-shadow-lg">
              <form
                className="flex items-center"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <label for="voice-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="voice-search"
                    className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                    placeholder="Search Destination"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 text-gray-500  hover:text-black "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-[rgb(29,188,114)] hover:bg-[rgb(24,159,96)] transition-all duration-200  rounded-lg border "
                >
                  <i className="fi fi-rr-settings-sliders"></i>
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-[rgb(29,188,114)]  hover:bg-[rgb(24,159,96)] transition-all duration-200  rounded-lg border "
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 mr-2 -ml-1"
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
                  Search
                </button>
              </form>
            </div>
            <DiscoverComponent />
            <EventsComponent />
            <StaysComponent />
            {/* <SectionLandingPage /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
