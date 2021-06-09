import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/snippets/json";

import { useContext } from "react";
import { HtmlPdfContext } from "../contexts/HtmlPdf.context";

function Options() {
  const { options, setOptions } = useContext(HtmlPdfContext);

  return (
    <AceEditor
      mode="json"
      name="options"
      theme="dracula"
      onChange={(val) => setOptions(val)}
      value={options}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  );
}

export default Options;
