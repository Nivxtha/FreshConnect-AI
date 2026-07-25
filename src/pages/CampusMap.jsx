function CampusMap() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Campus Virtual Map</h2>
      <iframe
        title="Campus Map"
        src="https://www.google.com/maps?q=Saranathan+College+of+Engineering,+Trichy&output=embed"
        width="100%"
        height="500"
        style={{ border: 0, borderRadius: "10px" }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
}

export default CampusMap;
