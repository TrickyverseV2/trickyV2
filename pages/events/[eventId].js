import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Moment from "moment";
import Select from "react-select";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "tailwindcss/tailwind.css";

const Event = () => {
  let router = useRouter();

  const [eventDetails, setEventDetails] = useState();
  const [packageOptions, setPackageOptions] = useState([]);
  const [images, setImages] = useState([]);
  const [youtubeVideos, setYoutubeVideos] = useState([]);

  const [selectedPackage, setSelectedPackage] = useState();
  const [noOfGuests, setNoOfGuests] = useState(1);
  const [price, setPrice] = useState();

  const [isFavorite, setIsFavorite] = useState(false);

  const [isBasic, setIsBasic] = useState(true);
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (router.query.eventDetails) {
      let details = JSON.parse(router.query.eventDetails);
      setEventDetails(JSON.parse(router.query.eventDetails));

      details?.thumbnail && setImages([details?.thumbnail]);
      details?.videoUrl && setYoutubeVideos([details?.videoUrl]);
    } else {
      fetchEventDetails(router.query.eventId);
    }
    fetchIsFavorite(router.query.eventId);
  }, [router.query]);

  useEffect(() => {
    if (eventDetails?.description) {
      const detailsArray = eventDetails?.description?.split("<span");
      detailsArray?.forEach((element) => {
        if (
          document.getElementById(
            `display-details-${detailsArray.indexOf(element)}`
          ) &&
          element != "<div>"
        ) {
          let canvasDetails = document.getElementById(
            `display-details-${detailsArray.indexOf(element)}`
          );
          canvasDetails.innerHTML = "<span " + element;
        }
      });
    }
  }, [eventDetails?.description]);

  useEffect(() => {
    let optionsList = [];

    if (eventDetails?.basic) {
      let option = `Basic (₹${eventDetails?.basic?.price})`;
      optionsList.push({
        value: option,
        label: option,
      });
      setPrice(parseFloat(eventDetails?.basic?.price));
    }

    if (eventDetails?.advance) {
      let option = `Advance (₹${eventDetails?.advance?.price})`;
      optionsList.push({
        value: option,
        label: option,
      });
    }

    if (eventDetails?.premium) {
      let option = `Premium (₹${eventDetails?.premium?.price})`;
      optionsList.push({
        value: option,
        label: option,
      });
    }

    setPackageOptions(optionsList);
    setSelectedPackage(optionsList[0]);
  }, [eventDetails]);

  useEffect(() => {
    if (selectedPackage?.value == `Basic (₹${eventDetails?.basic?.price})`) {
      setPrice(parseFloat(eventDetails?.basic?.price) * noOfGuests);
    } else if (
      selectedPackage?.value == `Advance (₹${eventDetails?.advance?.price})`
    ) {
      setPrice(parseFloat(eventDetails?.advance?.price) * noOfGuests);
    } else {
      setPrice(parseFloat(eventDetails?.premium?.price) * noOfGuests);
    }
  }, [noOfGuests, selectedPackage]);

  const fetchIsFavorite = async (eventId) => {
    if (eventId) {
      const response = await fetch(
        `/api/event/favorite/is-favorite/${eventId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlBheWFsXzcxIiwiZW1haWwiOiJ5b3VqanUyMDEyQGdtYWlsLmNvbSIsImlhdCI6MTY4MTYzMTM0Mn0.E8HDYPMP5goQiWQh2Ib8Uev8BXCPNRsnlFgLumIYaKGe_QTlvLMZESQvXLyy8om8UMVMQOUl3QZCN92h3ZpCS1mbcxhmMs2I5wYSH0v5MU8OTHvaDnfcVQ_mD7Q6laGvIG8Wdy-fj3W5o7gKDgLIlsCQ69D062uv_CFq89bo6epgSEb4pPdmmEiShKzfHIJ6i644v6kEYxyJuiprT3dQ1W4AJoeYYqTRizhbC4xABFL3a2PbTLfsHDoAur4WK6nY8jFCuA2fOXkP1YRkvjuiqHGTdh4lgid6Xcp_lmnrqh3xvdrxJO4iYQPo8PHnR7Dv2JhQwjQpRUdZeAdP0hPcig",
          },
        }
      );
      const res = await response.json();
      console.log(res, "sdklajksjkjal");
      if (res?.success) {
        setIsFavorite(res?.data);
      }
    }
  };

  const fetchEventDetails = async (eventId) => {
    if (eventId) {
      const response = await fetch(`/api/event/get/${eventId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlBheWFsXzcxIiwiZW1haWwiOiJ5b3VqanUyMDEyQGdtYWlsLmNvbSIsImlhdCI6MTY4MTYzMTM0Mn0.E8HDYPMP5goQiWQh2Ib8Uev8BXCPNRsnlFgLumIYaKGe_QTlvLMZESQvXLyy8om8UMVMQOUl3QZCN92h3ZpCS1mbcxhmMs2I5wYSH0v5MU8OTHvaDnfcVQ_mD7Q6laGvIG8Wdy-fj3W5o7gKDgLIlsCQ69D062uv_CFq89bo6epgSEb4pPdmmEiShKzfHIJ6i644v6kEYxyJuiprT3dQ1W4AJoeYYqTRizhbC4xABFL3a2PbTLfsHDoAur4WK6nY8jFCuA2fOXkP1YRkvjuiqHGTdh4lgid6Xcp_lmnrqh3xvdrxJO4iYQPo8PHnR7Dv2JhQwjQpRUdZeAdP0hPcig",
        },
      });
      const res = await response.json();
      res?.data?.thumbnail && setImages([res?.data?.thumbnail]);
      res?.data?.videoUrl && setYoutubeVideos([res?.data?.videoUrl]);
      setEventDetails(res?.data);
    }
  };

  const bookOrder = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!name.trim()) {
      errors.name = "Name is required field.";
    }
    if (!email.trim()) {
      errors.email = "Email is required field.";
    }
    if (!phone.trim()) {
      errors.phone = "Phone is required field.";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    setErrors(errors);

    const response = await fetch(`/api/event/update/${eventDetails?._id}`, {
      method: "PUT",
      body: JSON.stringify({
        participatedUsers: {
          name: name,
          email: email,
          phone: phone,
          guests: noOfGuests,
          price: price,
          packageIncluded: selectedPackage.value.split(" ")[0],
        },
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlBheWFsXzcxIiwiZW1haWwiOiJ5b3VqanUyMDEyQGdtYWlsLmNvbSIsImlhdCI6MTY4MTYzMTM0Mn0.E8HDYPMP5goQiWQh2Ib8Uev8BXCPNRsnlFgLumIYaKGe_QTlvLMZESQvXLyy8om8UMVMQOUl3QZCN92h3ZpCS1mbcxhmMs2I5wYSH0v5MU8OTHvaDnfcVQ_mD7Q6laGvIG8Wdy-fj3W5o7gKDgLIlsCQ69D062uv_CFq89bo6epgSEb4pPdmmEiShKzfHIJ6i644v6kEYxyJuiprT3dQ1W4AJoeYYqTRizhbC4xABFL3a2PbTLfsHDoAur4WK6nY8jFCuA2fOXkP1YRkvjuiqHGTdh4lgid6Xcp_lmnrqh3xvdrxJO4iYQPo8PHnR7Dv2JhQwjQpRUdZeAdP0hPcig",
      },
    });
    // const res = await response.json();
  };

  const handleFavoriteClick = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/event/favorite/${eventDetails?._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlBheWFsXzcxIiwiZW1haWwiOiJ5b3VqanUyMDEyQGdtYWlsLmNvbSIsImlhdCI6MTY4MTYzMTM0Mn0.E8HDYPMP5goQiWQh2Ib8Uev8BXCPNRsnlFgLumIYaKGe_QTlvLMZESQvXLyy8om8UMVMQOUl3QZCN92h3ZpCS1mbcxhmMs2I5wYSH0v5MU8OTHvaDnfcVQ_mD7Q6laGvIG8Wdy-fj3W5o7gKDgLIlsCQ69D062uv_CFq89bo6epgSEb4pPdmmEiShKzfHIJ6i644v6kEYxyJuiprT3dQ1W4AJoeYYqTRizhbC4xABFL3a2PbTLfsHDoAur4WK6nY8jFCuA2fOXkP1YRkvjuiqHGTdh4lgid6Xcp_lmnrqh3xvdrxJO4iYQPo8PHnR7Dv2JhQwjQpRUdZeAdP0hPcig",
      },
    });
    const res = await response.json();

    console.log(res, "res");

    if (res?.success == "Successfully added the event to the favorites list") {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: "#4caf50",
      ":focus": {
        borderColor: "#4caf50",
        ringColor: "#C8C8C8",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#4caf50" : "#A5D6A",
      color: state.isSelected ? "#F9FAFB" : "#111827",
      ":hover": {
        backgroundColor: state.isSelected ? "#6B7280" : "#E5E7EB",
        color: state.isSelected ? "#F9FAFB" : "#111827",
      },
    }),
  };

  const displayDetails = (data) => {
    if (data != "<div>" && data != "") {
      return (
        <div className="bg-white rounded-lg border-green-500 border-l-4 mx-2 my-6 pl-3 pt-2 pb-2 duration-150 ease-linear data-[te-tab-active]:block">
          <div
            id={`display-details-${eventDetails?.description
              // ?.split("<br></div>")
              ?.split("<span")

              .indexOf(data)}`}
          ></div>
        </div>
      );
    }
  };

  console.log(youtubeVideos, "youtubeVideos");

  return (
    <>
      {eventDetails && (
        <div className="ml-100 scrollbar-hide">
          <div className={`w-[77rem] ml-42 h-[30rem] bg-green-100`}>
            {youtubeVideos.length > 0 ? (
              <Carousel
                showArrows={false}
                showThumbs={false}
                infiniteLoop
                autoPlay
                renderIndicator={(onClickHandler, isSelected, index, label) => {
                  const defStyle = {
                    marginLeft: 20,
                    color: "black",
                    cursor: "pointer",
                  };
                  const style = isSelected
                    ? { ...defStyle, color: "green", fontWeight: "bold" }
                    : { ...defStyle };
                  return (
                    <span
                      style={style}
                      onClick={onClickHandler}
                      onKeyDown={onClickHandler}
                      value={index}
                      key={index}
                      role="button"
                      tabIndex={0}
                      aria-label={`${label} ${index + 1}`}
                    >
                      {index == 0 ? "Video" : "Image"}
                    </span>
                  );
                }}
              >
                {youtubeVideos.map((videoId, index) => (
                  <div key={index} className="object-cover mt-10">
                    <iframe
                      height={400}
                      src={videoId}
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen=""
                    ></iframe>
                  </div>
                ))}

                {images.length > 0 &&
                  images.map((image, index) => (
                    <div key={index} className="p-10">
                      <img
                        className="h-[25rem]"
                        src={image}
                        alt={`Slider ${index + 1}`}
                      />
                    </div>
                  ))}
              </Carousel>
            ) : (
              <Carousel
                showArrows={false}
                showThumbs={false}
                showIndicators={false}
                infiniteLoop
                autoPlay
              >
                {images.length > 0 &&
                  images.map((image, index) => (
                    <div key={index} className=" p-10">
                      <img
                        // height={100}
                        className="h-[25rem]"
                        src={image}
                        alt={`Slider ${index + 1}`}
                      />
                    </div>
                  ))}
              </Carousel>
            )}
          </div>
          <div class="relative ml-42 flex">
            <div className="w-[52rem]">
              <h1 class="ml-8 mt-4 text-2xl font-bold">
                {eventDetails?.title}
              </h1>
              <div class="flex flex-row flex-wrap mx-4 my-2">
                <div class="rounded-lg p-3 bg-white m-2 flex-grow">
                  <div class="font-bold">Date</div>
                  <div class="flex">
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
                    <p class="font-semibold">
                      {Moment(eventDetails?.eventDate).format("MMM DD, YYYY")}
                    </p>
                  </div>
                </div>
                <div class="rounded-lg p-3 bg-white m-2 flex-grow">
                  <div class="font-bold">Time</div>
                  <div class="flex">
                    <span class="bg-green-100 text-green-500 p-1 rounded-xl material-icons mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                        <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                      </svg>{" "}
                    </span>
                    <p class="font-semibold">
                      {Moment(eventDetails?.eventDate).format("hh:mm:ss")}
                    </p>
                  </div>
                </div>
                <div class="rounded-lg p-3 bg-white m-2 flex-grow">
                  <div class="font-bold">Price</div>
                  <div class="flex">
                    <span class="bg-green-100 text-green-500 p-1 rounded-xl material-icons mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enable-background="new 0 0 24 24"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <rect fill="none" height="24" width="24" />
                        <g>
                          <path d="M17,1H7C5.9,1,5,1.9,5,3v18c0,1.1,0.9,2,2,2h10c1.1,0,2-0.9,2-2V3C19,1.9,18.1,1,17,1z M7,18V6h10v12H7z M16,11V9.14 C16,8.51,15.55,8,15,8H9C8.45,8,8,8.51,8,9.14l0,1.96c0.55,0,1,0.45,1,1c0,0.55-0.45,1-1,1l0,1.76C8,15.49,8.45,16,9,16h6 c0.55,0,1-0.51,1-1.14V13c-0.55,0-1-0.45-1-1C15,11.45,15.45,11,16,11z M12.5,14.5h-1v-1h1V14.5z M12.5,12.5h-1v-1h1V12.5z M12.5,10.5h-1v-1h1V10.5z" />
                        </g>
                      </svg>
                    </span>
                    <p class="font-semibold">{"₹" + eventDetails?.price}</p>
                  </div>
                </div>
                <div class="rounded-lg p-3 bg-white m-2 flex-grow">
                  <div class="font-bold">Venue</div>
                  <div class="flex">
                    <span class="bg-green-100 text-green-500 p-1 rounded-xl material-icons mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enable-background="new 0 0 24 24"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <g>
                          <path d="M0,0h24v24H0V0z" fill="none" />
                        </g>
                        <g>
                          <path d="M12,2c-4.2,0-8,3.22-8,8.2c0,3.32,2.67,7.25,8,11.8c5.33-4.55,8-8.48,8-11.8C20,5.22,16.2,2,12,2z M12,12c-1.1,0-2-0.9-2-2 c0-1.1,0.9-2,2-2c1.1,0,2,0.9,2,2C14,11.1,13.1,12,12,12z" />
                        </g>
                      </svg>
                    </span>
                    <p class="font-semibold">{eventDetails?.venue}</p>
                  </div>
                </div>
                <div class="rounded-lg p-3 bg-white m-2 flex-grow">
                  <div class="font-bold">Type</div>
                  <div class="flex">
                    <span class="bg-green-100 text-green-500 p-1 rounded-xl material-icons mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enable-background="new 0 0 24 24"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <g>
                          <path d="M0,0h24v24H0V0z" fill="none" />
                        </g>
                        <g>
                          <path d="M12,2c-4.2,0-8,3.22-8,8.2c0,3.32,2.67,7.25,8,11.8c5.33-4.55,8-8.48,8-11.8C20,5.22,16.2,2,12,2z M12,12c-1.1,0-2-0.9-2-2 c0-1.1,0.9-2,2-2c1.1,0,2,0.9,2,2C14,11.1,13.1,12,12,12z" />
                        </g>
                      </svg>
                    </span>
                    <p class="font-semibold">{eventDetails?.eventType}</p>
                  </div>
                </div>
              </div>
              <ul
                class="grid grid-cols-3 list-none border-b-0 pl-0 pb-0 h-30"
                role="tablist"
                data-te-nav-ref
              >
                <li
                  role="presentation"
                  onClick={() => {
                    setIsPremium(false);
                    setIsAdvanced(false);
                    setIsBasic(true);
                  }}
                >
                  <a
                    href="#tabs-home"
                    class={
                      isBasic
                        ? "mx-6 block border-x-0 border-b-2 border-t-0 border-transparent px-7 text-sm font-bold font-medium uppercase leading-tight hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-green-600 dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-green-600 focus:text-green-600"
                        : "mx-6 block border-x-0 border-b-2 border-t-0 border-transparent px-7 text-sm font-bold font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:text-green-600 hover:border-transparent hover:bg-neutral-100 focus:isolate data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
                    }
                    data-te-toggle="pill"
                    data-te-target="#tabs-home"
                    data-te-nav-active
                    role="tab"
                    aria-controls="tabs-home"
                    aria-selected="true"
                  >
                    Basic
                  </a>
                </li>
                <li
                  role="presentation"
                  onClick={() => {
                    setIsBasic(false);
                    setIsPremium(false);
                    setIsAdvanced(true);
                  }}
                >
                  <a
                    href="#tabs-profile"
                    class={
                      isAdvanced
                        ? "mx-6 block border-x-0 border-b-2 border-t-0 border-transparent px-7 text-sm font-bold font-medium uppercase leading-tight hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-green-600 dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-green-600 focus:text-green-600"
                        : "mx-6 block border-x-0 border-b-2 border-t-0 border-transparent px-7 text-sm font-bold font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:text-green-600 hover:border-transparent hover:bg-neutral-100 focus:isolate data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
                    }
                    data-te-toggle="pill"
                    data-te-target="#tabs-profile"
                    role="tab"
                    aria-controls="tabs-profile"
                    aria-selected="false"
                  >
                    Advanced
                  </a>
                </li>
                <li
                  role="presentation"
                  onClick={() => {
                    setIsBasic(false);
                    setIsAdvanced(false);
                    setIsPremium(true);
                  }}
                >
                  <a
                    href="#tabs-messages"
                    class={
                      isPremium
                        ? "mx-6 block border-x-0 border-b-2 border-t-0 border-transparent px-7 text-sm font-bold font-medium uppercase leading-tight hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-green-600 dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-green-600 focus:text-green-600"
                        : "mx-6 block border-x-0 border-b-2 border-t-0 border-transparent px-7 text-sm font-bold font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:text-green-600 hover:border-transparent hover:bg-neutral-100 focus:isolate data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400 "
                    }
                    data-te-toggle="pill"
                    data-te-target="#tabs-messages"
                    role="tab"
                    aria-controls="tabs-messages"
                    aria-selected="false"
                  >
                    Premium
                  </a>
                </li>
              </ul>
              <div class="my-6 mx-3">
                <div
                  class="bg-white rounded-lg border-green-500 border-l-4 m-2 pb-3 duration-150 ease-linear data-[te-tab-active]:block"
                  id="tabs-home"
                  role="tabpanel"
                  aria-labelledby="tabs-home-tab"
                  data-te-tab-active
                >
                  <div class="ml-2 text-base font-bold pl-1 pt-2 pb-2 ">
                    Facilities Provided
                  </div>
                  <div className="flex flex-wrap gap-y-[0.5rem]">
                    {eventDetails &&
                      (isBasic ? (
                        eventDetails.basic &&
                        eventDetails.basic.facilities.map((facility, index) => (
                          <p
                            key={`basic-${index}`}
                            class="rounded-lg ml-8 font-medium text-base mt-2 px-3 py-1 bg-green-100"
                          >
                            {facility}
                          </p>
                        ))
                      ) : isAdvanced ? (
                        eventDetails?.advance ? (
                          eventDetails?.advance?.facilities.map(
                            (facility, index) => (
                              <p
                                key={`advance-${index}`}
                                class="rounded-lg ml-8 font-medium text-base mt-2 px-3 py-1 bg-green-100"
                              >
                                {facility}
                              </p>
                            )
                          )
                        ) : (
                          <div className="w-full flex justify-center items-center">
                            <p>Advance Package not available!!!</p>
                          </div>
                        )
                      ) : eventDetails?.premium ? (
                        eventDetails?.premium?.facilities.map(
                          (facility, index) => (
                            <p
                              key={`premium-${index}`}
                              class="rounded-lg ml-8 font-medium text-base mt-2 px-3 py-1 bg-green-100"
                            >
                              {facility}
                            </p>
                          )
                        )
                      ) : (
                        <div className="w-full flex justify-center items-center">
                          <p>Premium Package not available!!!</p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="my-6 mx-3">
                {eventDetails?.description
                  // ?.split("<br></div>")
                  ?.split("<span")

                  .map((data) => displayDetails(data))}
              </div>
            </div>
            <div className="">
              <div class="mt-16 bg-white p-3 rounded-lg flex justify-between mb-3">
                <div class="px-3 py-2 font-bold text-base">
                  {`${isFavorite ? "Remove from" : "Add to"} favorite list`}
                </div>

                <button
                  class={`${
                    isFavorite ? "text-red-500" : "text-green-500"
                  } px-3 py-2`}
                  onClick={(e) => handleFavoriteClick(e)}
                >
                  <svg
                    xmlns="http://www.w3.org/2001/svg"
                    class="h-7 w-7"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                {/* <span class="material-icons p-3 rounded-xl text-green-600 bg-green-200 hover:text-red-600 hover:bg-red-200 duration-300">
                    favorite
                  </span> */}
                {/* </div> */}
              </div>
              <div class="w-full max-w-xs mt-6">
                <form class="bg-white shadow-md rounded-lg px-6 pt-3 pb-8 mb-4 w-80">
                  <div class="pb-3 rounded-lg font-bold">Book One For Me</div>
                  <div class="mb-4">
                    <input
                      // class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      className="border focus:outline-none focus:border focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-gray-700 font-medium p-2 w-full rounded-md"
                      id="name"
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>
                  <div class="mb-4">
                    <input
                      class="border focus:outline-none focus:border focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-gray-700 font-medium p-2 w-full rounded-md"
                      id="email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div class="mb-4">
                    <input
                      class="border focus:outline-none focus:border focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-gray-700 font-medium p-2 w-full rounded-md"
                      id="phone"
                      type="phone"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-medium mb-2"
                      htmlFor="package"
                    >
                      Package
                    </label>
                    <Select
                      id="package"
                      className="text-gray-700 font-medium rounded-md z-20"
                      // class="border focus:outline-none focus:border focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-gray-700 font-medium p-2 w-full rounded-md"
                      options={packageOptions}
                      styles={customStyles}
                      isSearchable
                      value={selectedPackage}
                      onChange={setSelectedPackage}
                    />
                  </div>
                  <div class="flex justify-between custom-number-input h-10 w-50">
                    <label
                      for="custom-input-number"
                      class="block font-medium text-gray-700 mr-2 mt-3"
                    >
                      Guests
                    </label>
                    <div class="inline-flex border mt-1 rounded-lg ml-auto">
                      <button
                        data-action="decrement"
                        class="hover:bg-gray-100 rounded-l-lg border-none font-semibold text-gray-600 text-2xl w-10 h-10 p-2"
                        onClick={(e) => {
                          let updatedNoOfGuests = noOfGuests - 1;
                          e.preventDefault();
                          setNoOfGuests(
                            updatedNoOfGuests > 0 ? updatedNoOfGuests : 1
                          );
                        }}
                      >
                        <span class="m-auto text-2xl font-thin">−</span>
                      </button>
                      <input
                        type="number"
                        class="text-center border-none w-10 h-10 p-2"
                        name="custom-input-number"
                        value={noOfGuests.toString()}
                      ></input>
                      <button
                        data-action="increment"
                        class="hover:bg-gray-100 rounded-l-lg border-none font-semibold text-gray-600 text-2xl w-10 h-10 p-2"
                        onClick={(e) => {
                          let updatedNoOfGuests = noOfGuests + 1;
                          e.preventDefault();
                          setNoOfGuests(updatedNoOfGuests);
                        }}
                      >
                        <span class="m-auto text-2xl font-thin">+</span>
                      </button>
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <button
                      class="hover:opacity-90 mt-6 ml-auto w-full px-4 block py-3 text-white rounded-lg font-bold bg-gradient-to-tl from-black to-green-900"
                      type="button"
                      onClick={(e) => bookOrder(e)}
                    >
                      {`Book For ₹${price}`}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Event;
