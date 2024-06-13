import React from "react";
import Logo from "../assets/penguin.png";

function Home() {
  return (
    <div className="d-flex flex-column p-4">
      <div className="bg-body shadow d-flex flex-column p-4 gap-5 m-4">
        <div className="text-primary text-center fw-semibold fs-1">
          TOEIC PRACTICE APP MANAGEMENT
        </div>

        <div className="d-flex flex-row px-5 gap-2">
          <img
            src={Logo}
            alt="Avatar Logo"
            style={{ height: 320, width: "auto" }}
          />

          <div className="d-flex flex-column align-items-center">
            <p className="fw-medium">
              This system is designed to manage documents and data for the TOEIC
              Practice App. It is structured into five main sections:
            </p>
            <ol class="list-group list-group-numbered w-50 ">
              <li class="list-group-item">Question Management</li>
              <li class="list-group-item">Vocabulary Management</li>
              <li class="list-group-item">Test Management</li>
              <li class="list-group-item">Forum Management</li>
              <li class="list-group-item">Test Management</li>
              <li class="list-group-item">User Management</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
