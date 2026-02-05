import { Router, Route } from "@solidjs/router";
import Navbar from "./layouts/navbar";
import Footer from "./layouts/footer";
import Home from "./pages/Home";
import CV from "./pages/CV";

const App = () => {
  return (
    <Router>
      <Route
        path="/"
        component={() => (
          <>
            <Navbar />
            <Home />
            <Footer />
          </>
        )}
      />
      <Route path="/cv" component={CV} />
    </Router>
  );
};

export default App;
