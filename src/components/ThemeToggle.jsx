import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import "./ThemeToggle.css";


function ThemeToggle() {


  const { darkMode, toggleTheme } = useTheme();



  return (

    <button

      className="theme-toggle"

      onClick={toggleTheme}

      title="Change Theme"

    >

      {

        darkMode

        ?

        <Sun size={22}/>

        :

        <Moon size={22}/>

      }


    </button>

  );

}


export default ThemeToggle;