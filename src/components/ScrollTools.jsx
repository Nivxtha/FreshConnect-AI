import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import "./ScrollTools.css";


function ScrollTools() {


  const [scrollProgress, setScrollProgress] = useState(0);

  const [showButton, setShowButton] = useState(false);





  useEffect(() => {


    const handleScroll = () => {


      const scrollTop =
        window.scrollY;



      const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;



      const progress =
        documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;



      setScrollProgress(progress);





      setShowButton(scrollTop > 300);


    };




    window.addEventListener(
      "scroll",
      handleScroll
    );





    return () => {


      window.removeEventListener(
        "scroll",
        handleScroll
      );


    };


  }, []);







  const goTop = () => {


    window.scrollTo({


      top:0,


      behavior:"smooth"


    });


  };









  return (

    <>


      {/* Scroll Progress Bar */}


      <div

        className="scroll-progress"

        style={{

          width:`${scrollProgress}%`

        }}

      />








      {/* Back To Top Button */}



      {

        showButton && (


          <button

            className="back-top"

            onClick={goTop}

            aria-label="Back to top"

          >


            <ArrowUp size={22}/>


          </button>


        )


      }



    </>


  );

}



export default ScrollTools;