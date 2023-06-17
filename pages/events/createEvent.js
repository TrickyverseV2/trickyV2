import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Select from "react-select";
import "trix/dist/trix.css";
import { useRouter } from "next/router";
// import RichTextEditor from "./richTextEditor";
// import { Editor, EditorState } from 'draft-js';
// import { Editor as WysiwygEditor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// import TrixEditor from "../components/TrixEditor";

// const TrixEditor = dynamic(() => import("react-trix"), { ssr: false });

const locations = [
  { value: "", label: "Select Location" },
  { value: "Delhi NCR", label: "Delhi NCR" },
  { value: "Mumbai", label: "Mumbai" },
  { value: "Online", label: "Online" },
  { value: "Others", label: "Others" },
];

const eventTypes = [
  { value: "", label: "Select Event Type" },
  { value: "Music", label: "Music" },
  { value: "Day Outing", label: "Day Outing" },
  { value: "Environment", label: "Environment" },
  { value: "Foods & Drinks", label: "Foods & Drinks" },
  { value: "Festivals", label: "Festivals" },
  { value: "Workshops", label: "Workshops" },
  { value: "Spirituality", label: "Spirituality" },
  { value: "Meetups", label: "Meetups" },
  { value: "Online", label: "Online" },
  { value: "Arts & Crafts", label: "Arts & Crafts" },
];

