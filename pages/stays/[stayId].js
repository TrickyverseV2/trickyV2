import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const stay = () => {
  var router = useRouter();

  const [faq, setFaq] = useState([
    {
      id: 0,
      question: "Is there high speed internet available?",
      answer:
        "Our coworking place has high speed Optical fibre internet connection with 100Mbps speed, along with a backup wifi to make sure you can seamlessly work from mountains. Also this coworking place has a good coverage of all major telecom operators like Airtel and Jio.",
      isShowAnswer: false,
    },
    {
      id: 1,
      question: "Are there any accomodation options available near the cowork?",
      answer:
        "This property has a backpacker hostel with private rooms as well as dorms available for stay. You’ll find many other folks working remotely round the year.",
      isShowAnswer: false,
    },
    {
      id: 2,
      question: "Are meals available?",
      answer:
        "There is a fully functional cafe serving delicious yet homely meals so that you can enjoy your workation in Himachal without worrying about food.",
      isShowAnswer: false,
    },
    {
      id: 3,
      question: "What other events/activities can indulge in?",
      answer:
        "Bir has a lot of stuff going, whether it’s live music events, open mic, nature walks and treks, and being the paragliding capital of India, it provides the best paragliding experience of the country.",
      isShowAnswer: false,
    },
  ]);

  const [stayDetails, setStayDetails] = useState();
  const [isExpand, setExpand] = useState([]);

  useEffect(() => {
    initializeIsExpansion();
    if (router.query.stayDetails) {
      setStayDetails(JSON.parse(router.query.stayDetails));
    } else {
      fetchStayDetails(router.query.stayId);
    }
  }, [router.query]);

  const initializeIsExpansion = () => {
    let bool = [];
    for (let i = 0; i < faq.length; i++) {
      bool.push(false);
    }
    setExpand(bool);
  };

  const setIsExpand = (index) => {
    let bool = [];
    for (let i = 0; i < faq.length; i++) {
      if (i == index) {
        bool.push(!isExpand[i]);
      } else {
        bool.push(isExpand[i]);
      }
    }
    setExpand(bool);
  };

  const fetchStayDetails = async (stayId) => {
    console.log(stayId, "stayId");
    if (stayId) {
      const response = await fetch(`/api/stays/get/${stayId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlBheWFsXzcxIiwiZW1haWwiOiJ5b3VqanUyMDEyQGdtYWlsLmNvbSIsImlhdCI6MTY4MTYzMTM0Mn0.E8HDYPMP5goQiWQh2Ib8Uev8BXCPNRsnlFgLumIYaKGe_QTlvLMZESQvXLyy8om8UMVMQOUl3QZCN92h3ZpCS1mbcxhmMs2I5wYSH0v5MU8OTHvaDnfcVQ_mD7Q6laGvIG8Wdy-fj3W5o7gKDgLIlsCQ69D062uv_CFq89bo6epgSEb4pPdmmEiShKzfHIJ6i644v6kEYxyJuiprT3dQ1W4AJoeYYqTRizhbC4xABFL3a2PbTLfsHDoAur4WK6nY8jFCuA2fOXkP1YRkvjuiqHGTdh4lgid6Xcp_lmnrqh3xvdrxJO4iYQPo8PHnR7Dv2JhQwjQpRUdZeAdP0hPcig",
        },
      });
      const res = await response.json();

      console.log(res, "res");

      setStayDetails(res?.data);
    }
  };

  console.log(stayDetails, "stayDetails");

  const addRecord = async (e) => {
    e.preventDefault();

    const mobileNumber = stayDetails?.user?.mobileNumber;
    window.location.href = `https://wa.me/${mobileNumber}?text=hi`;
    const response = await fetch("/api/stays/add-record", {
      method: "POST",
      body: JSON.stringify({
        stayId: stayDetails?._id,
        ownerEmail: stayDetails?.user?.email,
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
    <>
      {stayDetails && (
        <div className="ml-100">
          <div className="w-[100rem] h-[25rem] bg-[url('https://www.trickytravellers.com/uploads/posts/24441a37-54c1-4189-a9c7-54c45ab41bb8.webp')] bg-no-repeat bg-cover">
            <div class="flex justify-end mr-20 pt-52">
              {/* <Link href="/stay_image_gallery"> */}
              <button
                class="bg-gray-600 hover:bg-gray-400 text-black-800 font-bold py-2 px-4 rounded-l"
                onClick={() =>
                  router.push(
                    {
                      pathname: `images/${router.query.stayId}`,
                      query: {
                        stayImages: JSON.stringify(stayDetails?.pictures),
                      },
                    },
                    `images/${router.query.stayId}`
                  )
                }
              >
                Gallery
              </button>
              {/* </Link> */}
            </div>
          </div>
          <div class="relative ml-72 flex">
            <div className="w-[52rem]">
              <h1 class="ml-8 mt-8 text-2xl font-bold">{stayDetails?.title}</h1>
              <div class="flex items-center text-sm font-medium sm:mt-2 sm:mb-4">
                <div class="p-1 bg-yellow-100 rounded-lg ml-10">
                  <svg
                    width="20"
                    height="20"
                    fill="rgba(251, 191, 36)"
                    class=""
                  >
                    <path d="M9.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.784-.57-.381-1.81.587-1.81H7.03a1 1 0 00.95-.69L9.05 3.69z"></path>
                  </svg>
                </div>
                <div class="ml-1">
                  <span class="text-black">{`${stayDetails?.rating ?? "0"}.0 (${
                    stayDetails?.reviews ? stayDetails?.reviews?.length : "0"
                  } reviews)`}</span>
                </div>
                <div class="ml-10 mr-4 p-1 bg-green-100 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-8 w-8"
                    viewBox="0 0 20 20"
                    fill="rgba(16, 185, 129)"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div>{stayDetails?.address}</div>
              </div>
              <div class="mb-6 mt-8">
                <div
                  class="hidden opacity-0 opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
                  id="tabs-home"
                  role="tabpanel"
                  aria-labelledby="tabs-home-tab"
                  data-te-tab-active
                >
                  <div class="ml-8 text-2xl font-bold border-l-8 pl-4 pt-2 pb-2 border-green-500">
                    Facilities
                  </div>
                  <p class="ml-8 text-base mt-4 mr-2">
                    {/* {overView}  */}
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </div>
              </div>
              <div class="mb-6 mt-8">
                <div
                  class="hidden opacity-0 opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
                  id="tabs-home"
                  role="tabpanel"
                  aria-labelledby="tabs-home-tab"
                  data-te-tab-active
                >
                  <div class="ml-8 text-2xl font-bold border-l-8 pl-4 pt-2 pb-2 border-green-500">
                    Details
                  </div>
                  <p class="ml-8 text-base mt-4 mr-2">
                    {/* {overView} */}
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </div>
              </div>
              <div class="mb-6 mt-8">
                <div
                  class="hidden opacity-0 opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
                  id="tabs-home"
                  role="tabpanel"
                  aria-labelledby="tabs-home-tab"
                  data-te-tab-active
                >
                  <div class="ml-8 text-2xl font-bold border-l-8 pl-4 pt-2 pb-2 border-green-500">
                    Frequently Asked Questions
                  </div>
                  {/* <p class="ml-8 text-base mt-4 mr-2"> */}
                  {/* {overView} */}
                  {/* Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum. */}
                  {/* </p> */}
                  {faq.map((e) => (
                    <div>
                      <div class="faq flex justify-start ml-16 mt-8">
                        <div class="faq-title flex flex-row">
                          <h2 class="text-lg font-medium">Q. {e.question}</h2>
                          <button
                            class="ml-auto text-blue-600 hover:text-blue-800"
                            onClick={() => {
                              setIsExpand(e.id);
                            }}
                          >
                            <svg
                              class="w-6 h-6 ml-4 fill-current"
                              viewBox="0 0 24 24"
                            >
                              <path d="M19 9l-7 7-7-7"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div class= {isExpand[e.id]?"faq-content ml-20 mt-2 bg-green-400 px-5 py-5 shadow-2xl rounded-lg":"faq-content hidden mt-2"}>
                      <p class="text-white font-medium">{e.answer}</p>
                    </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="">
              <div class="mt-16    bg-white p-3 rounded-xl mb-3">
                {/* <a href="https://wa.me/9527569664?text=hi"> */}
                <button
                  type="button"
                  class="mr-2 bg-green-500 text-white text-base font-semibold px-6 py-2 rounded-lg hover:bg-green-400 duration-200"
                  onClick={(e) => addRecord(e)}
                >
                  Book
                </button>
                {/* </a> */}
                <button
                  type="button"
                  class="border text-base font-semibold p-2 mr-2 rounded-lg text-green-500 duration-200 hover:text-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
                <button
                  type="button"
                  class="border text-base font-semibold p-2 rounded-lg text-green-500 duration-200 hover:text-blue-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    ></path>
                  </svg>
                </button>
                <div class="mb-6 mt-8 w-80">
                  <div
                    class="hidden opacity-0 opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
                    id="tabs-home"
                    role="tabpanel"
                    aria-labelledby="tabs-home-tab"
                    data-te-tab-active
                  >
                    <div class="ml-2 text-2xl font-bold border-l-8 pl-4 pt-2 pb-2 border-green-500">
                      Reviews
                    </div>
                    <p class="ml-8 text-base mt-4 mr-2">
                      {/* {overView} */}
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.
                    </p>
                  </div>
                </div>
              </div>
              {/* <div class="mt-16    bg-white p-3 rounded-xl flex mb-3">
                            <div class="px-3 py-2 font-bold text-lg">Add to Favourites</div>
                        </div>
                        <div class="w-full max-w-xs mt-6">
                            <form class="bg-white shadow-md rounded px-6 pt-3 pb-8 mb-4 w-80">
                                <div class="pb-3 rounded-x1">Book One For Me</div>
                                <div class="mb-4">
                                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name" />
                                </div>
                                <div class="mb-2">
                                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" />
                                </div>
                                <div class="mb-4">
                                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="phone" placeholder="Phone" />
                                </div>
                                <div class="flex custom-number-input h-10 w-32">
                                    <label for="custom-input-number" class="block font-medium text-gray-700 mr-2 font semibold mt-1">Guest
                                    </label>
                                    <div class="flex flex-row h-8 w-32 border-2 border-black rounded relative bg-transparent mb-4 ml-24">
                                        <button data-action="decrement" class=" bg-white text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 pr-4 rounded-l cursor-pointer outline-none">
                                            <span class="m-auto text-2xl font-thin">−</span>
                                        </button>
                                        <input type="number" class="outline-none focus:outline-none text-center w-full bg-white font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" name="custom-input-number" value="0"></input>
                                        <button data-action="increment" class="bg-white text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                                            <span class="m-auto text-2xl font-thin">+</span>
                                        </button>
                                    </div>
                                </div>
                                <div class="flex items-center justify-between">
                                    <button class="hover:opacity-90 mt-6 ml-auto w-full px-4 block py-3 text-white bg-green-500 font-bold" type="button">
                                        Book For 1
                                    </button>
                                </div>
                            </form>
                        </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default stay;
