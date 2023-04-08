import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateDailyService from "../../components/createDailyService/CreateDailyService";
import Swal from "sweetalert2";
import moment from "moment/moment";
import EditDailyService from "../../components/editDailyService/EditDailyService";

const Actions = () => {
  const [data, setData] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [date, setDate] = useState("");
  const [company_id, setCompanyId] = useState("");
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: true,
  });

  const handleDateChange = (event) => {
    const inputDate = event.target.value;
    let date = new Date(inputDate);
    setDate(moment(date).format("YYYY-MM-DD"));
  };
  const handleCompany_idChange = (event) => {
    setCompanyId(event.target.value);
  };
  const handleDelete = async (id) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(
              `https://api.alistudiox.com/public/api/v1/delete-services-byId/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              }
            )
            .then((response) => {
              console.log(response.data);
              getDailyStatisticsOfCompanyByDate();
            })
            .catch((error) => {
              console.error(error);
            });
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };
  const handleDeleteByDate = async () => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(
              `https://api.alistudiox.com/public/api/v1/delete-daily-services?company_id=${company_id}&date=${date}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              }
            )
            .then((response) => {
              console.log(response.data);
              swalWithBootstrapButtons.fire(
                "Deleted!",
                "Your file has been deleted.",
                "success"
              );
              getDailyStatisticsOfCompanyByDate()
            })
            .catch((error) => {
              console.error(error);
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
              })
            });
         
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };

  const handleLock = async (id) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .put(
              `https://api.alistudiox.com/public/api/v1/lock-unlock-order/${id}`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              }
            )
            .then((response) => {
              console.log(response.data);
              swalWithBootstrapButtons.fire("Success!");
              getDailyStatisticsOfCompanyByDate();
            })
            .catch((error) => {
              console.error(error);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is not changed",
            "error"
          );
        }
      });
  };

  const getCompanies = () => {
    axios
      .get("https://api.alistudiox.com/public/api/v1/company", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getDailyStatisticsOfCompanyByDate = () => {
    if (company_id !== "") {
      axios
        .get(
          `https://api.alistudiox.com/public/api/v1/show-daily-services?date=${date}&company_id=${company_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    getCompanies();
    const today = new Date().toISOString().substring(0, 10);
    setDate(today);
  }, []);


  return (
    <main>
      <section id="createManager">
        <div className="container">
          <div className="title" id="dailyServiceTitle">
            <h2>Daily Services</h2>
            <form id="dailyServiceForm">
              <div className="crt_manager_inp_cont">
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={date}
                  required
                  onChange={handleDateChange}
                />
              </div>
              <div className="crt_manager_inp_cont">
                <select
                  id="company"
                  name="company"
                  onChange={handleCompany_idChange}
                >
                  <option value="">Select Company</option>
                  {companies.map((company) => {
                    return (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </form>
          </div>
          <div className="createManager_all" id="dailyServiceTable">
            <div className="managers_info_table">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Service</th>
                    <th>Phone Number</th>
                    <th>Time</th>
                    <th>Price</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>Lock</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.statistics?.map((row, index) => (
                    <tr key={row.id}>
                      <th>{index + 1}</th>
                      <td>{row.first_name + " " + row.last_name}</td>
                      <td>{row.age}</td>
                      <td>{row.service_id}</td>
                      <td>{row.phone_number}</td>
                      <td>{row.time.substring(0, 5)}</td>
                      <td>{row.price}</td>
                      <td>
                        {
                          <EditDailyService
                            getDailyStatisticsOfCompanyByDate={() =>
                              getDailyStatisticsOfCompanyByDate()
                            }
                            companies={companies}
                            id={row.id}
                            name={row.title}
                            first_name={row.first_name}
                            last_name={row.last_name}
                            phone_number={row.phone_number}
                            customerAge={row.age}
                            day={row.day}
                            customerTime={row.time}
                            customerPrice={row.price}
                            customerService_id={row.service_id}
                            customerNote={row.note}
                            customerCompany_id={row.company_id}
                          />
                        }
                      </td>
                      <td>
                        <button
                          className="deleteBtn"
                          onClick={() => handleDelete(row.id)}
                        >
                          Delete
                        </button>
                      </td>
                      <td>
                        <button
                          className="deleteBtn"
                          id="lockBtn"
                          onClick={() => handleLock(row.id)}
                        >
                          {row.status === "1" ? "Unlock" : "Lock"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="add_manager_modal_div">
              <button className="deleteAllBtn" onClick={handleDeleteByDate}>
                Delete By Date
              </button>
              <CreateDailyService
                getDailyStatisticsOfCompanyByDate={() =>
                  getDailyStatisticsOfCompanyByDate()
                }
                companies={companies}
              />
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default Actions;
