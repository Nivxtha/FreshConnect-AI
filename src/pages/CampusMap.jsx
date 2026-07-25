function CampusMap() {
  const blocks = [
    { name: "Secretary K. Santhanam Block", desc: "EEE, ECE, ICE labs & classrooms", x: 60, y: 40, w: 220, h: 90, color: "#B5D4F4" },
    { name: "Poojyasri Rajaji Block", desc: "Management Studies, Library", x: 300, y: 40, w: 200, h: 90, color: "#9FE1CB" },
    { name: "RV & Kamaraj Block", desc: "Classrooms & seminar halls", x: 60, y: 150, w: 220, h: 80, color: "#F5C4B3" },
    { name: "Mechanical Workshop", desc: "Mech labs & workshop", x: 300, y: 150, w: 200, h: 80, color: "#FAC775" },
    { name: "Computer Center", desc: "640+ systems, LAN facility", x: 60, y: 250, w: 150, h: 70, color: "#CECBF6" },
    { name: "Canteen", desc: "Separate dining, boys & girls", x: 230, y: 250, w: 130, h: 70, color: "#F4C0D1" },
    { name: "Boys Hostel", desc: "In-campus, 180 beds", x: 380, y: 250, w: 120, h: 70, color: "#B5D4F4" },
    { name: "Sports Grounds", desc: "Cricket, football, basketball", x: 60, y: 340, w: 220, h: 70, color: "#C0DD97" },
    { name: "Main Entrance", desc: "Trichy - Madurai Highway", x: 300, y: 340, w: 200, h: 70, color: "#D3D1C7" },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "6px" }}>Campus Layout</h2>
      <p style={{ textAlign: "center", color: "#666", fontSize: "13px", marginBottom: "16px" }}>
        Saranathan College of Engineering, Panjappur, Trichy
      </p>

      <svg viewBox="0 0 560 430" width="100%" style={{ border: "1px solid #e0e0e0", borderRadius: "10px" }}>
        {blocks.map((b, i) => (
          <g key={i}>
            <rect
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              rx="10"
              fill={b.color}
              stroke="#00000022"
              strokeWidth="1"
            />
            <text
              x={b.x + b.w / 2}
              y={b.y + b.h / 2 - 6}
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill="#222"
            >
              {b.name}
            </text>
            <text
              x={b.x + b.w / 2}
              y={b.y + b.h / 2 + 14}
              textAnchor="middle"
              fontSize="10"
              fill="#444"
            >
              {b.desc}
            </text>
          </g>
        ))}
      </svg>

      <p style={{ textAlign: "center", fontSize: "12px", color: "#888", marginTop: "10px" }}>
        Layout is a simplified guide, not to scale. For live navigation, use the{" "}
        <a
          href="https://www.google.com/maps?q=Saranathan+College+of+Engineering,+Trichy"
          target="_blank"
          rel="noreferrer"
        >
          Google Maps location
        </a>.
      </p>
    </div>
  );
}

export default CampusMap;
