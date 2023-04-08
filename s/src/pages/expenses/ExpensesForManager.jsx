import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment/moment";
import EditDailyExpenses from "../../components/editDailyExpenses/EditDailyExpenses";
import CreateDailyExpense from "../../components/createDailyExpense/CreateDailyExpenseForManager";
import CreateDailyExpenseForManager from "../../components/createDailyExpense/CreateDailyExpenseForManager";

const ExpensesForManager = () => {
  const [data, setData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");

  const handleDateChange = (event) => {
    const inputDate = event.target.value;
    let date = new Date(inputDate);
    setDate(moment(date).format("YYYY-MM-DD"));
  };
  const handleMonthChange = (event) => {
    const inputDate = event.target.value;
    let date = new Date(inputDate);
    setMonth(moment(date).format("YYYY-MM"));
    getMonthlyStatisticsByDate();
  };
  const getDailyStatisticsOfCompanyByDate = () => {
    axios
      .get(
        `https://api.alistudiox.com/public/api/v1/get-cost?day=${date}&query_type=daily`,
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
  };
  const getMonthlyStatisticsByDate = () => {
    axios
      .get(
        `https://api.alistudiox.com/public/api/v1/get-cost?day=${month}&query_type=monthly"`,
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
  };
  useEffect(() => {
    getDailyStatisticsOfCompanyByDate();
  }, [date]);
  useEffect(() => {
    console.log('salam');
    getMonthlyStatisticsByDate();
    console.log(monthlyData);
  }, [month]);
  useEffect(() => {
    let date = new Date();
    setDate(moment(date).format("YYYY-MM-DD"));
    setMonth(moment(date).format("YYYY-MM"));
    getDailyStatisticsOfCompanyByDate();
    getMonthlyStatisticsByDate();
  }, []);
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
                  </tr>
                </thead>
                <tbody>
                  {data?.costs?.map((row, index) => (
                    <tr key={row.id}>
                      <th>{index + 1}</th>
                      <td>{row.note}</td>
                      <td>{row.amount}</td>
                      <td>
                        {
                          <EditDailyExpenses
                            getDailyStatisticsOfCompanyByDate={() =>
                              getDailyStatisticsOfCompanyByDate()
                            }
                            id={row.id}
                            amount={row.amount}
                          />
                        }
                      </td>
                    </tr>
                  ))}
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
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(monthlyData).map(([day, entries]) =>
                    entries.map(({ id, note, amount }) => (
                      <tr key={id}>
                        <td>{id}</td>
                        <td>{day}</td>
                        <td>{note}</td>
                        <td>{amount}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="add_manager_modal_div">
            <CreateDailyExpenseForManager />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ExpensesForManager;
