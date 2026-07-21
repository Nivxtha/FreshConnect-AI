import "./Footer.css";

import {
  Bot,
  Mail,
  MapPin,
  Sparkles
} from "lucide-react";


function Footer() {

  return (

    <footer className="footer">


      <div className="footer-container">



        {/* BRAND */}

        <div className="footer-section brand">


          <div className="footer-logo">

            <Bot size={35}/>

            <h2>
              FreshConnect AI
            </h2>

          </div>



          <p>

            Your smart campus companion connecting
            students with events, clubs, faculty
            and AI powered assistance.

          </p>


        </div>







        {/* QUICK LINKS */}

        <div className="footer-section">


          <h3>
            Quick Links
          </h3>


          <a href="/">
            Home
          </a>


          <a href="/events">
            Events
          </a>


          <a href="/clubs">
            Clubs
          </a>


          <a href="/faculty">
            Faculty
          </a>


        </div>







        {/* CONTACT */}

        <div className="footer-section">


          <h3>
            Contact
          </h3>



          <p>

            <Mail size={17}/>

            freshconnectai@gmail.com

          </p>




          <p>

            <MapPin size={17}/>

            Smart Campus

          </p>






          <div className="social-icons">


            <span>
              🌐
            </span>


            <span>
              💼
            </span>


            <span>
              🔗
            </span>


          </div>



        </div>



      </div>







      <div className="footer-bottom">


        <Sparkles size={16}/>


        <p>

          © 2026 FreshConnect AI. Built for Hackathon 🚀

        </p>


      </div>



    </footer>

  );

}


export default Footer;