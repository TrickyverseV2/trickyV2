import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
const eventVideo = () => {
  var router = useRouter();
  const [videoUrl, setVideoUrl] = useState("");
  useEffect(() => {
    if (router.query.eventVideoUrl) {
      setVideoUrl(router.query.eventVideoUrl);
    } else {
      fetchEventDetails(router.query.eventId);
    }
  }, [router.query]);

  const fetchEventDetails = async (eventId) => {
    console.log(eventId, "eventId");
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

      console.log(res, "res");

      setVideoUrl(res?.data?.videoUrl);
    }
  };

  return (
    <div class="m-10 w-100 h-50 aspect-w-16 aspect-h-9">
      <iframe
        src={videoUrl}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
};
export default eventVideo;
