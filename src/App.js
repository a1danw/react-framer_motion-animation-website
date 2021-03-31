import React from "react";

//Global Style
import GlobalStyle from "./components/GlobalStyle";
import Nav from "./components/Nav";
//Import Pages
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import OurWork from "./pages/OurWork";
//Router
import { Switch, Route, useLocation } from "react-router-dom";
import MovieDetail from "./pages/MovieDetail";
//Animation
import { AnimatePresence } from "framer-motion";
const App = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div>
      <GlobalStyle />

      <Nav />
      {/* animate presence detects when things change */}
      {/* we need to pass the key to let it know we are on another page and to let framer motion
      know to animate */}
      {/* exitBeforeEnter - waits till one animation fades out before animating the
      other in */}
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/" component={AboutUs} />
          <Route exact path="/work" component={OurWork} />
          <Route path="/work/:id" component={MovieDetail} />
          <Route path="/contact" component={ContactUs} />
        </Switch>
      </AnimatePresence>
    </div>
  );
};

export default App;
