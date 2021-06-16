import { Route, BrowserRouter, Switch } from "react-router-dom";
import Application from "./components/Application";
import Forks from "./components/Forks";
import LandingPage from "./components/LandingPage";
import { AuthProvider } from "./contexts/Auth.context";
import { HtmlPdfProvider } from "./contexts/HtmlPdf.context";

function App() {
  return (
    <HtmlPdfProvider>
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={LandingPage}></Route>
            <Route path="/p/:id" exact component={Application}></Route>
            <Route path="/p/:id/forks" exact component={Forks}></Route>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </HtmlPdfProvider>
  );
}

export default App;
