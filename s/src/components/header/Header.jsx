import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../navbar/Navbar";

const Header = () => {
  const [display, setDisplay] = useState("none");
  const [user, setUser] = useState(null);
  const [isChecked, setIsChecked] = useState(true);
  const navigate = useNavigate();
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const setCheckedFalse = () => {
    setIsChecked(false)
  }
  useEffect(() => {
    axios
      .get("https://api.alistudiox.com/public/api/v1/loggedInUser", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <header id="header">
      <div className="container">
        <div className="header_all">
          <div className="button_container">
            <input type="checkbox" id="bar-button" checked={isChecked} onChange={handleCheckboxChange} />
            <label htmlFor="bar-button" className="bar"></label>
          </div>
          <Navbar isChecked={isChecked} setCheckedFalse={()=>setCheckedFalse()} />

          <div className="user_dropdown">
            <div
              className="dropBtn"
              onClick={() => setDisplay(display === "none" ? "block" : "none")}
            >
              <FontAwesomeIcon className="borderedIcon" icon={faUser} />
              <h2>{user?.full_name}</h2>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>

            <div className="dropdown_content" style={{ display }}>
              <ul>
                <li>
                  <NavLink>Settings</NavLink>
                </li>
                <li>
                  <button onClick={handleClick}>Log Out</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
