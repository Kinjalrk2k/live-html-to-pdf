import { createContext, useState } from "react";

export const HtmlPdfContext = createContext();

export function HtmlPdfProvider(props) {
  const [template, setTemplate] = useState("");
  const [data, setData] = useState("");
  const [options, setOptions] = useState("");

  return (
    <HtmlPdfContext.Provider
      value={{
        template,
        setTemplate,
        data,
        setData,
        options,
        setOptions,
      }}
    >
      {props.children}
    </HtmlPdfContext.Provider>
  );
}
