import { useState, useEffect } from "react";

// ** Next Import
import { useRouter } from "next/router";
import MainDetailCard from "../components/MiniDetailsBlock";

// ** MUI Components
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MuiTabList from "@mui/lab/TabList";
import CircularProgress from "@mui/material/CircularProgress";

// ** Icon Imports
import Icon from "@/src/core/components/icon";

// ** Demo Components
import Teams from "@/src/views/pages/user-profile/teams";
import Profile from "@/src/views/pages/user-profile/profile";
import Projects from "@/src/views/pages/user-profile/projects";
import Connections from "@/src/views/pages/user-profile/connections";
import UserProfileHeader from "@/src/views/pages/user-profile/UserProfileHeader";
const colors = [
  "#864ad1",
  "#ffac30",
  "#43dc80",
  "#51a6f5",
  "#d758e2",
  "#FB5265",
];

const profile = ({ tab, data }) => {
  // ** State
  const [activeTab, setActiveTab] = useState(tab);
  const [isLoading, setIsLoading] = useState(true);

  // ** Hooks
  const router = useRouter();
  const hideText = true;

  return (
    <div className=" w-full h-full flex flex-col items-center pl-[55px] p-2">
      {/* <script src="https://cdn.lordicon.com/ritcuqlt.js"></script> */}
      <div className="relative group rounded-lg overflow-hidden w-full h-[250px] bg-gray-400">
        <img
          className="w-full h-full object-cover rounded-lg shadow-lg"
          src="https://picsum.photos/1280/250/?blur=1"
        />
        <div className="absolute top-0  w-full opacity-0 bg-[rgba(107,114,150,0.5)] h-full transition-all duration-500 group-hover:opacity-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="white"
            className="transition-all duration-500 translate-y-[100%] group-hover:translate-y-0"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0zm-.5 14.5V11h1v3.5a.5.5 0 0 1-1 0z"
            />
          </svg>
        </div>
        <div className="absolute group w-[40px] group-hover:w-[100px] overflow-hidden hover:w-[100px] bottom-3 transition-all duration-500 right-3 px-3 py-2 gap-x-3 rounded-md bg-gray-200 flex flex-row items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-pencil-square"
            viewBox="0 0 16 16"
          >
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path
              fill-rule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
            />
          </svg>
          <label className="hidden group-hover:block transition-all duration-300">
            Edit
          </label>
        </div>
        {/* hiiiiiiiiiiiiiiiiiiii */}
      </div>
      <div className=" group rounded-full overflow-hidden w-[200px] h-[200px] border-gray-600 border-[6px] bg-gray-400 shadow-2xl relative top-[-6rem] mb-[-6rem] /-translate-y-[45%] ">
        <img
          className="w-full h-full rounded-full"
          src="https://picsum.photos/200"
        />
        <div className="absolute top-0 rounded-full w-full opacity-0 bg-[rgba(107,114,150,0.5)] h-full transition-all duration-500 group-hover:opacity-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="white"
            className="transition-all duration-500 translate-y-[100%] group-hover:translate-y-0"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0zm-.5 14.5V11h1v3.5a.5.5 0 0 1-1 0z"
            />
          </svg>
        </div>
      </div>
      <label className=" mt-2 text-3xl font-bold">{"Sam Shubham"}</label>

      <div className="mt-[30px] w-full flex flex-row items-center justify-evenly flex-wrap">
        <MainDetailCard
          color={colors[3]}
          bgColor={"white"}
          textColor={"black"}
          data={50 + " Followers"}
          icon={() => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill={colors[3]}
              // class="bi bi-people-fill"
              viewBox="0 0 24 24"
            >
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
            </svg>
          )}
        />
        <MainDetailCard
          color={colors[2]}
          bgColor={"white"}
          textColor={"black"}
          data={10 + " Following"}
          icon={() => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill={colors[2]}
              // class="bi bi-people-fill"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"
              />
              <path d="M2.242 2.194a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.256-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53z" />
            </svg>
          )}
        />
        <MainDetailCard
          color={colors[1]}
          bgColor={"white"}
          textColor={"black"}
          data={4 + " Blogs"}
          icon={() => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill={colors[1]}
              // class="bi bi-people-fill"
              viewBox="0 0 24 24"
            >
              <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z" />
              <path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z" />
            </svg>
          )}
        />

        {/* <div className="w-[45%] h-[200px] bg-gray-400 rounded-md shadow-lg"></div> */}
        {/* <div className="w-[45%] h-[200px] bg-gray-400 rounded-md shadow-lg"></div> */}
      </div>
    </div>
  );
};

export default profile;
