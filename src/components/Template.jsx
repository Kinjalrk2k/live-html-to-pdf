import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/snippets/html";

import { useContext } from "react";
import { HtmlPdfContext } from "../contexts/HtmlPdf.context";

import editorStyles from "../styles/editor.style";

function Template() {
  const { template, setTemplate } = useContext(HtmlPdfContext);

  return (
    <AceEditor
      mode="html"
      name="template"
      onChange={(val) => setTemplate(val)}
      value={template}
      {...editorStyles}
    />
  );
}

export default Template;
