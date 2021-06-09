import { createContext, useState } from "react";

export const HtmlPdfContext = createContext();

const defaultOptions = {
  format: "A4",
  orientation: "portrait",
  border: "10mm",
};

const defaultTemplate = `<html>

</html>
`;

export function HtmlPdfProvider(props) {
  const [template, setTemplate] = useState(defaultTemplate);
  const [data, setData] = useState("{}");
  const [options, setOptions] = useState(
    JSON.stringify(defaultOptions, null, 2)
  );

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
