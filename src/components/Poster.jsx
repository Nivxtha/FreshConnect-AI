import "./Poster.css";
import posterImg from "../assets/poster.png";


function Poster() {

  return (

    <div className="poster">


      <div className="poster-image">

        <img
          src={posterImg}
          alt="Freshers Welcome Party Poster"
        />

      </div>




      <div className="details">


        <hr className="divider" />



        <div className="row">

          <span>Date</span>

          <b>05 August 2026</b>

        </div>




        <div className="row">

          <span>Time</span>

          <b>6:00 PM onwards</b>

        </div>





        <div className="row">

          <span>Venue</span>

          <b>Main Auditorium</b>

        </div>





        <div className="row">

          <span>Hosted by</span>

          <b>Kalakriti Cultural Club</b>

        </div>





        <span className="tag">

          Register on the Freshers Portal →

        </span>



      </div>


    </div>

  );

}


export default Poster;