import "./Timetable.css";
import { Sparkles, Clock } from "lucide-react";


function Timetable() {


  const days = [

    {
      day:"Monday",
      subjects:[
        "Java",
        "Data Structures",
        "Maths",
        "Physics"
      ]
    },


    {
      day:"Tuesday",
      subjects:[
        "AI",
        "DBMS",
        "English",
        "DS Lab"
      ]
    },


    {
      day:"Wednesday",
      subjects:[
        "Python",
        "Java",
        "Maths",
        "Sports"
      ]
    },


    {
      day:"Thursday",
      subjects:[
        "DBMS",
        "AI",
        "DS",
        "Library"
      ]
    },


    {
      day:"Friday",
      subjects:[
        "Cloud",
        "Java Lab",
        "Maths",
        "Project"
      ]
    }

  ];





  return (


    <div className="timetable">



      <div className="timetable-header">


        <span className="time-badge">

          <Sparkles size={16}/>

          Smart Academic Planner

        </span>




        <h1>

          📅 Class Timetable

        </h1>




        <p>

          Manage your daily classes and stay organized
          with your smart campus schedule.

        </p>



      </div>








      <div className="table-container">


        {

          days.map((item,index)=>(


            <div 
              className="day-card"
              key={index}
            >



              <h2>

                {item.day}

              </h2>




              {

                item.subjects.map((sub,i)=>(


                  <div 
                    className="subject-card"
                    key={i}
                  >


                    <Clock size={17}/>


                    <span>

                      {i+1}. {i+9}:00 AM

                    </span>



                    <strong>

                      {sub}

                    </strong>


                  </div>


                ))

              }



            </div>


          ))

        }



      </div>



    </div>


  );

}


export default Timetable;