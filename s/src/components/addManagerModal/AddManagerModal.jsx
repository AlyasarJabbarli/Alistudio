import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddManagerModal = ({getManagers}) => {
  const [showModal, setShowModal] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [phoneNumValue, setPhoneNumValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
    const [style, setStyle] = useState({})

  const token = localStorage.getItem('token')

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
    const newUser = { nameValue,lastNameValue, phoneNumValue, emailValue,  passwordValue};
    await axios
      .post(
        `https://api.alistudiox.com/public/api/v1/users?first_name=${nameValue}&last_name=${lastNameValue}&phone_number=${phoneNumValue}&email=${emailValue}&password=${passwordValue}`, newUser,
        {
          headers: {
            "Authorization" : `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        getManagers()
        Swal.fire({
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      });
      closeModal()
  };
  const openModal = () => {
    setShowModal(true);
    setStyle({
      position : 'fixed',
      width : '100%',
      height : '100%',
      background : '#808080e3',
      zIndex : '11',
      top: "0",
      left : "0"
  })
  };

  const closeModal = () => {
    setShowModal(false);
    setStyle({})
  };
  return (
    <div style={style}>
      <button className="openModal" onClick={openModal}>
        Create Manager
      </button>
      {showModal && (
        <div className="create_manager_modal_cont">
          <div className="create_manager_modal">
            <div className="create_manager_modal_title">
              <h4>Create Manager</h4>
              <button onClick={closeModal}>X</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="crt_manager_inp_cont">
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" id="firstName" required onChange={handleNameChange}/>
              </div>
              <div className="crt_manager_inp_cont">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" id="lastName" required onChange={handleLastNameChange}/>
              </div>
              <div className="crt_manager_inp_cont">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  required
                  onChange={handlePhonNumChange}
                />
              </div>
              <div className="crt_manager_inp_cont">
                <label htmlFor="email">Email address</label>
                <input type="email" name="email" id="email" required onChange={handleEmailChange}/>
              </div>
              <div className="crt_manager_inp_cont">
                <label htmlFor="email">Password</label>
                <input type="password" name="password" id="password" required onChange={handlePasswordChange}/>
              </div>
              <button>Create</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddManagerModal;
