import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const EditManagerModal = ({ id, name, lastName, number, email, getManagers }) => {
  const [showModal, setShowModal] = useState(false);
  const [nameValue, setNameValue] = useState(name);
  const [lastNameValue, setLastNameValue] = useState(lastName);
  const [phoneNumValue, setPhoneNumValue] = useState(number);
  const [emailValue, setEmailValue] = useState(email);
  const [passwordValue, setPasswordValue] = useState("");
  const [style, setStyle] = useState({});
  const token = localStorage.getItem("token");
  const [buttonStyle, setButtonStyle] = useState({});


  const handleNameChange = (event) => {
    setNameValue(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastNameValue(event.target.value);
  };
  const handlePhonNumChange = (event) => {
    setPhoneNumValue(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      nameValue,
      lastNameValue,
      phoneNumValue,
      emailValue,
      passwordValue,
    };
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
          .put(
            `https://api.alistudiox.com/public/api/v1/users/${id}?first_name=${nameValue}&last_name=${lastNameValue}&phone_number=${phoneNumValue}&email=${emailValue}&password=${passwordValue}`,
            newUser,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            getManagers()
          })
          .catch((error) => {
            console.error(error);
          });
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });

    closeModal();
  };
  const openModal = () => {
    setShowModal(true);
    setStyle({
      position: "fixed",
      width: "100%",
      height: "100%",
      background: "#808080e3",
      zIndex: "11",
      top: "0",
      left: "0",
    });
    setButtonStyle({
      display : "none"
    })
  };

  const closeModal = () => {
    setShowModal(false);
    setStyle({});
    setButtonStyle({})

  };
  return (
    <div style={style}>
      <button className="openEditModal" onClick={openModal} style={buttonStyle}>
        Edit
      </button>
      {showModal && (
        <div className="create_manager_modal_cont">
          <div className="create_manager_modal">
            <div className="create_manager_modal_title">
              <h4>Edit Manager</h4>
              <button onClick={closeModal}>X</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="crt_manager_inp_cont">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={nameValue}
                  required
                  onChange={handleNameChange}
                />
              </div>
              <div className="crt_manager_inp_cont">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={lastNameValue}
                  required
                  onChange={handleLastNameChange}
                />
              </div>
              <div className="crt_manager_inp_cont">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={phoneNumValue}
                  required
                  onChange={handlePhonNumChange}
                />
              </div>
              <div className="crt_manager_inp_cont">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={emailValue}
                  required
                  onChange={handleEmailChange}
                />
              </div>
              <div className="crt_manager_inp_cont">
                <label htmlFor="email">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handlePasswordChange}
                />
              </div>
              <button>Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditManagerModal;
