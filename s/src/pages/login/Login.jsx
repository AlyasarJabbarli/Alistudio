import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = ({ getAfterLogin }) => {
  const [inputValue, setInputValue] = useState("");
  const [passwordValue, setpasswordValue] = useState("");
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handlPasswordChange = (event) => {
    setpasswordValue(event.target.value);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    axios
      .post(
        `https://api.alistudiox.com/public/api/v1/login?email=${inputValue}&password=${passwordValue}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        getAfterLogin(response.data.user);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      });
  };

  return (
    <div className="login_container">
      <div className="signIn">
        <div className="signIn_title">
          <h1>AliStudio</h1>
          <h2>Sign In</h2>
        </div>
        <form id="signInForm" onSubmit={handleLogin}>
          <div className="input_cont">
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleInputChange}
              required
            />
            <label
              htmlFor="email"
              className={
                inputValue ? "input_cont_label label-high" : "input_cont_label"
              }
            >
              Email address
            </label>
          </div>
          <div className="input_cont">
            <input
              type="password"
              id="password"
              name="password"
              onChange={handlPasswordChange}
              required
            />
            <label
              htmlFor="password"
              className={
                passwordValue
                  ? "input_cont_label label-high"
                  : "input_cont_label"
              }
            >
              Password
            </label>
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
