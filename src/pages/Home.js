import React from "react";
import Logo from "../assets/penguin.png";
import "../styles/Navbar.css";

function Home() {
  return (
    <div style={{ display: "flex", flex: 1 }}>
      <div style={{ marginLeft: "10%", marginTop: "8%" }}>
        <img src={Logo} alt="Avatar Logo" style={{ objectFit: "contain" }} />
      </div>
      <div
        style={{
          backgroundImage: `url(http://cliparts.co/cliparts/M8i/AEe/M8iAEeaca.png)`,
          backgroundRepeat: "no-repeat",
          width: "50%",
          padding: "5%",
        }}
      >
        <h1 style={{ marginLeft: "10%", color: "#88db3b", fontWeight: "700" }}>
          TOEIC PRACTICE APP
        </h1>
        <h1 style={{ marginLeft: "20%", color: "#F88C19", fontWeight: "700" }}>
          MANAGEMENT
        </h1>
        <ul style={{ marginRight: "10%", marginTop: 20 }}>
          <text>
            This system is designed to manage documents and data for the TOEIC
            Practice App. It is structured into five main sections:
          </text>

          <li
            style={{
              listStyleType: "disc",
              marginLeft: "5%",
              fontSize: 17,
              fontWeight: "600",
            }}
          >
            Question Management
          </li>
          <li
            style={{
              listStyleType: "disc",
              marginLeft: "5%",
              fontSize: 17,
              fontWeight: "600",
            }}
          >
            Vocabulary Management
          </li>
          <li
            style={{
              listStyleType: "disc",
              marginLeft: "5%",
              fontSize: 17,
              fontWeight: "600",
            }}
          >
            Test Management
          </li>
          <li
            style={{
              listStyleType: "disc",
              marginLeft: "5%",
              fontSize: 17,
              fontWeight: "600",
            }}
          >
            Forum Management
          </li>
          <li
            style={{
              listStyleType: "disc",
              marginLeft: "5%",
              fontSize: 17,
              fontWeight: "600",
            }}
          >
            User Management
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
