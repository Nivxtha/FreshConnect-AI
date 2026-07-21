import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CampusFeatures.css";

/* ---------------- DATA ---------------- */
const searchData = [
  { type: "Event", name: "Freshers Welcome Party", date: "Jul 25" },
  { type: "Event", name: "Tech Fest Hackathon", date: "Aug 02" },
  { type: "Club", name: "Robotics Club", date: "" },
  { type: "Club", name: "Photography Club", date: "" },
  { type: "Faculty", name: "Dr. Anita Sharma - CS Dept", date: "" },
  { type: "Faculty", name: "Prof. Rajiv Menon - ECE Dept", date: "" },
];

const initialPoll = [
  { label: "Freshers Welcome Party", votes: 42 },
  { label: "Tech Fest Hackathon", votes: 31 },
  { label: "Cultural Night", votes: 18 },
];

const initialFeedback = [
  "Loved the AI chat, super helpful for finding my classes!",
  "Please add more clubs under sports category.",
];

const initialLeaderboard = [
  { name: "Aravind K", pts: 980 },
  { name: "Sneha R", pts: 860 },
  { name: "You", pts: 720, me: true },
  { name: "Karthik M", pts: 640 },
  { name: "Priya S", pts: 590 },
].sort((a, b) => b.pts - a.pts);

const suggestions = [
  "Today's events?",
  "Where's the library?",
  "Show my timetable",
  "Which clubs are open?",
  "Faculty contact info",
];

/* ---------------- SEARCH BAR ---------------- */
function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const matches = searchData.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-wrap">
      <span className="search-icon">🔍</span>
      <input
        className="search-input"
        placeholder="Search events, clubs, faculty..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
      />
      {open && query && (
        <div className="search-results">
          {matches.length ? (
            matches.map((m, i) => (
              <div key={i}>
                {m.name}
                <small>
                  {m.type}
                  {m.date ? ` · ${m.date}` : ""}
                </small>
              </div>
            ))
          ) : (
            <div>No results found</div>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------- THEME TOGGLE ---------------- */
function ThemeToggle({ light, setLight }) {
  return (
    <button className="toggle-btn" onClick={() => setLight(!light)}>
      {light ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}

/* ---------------- POLL ---------------- */
function Poll() {
  const [poll, setPoll] = useState(initialPoll);
  const [voted, setVoted] = useState(false);
  const total = poll.reduce((s, o) => s + o.votes, 0);

  const vote = (i) => {
    if (voted) return;
    const next = [...poll];
    next[i].votes++;
    setPoll(next);
    setVoted(true);
  };

  return (
    <div className="card">
      <h2>📊 Live Poll</h2>
      {poll.map((o, i) => {
        const pct = total ? Math.round((o.votes / total) * 100) : 0;
        return (
          <div
            key={i}
            className={`poll-option ${voted ? "voted" : ""}`}
            onClick={() => vote(i)}
          >
            <div className="poll-fill" style={{ width: voted ? `${pct}%` : "0%" }} />
            <span>{o.label}</span>
            <span>{voted ? `${pct}%` : ""}</span>
          </div>
        );
      })}
      <div className="poll-caption">Which event are you most excited for?</div>
    </div>
  );
}

/* ---------------- FEEDBACK ---------------- */
function Feedback() {
  const [items, setItems] = useState(initialFeedback);
  const [text, setText] = useState("");

  const submit = () => {
    if (!text.trim()) return;
    setItems([text.trim(), ...items]);
    setText("");
  };

  return (
    <div className="card">
      <h2>💬 Feedback</h2>
      <textarea
        placeholder="Share your thoughts about the last event..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="btn" onClick={submit}>
        Submit Feedback
      </button>
      <div className="feedback-list">
        {items.map((f, i) => (
          <div key={i}>“{f}”</div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- LEADERBOARD ---------------- */
function Leaderboard() {
  return (
    <div className="card">
      <h2>🏆 Campus Leaderboard</h2>
      {initialLeaderboard.map((u, i) => (
        <div key={i} className={`lb-row ${u.me ? "me" : ""}`}>
          <span className="lb-rank">{i + 1}</span>
          <span className="lb-name">{u.name}</span>
          <span className="lb-pts">{u.pts} pts</span>
        </div>
      ))}
    </div>
  );
}
/* ---------------- QUICK ACTIONS ---------------- */

function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="card">
      <h2>⚡ Quick Actions</h2>

      <div className="action-grid">
        <button
          className="action-btn"
          onClick={() => navigate("/events")}
        >
          📅 Events
        </button>

        <button
          className="action-btn"
          onClick={() => navigate("/faculty")}
        >
          👨‍🏫 Faculty
        </button>

        <button
          className="action-btn"
          onClick={() => navigate("/timetable")}
        >
          📚 Timetable
        </button>

        <button
          className="action-btn"
          onClick={() => navigate("/clubs")}
        >
          🎯 Clubs
        </button>
      </div>
    </div>
  );
}

/* ---------------- ANNOUNCEMENTS ---------------- */

function Announcements() {
  return (
    <div className="card">
      <h2>📢 Announcements</h2>

      <div className="notice-item">
        🎉 Freshers Party starts on July 25.
      </div>

      <div className="notice-item">
        💻 Hackathon Registration closes tomorrow.
      </div>

      <div className="notice-item">
        📚 Library will remain open till 8 PM.
      </div>
    </div>
  );
}

/* ---------------- TODAY SCHEDULE ---------------- */

function TodaySchedule() {
  return (
    <div className="card">
      <h2>📅 Today's Schedule</h2>

      <div className="schedule-item">
        <span>Mathematics</span>
        <span className="schedule-time">9:00 AM</span>
      </div>

      <div className="schedule-item">
        <span>Programming Lab</span>
        <span className="schedule-time">11:00 AM</span>
      </div>

      <div className="schedule-item">
        <span>Lunch Break</span>
        <span className="schedule-time">1:00 PM</span>
      </div>

      <div className="schedule-item">
        <span>AI Workshop</span>
        <span className="schedule-time">2:30 PM</span>
      </div>
    </div>
  );
}

/* ---------------- QUICK SUGGESTION CHIPS ---------------- */
function ChatChips() {
  const [reply, setReply] = useState(
    "Ask me anything about campus — or tap a suggestion below."
  );

  return (
    <div className="card chat-card">
      <h2>🤖 Talk With AI</h2>
      <div className="chat-box">{reply}</div>
      <div className="chip-row">
        {suggestions.map((s, i) => (
          <div
            key={i}
            className="chip"
            onClick={() =>
              setReply(`You asked: "${s}" — (connect this to your AI backend)`)
            }
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- MAIN EXPORT ---------------- */
/* ---------------- MAIN EXPORT ---------------- */
export default function CampusFeatures() {
  const [light, setLight] = useState(false);

  return (
    <div className={`campus-features ${light ? "light" : ""}`}>
      <div className="topbar">
        <h1>FreshConnect AI — Feature Preview</h1>
        <SearchBar />
        <ThemeToggle light={light} setLight={setLight} />
      </div>

      <div className="grid">
        <Poll />
        <Feedback />

        <Leaderboard />
        <QuickActions />

        <Announcements />
        <TodaySchedule />

        <ChatChips />
      </div>
    </div>
  );
}