import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment/moment";
import EditDailyExpenses from "../../components/editDailyExpenses/EditDailyExpenses";
import CreateDailyExpense from "../../components/createDailyExpense/CreateDailyExpenseForManager";

const Expenses = () => {
  const [data, setData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
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
  const handleMonthChange = (event) => {
    const inputDate = event.target.value;
    let date = new Date(inputDate);
    setMonth(moment(date).format("YYYY-MM"));
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
              `https://api.alistudiox.com/public/api/v1/delete-cost/${id}`,
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
          `https://api.alistudiox.com/public/api/v1/get-cost?company_id=${company_id}&day=${date}&query_type=daily`,
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
  const getMonthlyStatisticsOfCompanyByDate = () => {
    console.log(monthlyData);
    if (company_id !== "") {
      axios
        .get(
          `https://api.alistudiox.com/public/api/v1/get-cost?company_id=${company_id}&day=${month}&query_type="monthly"`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
            setMonthlyData(response.data);
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
  useEffect(() => {
    getDailyStatisticsOfCompanyByDate();
  }, [date, company_id]);
  useEffect(() => {
    getMonthlyStatisticsOfCompanyByDate();
  }, [month, company_id]);

  return (
    <main>
      <section id="createManager">
        <div className="container" id="relative">
          <div className="title" id="dailyServiceTitle">
            <h2>Daily Expenses</h2>
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
                    <th>Note</th>
                    <th>Amount</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data?.costs?.map((row, index) => (
                      <tr key={row.id}>
                        <th>{index + 1}</th>
                        <td>{row.note}</td>
                        <td>{row.amount}</td>
                        <td>
                          {
                            <EditDailyExpenses
                              id={row.id}
                              amount={row.amount}
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
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className="title" id="monthlyExpenseForm">
            <form id="dailyServiceForm">
              <div className="crt_manager_inp_cont">
                <input
                  type="month"
                  name="date"
                  id="date"
                  required
                  onChange={handleMonthChange}
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
                    <th>Day</th>
                    <th>Note</th>
                    <th>Amount</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(monthlyData).map((key) =>
                    monthlyData[key]?.map((row, index) => (
                      <tr key={row.id}>
                        <th>{index + 1}</th>
                        <td>{row.day}</td>
                        <td>{row.note}</td>
                        <td>{row.amount}</td>
                        <td>
                          {
                            <EditDailyExpenses
                              id={row.id}
                              amount={row.amount}
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
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="add_manager_modal_div">
              <CreateDailyExpense companies={companies} />
            </div> 
        </div>
      </section>
    </main>
  );
};

export default Expenses;
