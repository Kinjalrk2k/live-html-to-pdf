import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/snippets/json";

import { useContext } from "react";
import { HtmlPdfContext } from "../contexts/HtmlPdf.context";

import editorStyles from "../styles/editor.style";

function Options() {
  const { options, setOptions } = useContext(HtmlPdfContext);

  return (
    <AceEditor
      mode="json"
      name="options"
      onChange={(val) => setOptions(val)}
      value={options}
      {...editorStyles}
    />
  );
}

export default Options;
