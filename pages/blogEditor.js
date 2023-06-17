import React, { useState, useEffect } from "react";
import BlogEditor from "@/components/BlogEditor";
import BlogLists from "@/pages/blogLists";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const uploadBlogs = () => {
  // const isBlog = true;
  const [openTab, setOpenTab] = React.useState(1);
  const [isBlog, setIsBlog] = React.useState(true);
  const [blogId, setBlogId] = React.useState("");
  const [file, setFile] = useState(null);
  const [src, setSrc] = useState(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    setSelectedBlogType({
      value: "Music",
      label: "Music",
    });
  });

  const goToDetails = (e) => {
    // Function logic here
    console.log("Button clicked!");
    console.log("content");
    console.log(content);
    console.log("content");
    console.log(e);
    setIsBlog(!isBlog);
  };

  const blogTypes = [
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

  const [selectedBlogType, setSelectedBlogType] = useState(blogTypes[0]);
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file, file.name);
    setFile(file);
    const image = window.URL.createObjectURL(file);
    console.log("image", image);
    setSrc(image);
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

  const handleSelectChange = (event) => {
    setSelectedBlogType(event.target.value);
  };

  const saveBlog = async (blogDetails) => {
    console.log("blogDetails");
    console.log(blogDetails);
    // setShowLoader(true);

    const response = await fetch("/api/blog/add", {
      method: "POST",
      body: JSON.stringify(blogDetails),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlBheWFsXzcxIiwiZW1haWwiOiJ5b3VqanUyMDEyQGdtYWlsLmNvbSIsImlhdCI6MTY4MTYzMTM0Mn0.E8HDYPMP5goQiWQh2Ib8Uev8BXCPNRsnlFgLumIYaKGe_QTlvLMZESQvXLyy8om8UMVMQOUl3QZCN92h3ZpCS1mbcxhmMs2I5wYSH0v5MU8OTHvaDnfcVQ_mD7Q6laGvIG8Wdy-fj3W5o7gKDgLIlsCQ69D062uv_CFq89bo6epgSEb4pPdmmEiShKzfHIJ6i644v6kEYxyJuiprT3dQ1W4AJoeYYqTRizhbC4xABFL3a2PbTLfsHDoAur4WK6nY8jFCuA2fOXkP1YRkvjuiqHGTdh4lgid6Xcp_lmnrqh3xvdrxJO4iYQPo8PHnR7Dv2JhQwjQpRUdZeAdP0hPcig",
      },
    });
    const res = await response.json();
    console.log("res");
    console.log(res);

    if (res?.success) {
      setOpenTab(2);
      // setSuccessfullyAdded(true);
    }
    // setShowLoader(false);
  };

  const onSave = async () => {
    const uploadImageResponse = await uploadImage();
    if (uploadImageResponse?.success) {
      let media = [
        {
          id: 'user1',
          type: 'image' || 'video' || 'ytembed',
          title: '',
          url: uploadImageResponse?.data,
          region: 'jaipur,india',
          profileImage: 'ghj',
          userName: ''
        }
      ];
      console.log("media");
      console.log(media);
      console.log("blogId");
      console.log(blogId);
      if (blogId != "") {

        const response = await fetch(`/api/blog/update/${blogId}`, {
          method: "PUT",
          body: JSON.stringify({title:"title",description: content, isPublished: false, media: media}),
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlBheWFsXzcxIiwiZW1haWwiOiJ5b3VqanUyMDEyQGdtYWlsLmNvbSIsImlhdCI6MTY4MTYzMTM0Mn0.E8HDYPMP5goQiWQh2Ib8Uev8BXCPNRsnlFgLumIYaKGe_QTlvLMZESQvXLyy8om8UMVMQOUl3QZCN92h3ZpCS1mbcxhmMs2I5wYSH0v5MU8OTHvaDnfcVQ_mD7Q6laGvIG8Wdy-fj3W5o7gKDgLIlsCQ69D062uv_CFq89bo6epgSEb4pPdmmEiShKzfHIJ6i644v6kEYxyJuiprT3dQ1W4AJoeYYqTRizhbC4xABFL3a2PbTLfsHDoAur4WK6nY8jFCuA2fOXkP1YRkvjuiqHGTdh4lgid6Xcp_lmnrqh3xvdrxJO4iYQPo8PHnR7Dv2JhQwjQpRUdZeAdP0hPcig",
          },
        });
        const res = await response.json();
        console.log(res);
      } else {
        console.log("innnnnnnnn");
        saveBlog({ title:"title",description: "No Description provided", isPublished: false, media: media });
      }
    }
  }

  const onPublish = async () => {
    const uploadImageResponse = await uploadImage();
    if (uploadImageResponse?.success) {
      let media = [
        {
          id: 'user1',
          type: 'image' || 'video' || 'ytembed',
          title: '',
          url: uploadImageResponse?.data,
          region: 'jaipur,india',
          profileImage: 'ghj',
          userName: ''
        }
      ];
      saveBlog({ title:"title",description: content, isPublished: true, media: media });
    }
  }

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 pl-20 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-black bg-blueGray-600"
                    : "text-blueGray-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Create a new
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-black bg-blueGray-600"
                    : "text-blueGray-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                All Blogs
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 ml-8 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  {isBlog ? (
                    <div className="w-full h-full pl-[50px]">
                      <BlogEditor goToDetails={goToDetails} setEditorData={setContent} setBlogId={setBlogId} />
                    </div>
                  ) : (
                    <div className="flex justify-center w-[70rem] h-[25rem] mt-20 mb-20">
                      <div className="absolute mr-80 pl-8 pt-4">
                        <FontAwesomeIcon
                          icon={faArrowLeft}
                          className="my-icon"
                          style={{ color: "#32CD32", fontSize: "24px" }}
                          onClick={(e) => goToDetails(e)}
                        />
                      </div>
                      <div className="bg-gradient-to-tl from-black to-green-900 w-[22rem] h-[30rem] border shadow-lg rounded-lg p-8">
                        <div className={src == null ? "border shadow-lg rounded-lg m-4 bg-[url('https://www.trickytravellers.com/uploads/posts/24441a37-54c1-4189-a9c7-54c45ab41bb8.webp')] bg-no-repeat bg-cover" : "border shadow-lg rounded-lg m-4"}>
                          {src != null ? <img
                            class="bg-no-repeat w-[20rem] h-[9rem]"
                            src={src}
                            alt="Gallery Icon"
                          /> : <></>}
                          {src == null ?
                            <label
                              className="block font-bold text-gray-700 h-[8rem]"
                              htmlFor="thumbnail"
                            ></label> : <></>}
                        </div>
                        <div className="pl-30 grid place-items-center">
                          <label class="relative w-[15rem] flex place-items-center py-2 text-white rounded-lg text-black font-semibold rounded-lg cursor-pointer">
                            <img
                              class="h-15 w-10 mr-4"
                              src="/galleryIcon.png"
                              alt="Gallery Icon"
                            />
                            <span>Add Thumbnail</span>
                            <input
                              type="file"
                              class="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                              onChange={handleFileChange}
                            />
                          </label>
                          {/* <input
                          className="p-2 text-transparent rounded-md z-10"
                          type="file"
                          id="thumbnail"
                          name="thumbnail"
                          onChange={handleFileChange}
                        src={"/galleryIcon.png"}
                        // required
                        /> */}
                          {/* <img src={"/galleryIcon.png"} width="5%" /> */}
                        </div>
                        <div className="mb-4">
                          <label
                            className="block text-white font-normal mb-2 ml-4 mt-4"
                            htmlFor="eventType"
                          >
                            Event Type
                          </label>
                          <Select
                            id="eventType"
                            className="text-gray-700 font-medium rounded-md z-20 ml-4 mr-4"
                            options={blogTypes}
                            styles={customStyles}
                            value={selectedBlogType}
                            // onChange={handleSelectChange}
                            onChange={setSelectedBlogType}
                          />
                        </div>
                        <div className="flex">
                          <button
                            // type="submit"
                            onClick={(e) => onSave()}
                            className="flex ml-8 mt-8 mb-16 px-6 py-2 rounded-lg text-black font-semibold hover:opacity-90 duration-200 focus:ring bg-gradient-to-r from-teal-200 to-lime-200 hover:from-emerald-500 hover:to-lime-600"
                          // bg-gradient-to-t to-black 1to-[rgb(23,40,30)] from-green-900 to-black-900"
                          // bg-gradient-to-r from-emerald-500 to-lime-600
                          >
                            Save
                          </button>
                          <button
                            // type="submit"
                            onClick={(e) => onPublish()}
                            className="flex ml-10 mt-8 mb-16 px-6 py-2 rounded-lg text-black font-semibold hover:opacity-90 duration-200 focus:ring bg-gradient-to-r from-teal-200 to-lime-200 hover:from-emerald-500 hover:to-lime-600"
                          // bg-gradient-to-t to-black 1to-[rgb(23,40,30)] from-green-900 to-black-900"
                          // bg-gradient-to-r from-emerald-500 to-lime-600
                          >
                            Publish
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <div className="w-full h-full pl-[50px] ml-[20px]">
                    <BlogLists />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default uploadBlogs;
