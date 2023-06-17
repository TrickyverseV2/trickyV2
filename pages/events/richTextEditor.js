import React, { useState } from 'react';
import dynamic from 'next/dynamic'
import { Editor as WysiwygEditor } from 'react-draft-wysiwyg';
import 'draft-js/dist/Draft.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const handleEditorChange = (state) => {
    setEditorState(state);
  };



  const handleChange = (editorState) => {
    setEditorState(editorState);
  };

  return (
    <div className="p-4 w-full">
        <WysiwygEditor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
      />
    </div>
  );
};

export default RichTextEditor;