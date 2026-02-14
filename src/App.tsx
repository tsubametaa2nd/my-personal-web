import { Router, Route } from "@solidjs/router";
import Navbar from "./layouts/navbar";
import Footer from "./layouts/footer";
import Home from "./pages/Home";
import CV from "./pages/CV";
import Gallery from "./pages/Gallery";
import BackToTop from "./ui/back-to-top";
import CredentialsType from "./home/key/CredentialsType";

const App = () => {
  return (
    <Router>
      <Route
        path="/"
        component={() => (
          <>
            <Navbar />
            <Home />
            <BackToTop />
            <Footer />
          </>
        )}
      />
      <Route path="/cv" component={CV} />
      <Route path="/gallery" component={Gallery} />
      <Route
        path="/credentials"
        component={() => (
          <>
            <Navbar />
            <CredentialsType />
            <Footer />
          </>
        )}
      />
    </Router>
  );
};

export default App;
