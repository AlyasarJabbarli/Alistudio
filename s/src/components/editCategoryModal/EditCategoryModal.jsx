import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const EditCategoryModal = ({ id, name, getCategories }) => {
  const [showModal, setShowModal] = useState(false);
  const [nameValue, setNameValue] = useState(name);
  const [style, setStyle] = useState({});
  const [buttonStyle, setButtonStyle] = useState({});
  const token = localStorage.getItem("token");

  const handleNameChange = (event) => {
    setNameValue(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCategory = {
      nameValue,
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
            `https://api.alistudiox.com/public/api/v1/category/${id}?title=${nameValue}`,
            newCategory,
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
            getCategories();
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
              <h4>Edit Category</h4>
              <button onClick={closeModal}>X</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="crt_manager_inp_cont">
                <label htmlFor="companyName">Category Title</label>
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  value={nameValue}
                  required
                  onChange={handleNameChange}
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

export default EditCategoryModal;
