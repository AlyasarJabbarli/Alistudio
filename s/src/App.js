import "./assets/style/reset.css";
import "./assets/style/style.css";
import "./assets/style/responsive.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/header/Header";
import Login from "./pages/login/Login";
import Actions from "./pages/actions/Actions";
import Managers from "./pages/managers/Managers";
import Companies from "./pages/companies/Companies";
import Category from "./pages/categories/Category";
import Service from "./pages/services/Service";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Expenses from "./pages/expenses/Expenses";
import Dashboard from "./pages/dashboard/Dashboard";
import ActionForManager from "./pages/actions/ActionForManager";
import CategoriesForManager from "./pages/categories/CategoriesForManager";
import ServiceForManager from "./pages/services/ServiceForManager";
import ExpensesForManager from "./pages/expenses/ExpensesForManager";

function App() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .get("https://api.alistudiox.com/public/api/v1/loggedInUser", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((resp) => {
          setUser(resp.data);
        })
        .catch((err) => {
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);
  useEffect(() => {
    if (location.pathname === "/login") {
      setUser("");
    }
  }, [location]);

  return (
    <div>
      {user !== "" ? (
        <>
          <Header />
        </>
      ) : null}
      {user.role === "manager" ? (
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/login"
            element={<Login getAfterLogin={(user) => setUser(user)} />}
          />
          <Route path="/actionsf" element={<ActionForManager />} />
          <Route path="/expensesf" element={<ExpensesForManager />} />
          <Route path="/categories" element={<CategoriesForManager />} />
          <Route path="/services" element={<ServiceForManager />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/login"
            element={<Login getAfterLogin={(user) => setUser(user)} />}
          />
          <Route path="/actions" element={<Actions />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/managers" element={<Managers />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/services" element={<Service />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
