import Template from "./components/Template";
import Options from "./components/Options";
import { HtmlPdfProvider } from "./contexts/HtmlPdf.context";
import Data from "./components/Data";

function App() {
  return (
    <HtmlPdfProvider>
      <div className="App">
        <Template />
        <br />
        <Options />
        <br />
        <Data />
      </div>
    </HtmlPdfProvider>
  );
}

export default App;
