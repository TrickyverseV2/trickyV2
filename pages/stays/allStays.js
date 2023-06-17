import React, { useState, useEffect } from "react";
import Moment from "moment";
import { useRouter } from "next/router";

const stays = () => {
  var router = useRouter();

  const [allFilteredStays, setAllFilteredStays] = useState([]);
  const [allStays, setAllStays] = useState([]);
  const [valueToFilterOn, setValueToFilterOn] = useState();
  const [selectedEventType, setSelectedEventType] = useState([]);
  const [selectedRating, setSelectedRating] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("10000");

  // console.log(selectedPrice, "selectedPrice");

  useEffect(() => {
    fetchAllStays();
  }, []);

  useEffect(() => {
    if (valueToFilterOn == "") {
      setAllFilteredStays(allStays);
    }
  }, [valueToFilterOn]);

  const fetchAllStays = async () => {
    const response = await fetch("/api/stays/get/get-all-stays", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlBheWFsXzcxIiwiZW1haWwiOiJ5b3VqanUyMDEyQGdtYWlsLmNvbSIsImlhdCI6MTY4MTYzMTM0Mn0.E8HDYPMP5goQiWQh2Ib8Uev8BXCPNRsnlFgLumIYaKGe_QTlvLMZESQvXLyy8om8UMVMQOUl3QZCN92h3ZpCS1mbcxhmMs2I5wYSH0v5MU8OTHvaDnfcVQ_mD7Q6laGvIG8Wdy-fj3W5o7gKDgLIlsCQ69D062uv_CFq89bo6epgSEb4pPdmmEiShKzfHIJ6i644v6kEYxyJuiprT3dQ1W4AJoeYYqTRizhbC4xABFL3a2PbTLfsHDoAur4WK6nY8jFCuA2fOXkP1YRkvjuiqHGTdh4lgid6Xcp_lmnrqh3xvdrxJO4iYQPo8PHnR7Dv2JhQwjQpRUdZeAdP0hPcig",
      },
    });
    const res = await response.json();

    setAllFilteredStays(res.data);
    setAllStays(res.data);
  };

  const handleFilter = (e) => {
    e.preventDefault();

    let tempArray = [];

    for (const event of allStays) {
      const value = valueToFilterOn.toLowerCase();
      if (
        event?.title.toLowerCase().includes(value) ||
        event?.address.toLowerCase().includes(value)
      ) {
        tempArray.push(event);
      }
    }
    setAllFilteredStays(tempArray);
  };

  useEffect(() => {
    handleFilterByPrice();
  }, [selectedPrice]);

  const handleFilterByPrice = async () => {
    if (selectedPrice) {
      const response = await fetch("/api/stays/get/by-price", {
        method: "POST",
        body: JSON.stringify({ price: selectedPrice }),
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlBheWFsXzcxIiwiZW1haWwiOiJ5b3VqanUyMDEyQGdtYWlsLmNvbSIsImlhdCI6MTY4MTYzMTM0Mn0.E8HDYPMP5goQiWQh2Ib8Uev8BXCPNRsnlFgLumIYaKGe_QTlvLMZESQvXLyy8om8UMVMQOUl3QZCN92h3ZpCS1mbcxhmMs2I5wYSH0v5MU8OTHvaDnfcVQ_mD7Q6laGvIG8Wdy-fj3W5o7gKDgLIlsCQ69D062uv_CFq89bo6epgSEb4pPdmmEiShKzfHIJ6i644v6kEYxyJuiprT3dQ1W4AJoeYYqTRizhbC4xABFL3a2PbTLfsHDoAur4WK6nY8jFCuA2fOXkP1YRkvjuiqHGTdh4lgid6Xcp_lmnrqh3xvdrxJO4iYQPo8PHnR7Dv2JhQwjQpRUdZeAdP0hPcig",
        },
      });
      const res = await response.json();
      if (selectedRating.length > 0 || selectedEventType.length > 0) {
        setAllFilteredStays([...allFilteredStays, ...res.data]);
      } else {
        setAllFilteredStays(res.data);
      }
    }
  };

  const handleFilterByType = async (eventType) => {
    var temp = selectedEventType;
    if (selectedEventType.includes(eventType)) {
      var index = selectedEventType.indexOf(eventType);
      temp.splice(index, 1);
    } else {
      temp.push(eventType);
    }

    setSelectedEventType(temp);

    if (selectedEventType.length > 0) {
      const response = await fetch("/api/stays/get/get-stay-by-type", {
        method: "POST",
        body: JSON.stringify({ stayType: selectedEventType }),
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlBheWFsXzcxIiwiZW1haWwiOiJ5b3VqanUyMDEyQGdtYWlsLmNvbSIsImlhdCI6MTY4MTYzMTM0Mn0.E8HDYPMP5goQiWQh2Ib8Uev8BXCPNRsnlFgLumIYaKGe_QTlvLMZESQvXLyy8om8UMVMQOUl3QZCN92h3ZpCS1mbcxhmMs2I5wYSH0v5MU8OTHvaDnfcVQ_mD7Q6laGvIG8Wdy-fj3W5o7gKDgLIlsCQ69D062uv_CFq89bo6epgSEb4pPdmmEiShKzfHIJ6i644v6kEYxyJuiprT3dQ1W4AJoeYYqTRizhbC4xABFL3a2PbTLfsHDoAur4WK6nY8jFCuA2fOXkP1YRkvjuiqHGTdh4lgid6Xcp_lmnrqh3xvdrxJO4iYQPo8PHnR7Dv2JhQwjQpRUdZeAdP0hPcig",
        },
      });
      const res = await response.json();
      if (selectedRating.length > 0 || selectedPrice != "10000") {
        setAllFilteredStays([...allFilteredStays, ...res.data]);
      } else {
        setAllFilteredStays(res.data);
      }
    } else {
      if (selectedRating.length > 0 || selectedPrice != "10000") {
        setAllFilteredStays(allFilteredStays);
      } else {
        setAllFilteredStays(allStays);
      }
    }
  };

  const handleFilterByRating = async (rating) => {
    var temp = selectedRating;
    if (selectedRating.includes(rating)) {
      var index = selectedRating.indexOf(rating);
      temp.splice(index, 1);
    } else {
      temp.push(rating);
    }
    console.log(temp, "temp");
    setSelectedRating(temp);
    console.log(selectedRating, "selectedRating");

    if (selectedRating.length > 0) {
      const response = await fetch("/api/stays/get/get-stay-by-rating", {
        method: "POST",
        body: JSON.stringify({ rating: selectedRating }),
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlBheWFsXzcxIiwiZW1haWwiOiJ5b3VqanUyMDEyQGdtYWlsLmNvbSIsImlhdCI6MTY4MTYzMTM0Mn0.E8HDYPMP5goQiWQh2Ib8Uev8BXCPNRsnlFgLumIYaKGe_QTlvLMZESQvXLyy8om8UMVMQOUl3QZCN92h3ZpCS1mbcxhmMs2I5wYSH0v5MU8OTHvaDnfcVQ_mD7Q6laGvIG8Wdy-fj3W5o7gKDgLIlsCQ69D062uv_CFq89bo6epgSEb4pPdmmEiShKzfHIJ6i644v6kEYxyJuiprT3dQ1W4AJoeYYqTRizhbC4xABFL3a2PbTLfsHDoAur4WK6nY8jFCuA2fOXkP1YRkvjuiqHGTdh4lgid6Xcp_lmnrqh3xvdrxJO4iYQPo8PHnR7Dv2JhQwjQpRUdZeAdP0hPcig",
        },
      });
      const res = await response.json();
      if (selectedEventType.length > 0 || selectedPrice != "10000") {
        setAllFilteredStays([...allFilteredStays, ...res.data]);
      } else {
        setAllFilteredStays(res.data);
      }
    } else {
      if (selectedEventType.length > 0 || selectedPrice != "10000") {
        setAllFilteredStays(allFilteredStays);
      } else {
        setAllFilteredStays(allStays);
      }
    }
  };

  const addRecord = async (e, stay) => {
    e.preventDefault();
    console.log(stay, "stay");
    const mobileNumber = stay?.user?.mobileNumber;
    window.location.href = `https://wa.me/${mobileNumber}?text=hi`;
    const response = await fetch("/api/stays/add-record", {
      method: "POST",
      body: JSON.stringify({
        stayId: stay?._id,
        ownerEmail: stay?.user?.email,
        ownerMobileNumber: mobileNumber,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlBheWFsQDEiLCJlbWFpbCI6InBheWFsY2hhdWRoYXJ5QGdtYWlsLmNvbSIsImlhdCI6MTY4MTc1Njg4N30.hEt7cHOJ4z5mFTQ5mKvK4JoBN_dfvrKTWAmC86NNVOe0KXr58Zjj_67SVDQl1vRMfVUl51OmfhRQzKt7frwsWtNBT4vpO1oJ9jHvB7TF5Z_y4SW0eS9kiwP_tDQS_9T3ew5h7niNLSEBxdNve3rUsn1kFkoQsGk56dcSTjfv4_f8HPl-lRTpY4SIV2jm5VHNfLLxHMcpQD3JMm02bXU5DC8XdONPUa4nE5_9mT1howD5UvZF8l70qxqPRsqtmdOs50u0iXlXae3Hf5yFQRoq5pk6vs1Bu6ZYIMUqSP4pyi55M6ARcRUfqyT2DTVvYeGXlJR-e2j4NmP0xjgBkmzZOQ",
      },
    });
    const res = await response.json();

    console.log(res, "res");
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-bold mx-4 mt-4">{"Stays"}</h2>
      <div className="flex justify-center items-center w-[80vw] h-[95vh]">
        <div className="flex w-[75rem] h-[40rem]">
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
                  type="submit"
                  class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={(e) => {
                    if (valueToFilterOn && valueToFilterOn != "") {
                      handleFilter(e);
                    }
                  }}
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
            <div
              class="mt-3 mb-4 border p-3 rounded-lg bg-white"
              style={{
                filter:
                  "drop-shadow(0 10px 8px rgb(0 150 0 / 0.15)) drop-shadow(0 4px 3px rgb(0 150 0 / 0.2)",
              }}
            >
              <h3 class="font-bold">Filter By</h3>
              <hr class="w-10 mb-2" />
              <div class="">
                <label for="range" class="text-gray-700">
                  Price range
                </label>
                <input
                  type="range"
                  min="1"
                  max="10000"
                  id="range"
                  class="slider w-full"
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                />
                <div class="flex">
                  <span>Min 0</span>
                  <span class="ml-auto">{selectedPrice}</span>
                  <span class="ml-auto">Max 10000</span>
                </div>
                <hr class="my-4" />
                <p class="mb-2 font-semibold">Property Type</p>
                <label for="Tree house" class="block mb-2">
                  <input
                    class="mr-2 form-tick appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-green-600 checked:border-transparent focus:outline-none"
                    type="checkbox"
                    id="Tree house"
                    onClick={() => handleFilterByType("Tree house")}
                  />{" "}
                  Tree house
                </label>
                <label for="Houseboat" class="block mb-2">
                  <input
                    class="mr-2 form-tick appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-green-600 checked:border-transparent focus:outline-none"
                    type="checkbox"
                    id="Houseboat"
                    onClick={() => handleFilterByType("Houseboat")}
                  />{" "}
                  Houseboat
                </label>
                <label for="Camps" class="block mb-2">
                  <input
                    class="mr-2 form-tick appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-green-600 checked:border-transparent focus:outline-none"
                    type="checkbox"
                    id="Camps"
                    onClick={() => handleFilterByType("Camps")}
                  />{" "}
                  Camps
                </label>
                <label for="Hostel" class="block mb-2">
                  <input
                    class="mr-2 form-tick appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-green-600 checked:border-transparent focus:outline-none"
                    type="checkbox"
                    id="Hostel"
                    onClick={() => handleFilterByType("Hostel")}
                  />{" "}
                  Hostel
                </label>
                <label for="Cottage" class="block mb-2">
                  <input
                    class="mr-2 form-tick appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-green-600 checked:border-transparent focus:outline-none"
                    type="checkbox"
                    id="Cottage"
                    onClick={() => handleFilterByType("Cottage")}
                  />{" "}
                  Cottage{" "}
                </label>
                <label for="Lodge" class="block mb-2">
                  <input
                    class={`mr-2 form-tick appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-green-600 checked:border-transparent focus:outline-none`}
                    type="checkbox"
                    id="Lodge"
                    onClick={() => handleFilterByType("Lodge")}
                  />{" "}
                  Lodge
                </label>
                <label for="Resort" class="block mb-2">
                  <input
                    class="mr-2 form-tick appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-green-600 checked:border-transparent focus:outline-none"
                    type="checkbox"
                    id="Resort"
                    onClick={() => handleFilterByType("Resort")}
                  />{" "}
                  Resort
                </label>
                <label for="Homestay" class="block mb-2">
                  <input
                    class="mr-2 form-tick appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-green-600 checked:border-transparent focus:outline-none"
                    type="checkbox"
                    id="Homestay"
                    onClick={() => handleFilterByType("Homestay")}
                  />{" "}
                  Homestay
                </label>
                {/* <label for="Heritage" class="block mb-2">
                  <input
                    class="mr-2 form-tick appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-green-600 checked:border-transparent focus:outline-none"
                    type="checkbox"
                    id="Heritage"
                    onClick={() => handleFilterByType("Heritage")}
                  />{" "}
                  Heritage
                </label> */}
                <label for="Farms" class="block mb-2">
                  <input
                    class="mr-2 form-tick appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-green-600 checked:border-transparent focus:outline-none"
                    type="checkbox"
                    id="Farms"
                    onClick={() => handleFilterByType("Farms")}
                  />{" "}
                  Farms
                </label>

                <hr class="my-4" />
                <p class="mb-2 font-semibold">Review Score</p>
                <label for="star1" class="mr-3">
                  <input
                    class="mr-1 form-tick appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-green-600 checked:border-transparent focus:outline-none"
                    type="checkbox"
                    id="star1"
                    onClick={() => handleFilterByRating(2)}
                  />{" "}
                  2
                </label>
                <label for="star2" class="mr-3">
                  <input
                    class="mr-1 form-tick appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-green-600 checked:border-transparent focus:outline-none"
                    type="checkbox"
                    id="star2"
                    onClick={() => handleFilterByRating(4)}
                  />{" "}
                  4
                </label>
                <label for="star3" class="mr-3">
                  <input
                    class="mr-1 form-tick appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-green-600 checked:border-transparent focus:outline-none"
                    type="checkbox"
                    id="star3"
                    onClick={() => handleFilterByRating(6)}
                  />{" "}
                  6
                </label>
                <label for="star4" class="mr-3">
                  <input
                    class="mr-1 form-tick appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-green-600 checked:border-transparent focus:outline-none"
                    type="checkbox"
                    id="star4"
                    onClick={() => handleFilterByRating(8)}
                  />{" "}
                  8
                </label>
                <label for="star5" class="mr-1">
                  <input
                    class="mr-1 form-tick appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-green-600 checked:border-transparent focus:outline-none"
                    type="checkbox"
                    id="star5"
                    onClick={() => handleFilterByRating(10)}
                  />{" "}
                  10
                </label>
              </div>
            </div>
          </div>

          <div
            style={{ fontFamily: "kanit" }}
            className="w-full pl-[1.5rem] grid grid-cols-3 gap-y-[1rem] overflow-y-auto scrollbar-hide "
          >
            {allFilteredStays.length > 0 &&
              allFilteredStays.map((stay, index) => (
                <div
                  key={stay?._id}
                  className="flex cursor-pointer flex-col gap-[0.5rem] w-[17rem] shadow-md hover:shadow-2xl transition-all duration-300 rounded-lg"
                >
                  <div
                    onClick={() =>
                      router.push(
                        {
                          pathname: `${stay._id}`,
                          query: { stayDetails: JSON.stringify(stay) },
                        },
                        `${stay._id}`
                      )
                    }
                  >
                    <img
                      className="object-fit w-full rounded-lg"
                      src={stay.thumbnail}
                      alt=""
                    />
                    <div className="px-4 py-4">
                      <div className="flex gap-[0.5rem]">
                        <div className="flex flex-col ">
                          <h3 className="font-semibold text-lg">
                            {stay?.title}
                          </h3>
                        </div>
                      </div>
                      <hr />
                      <div class="flex">
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
                          {stay?.address}
                        </h3>
                      </div>
                      <div class="flex items-center my-1">
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
                          <span class="text-black">{`${
                            stay?.rating ?? "0"
                          }.0 (${
                            stay?.reviews ? stay?.reviews?.length : "0"
                          } reviews)`}</span>
                        </div>
                      </div>
                      <div className="flex mt-2 justify-between gap-[0.4rem] text-lg font-bold text-green-600">
                        <h3>{"₹" + stay?.price}</h3>
                        <button
                          type="button"
                          class="mr-2 bg-green-500 text-white text-sm font-semibold px-6 py-1.5 rounded-lg hover:bg-green-400 duration-200 focus:ring bg-gradient-to-tl from-black to-green-900 z-10"
                          onClick={(e) => addRecord(e, stay)}
                        >
                          Book now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default stays;
