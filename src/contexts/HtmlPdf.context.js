import { createContext, useState } from "react";

export const HtmlPdfContext = createContext();

const defaultOptions = {
  format: "A4",
  orientation: "portrait",
  border: "10mm",
};

const defaultTemplate = `<html>
  <h1>{{msg}}</h1>
</html>
`;

const defaultData = {
  msg: "Hello, World!",
};

export function HtmlPdfProvider(props) {
  const [id, setId] = useState(null);
  const [template, setTemplate] = useState(defaultTemplate);
  const [data, setData] = useState(JSON.stringify(defaultData, null, 2));
  const [options, setOptions] = useState(
    JSON.stringify(defaultOptions, null, 2)
  );

  return (
    <HtmlPdfContext.Provider
      value={{
        id,
        setId,
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
