import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const EditCompanyModal = ({ id, name, managerId,getCompanies}) => {
  const [showModal, setShowModal] = useState(false);
  const [nameValue, setNameValue] = useState(name);
  const [user_id, setUser_idValue] = useState(managerId);
  const [buttonStyle, setButtonStyle] = useState({});
  const [options, setOptions] = useState([]);
  const [style, setStyle] = useState({});
  const token = localStorage.getItem("token");

  const handleNameChange = (event) => {
    setNameValue(event.target.value);
  };
  const handleUser_idChange = (event) => {
    setUser_idValue(event.target.value);
  };
  useEffect(() => {
    axios
      .get("https://api.alistudiox.com/public/api/v1/users", {
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
  },[id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCompany = {
      user_id,
      nameValue,
    };
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
        .put(
          `https://api.alistudiox.com/public/api/v1/company/${id}?user_id=${user_id}&name=${nameValue}`,
          newCompany,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          getCompanies()
        })
        .catch((error) => {
          console.error(error);
        });
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  

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
              <h4>Edit Company</h4>
              <button onClick={closeModal}>X</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="crt_manager_inp_cont">
                <label htmlFor="companyName">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  value={nameValue}
                  required
                  onChange={handleNameChange}
                />
              </div>
              <div className="crt_manager_inp_cont">
                <label htmlFor="manager">Select Enrolling Manager:</label>

                <select
                  id="manager"
                  name="manager"
                  onChange={handleUser_idChange}
                  value={managerId}
                >
                  {options.map((option) => {
                    return (
                      <option key={option.id} value={option.id}>
                        {option.full_name}
                      </option>
                    )
                  })}
                </select>
              </div>
              <button>Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCompanyModal;
