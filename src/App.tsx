import { Router, Route } from "@solidjs/router";
import Navbar from "./layouts/navbar";
import Footer from "./layouts/footer";
import Home from "./pages/Home";
import CV from "./pages/CV";
import Gallery from "./pages/Gallery";
import BackToTop from "./ui/back-to-top";

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
    </Router>
  );
};

export default App;
