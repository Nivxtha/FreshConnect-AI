import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollTools from "./components/ScrollTools";
import BackgroundEffects from "./components/BackgroundEffects";
import CampusFeatures from "./components/CampusFeatures";

import Home from "./pages/Home";
import Events from "./pages/Events";
import Faculty from "./pages/Faculty";
import Clubs from "./pages/Clubs";
import Timetable from "./pages/Timetable";
import Chatbot from "./pages/Chatbot";
import CampusMap from "./pages/CampusMap";


function App() {

  return (

    <BrowserRouter>

      <BackgroundEffects />

      <Navbar />

      <ScrollTools />


      <Routes>

        <Route
          path="/"
          element={<Home />}
        />


        <Route
          path="/events"
          element={<Events />}
        />


        <Route
          path="/faculty"
          element={<Faculty />}
        />


        <Route
          path="/clubs"
          element={<Clubs />}
        />


        <Route
          path="/timetable"
          element={<Timetable />}
        />


        <Route
          path="/chatbot"
          element={<Chatbot />}
        />

        <Route
          path="/campus-features"
          element={<CampusFeatures />}
        />


        <Route
          path="/campus-map"
          element={<CampusMap />}
        />


      </Routes>


      <Footer />


    </BrowserRouter>

  );

}


export default App;