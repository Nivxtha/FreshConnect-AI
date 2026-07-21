import { useEffect, useState } from "react";
import { CalendarDays, MapPin, Sparkles } from "lucide-react";
import "./Events.css";


function Events() {


  const [events, setEvents] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState(null);


  const [form, setForm] = useState({

    name:"",
    email:"",
    department:"",
    year:""

  });


  const [message,setMessage] = useState("");





  useEffect(()=>{


    fetch("https://freshconnect-ai-17k6.onrender.com/events")

    .then((res)=>res.json())

    .then((data)=>{
      console.log("Events API:", data);
      setEvents(data);

    })


    .catch((err)=>{

      console.log(err);

    });


  },[]);









  const handleRegister = async()=>{


    if(!form.name || !form.email){


      setMessage("❌ Please enter Name and Email");

      return;

    }





    try{


      const response = await fetch(

        "http://localhost:5000/register",

        {

          method:"POST",

          headers:{

            "Content-Type":"application/json"

          },


          body:JSON.stringify({

            name:form.name,

            email:form.email,

            event:selectedEvent

          })


        }

      );







      const data = await response.json();





      if(response.ok){


        setMessage("🎉 Registration Successful!");



        setForm({

          name:"",

          email:"",

          department:"",

          year:""

        });





        setTimeout(()=>{


          setSelectedEvent(null);

          setMessage("");


        },1500);



      }


      else{


        setMessage(

          data.message || "❌ Registration Failed"

        );


      }




    }


    catch(error){


      console.log(error);

      setMessage("❌ Server Error");


    }



  };












  return (


    <div className="events-page">





      <div className="events-header">



        <span className="events-badge">


          <Sparkles size={16}/>


          Campus Highlights


        </span>





        <h1>

          📅 Campus Events

        </h1>





        <p>

          Explore workshops, hackathons, celebrations
          and exciting activities happening around campus.

        </p>



      </div>









      <div className="event-grid">


      {


        events.length > 0 ? (


          events.map((event,index)=>(



            <div

              className="event-card"

              key={event.id}

            >




              <div className="event-top">


                <div className="event-icon">

                  🎉

                </div>


                <span>

                  Event #{index+1}

                </span>


              </div>






              <h2>

                {event.event_name}

              </h2>







              <div className="event-info">



                <p>

                  <CalendarDays size={18}/>


                  {

                    new Date(

                      event.event_date

                    ).toLocaleDateString()

                  }


                </p>





                <p>

                  <MapPin size={18}/>


                  {event.venue}


                </p>



              </div>








              <p className="description">


                {event.description}


              </p>







              <button

                onClick={()=>{


                  setSelectedEvent(

                    event.event_name

                  );


                  setMessage("");


                }}


              >

                Register Now 🚀


              </button>







            </div>



          ))


        )

        :


        (

          <h2 className="no-events">

            No Events Available

          </h2>

        )



      }



      </div>









      {

      selectedEvent && (



        <div className="modal-overlay">


          <div className="register-modal">





            <h2>

              🎉 Register for

              <br/>

              {selectedEvent}


            </h2>







            <input

              type="text"

              placeholder="Your Name"

              value={form.name}


              onChange={(e)=>

                setForm({

                  ...form,

                  name:e.target.value

                })

              }


            />







            <input

              type="email"

              placeholder="Email"


              value={form.email}



              onChange={(e)=>

                setForm({

                  ...form,

                  email:e.target.value

                })

              }


            />









            <input

              type="text"

              placeholder="Department"


              value={form.department}



              onChange={(e)=>

                setForm({

                  ...form,

                  department:e.target.value

                })

              }


            />









            <input

              type="text"

              placeholder="Year"


              value={form.year}



              onChange={(e)=>

                setForm({

                  ...form,

                  year:e.target.value

                })

              }


            />









            <button

              onClick={handleRegister}

            >

              Submit Registration ✅


            </button>









            <button

              className="close-btn"

              onClick={()=>setSelectedEvent(null)}

            >

              Close


            </button>








            {

              message && (

                <p className="success-message">

                  {message}

                </p>

              )

            }





          </div>



        </div>



      )

      }







    </div>


  );


}


export default Events;