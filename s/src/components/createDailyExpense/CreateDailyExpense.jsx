import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const CreateDailyExpense = ({ companies }) => {
  const [showModal, setShowModal] = useState(false);
  const [price, setPriceValue] = useState("");
  const [date, setDateValue] = useState("");
  const [note, setNoteValue] = useState("");
  const [company_id, setCompany_idValue] = useState("");
  const [style, setStyle] = useState({});

  const token = localStorage.getItem("token");

  const handleChange = (event, setValue) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDailyService = {
      company_id,
      date,
      note,
      price,
    };
    await axios
      .post(
        `https://api.alistudiox.com/public/api/v1/add-cost?company_id=${company_id}&day=${date}&note=${note}&amount=${price}`,
        newDailyService,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
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
  };

  const closeModal = () => {
    setShowModal(false);
    setStyle({});
  };
  return (
    <div style={style}>
      <button className="openModal" onClick={openModal}>
        Create Daily Expense
      </button>
      {showModal && (
        <div className="create_manager_modal_cont">
          <div className="create_manager_modal">
            <div className="create_manager_modal_title">
              <h4>Create Daily Expense</h4>
              <button onClick={closeModal}>X</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="crt_manager_inp_cont">
                  <label htmlFor="date">Expense Date</label>
                  <div className="input_time_cont">
                    <input
                      type="date"
                      name="date"
                      id="date"
                      required
                      onChange={(event) => handleChange(event, setDateValue)}
                    />
                  </div>
                </div>
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
                  <div className="crt_manager_inp_cont">
                    <label htmlFor="note">Note</label>
                    <textarea
                      type="text"
                      name="note"
                      id="note"
                      onChange={(event) => handleChange(event, setNoteValue)}
                    />
                  </div>
                  <div className="crt_manager_inp_cont">
                    <label htmlFor="company">Select Enrolling Company:</label>
                    <select
                      id="company"
                      name="company"
                      onChange={(event) =>
                        handleChange(event, setCompany_idValue)
                      }
                    >
                      <option value={""}>Select a Company</option>
                      {companies.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

              <button>Create</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateDailyExpense;
