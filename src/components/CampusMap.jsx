import campusMapImg from "../assets/campus-map.svg";

function CampusMap() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2 style={{ marginBottom: "16px" }}>Campus Virtual Map</h2>
      <img
        src={campusMapImg}
        alt="Campus Map"
        style={{
          width: "100%",
          maxWidth: "900px",
          borderRadius: "12px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
        }}
      />
    </div>
  );
}

export default CampusMap;