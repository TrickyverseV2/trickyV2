import React, { useState } from "react";
// import { Editor, EditorState } from 'draft-js';
// import { Editor as WysiwygEditor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const SectionLandingPage = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  return (
    <div>
      <div>SectionLandingPage</div>
      {/* <div className="max-w-4xl mx-auto bg-green rounded-lg shadow-md" style={{    
            filter:
              "drop-shadow(0 10px 8px rgb(0 150 0 / 0.15)) drop-shadow(0 4px 3px rgb(0 150 0 / 0.2)",
          }}>
      <WysiwygEditor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
      />
      {/* <div className="bg-white rounded-lg shadow-md p-4 mt-4">
        <Editor editorState={editorState} readOnly={true} />
      </div> */}
      {/* </div> */}
    </div>
  );
};

export default SectionLandingPage;
