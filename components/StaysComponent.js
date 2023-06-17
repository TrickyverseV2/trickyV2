import React, { useState, useEffect } from "react";
import Moment from "moment";
import { useRouter } from "next/router";

const StaysComponent = () => {
  var router = useRouter();
  const [allStays, setAllStays] = useState([]);

  useEffect(() => {
    fetchAllStays();
  }, []);

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
    setAllStays(res.data);
    // setAllStays(allStays.pop());
  };

  const displayStaysDetails = (stay) => {
    return (
      <div className="relative group cursor-pointer overflow-hidden w-[15rem] h-[20rem]">
        <img
          src={stay.thumbnail}
          className="h-full rounded-xl object-fill"
          alt=""
        />
        <div className="p-3 overflow-hidden absolute  bottom-0  left-0 right-0 cursor-pointer">
          <div className=" 1backdrop-blur-[2px] 1border-[1px] 1border-[rgba(255,255,255,0.2)] group-hover:bg-white bg-transparent cursor-pointer rounded-lg 1group-hover:bg-[rgba(0,0,0,0.3)] group-hover:h-[9rem] h-[3rem] transition-all duration-300 p-2">
            <div className="flex flex-col justify-between h-full">
              <div>
                <span
                  className="text-lg tracking-wider group-hover:text-black group-hover:visible invisible flex gap-[0.3rem] font-semibold"
                  style={{ fontFamily: "kanit" }}
                >
                  <h3>{stay.title}</h3>
                  <i
                    className={`fi hidden group-hover:flex cursor-pointer scale-[0.9] fi-rr-star 1flex items-center justify-center`}
                  ></i>
                </span>
                <div className="flex flex-row gap-x-[0.3rem]">
                  <i
                    className="fa fa-map-marker fill-red"
                    // style="color:#45d38a"
                  ></i>
                  <h3 className="text-xs font-bold group-hover:opacity-100 transition-all duration-200 delay-200 opacity-0 text-gray-500 1line-clamp-6 1group-hover:line-clamp-[6]">
                    {stay.address}
                  </h3>
                </div>
              </div>
              <div className="group-hover:opacity-100 items-end delay-200 flex gap-[0.2rem] opacity-0 transition-all duration-200">
                <h3 className="text-lg text-green-600">{"₹" + stay.price}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="my-[0.5rem]">
        <div className="flex flex-col gap-[0.5rem]">
          <div>
            <h3
              className="font-semibold text-2xl"
              style={{ fontFamily: "kanit" }}
            >
              Stays
            </h3>
          </div>
          <div className="flex justify-end">
            <button
              className="flex items-center justify-center gap-[0.2rem] font-medium text-green-600"
              onClick={() => router.push({ pathname: "/stays/allStays" })}
            >
              <h3>View All</h3>
              <i class="fi fi-rr-arrow-small-right align-middle flex items-center justify-center"></i>
            </button>
          </div>
        </div>
        <div className="my-[1rem]">
          <div className="grid grid-cols-4 gap-[1rem]">
            {allStays &&
              allStays.map((stay) => {
                if (allStays.indexOf(stay) < 4) {
                  return displayStaysDetails(stay);
                }
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default StaysComponent;
