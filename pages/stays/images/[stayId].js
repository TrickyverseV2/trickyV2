import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const stay_image_gallery = () => {
  var router = useRouter();

  const [stayImages, setStayImages] = useState();

  useEffect(() => {
    if (router.query.stayImages) {
      setStayImages(JSON.parse(router.query.stayImages));
    } else {
      fetchStayDetails(router.query.stayId);
    }
  }, [router.query]);

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

      setStayImages(res?.data?.pictures);
    }
  };

  return (
    <>
      {stayImages && (
        <div class="relative ml-14 bg-green-200 w-full h-full">
          <div class="grid-cols-3 p-10 space-y-2 lg:space-y-0 lg:grid lg:gap-3 lg:grid-rows-3">
            {stayImages &&
              stayImages.map((image) => (
                <div
                  class={
                    stayImages.indexOf(image) != 0
                      ? "w-full rounded hover:shadow-2xl"
                      : "w-full col-span-2 row-span-2 rounded"
                  }
                >
                  <img src={image} alt="image" />
                </div>
                //   <div class="w-full col-span-2 row-span-2 rounded">
                //     <img
                //       src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80"
                //       alt="image"
                //     />
                //   </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};
export default stay_image_gallery;
