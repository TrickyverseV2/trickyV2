import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";

function BlogEditor({goToDetails, setEditorData, setBlogId}) {
  const [description, setDescription] = useState("");
  useEffect(() => {
    setInterval(() => {
      if (
        document &&
        document.getElementsByClassName("tox-statusbar__branding") &&
        document.getElementsByClassName("tox-statusbar__branding")[0] &&
        document.getElementsByClassName("tox-statusbar__branding")[0].style
          .display != "none"
      ) {
        document.getElementsByClassName("tox-statusbar__branding")[0].remove();
      }
      if (
        document &&
        document.getElementsByClassName("tox-dialog") &&
        document.getElementsByClassName("tox-dialog")[0] &&
        document.getElementsByClassName("tox-dialog")[0].style.display != "none"
      ) {
        document.getElementsByClassName("tox-dialog")[0].remove();
      }

      console.log();
      // if (
      //   document &&
      //   document.getElementsByClassName("tox-tbtn") &&
      //   document.getElementsByClassName("tox-tbtn")
      //   // document.getElementsByClassName("tox-tbtn")[0].getAttribute("title") ==
      //   //   "Help"
      // ) {
      //   document.getElementsByClassName("tox-tbtn").each((element) => {
      //     if (element.getAttribute("title") == "Help") {
      //       element.remove();
      //     }
      //   });
      //   // document.getElementsByClassName("tox-tbtn")[0].remove();
      // }
    }, 100);
  }, []);

  

  const editorRef = useRef(null);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
    setDescription(content);
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
        console.log(res.data.trim());
        setBlogId(res.data.trim());
        // setSuccessfullyAdded(true);
      }
      // setShowLoader(false);
  };

  const onSave = () => {
    console.log("descc");
    console.log(description);
    setEditorData(description);
    saveBlog({title:"title",description: description, isPublished: false});
    goToDetails();
  }

  return (
    <>
      <Editor
        tinymceScriptSrc={"/tinymce/tinymce.min.js"}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>Add an impressive title to your trip</p>"
        init={{
          height: 500,
          // width: 700,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "preview",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onEditorChange={handleEditorChange}
      />
       <button
                    // type="submit"
                    onClick={(e) => onSave()}
                    className="px-6 py-2 rounded-lg text-white font-semibold hover:opacity-90 duration-200 focus:ring bg-gradient-to-tl from-black to-green-900"
                    // bg-gradient-to-t to-black 1to-[rgb(23,40,30)] from-green-900 to-black-900"
                  >
                    Save
                  </button>
                  <button
                    onClick={(e) => goToDetails(e)}
                    className="px-6 py-2 rounded-lg text-white font-semibold hover:opacity-90 ml-4 duration-200 focus:ring bg-gradient-to-tl from-black to-green-900"
                  >
                    Next
                  </button>
    </>
  );
}

export default BlogEditor;
