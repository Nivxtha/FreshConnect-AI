import { Link } from "react-router-dom";
import { useState } from "react";

import {
  GraduationCap,
  House,
  CalendarDays,
  Users,
  Clock3,
  BotMessageSquare,
  MapPinned,
  Menu,
  X
} from "lucide-react";

import "./Navbar.css";


function Navbar() {


  const [open, setOpen] = useState(false);


  const closeMenu = () => {
    setOpen(false);
  };


  return (

    <nav className="navbar">


      <div className="nav-container">


        {/* LOGO */}


        <Link
          to="/"
          className="logo"
          onClick={closeMenu}
        >


          <div className="logo-icon">

            <GraduationCap size={32}/>

          </div>



          <div className="logo-text">


            <span>

              FreshConnect AI

            </span>



            <small>

              Smart Campus Companion

            </small>


          </div>


        </Link>





        {/* MOBILE MENU */}


        <button

          className="menu-btn"

          onClick={() => setOpen(!open)}

        >


          {

            open

            ?

            <X size={28}/>

            :

            <Menu size={28}/>

          }


        </button>







        {/* NAV LINKS */}


        <div className={`nav-links ${open ? "active" : ""}`}>



          <Link

            to="/"

            onClick={closeMenu}

          >

            <House size={18}/>

            Home


          </Link>






          <Link

            to="/events"

            onClick={closeMenu}

          >

            <CalendarDays size={18}/>

            Events


          </Link>






          <Link

            to="/clubs"

            onClick={closeMenu}

          >

            <Users size={18}/>

            Clubs


          </Link>






          <Link

            to="/faculty"

            onClick={closeMenu}

          >

            <GraduationCap size={18}/>

            Faculty


          </Link>






          <Link

            to="/timetable"

            onClick={closeMenu}

          >

            <Clock3 size={18}/>

            Timetable


          </Link>






          <Link

            to="/campus-map"

            onClick={closeMenu}

          >

            <MapPinned size={18}/>

            Campus Map


          </Link>






          <Link

            to="/chatbot"

            className="ai-link"

            onClick={closeMenu}

          >

            <BotMessageSquare size={18}/>

            AI Chatbot


          </Link>




        </div>



      </div>


    </nav>

  );

}


export default Navbar;