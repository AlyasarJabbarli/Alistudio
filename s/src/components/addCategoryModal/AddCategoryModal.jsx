import { useState,  } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddCategoryModal = (getCategories) => {
  const [showModal, setShowModal] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [style, setStyle] = useState({})

  const token = localStorage.getItem("token");

  const handleNameChange = (event) => {
    setNameValue(event.target.value);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCategory = {nameValue };
    await axios
      .post(
        `https://api.alistudiox.com/public/api/v1/category?title=${nameValue}`,
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
        getCategories()
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
        Create Category
      </button>
      {showModal && (
        <div className="create_manager_modal_cont">
          <div className="create_manager_modal">
            <div className="create_manager_modal_title">
              <h4>Create Category</h4>
              <button onClick={closeModal}>X</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="crt_manager_inp_cont">
                <label htmlFor="companyName">Category Title</label>
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  required
                  onChange={handleNameChange}
                />
              </div>
              <button>Create</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCategoryModal;
