import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const CreateDailyService = ({companies, getDailyStatisticsOfCompanyByDate}) => {
  const [showModal, setShowModal] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [phoneNumValue, setPhoneNumValue] = useState("");
  const [age, setAgeValue] = useState("");
  const [price, setPriceValue] = useState("");
  const [date, setDateValue] = useState("");
  const [time, setTimeValue] = useState("");
  const [note, setNoteValue] = useState("");
  const [company_id, setCompany_idValue] = useState("");
  const [category_id, setCategoryValue] = useState("");
  const [service_id, setService_idValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [style, setStyle] = useState({});
  const [buttonStyle, setButtonStyle] = useState({});

  const token = localStorage.getItem("token");

  const handleNameChange = (event) => {
    setNameValue(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastNameValue(event.target.value);
  };
  const handlePhoneNumChange = (event) => {
    setPhoneNumValue(event.target.value);
  };
  const handleAgeChange = (event) => {
    setAgeValue(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPriceValue(event.target.value);
  };
  const handleDateChange = (event) => {
    setDateValue(event.target.value);
  };
  const handleTimeChange = (event) => {
    setTimeValue(event.target.value);
  };
  const handleNoteChange = (event) => {
    setNoteValue(event.target.value);
  };
  const handleCompany_IdChange = (event) => {
    setCompany_idValue(event.target.value);
  };
  const handleCategory_IdChange = (event) => {
    setCategoryValue(event.target.value);
  };
  const handleService_IdChange = (event) => {
    setService_idValue(event.target.value);
  };

  useEffect(()=>{
    axios
    .get("https://api.alistudiox.com/public/api/v1/category", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      setCategories(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }, [])

  useEffect(() => {
    axios
      .get(
        `https://api.alistudiox.com/public/api/v1/service?type=by_category&category_id=${category_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [category_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDailyService = {
      nameValue,
      lastNameValue,
      phoneNumValue,
      age,
      date,
      time,
      price,
      service_id,
      note,
      company_id,
    };
    await axios
      .post(
        `https://api.alistudiox.com/public/api/v1/add-daily-services?first_name=${nameValue}&last_name=${lastNameValue}&phone_number=${phoneNumValue}&age=${age}&day=${date}&time=${time}&price=${price}&service_id=${service_id}&note=${note}&company_id=${company_id}`,
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
        getDailyStatisticsOfCompanyByDate()
        Swal.fire({
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      });
      closeModal()
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
      display : 'none'
    })
  };

  const closeModal = () => {
    setShowModal(false);
    setStyle({});
    setButtonStyle({})
  };
  return (
    <div style={style}>
      <button className="openModal" onClick={openModal} style={buttonStyle}>
        Create Daily Service
      </button>
      {showModal && (
        <div className="create_manager_modal_cont">
          <div className="create_manager_modal">
            <div className="create_manager_modal_title">
              <h4>Create Daily Service</h4>
              <button onClick={closeModal}>X</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="create_daily_service_container">
                <div className="create_daily_service_left">
                  <div className="crt_manager_inp_cont">
                    <label htmlFor="date">Customer Time</label>
                    <div className="input_time_cont">
                      <input
                        type="date"
                        name="date"
                        id="date"
                        required
                        onChange={handleDateChange}
                      />
                      <input
                        type="time"
                        name="time"
                        id="time"
                        required
                        onChange={handleTimeChange}
                      />
                    </div>
                  </div>
                  <div className="crt_manager_inp_cont">
                    <label htmlFor="name">Customer First Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      onChange={handleNameChange}
                    />
                  </div>
                  <div className="crt_manager_inp_cont">
                    <label htmlFor="lastName">Customer Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      required
                      onChange={handleLastNameChange}
                    />
                  </div>
                  <div className="crt_manager_inp_cont">
                    <label htmlFor="phoneNum">Customer Phone Number</label>
                    <input
                      type="text"
                      name="phoneNum"
                      id="phoneNum"
                      required
                      onChange={handlePhoneNumChange}
                    />
                  </div>
                  <div className="crt_manager_inp_cont">
                    <label htmlFor="age">Customer Age</label>
                    <input
                      type="text"
                      name="age"
                      id="age"
                      required
                      onChange={handleAgeChange}
                    />
                  </div>
                </div>
                <div className="create_daily_service_right">
                  <div className="crt_manager_inp_cont">
                    <label htmlFor="price">Price</label>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      required
                      onChange={handlePriceChange}
                    />
                  </div>
                  <div className="crt_manager_inp_cont">
                    <label htmlFor="company">Select Enrolling Company:</label>
                    <select
                      id="company"
                      name="company"
                      onChange={handleCompany_IdChange}
                    >
                      <option value={""}>Select a Company</option>
                      {companies.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="crt_manager_inp_cont">
                    <label htmlFor="category">Select Enrolling Category:</label>
                    <select
                      id="category"
                      name="category"
                      onChange={handleCategory_IdChange}
                    >
                      <option value={""}>Select a Category</option>

                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="crt_manager_inp_cont">
                    <label htmlFor="service">Select Enrolling Service:</label>
                    <select
                      id="service"
                      name="service"
                      onChange={handleService_IdChange}
                      value={service_id}
                    >
                      <option value={""}>Select a service</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="crt_manager_inp_cont">
                    <label htmlFor="note">Note</label>
                    <textarea
                      type="text"
                      name="note"
                      id="note"
                      onChange={handleNoteChange}
                    />
                  </div>
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

export default CreateDailyService;
