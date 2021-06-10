import { createContext, useEffect, useState } from "react";
import api from "../api";

export const HtmlPdfContext = createContext();

export function HtmlPdfProvider(props) {
  const [projectId, setProjectId] = useState("");
  const [template, setTemplate] = useState("");
  const [data, setData] = useState("");
  const [options, setOptions] = useState("");

  useEffect(async () => {
    const res = await api.get(`/project/${projectId}`);
    const { template, data, options } = res.data;

    setTemplate(template);
    setData(data);
    setOptions(options);
  }, [projectId]);

  return (
    <HtmlPdfContext.Provider
      value={{
        projectId,
        setProjectId,
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
