import { useEffect, useRef, useState } from "react";
import "./Chatbot.css";

import {
  Send,
  Bot,
  User,
  Sparkles
} from "lucide-react";


function Chatbot(){

  const [question,setQuestion] = useState("");

  const [loading,setLoading] = useState(false);

  const chatEndRef = useRef(null);


  const [messages,setMessages] = useState([

    {
      sender:"bot",
      text:
      "Hi 👋 I am FreshConnect AI Assistant. Ask me anything about campus events, clubs, faculty or timetable!"
    }

  ]);



  const suggestions = [

    "Upcoming events",
    "Available clubs",
    "Faculty details",
    "Today's timetable"

  ];



  useEffect(()=>{

    chatEndRef.current?.scrollIntoView({

      behavior:"smooth"

    });

  },[messages,loading]);





  const sendMessage = async(text)=>{


    const userQuestion = text || question;


    if(!userQuestion.trim()) return;



    setMessages((prev)=>[

      ...prev,

      {
        sender:"user",
        text:userQuestion
      }

    ]);



    setQuestion("");

    setLoading(true);



    try{


      const response = await fetch(

        "https://freshconnect-ai-17k6.onrender.com/ask-ai",

        {

          method:"POST",

          headers:{

            "Content-Type":"application/json"

          },


          body:JSON.stringify({

            question:userQuestion

          })


        }

      );



      const data = await response.json();



      setMessages((prev)=>[

        ...prev,

        {

          sender:"bot",

          text:

          data.answer ||

          "Sorry, I couldn't find an answer."

        }

      ]);



    }


    catch(error){


      console.log(error);


      setMessages((prev)=>[

        ...prev,

        {

          sender:"bot",

          text:"❌ Unable to connect with AI server."

        }

      ]);


    }


    finally{


      setLoading(false);


    }


  };







  return (

    <div className="chatbot-page">


      <div className="chatbot-box">



        <div className="chat-header">


          <div className="ai-avatar">

            <Bot size={30}/>

          </div>


          <div>

            <h2>
              FreshConnect AI
            </h2>


            <p>
              Online Campus Assistant
            </p>


          </div>


        </div>






        <div className="suggestions">


          {

            suggestions.map((item,index)=>(

              <button

                key={index}

                onClick={()=>sendMessage(item)}

              >

                <Sparkles size={14}/>

                {item}


              </button>


            ))

          }


        </div>







        <div className="chat-body">


          {

            messages.map((msg,index)=>(


              <div

                key={index}

                className={

                  msg.sender==="user"

                  ?

                  "message user"

                  :

                  "message bot"

                }

              >



                {

                  msg.sender==="bot"

                  ?

                  <Bot size={20}/>

                  :

                  <User size={20}/>

                }



                <span>

                  {msg.text}

                </span>



              </div>


            ))

          }






          {

            loading && (


              <div className="message bot">


                <Bot size={20}/>


                <span className="typing">

                  Thinking...

                </span>


              </div>


            )


          }



          <div ref={chatEndRef}/>


        </div>







        <div className="chat-input">


          <input

            value={question}

            placeholder="Ask about your campus..."

            onChange={(e)=>setQuestion(e.target.value)}


            onKeyDown={(e)=>{

              if(e.key==="Enter")

                sendMessage();

            }}


          />




          <button onClick={()=>sendMessage()}>

            <Send size={20}/>

          </button>



        </div>




      </div>


    </div>

  );

}



export default Chatbot;