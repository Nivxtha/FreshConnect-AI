import "./Home.css";
import { Link } from "react-router-dom";

import Poster from "../components/Poster";
import Countdown from "../components/Countdown";
import Announcement from "../components/Announcement";
import CampusFeatures from "../components/CampusFeatures";

import {
  CalendarDays,
  Users,
  GraduationCap,
  Bot,
  Clock,
  ArrowRight,
  Sparkles
} from "lucide-react";

function Home() {
  const features = [
    {
      icon: <CalendarDays size={45} />,
      title: "Campus Events",
      text: "Discover workshops, hackathons and exciting campus activities.",
      link: "/events"
    },
    {
      icon: <Users size={45} />,
      title: "Student Clubs",
      text: "Explore technical, cultural and innovation communities.",
      link: "/clubs"
    },
    {
      icon: <GraduationCap size={45} />,
      title: "Faculty Connect",
      text: "Find faculty details and department information.",
      link: "/faculty"
    },
    {
      icon: <Clock size={45} />,
      title: "Smart Timetable",
      text: "Access your daily academic schedule easily.",
      link: "/timetable"
    },
    {
      icon: <Bot size={45} />,
      title: "AI Assistant",
      text: "Get instant answers about your campus.",
      link: "/chatbot"
    }
  ];

  return (
    <div className="home">
      {/* ANNOUNCEMENT */}
      <Announcement />

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <span className="badge">
            <Sparkles size={18} />
            AI Powered Freshers Portal
          </span>

          <h1>
            Welcome to
            <span> FreshConnect AI</span>
          </h1>

          <p>
            Your smart campus companion that connects
            freshers with events, clubs, faculty,
            timetable and instant AI support.
          </p>

          <div className="hero-buttons">
            <Link to="/events" className="btn-primary">
              Explore Campus
            </Link>

            <Link to="/chatbot" className="btn-secondary">
              Talk With AI <Bot size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* POSTER */}
      <section className="poster-section">
        <Poster />
      </section>

      {/* COUNTDOWN */}
      <section className="countdown-section">
        <Countdown />
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>Everything You Need</h2>

        <div className="cards">
          {features.map((item, index) => (
            <Link to={item.link} className="card" key={index}>
              {item.icon}
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span>
                Explore
                <ArrowRight size={18} />
              </span>
            </Link>
          ))}
        </div>
      </section>

            {/* STATS */}
      <section className="stats">
        <div className="stat-card">
          <h2>500+</h2>
          <p>Students</p>
        </div>

        <div className="stat-card">
          <h2>20+</h2>
          <p>Clubs</p>
        </div>

        <div className="stat-card">
          <h2>50+</h2>
          <p>Events</p>
        </div>

        <div className="stat-card">
          <h2>24/7</h2>
          <p>AI Support</p>
        </div>
      </section>

      {/* CAMPUS FEATURES */}
      <section className="campus-features-section">
        <CampusFeatures />
      </section>
    </div>
  );
}

export default Home;