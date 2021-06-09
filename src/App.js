import Template from "./components/Template";
import Options from "./components/Options";
import Data from "./components/Data";
import PdfDisplay from "./components/PdfDisplay";

import { HtmlPdfProvider } from "./contexts/HtmlPdf.context";

function App() {
  return (
    <HtmlPdfProvider>
      <div className="App">
        <Template />
        <br />
        <Options />
        <br />
        <Data />
        <br />
        <PdfDisplay />
      </div>
    </HtmlPdfProvider>
  );
}

export default App;
