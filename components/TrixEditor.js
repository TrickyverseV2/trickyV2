import { useRef, useEffect } from "react";
import Trix from "trix";

const TrixEditor = ({ value, onChange }) => {
  const trixInputRef = useRef(null);

  useEffect(() => {
    const editor = trixInputRef.current.editor;

    editor.loadHTML(value || "");

    const handleChange = () => {
      onChange(editor?.getHTML());
    };

    editor?.addEventListener("trix-change", handleChange);

    return () => {
      editor?.removeEventListener("trix-change", handleChange);
    };
  }, []);

  return (
    <div>
      <input id="trix-input" type="hidden" value={value} />
      <trix-editor input="trix-input" ref={trixInputRef} />
    </div>
  );
};

export default TrixEditor;
