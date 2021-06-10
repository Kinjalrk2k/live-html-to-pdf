import Application from "./components/Application";
import { HtmlPdfProvider } from "./contexts/HtmlPdf.context";

function App() {
  return (
    <HtmlPdfProvider>
      <Application />
    </HtmlPdfProvider>
  );
}

export default App;
