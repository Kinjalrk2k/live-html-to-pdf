import { Route, BrowserRouter, Switch } from "react-router-dom";
import Application from "./components/Application";
import LandingPage from "./components/LandingPage";
import { HtmlPdfProvider } from "./contexts/HtmlPdf.context";

function App() {
  return (
    <HtmlPdfProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={LandingPage}></Route>
          <Route path="/:id" exact component={Application}></Route>
        </Switch>
      </BrowserRouter>
    </HtmlPdfProvider>
  );
}

export default App;
