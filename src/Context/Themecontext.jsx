import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";


const ThemeContext = createContext();


export const ThemeProvider = ({ children }) => {

  const [darkMode, setDarkMode] = useState(() => {

    const savedTheme = localStorage.getItem("theme");

    return savedTheme ? savedTheme === "dark" : true;

  });


  useEffect(() => {

    document.body.classList.remove("dark", "light");

    document.body.classList.add(
      darkMode ? "dark" : "light"
    );


    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );

  }, [darkMode]);



  const toggleTheme = () => {

    setDarkMode(prev => !prev);

  };



  return (

    <ThemeContext.Provider

      value={{
        darkMode,
        toggleTheme
      }}

    >

      {children}

    </ThemeContext.Provider>

  );

};



export const useTheme = () => {

  return useContext(ThemeContext);

};