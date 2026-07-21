import { useEffect, useState } from "react";
import "./Faculty.css";

import {
  UserRound,
  Mail,
  Building2,
  Search
} from "lucide-react";


function Faculty() {


  const [faculty, setFaculty] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [error, setError] = useState("");




  useEffect(() => {


    fetch("http://localhost:5000/faculty")

      .then((response) => {


        if (!response.ok) {

          throw new Error("Failed to fetch faculty");

        }


        return response.json();


      })


      .then((data) => {


        setFaculty(data);

        setLoading(false);


      })


      .catch((err) => {


        console.log(err);

        setError("Unable to load faculty details");

        setLoading(false);


      });


  }, []);







  const filteredFaculty = faculty.filter((item) => {


    return (

      item.faculty_name
        ?.toLowerCase()
        .includes(search.toLowerCase())

      ||

      item.department
        ?.toLowerCase()
        .includes(search.toLowerCase())

    );


  });







  return (

    <div className="faculty-container">



      <div className="faculty-header">


        <h1>
          👨‍🏫 Faculty Members
        </h1>


        <p className="subtitle">
          Meet our experienced faculty team
        </p>


      </div>







      <div className="search-box">


        <Search size={20} />


        <input

          type="text"

          placeholder="Search faculty..."

          value={search}

          onChange={(e) => setSearch(e.target.value)}

        />


      </div>









      {
        loading && (

          <h3 className="loading">
            Loading faculty details...
          </h3>

        )

      }







      {
        error && (

          <h3 className="error">
            {error}
          </h3>

        )

      }









      <div className="faculty-grid">



        {

          filteredFaculty.length > 0 ? (


            filteredFaculty.map((member) => (



              <div 
                className="faculty-card"
                key={member.id}
              >




                <div className="profile-icon">


                  <UserRound size={45}/>


                </div>







                <h2>

                  {member.faculty_name}

                </h2>








                <div className="info">


                  <Building2 size={18}/>


                  <span>

                    {member.department}

                  </span>


                </div>








                <div className="info">


                  <Mail size={18}/>


                  <span>

                    {member.email}

                  </span>


                </div>







              </div>



            ))


          )

          :

          (

            !loading && (

              <h3 className="no-faculty">

                No Faculty Found

              </h3>

            )

          )


        }



      </div>





    </div>

  );


}


export default Faculty;