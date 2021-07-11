import { createContext, useEffect, useState } from "react";
import server from "../api/server";

export const HtmlPdfContext = createContext();

export function HtmlPdfProvider(props) {
  const [projectId, setProjectId] = useState("");
  const [template, setTemplate] = useState("");
  const [data, setData] = useState("");
  const [options, setOptions] = useState("");
  const [owner, setOwner] = useState(null);
  const [title, setTitle] = useState("");
  const [forks, setForks] = useState("");

  useEffect(() => {
    (async () => {
      const res = await server.get(`/project/${projectId}`);
      const { template, data, options, owner, title, forks } = res.data;

      setTemplate(template);
      setData(data);
      setOptions(options);
      setOwner(owner);
      setTitle(title);
      setForks(forks);
    })();
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
        owner,
        setOwner,
        title,
        setTitle,
        forks,
        setForks,
      }}
    >
      {props.children}
    </HtmlPdfContext.Provider>
  );
}
