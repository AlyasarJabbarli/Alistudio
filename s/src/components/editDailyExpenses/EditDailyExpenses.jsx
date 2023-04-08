import { useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

const EditDailyExpenses = ({
  id,
  amount,
  getDailyStatisticsOfCompanyByDate
}) => {
  const [showModal, setShowModal] = useState(false);
  const [price, setPriceValue] = useState(amount);
  const [style, setStyle] = useState({});
  const [buttonStyle, setButtonStyle] = useState({});
  const token = localStorage.getItem("token");

  const handleChange = (event, setValue) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDailyExpense = {
        price
    };
    await axios
      .put(
        `https://api.alistudiox.com/public/api/v1/edit-cost/${id}?amount=${price}
        `,
        newDailyExpense,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        getDailyStatisticsOfCompanyByDate()
        Swal.fire({
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
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
              <h4>Edit Daily Expenses</h4>
              <button onClick={closeModal}>X</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="create_daily_service_container">
                <div className="crt_manager_inp_cont">
                  <label htmlFor="amount">Amount</label>
                  <div className="input_time_cont">
                    <input
                      type="text"
                      name="amount"
                      id="amount"
                      value={price}
                      required
                      onChange={(event) => handleChange(event, setPriceValue)}
                    />
                  </div>
                </div>
              </div>

              <button>Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditDailyExpenses;
