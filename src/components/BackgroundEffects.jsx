import { useEffect, useState } from "react";
import "./BackgroundEffects.css";


function BackgroundEffects(){


  const [position,setPosition] = useState({
    x:0,
    y:0
  });



  useEffect(()=>{


    const moveMouse = (e)=>{


      setPosition({

        x:e.clientX,

        y:e.clientY

      });


    };



    window.addEventListener(
      "mousemove",
      moveMouse
    );



    return ()=>{


      window.removeEventListener(
        "mousemove",
        moveMouse
      );


    };


  },[]);





  return (

    <>


      <div

        className="mouse-glow"

        style={{

          left:position.x,

          top:position.y

        }}

      />




      <div className="particles">


        {

          Array.from({length:30}).map((_,index)=>(


            <span

              key={index}

              className="particle"

            />


          ))

        }


      </div>



    </>

  );


}


export default BackgroundEffects;
