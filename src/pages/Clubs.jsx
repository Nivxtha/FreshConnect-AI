import { useEffect, useState } from "react";
import "./Clubs.css";

import {
  Users,
  Rocket,
  Code,
  Music,
  Sparkles,
  X,
} from "lucide-react";

function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedClub, setSelectedClub] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    rollno: "",
    department: "",
    year: "",
    email: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/clubs")
      .then((res) => res.json())
      .then((data) => {
        setClubs(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const icons = [
    <Code size={45} />,
    <Rocket size={45} />,
    <Music size={45} />,
    <Users size={45} />,
  ];

  const openPopup = (clubName) => {
    setSelectedClub(clubName);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);

    setFormData({
      name: "",
      rollno: "",
      department: "",
      year: "",
      email: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleJoin = (e) => {
    e.preventDefault();

    alert(`🎉 Successfully Joined ${selectedClub}!`);

    closePopup();
  };

  return (
    <div className="clubs-page">
      <div className="clubs-header">
        <span className="clubs-badge">
          <Sparkles size={16} />
          Campus Communities
        </span>

        <h1>🎯 Student Clubs</h1>

        <p>
          Join communities, discover your passion,
          improve skills and connect with talented students.
        </p>
      </div>

      <div className="clubs-grid">
        {clubs.length > 0 ? (
          clubs.map((club, index) => (
            <div className="club-card" key={club.id}>
              <div className="club-top">
                <div className="club-icon">
                  {icons[index % icons.length]}
                </div>

                <span>Club #{index + 1}</span>
              </div>

              <h2>{club.club_name}</h2>

              <p>{club.description}</p>

              <button
                onClick={() => openPopup(club.club_name)}
              >
                Join Club 🚀
              </button>
            </div>
          ))
        ) : (
          <h2 className="no-clubs">
            No Clubs Available
          </h2>
        )}
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="join-popup">
            <button
              className="close-btn"
              onClick={closePopup}
            >
              <X size={20} />
            </button>

            <h2>Join {selectedClub}</h2>

            <form onSubmit={handleJoin}>
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                placeholder="Roll Number"
                name="rollno"
                value={formData.rollno}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                placeholder="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />

              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Year
                </option>

                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
              </select>

              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className="join-submit"
              >
                Join Now 🚀
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clubs;