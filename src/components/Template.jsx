import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/snippets/html";

import { useContext } from "react";
import { HtmlPdfContext } from "../contexts/HtmlPdf.context";

function Template() {
  const { template, setTemplate } = useContext(HtmlPdfContext);

  return (
    <AceEditor
      mode="html"
      name="template"
      theme="dracula"
      onChange={(val) => setTemplate(val)}
      value={template}
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

export default Template;
