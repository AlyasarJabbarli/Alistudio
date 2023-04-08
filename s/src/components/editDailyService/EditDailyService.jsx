import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const EditDailyService = ({getDailyStatisticsOfCompanyByDate, companies, id, first_name, last_name, phone_number, customerAge, day, customerTime, customerPrice, customerService_id, customerNote, customerCompany_id}) => {
  const [showModal, setShowModal] = useState(false);
  const [nameValue, setNameValue] = useState(first_name);
  const [lastNameValue, setLastNameValue] = useState(last_name);
  const [phoneNumValue, setPhoneNumValue] = useState(phone_number);
  const [age, setAgeValue] = useState(customerAge);
  const [price, setPriceValue] = useState(customerPrice);
  const [date, setDateValue] = useState(day);
  const [time, setTimeValue] = useState(customerTime);
  const [note, setNoteValue] = useState(customerNote);
  const [company_id, setCompany_idValue] = useState(customerCompany_id);
  const [category_id, setCategoryValue] = useState("");
  const [service_id, setService_idValue] = useState(customerService_id);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [style, setStyle] = useState({});
  const [buttonStyle, setButtonStyle] = useState({});

  const token = localStorage.getItem("token");

  const handleChange = (event, setValue) => {
    setValue(event.target.value);
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
      .put(
        `https://api.alistudiox.com/public/api/v1/update-daily-services/${id}?first_name=${nameValue}&last_name=${lastNameValue}&phone_number=${phoneNumValue}&age=${age}&day=${date}&time=${time}&price=${price}&service_id=${service_id}&note=${note}&company_id=${company_id}`,
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
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        getDailyStatisticsOfCompanyByDate()
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
              <h4>Edit Daily Service</h4>
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
                        value={date}
                        required
                        onChange={(event) => handleChange(event, setDateValue)}
                      />
                      <input
                        type="time"
                        name="time"
                        id="time"
                        value={time}
                        required
                        onChange={(event) => handleChange(event, setTimeValue)}
                      />
                    </div>
                  </div>
                  <div className="crt_manager_inp_cont">
                    <label htmlFor="name">Customer First Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={nameValue}
                      required
                      onChange={(event) => handleChange(event, setNameValue)}
                    />
                  </div>
                  <div className="crt_manager_inp_cont">
                    <label htmlFor="lastName">Customer Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={lastNameValue}
                      required
                      onChange={(event) => handleChange(event, setLastNameValue)}
                    />
                  </div>
                  <div className="crt_manager_inp_cont">
                    <label htmlFor="phoneNum">Customer Phone Number</label>
                    <input
                      type="text"
                      name="phoneNum"
                      id="phoneNum"
                      value={phoneNumValue}
                      required
                      onChange={(event) => handleChange(event, setPhoneNumValue)}
                    />
                  </div>
                  <div className="crt_manager_inp_cont">
                    <label htmlFor="age">Customer Age</label>
                    <input
                      type="text"
                      name="age"
                      id="age"
                      value={age}
                      required
                      onChange={(event) => handleChange(event, setAgeValue)}
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
                      value={price}
                      required
                      onChange={(event) => handleChange(event, setPriceValue)}
                    />
                  </div>
                  <div className="crt_manager_inp_cont">
                    <label htmlFor="company">Select Enrolling Company:</label>
                    <select
                      id="company"
                      name="company"
                      defaultValue={company_id}
                      onChange={(event) => handleChange(event, setCompany_idValue)}
                    >
                      <option value={""}>Select a Company</option>
                      {companies?.map((company) => (
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
                      defaultValue={category_id}
                      onChange={(event) => handleChange(event, setCategoryValue)}
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
                      onChange={(event) => handleChange(event, setService_idValue)}
                      defaultValue={service_id}
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
                      value={note}
                      onChange={(event) => handleChange(event, setNoteValue)}
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

export default EditDailyService;