const createEvent = () => {
  var router = useRouter();

  const [eventToBeUpdated, setEventToBeUpdated] = useState();
  useEffect(() => {
    if (router.query.event) {
      setEventToBeUpdated(JSON.parse(router.query.event));
    }
  }, [router.query]);

  // const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [content, setContent] = useState();

  // const handleEditorChange = (state) => {
  //   setEditorState(state);
  // };

  useEffect(() => {
    console.log(eventToBeUpdated, "eventToBeUpdated");
    setTitle(eventToBeUpdated?.title ?? "");
    setVenue(eventToBeUpdated?.venue ?? "");
    setVideoUrl(eventToBeUpdated?.videoUrl ?? "");
    setTags(
      eventToBeUpdated?.tags
        ? eventToBeUpdated?.tags.length > 1
          ? eventToBeUpdated?.tags.join(",")
          : eventToBeUpdated?.tags[0]
        : ""
    );
    setSelectedLocation(
      eventToBeUpdated?.location
        ? {
            value: eventToBeUpdated?.location,
            label: eventToBeUpdated?.location,
          }
        : locations[0]
    );
    setSelectedEventType(
      eventToBeUpdated?.eventType
        ? {
            value: eventToBeUpdated?.eventType,
            label: eventToBeUpdated?.eventType,
          }
        : eventTypes[0]
    );
    setPreviousThumbnail(eventToBeUpdated?.thumbnail ?? "");
    setVideoUrl(eventToBeUpdated?.videoUrl ?? "");
    setBasicDetails(eventToBeUpdated?.basic);
    setAdvanceDetails(eventToBeUpdated?.advance);
    setPremiumDetails(eventToBeUpdated?.premium);
    setFacilities(
      eventToBeUpdated?.basic?.facilities
        ? eventToBeUpdated?.basic?.facilities.length > 1
          ? eventToBeUpdated?.basic?.facilities.join(",")
          : eventToBeUpdated?.basic?.facilities[0]
        : ""
    );
    // setText(eventToBeUpdated?.description);
    // // var details = document.getElementById("details");
    // // details.innerHtml = eventToBeUpdated?.description;
    setPrice(eventToBeUpdated?.basic?.price ?? "");
    console.log(
      eventToBeUpdated?.eventDate,
      typeof eventToBeUpdated?.eventDate,
      "eventDate"
    );
    setDate(new Date(eventToBeUpdated?.eventDate));
    // setDate(new Date(eventToBeUpdated?.eventDate).toISOString().slice(0, 16));
  }, [eventToBeUpdated, setEventToBeUpdated]);

  useEffect(() => {
    if (document.getElementById("details")) {
      // setText(eventToBeUpdated?.description);
      var details = document.getElementById("details");
      details.innerHtml = eventToBeUpdated?.description;
    }
  }, [eventToBeUpdated?.description]);

  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [selectedEventType, setSelectedEventType] = useState(eventTypes[0]);

  const [title, setTitle] = useState("");
  const [venue, setVenue] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [tags, setTags] = useState("");
  const [errors, setErrors] = useState({});

  const [file, setFile] = useState(null);
  const [src, setSrc] = useState(null);
  const [previousThumbnail, setPreviousThumbnail] = useState("");

  const [showOverview, setShowOverview] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  const [isBasic, setIsBasic] = useState(true);
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [overView, setOverView] = useState("Basic Overview");
  const [facilities, setFacilities] = useState("");
  const [price, setPrice] = useState("");
  const [basicDetails, setBasicDetails] = useState();
  const [advanceDetails, setAdvanceDetails] = useState();
  const [premiumDetails, setPremiumDetails] = useState();
  const [date, setDate] = useState();
  const [value, setValue] = useState("");

  const [text, setText] = useState("");

  const [successfullyAdded, setSuccessfullyAdded] = useState(false);

  const [showLoader, setShowLoader] = useState(false);

  const handleChange = (event) => {
    setText(event.target.innerHTML);
  };
  const handleBold = (e) => {
    e.preventDefault();
    document.execCommand("bold", false, null);
  };

  const handleItalic = (e) => {
    e.preventDefault();

    document.execCommand("italic", false, null);
  };

  const handleUnderline = (e) => {
    e.preventDefault();

    document.execCommand("underline", false, null);
  };

  // const handleChange = (e) => {
  //   setValue(e.target.value);
  // };

  const handleFacilitiesChange = (e) => {
    let updatedFacilities = e.target.value;
    setFacilities(updatedFacilities);
    console.log("facilities", facilities);

    if (isBasic) {
      setBasicDetails({
        ...basicDetails,
        facilities: updatedFacilities.includes(",")
          ? updatedFacilities.split(",")
          : [updatedFacilities],
      });
      console.log("basicDetails", basicDetails);
    } else if (isAdvanced) {
      setAdvanceDetails({
        ...advanceDetails,
        facilities: updatedFacilities.includes(",")
          ? updatedFacilities.split(",")
          : [updatedFacilities],
      });
    } else {
      setPremiumDetails({
        ...premiumDetails,
        facilities: updatedFacilities.includes(",")
          ? updatedFacilities.split(",")
          : [updatedFacilities],
      });
    }
  };

  const handlePriceChange = (e) => {
    let updatedPrice = e.target.value;
    setPrice(updatedPrice);
    if (isBasic) {
      setBasicDetails({ ...basicDetails, price: updatedPrice });
    } else if (isAdvanced) {
      setAdvanceDetails({ ...advanceDetails, price: updatedPrice });
    } else {
      setPremiumDetails({ ...premiumDetails, price: updatedPrice });
    }
  };

  const handleSubmit = (e) => {
    const errors = {};
    e.preventDefault();

    if (
      !basicDetails ||
      (basicDetails && Object.entries(basicDetails).length == 0)
    ) {
      setIsBasic(true);
      setIsPremium(false);
      setIsAdvanced(false);

      errors.facilities = "The facilities field is required.";
      errors.basicPrice = "The Price field is required.";
    }

    if (basicDetails && Object.entries(basicDetails).length > 0) {
      if (!basicDetails?.price) {
        errors.basicPrice = "The Price field is required.";
      } else if (basicDetails?.price <= 0) {
        errors.basicPrice = "Price should be positive.";
      }
    }
    if (advanceDetails && Object.entries(advanceDetails).length > 0) {
      if (!advanceDetails?.price) {
        errors.advancePrice = "The Price field is required.";
      } else if (!advanceDetails?.price) {
        errors.advancePrice = "Price should be positive.";
      }
    }
    if (premiumDetails && Object.entries(premiumDetails).length > 0) {
      if (!premiumDetails?.price) {
        errors.premiumPrice = "The Price field is required.";
      } else if (premiumDetails?.price <= 0) {
        errors.premiumPrice = "Price should be positive.";
      }
    }

    if (!date) {
      errors.date = "The date field is required.";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    setErrors(errors);

    console.log(text, "text9990099");

    eventToBeUpdated
      ? updateEvent({
          title,
          venue,
          videoUrl,
          tags: tags.includes(",") ? tags.split(",") : [tags],
          location: selectedLocation?.value,
          eventType: selectedEventType?.value,
          description: text,
          price: basicDetails?.price,
          basic: basicDetails,
          advance: advanceDetails,
          premium: premiumDetails,
          eventDate: date,
        })
      : createEvent({
          title,
          venue,
          videoUrl,
          tags: tags.includes(",") ? tags.split(",") : [tags],
          location: selectedLocation?.value,
          description: text,
          eventType: selectedEventType?.value,
          price: basicDetails?.price,
          basic: basicDetails,
          advance: advanceDetails,
          premium: premiumDetails,
          eventDate: date,
        });
  };
  const updateEvent = async (eventDetails) => {
    setShowLoader(true);
    const uploadImageResponse = await uploadImage();
    if (uploadImageResponse?.success) {
      eventDetails["thumbnail"] = uploadImageResponse?.data;

      const response = await fetch(
        `/api/event/update/${eventToBeUpdated?._id}`,
        {
          method: "PUT",
          body: JSON.stringify(eventDetails),
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlBheWFsXzcxIiwiZW1haWwiOiJ5b3VqanUyMDEyQGdtYWlsLmNvbSIsImlhdCI6MTY4MTYzMTM0Mn0.E8HDYPMP5goQiWQh2Ib8Uev8BXCPNRsnlFgLumIYaKGe_QTlvLMZESQvXLyy8om8UMVMQOUl3QZCN92h3ZpCS1mbcxhmMs2I5wYSH0v5MU8OTHvaDnfcVQ_mD7Q6laGvIG8Wdy-fj3W5o7gKDgLIlsCQ69D062uv_CFq89bo6epgSEb4pPdmmEiShKzfHIJ6i644v6kEYxyJuiprT3dQ1W4AJoeYYqTRizhbC4xABFL3a2PbTLfsHDoAur4WK6nY8jFCuA2fOXkP1YRkvjuiqHGTdh4lgid6Xcp_lmnrqh3xvdrxJO4iYQPo8PHnR7Dv2JhQwjQpRUdZeAdP0hPcig",
          },
        }
      );
      const res = await response.json();

      if (res?.success) {
        setSuccessfullyAdded(true);
      }
      setShowLoader(false);
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", file, file.name);

    const response = await fetch("/api/uploadImage", {
      method: "POST",
      body: formData,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlBheWFsXzcxIiwiZW1haWwiOiJ5b3VqanUyMDEyQGdtYWlsLmNvbSIsImlhdCI6MTY4MTYzMTM0Mn0.E8HDYPMP5goQiWQh2Ib8Uev8BXCPNRsnlFgLumIYaKGe_QTlvLMZESQvXLyy8om8UMVMQOUl3QZCN92h3ZpCS1mbcxhmMs2I5wYSH0v5MU8OTHvaDnfcVQ_mD7Q6laGvIG8Wdy-fj3W5o7gKDgLIlsCQ69D062uv_CFq89bo6epgSEb4pPdmmEiShKzfHIJ6i644v6kEYxyJuiprT3dQ1W4AJoeYYqTRizhbC4xABFL3a2PbTLfsHDoAur4WK6nY8jFCuA2fOXkP1YRkvjuiqHGTdh4lgid6Xcp_lmnrqh3xvdrxJO4iYQPo8PHnR7Dv2JhQwjQpRUdZeAdP0hPcig",
      },
    });
    const res = await response.json();
    return res;
  };

  const createEvent = async (eventDetails) => {
    setShowLoader(true);
    const uploadImageResponse = await uploadImage();
    if (uploadImageResponse?.success) {
      eventDetails["thumbnail"] = uploadImageResponse?.data;

      const response = await fetch("/api/event/add", {
        method: "POST",
        body: JSON.stringify(eventDetails),
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlBheWFsXzcxIiwiZW1haWwiOiJ5b3VqanUyMDEyQGdtYWlsLmNvbSIsImlhdCI6MTY4MTYzMTM0Mn0.E8HDYPMP5goQiWQh2Ib8Uev8BXCPNRsnlFgLumIYaKGe_QTlvLMZESQvXLyy8om8UMVMQOUl3QZCN92h3ZpCS1mbcxhmMs2I5wYSH0v5MU8OTHvaDnfcVQ_mD7Q6laGvIG8Wdy-fj3W5o7gKDgLIlsCQ69D062uv_CFq89bo6epgSEb4pPdmmEiShKzfHIJ6i644v6kEYxyJuiprT3dQ1W4AJoeYYqTRizhbC4xABFL3a2PbTLfsHDoAur4WK6nY8jFCuA2fOXkP1YRkvjuiqHGTdh4lgid6Xcp_lmnrqh3xvdrxJO4iYQPo8PHnR7Dv2JhQwjQpRUdZeAdP0hPcig",
        },
      });
      const res = await response.json();

      if (res?.success) {
        setSuccessfullyAdded(true);
      }
      setShowLoader(false);
    }
  };

  const goToDetails = (e) => {
    e.preventDefault();

    const errors = {};

    if (!title.trim()) {
      errors.title = "The title field is required.";
    } else if (title.trim().length < 6) {
      errors.title = "The title must be at least 6 characters";
    }

    if (!venue.trim()) {
      errors.venue = "The address field is required.";
    } else if (venue.trim().length < 6) {
      errors.venue = "The address must be at least 6 characters";
    }

    if (!file) {
      errors.thumbnail = "The thumbnail field is required.";
    }

    if (!tags.trim()) {
      errors.tags = "The tags field is required.";
    } else if (tags.trim().length < 6) {
      errors.tags = "The tags must be at least 6 characters";
    }

    if (!selectedEventType.value) {
      errors.selectedEventType = "The event type field is required.";
    }

    if (!selectedLocation.value) {
      errors.selectedLocation = "The location id field is required.";
    }

    // if (!description.trim()) {
    //   errors.description = "Description is required";
    // }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    setErrors(errors);

    console.log("Submitting form...", {
      title,
      selectedEventType,
      file,
      venue,
      tags,
      videoUrl,
      selectedLocation,
      thumbnail,
    });

    setShowDetails(true);
    setShowOverview(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file, file.name);
    setFile(file);
    const image = window.URL.createObjectURL(file);
    console.log("image", image);
    setSrc(image);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Code to handle the file upload
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

  console.log(previousThumbnail, "previousThumbnail");

  return (
    <>
      {showLoader ? (
        <div className="flex h-screen w-screen justify-center items-center">
          <img src={"/loading.gif"} width="5%" />
        </div>
      ) : (
        <div className="max-w-6xl pt-[1.5rem] mx-auto w-full">
          <h2 className="text-lg font-bold mb-4">{`${
            eventToBeUpdated ? "Update" : "List"
          } an Event`}</h2>
          {!successfullyAdded && (
            <form
              style={{
                // boxShadow: "18px 23px 24px -12px rgba(0, 0, 0, 0.5)",
                // -webkitBoxShadow: "18px 23px 24px -12px rgba(0, 0, 0, 0.5)"
                filter:
                  "drop-shadow(0 10px 8px rgb(0 150 0 / 0.15)) drop-shadow(0 4px 3px rgb(0 150 0 / 0.2)",
              }}
              className="bg-white mb-4 p-6 rounded-lg"
            >
              <div className="flex flex-wrap mb-3">
                <div className="cursor-pointer flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class={`h-5 w-5 ${
                      showOverview ? "text-green-600" : "text-gray-600"
                    } mt-0.5`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <div
                    class={`font-semibold ${
                      showOverview ? "text-green-600" : "text-gray-600"
                    } mr-3`}
                  >
                    Overview
                  </div>
                </div>
                <div className="cursor-pointer flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class={`h-5 w-5 ${
                      showDetails ? "text-green-600" : "text-gray-600"
                    } mt-0.5`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fill-rule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <div
                    class={`font-semibold ${
                      showDetails ? "text-green-600" : "text-gray-600"
                    } mr-3`}
                  >
                    Details
                  </div>
                </div>
              </div>
              {showOverview && (
                <div>
                  <div className="grid grid-cols-3 gap-x-[2rem]">
                    <div className="mb-4">
                      <label
                        className="block font-normal text-gray-700 mb-2"
                        htmlFor="title"
                      >
                        Title
                      </label>
                      <input
                        className="border focus:outline-none focus:border focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-gray-700 font-medium p-2 w-full rounded-md"
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        placeholder="Digital Elite Camp"
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.title}
                        </p>
                      )}
                      <h6 className="pt-1 text-gray-500 font-normal text-sm">{`Tip: Try making it short, this will be shown as the title of the event in the event page and will be used as url, adding little venue name or year at the end is trendy.`}</h6>
                    </div>
                    <div className="mb-4">
                      <label
                        className="block font-normal text-gray-700 mb-2"
                        htmlFor="venue"
                      >
                        Venue
                      </label>
                      <input
                        className="border focus:outline-none focus:border focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-gray-700 font-medium p-2 w-full rounded-md"
                        type="text"
                        id="venue"
                        name="venue"
                        value={venue}
                        placeholder="Melbourne Cricket Ground, Victoria"
                        onChange={(e) => setVenue(e.target.value)}
                        required
                      />
                      {errors.venue && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.venue}
                        </p>
                      )}
                      <h6 className="pt-1 text-gray-500 font-normal text-sm">{`Tip: Write online here if the event is online otherwise write address of the venue.`}</h6>
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 font-normal mb-2"
                        htmlFor="eventType"
                      >
                        Event Type
                      </label>
                      <Select
                        id="eventType"
                        className="text-gray-700 font-medium rounded-md z-20"
                        options={eventTypes}
                        styles={customStyles}
                        value={selectedEventType}
                        onChange={setSelectedEventType}
                      />
                      {errors.selectedEventType && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.selectedEventType}
                        </p>
                      )}
                      <h6 className="pt-1 text-gray-500 font-normal text-sm">{`Tip: Select your event type carefully, We will be using filters for the event type.`}</h6>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-x-[2rem]">
                    <div className="col-span-2">
                      <div className="grid grid-rows-2">
                        <div className="grid grid-cols-2 gap-x-[2rem]">
                          <div className="mb-4">
                            <label
                              className="block text-gray-700 font-normal mb-2"
                              htmlFor="location"
                            >
                              Location
                            </label>
                            <Select
                              id="location"
                              className="border focus:outline-none focus:border focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-gray-700 font-medium rounded-md"
                              options={locations}
                              styles={customStyles}
                              value={selectedLocation}
                              onChange={setSelectedLocation}
                            />
                            {errors.selectedLocation && (
                              <p className="mt-1 text-sm text-red-500">
                                {errors.selectedLocation}
                              </p>
                            )}
                          </div>
                          <div className="mb-4">
                            <label
                              className="block font-normal text-gray-700 mb-2"
                              htmlFor="video"
                            >
                              Video
                            </label>
                            <input
                              className="border focus:outline-none focus:border focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-gray-700 font-medium p-2 w-full rounded-md"
                              type="text"
                              id="video"
                              name="video"
                              value={videoUrl}
                              placeholder="Video Url"
                              onChange={(e) => setVideoUrl(e.target.value)}
                            />
                            <h6 className="pt-1 text-gray-500 font-normal text-sm">{`Help: Paste your youtube url here. Please make sure to have your youtube embed option allowed.`}</h6>
                          </div>
                        </div>
                        <div className="">
                          <div className="mb-4">
                            <label
                              className="block font-normal text-gray-700 mb-2"
                              htmlFor="tags"
                            >
                              Tags
                            </label>
                            <input
                              className="border focus:outline-none focus:border focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-gray-700 font-medium p-2 w-full rounded-md"
                              type="text"
                              id="tags"
                              name="tags"
                              value={tags}
                              placeholder="Serena Stays, Atkinson, NH, Eco+ stay etc"
                              onChange={(e) => setTags(e.target.value)}
                              required
                            />
                            {errors.tags && (
                              <p className="mt-1 text-sm text-red-500">
                                {errors.tags}
                              </p>
                            )}
                            <h6 className="pt-1 text-gray-500 font-normal text-sm">{`Tip: Tags should be separated with comma ( , ). It's important for ranking factors for search engine. Without relevant tag your event may not appear on search results.`}</h6>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4 h-40">
                      <label
                        className="block font-normal text-gray-700 mb-2"
                        htmlFor="thumbnail"
                      >
                        Thumbnail
                      </label>
                      {/* <label
            for="thumbnail"
            className="border border-dashed w-full h-36 mt-1 rounded-xl flex items-center cursor-pointer shadow-sm"
          >
            <div className="flex mx-auto text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              <p className="">Image File</p>
            </div>
          </label> */}

                      {/* <input
            type="file"
            className="hidden"
            // wire:model="thumbnail"
            id="thumbnail"
          /> */}

                      {/* <input
            className="hidden"
            type="file"
            id="thumbnail"
            name="thumbnail"
            onChange={handleFileChange}
            src={src}
            // required
          /> */}

                      {/* <img
            className="object-fill h-full relative z-0"
            src={src}
            width="100%"
          /> */}

                      <div className="pl-30 grid place-items-center absolute">
                        <input
                          className="p-2 text-transparent rounded-md z-10"
                          type="file"
                          id="thumbnail"
                          name="thumbnail"
                          onChange={handleFileChange}
                          // src={src}
                          // required
                        />
                      </div>
                      {/* <div className="text-green-600 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            <p className="">Image File</p>
          </div> */}
                      <img
                        className="object-fill h-full relative z-0"
                        src={src ?? previousThumbnail}
                        width="100%"
                      />
                      {errors.thumbnail && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.thumbnail}
                        </p>
                      )}
                      <h6 className="pt-1 text-gray-500 font-normal text-sm">{`Tip: Recommended thumbnail size 720px height & 400px width.`}</h6>
                    </div>

                    {/* <label
          htmlFor="file-upload"
          className="block text-sm font-medium text-gray-700"
        >
          Upload a file
        </label> */}
                    {/* <div className="mt-1 flex items-center">
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file-upload"
            className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Select File
          </label>
          <embed className="ml-3" src={src} width="250" height="200" />
        </div> */}
                  </div>
                </div>
              )}
              {showDetails && (
                <>
                  <div class="grid grid-cols-3 gap-6">
                    <div class="col-span-2">
                      <label
                        class="block font-medium text-sm text-gray-700 mb-4"
                        for="packages"
                      >
                        Packages
                      </label>
                      <div className="grid grid-rows-2">
                        <ul
                          class="grid grid-cols-3 list-none border-b-0 pl-0 pb-0 h-30"
                          role="tablist"
                          data-te-nav-ref
                        >
                          <li
                            // role="presentation"
                            // class="hover:underline"
                            onClick={() => {
                              setIsPremium(false);
                              setIsAdvanced(false);
                              setIsBasic(true);
                              setOverView("Basic OverView");
                              setFacilities(
                                basicDetails?.facilities
                                  ? basicDetails?.facilities.length == 1
                                    ? basicDetails?.facilities[0]
                                    : basicDetails?.facilities.join(",")
                                  : ""
                              );
                              setPrice(basicDetails?.price ?? "");
                            }}
                          >
                            <a
                              href="#tabs-home"
                              class={
                                isBasic
                                  ? "mx-6 block border-x-0 border-b-2 border-t-0 border-transparent px-7 text-sm font-bold font-medium uppercase leading-tight hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-green-600 dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-green-600 focus:text-green-600 focus:bg-green-100"
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
                            // role="presentation"
                            // class="hover:underline"
                            onClick={() => {
                              setIsBasic(false);
                              setIsPremium(false);
                              setIsAdvanced(true);
                              setOverView("Advanced OverView");
                              setFacilities(
                                advanceDetails?.facilities
                                  ? advanceDetails?.facilities.length == 1
                                    ? advanceDetails?.facilities[0]
                                    : advanceDetails?.facilities.join(",")
                                  : ""
                              );
                              setPrice(advanceDetails?.price ?? "");
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
                            // class="hover:underline"
                            onClick={() => {
                              setIsBasic(false);
                              setIsAdvanced(false);
                              setIsPremium(true);
                              setOverView("Premium OverView");
                              setFacilities(
                                premiumDetails?.facilities
                                  ? premiumDetails?.facilities.length == 1
                                    ? premiumDetails?.facilities[0]
                                    : premiumDetails?.facilities.join(",")
                                  : ""
                              );
                              setPrice(premiumDetails?.price ?? "");
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
                        <div className="grid grid-cols-3 gap-x-[2rem]">
                          <div className="col-span-2">
                            <label
                              className="block font-medium text-sm text-gray-700"
                              for="facilities"
                            >
                              Facilities Provided
                            </label>
                            <input
                              className="p-2 border focus:outline-none focus:border focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
                              id="facilities"
                              placeholder="5 star hotel, tour of museum, etc."
                              value={facilities}
                              onChange={(e) => handleFacilitiesChange(e)}
                            />
                            {errors.facilities && (
                              <p className="mt-1 text-sm text-red-500">
                                {errors.facilities}
                              </p>
                            )}
                            <p className="text-sm mt-2 text-gray-500">
                              Tip: Facilities should be separated with comma ( ,
                              )
                            </p>
                          </div>
                          <div>
                            <label
                              className="block font-medium text-sm text-gray-700"
                              for="price"
                            >
                              Price
                            </label>
                            <input
                              className="p-2 border focus:outline-none focus:border focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
                              id="price"
                              type="number"
                              value={price}
                              placeholder="INR"
                              onChange={(e) => handlePriceChange(e)}
                            />
                            {isBasic && errors.basicPrice && (
                              <p className="mt-1 text-sm text-red-500">
                                {errors.basicPrice}
                              </p>
                            )}
                            {isAdvanced && errors.advancePrice && (
                              <p className="mt-1 text-sm text-red-500">
                                {errors.advancePrice}
                              </p>
                            )}
                            {isPremium && errors.premiumPrice && (
                              <p className="mt-1 text-sm text-red-500">
                                {errors.premiumPrice}
                              </p>
                            )}
                            {/* <p className="text-sm mt-2 text-gray-500">
                      Tip: Select a date and time for the event.
                    </p> */}
                          </div>
                        </div>
                      </div>
                      {/* <div class="col-span-2"> */}
                      <label
                        class="block font-medium text-sm text-gray-700"
                        for="body"
                      >
                        Details
                      </label>
                      {/* <TrixEditor value={value} onChange={handleChange} /> */}
                      {/* <TrixEditor onChange={handleEditorChange} value={content} /> */}
                      {/* <p>Content: {content}</p> */}
                      {/* <input
                  id="x"
                  name="content"
                  // type="hidden"
                  value={value}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <trix-editor input="x"></trix-editor> */}

                      <div
                        contentEditable
                        id="display-details"
                        className="border border-gray-300 rounded-md p-2"
                        onInput={handleChange}
                      >
                        {content}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          className="px-2 py-1 bg-gray-200 rounded-md"
                          onClick={(e) => handleBold(e)}
                        >
                          <b>B</b>
                        </button>
                        <button
                          className="px-2 py-1 bg-gray-200 rounded-md"
                          onClick={(e) => handleItalic(e)}
                        >
                          <em>I</em>
                        </button>
                        <button
                          className="px-2 py-1 bg-gray-200 rounded-md"
                          onClick={(e) => handleUnderline(e)}
                        >
                          <u>U</u>
                        </button>
                      </div>
                      {/* </div> */}
                      {/* <div className="max-w-4xl mx-auto">
    <WysiwygEditor
      editorState={editorState}
      onEditorStateChange={handleEditorChange}
    />
    <div className="bg-white rounded-lg shadow-md p-4 mt-4">
      <Editor editorState={editorState} readOnly={true} />
    </div>
  </div> */}

                      {/* <RichTextEditor /> */}
                      {/* </div> */}
                      {/* <div>
                  <label
                    className="block font-medium text-sm text-gray-700"
                    for="date"
                  >
                    Date
                  </label>
                  <input
                    className="p-2 border focus:outline-none focus:border focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
                    id="date"
                    value={date}
                    type="datetime-local"
                    onChange={(e) => setDate(e.target.value)} */}

                      {/* <input
                class="p-2 border focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
                id="price"
                type="number"
                placeholder="INR"
              /> */}
                    </div>
                    <div>
                      <label
                        className="block font-medium text-sm text-gray-700"
                        for="date"
                      >
                        Date
                      </label>
                      <input
                        className="p-2 border focus:outline-none focus:border focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
                        id="date"
                        value={date}
                        type="datetime-local"
                        onChange={(e) => setDate(e.target.value)}
                      />
                      {errors.date && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.date}
                        </p>
                      )}
                      <p className="text-sm mt-2 text-gray-500">
                        Tip: Select a date and time for the event.
                      </p>
                    </div>
                  </div>
                </>
              )}
              <div className="flex justify-end">
                {showOverview && (
                  <button
                    // type="submit"
                    onClick={(e) => goToDetails(e)}
                    className="px-6 py-2 rounded-lg text-white font-semibold hover:opacity-90 duration-200 focus:ring bg-gradient-to-tl from-black to-green-900"
                    // bg-gradient-to-t to-black 1to-[rgb(23,40,30)] from-green-900 to-black-900"
                  >
                    Next
                  </button>
                )}
                {showDetails && (
                  <>
                    <button
                      // type="submit"
                      onClick={() => {
                        setShowDetails(false);
                        setShowOverview(true);
                      }}
                      className="mr-3 px-6 py-2 rounded-lg text-white font-semibold hover:opacity-90 duration-200 
                focus:ring bg-gradient-to-tl from-black to-green-900"
                    >
                      Back
                    </button>
                    <button
                      // type="submit"
                      onClick={(e) => handleSubmit(e)}
                      className="px-6 py-2 rounded-lg text-white font-semibold hover:opacity-90 duration-200 focus:ring bg-gradient-to-tl from-black to-green-900"
                    >
                      {`${eventToBeUpdated ? "Update" : "Create"}`}
                    </button>
                  </>
                )}
              </div>{" "}
            </form>
          )}
          {successfullyAdded && (
            // <div className="bg-white p-6 rounded-lg shadow-md"></div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div class="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-12 w-12 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                  />
                </svg>
                <h3 class="font-bold text-lg">Successfully published</h3>
                <p class="sm:w-1/2 mx-auto">
                  Your listed property won&#039;t be visible online until we
                  approve it. After the approval you can accept qoutes and
                  payment from your customer. If you are having any issue
                  regarding the property listing please let us know.
                </p>
                <div class="mt-5">
                  <button
                    // href="https://www.trickytrbuttonvellers.com/user/dashboard"
                    onClick={() => router.push({ pathname: "/" })}
                    class="mr-2 px-3 py-2 bg-green-500 text-white rounded-lg font-semibold"
                  >
                    Okay
                  </button>
                  <button
                    // href="https://www.trickytravellers.com/contact-us"
                    class="px-3 py-2 bg-yellow-500 text-white rounded-lg font-semibold"
                  >
                    Contact
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default createEvent;
