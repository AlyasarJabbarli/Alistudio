import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddServiceModal = ({getServices}) => {
  const [showModal, setShowModal] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [user_id, setUser_idValue] = useState("");
  const [options, setOptions] = useState([]);
  const [style, setStyle] = useState({})

  const token = localStorage.getItem("token");

  const handleNameChange = (event) => {
    setNameValue(event.target.value);
  };
  const handleUser_IdChange = (event) => {
    setUser_idValue(event.target.value);
  };

  useEffect(() => {
    axios
      .get("https://api.alistudiox.com/public/api/v1/category", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setOptions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [options]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newService = { user_id, nameValue };
    await axios
      .post(
        `https://api.alistudiox.com/public/api/v1/service?category_id=${user_id}&title=${nameValue}`,
        newService,
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
        getServices()
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
    setStyle({

    })
  };
  return (
    <div style={style}>
      <button className="openModal" onClick={openModal}>
        Create Service
      </button>
      {showModal && (
        <div className="create_manager_modal_cont">
          <div className="create_manager_modal">
            <div className="create_manager_modal_title">
              <h4>Create Service</h4>
              <button onClick={closeModal}>X</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="crt_manager_inp_cont">
                <label htmlFor="companyName">Service Title</label>
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  required
                  onChange={handleNameChange}
                />
              </div>
              <div className="crt_manager_inp_cont">
                <label htmlFor="manager">Select Enrolling Category:</label>

                <select id="manager" name="manager" onChange={handleUser_IdChange}>
                <option value={''}>Select a Category</option>
                  {options.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.title}
                    </option>
                  ))}
                </select>
              </div>

              <button>Create</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddServiceModal;
