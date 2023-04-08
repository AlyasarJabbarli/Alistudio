import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGaugeHigh,
  faPeopleRoof,
  faBuilding,
  faTags,
  faHeart,
  faCalendarDays,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = ({ isChecked, setCheckedFalse }) => {
  const [user, setUser] = useState(null);

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
  return (
    <aside className={isChecked ? "aside open" : "aside"}>
      <div className="aside_all">
        <div className="title">
          <h1>AliStudio</h1>
          <button id="closeBtn" onClick={setCheckedFalse}>
            X
          </button>
        </div>
        <div className="user_info">
          <h2>{user?.full_name}</h2>
          <span>{user?.role}</span>
        </div>
        <nav>
          {user?.role === "manager" ? (
            <ul className="navUl">
              <li>
                <NavLink to="/" onClick={setCheckedFalse}>
                  <FontAwesomeIcon icon={faGaugeHigh} /> <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/actionsf"} onClick={setCheckedFalse}>
                  <FontAwesomeIcon icon={faCalendarDays} />{" "}
                  <span>Daily Services</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/expensesf"} onClick={setCheckedFalse}>
                  <FontAwesomeIcon icon={faDollarSign} /> <span>Expenses</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/categories"} onClick={setCheckedFalse}>
                  <FontAwesomeIcon icon={faTags} /> <span>Categories</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/services"} onClick={setCheckedFalse}>
                  <FontAwesomeIcon icon={faHeart} /> <span>Services</span>
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul className="navUl">
              <li>
                <NavLink to="/" onClick={setCheckedFalse}>
                  <FontAwesomeIcon icon={faGaugeHigh} /> <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/actions"} onClick={setCheckedFalse}>
                  <FontAwesomeIcon icon={faCalendarDays} />{" "}
                  <span>Daily Services</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/expenses"} onClick={setCheckedFalse}>
                  <FontAwesomeIcon icon={faDollarSign} /> <span>Expenses</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/managers"} onClick={setCheckedFalse}>
                  <FontAwesomeIcon icon={faPeopleRoof} /> <span>Managers</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/companies"} onClick={setCheckedFalse}>
                  <FontAwesomeIcon icon={faBuilding} /> <span>Companies</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/categories"} onClick={setCheckedFalse}>
                  <FontAwesomeIcon icon={faTags} /> <span>Categories</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/services"} onClick={setCheckedFalse}>
                  <FontAwesomeIcon icon={faHeart} /> <span>Services</span>
                </NavLink>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </aside>
  );
};

export default Navbar;
