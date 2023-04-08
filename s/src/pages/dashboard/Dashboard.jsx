import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
const Dashboard = () => {
  const [state, setState] = useState({
    dailyData: [],
    date: "",
    companies: [],
    totalAmount: 0
  });
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
        setState((prevState) => ({
          ...prevState,
          companies: response.data,
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getDailyCosts = () => {
    state.companies.forEach((company) => {
      getDailyCost(company.id);
    });
  };
  const getDailyCost = (company_id) => {
    axios
      .get(
        `https://api.alistudiox.com/public/api/v1/get-cost?company_id=${company_id}&day=${state.date}&query_type=daily`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setState(prevState => ({
          ...prevState,  
          dailyData: prevState.dailyData.concat(response.data.costs),
          totalAmount: prevState.totalAmount + response.data.total_amount
        }));
        console.log(state);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getCompanies();
    getDailyCosts();
    let date = new Date();
    setState((prevState) => ({
      ...prevState,
      date: moment(date).format("YYYY-MM-DD"),
    }));
  }, []);
  return (
    <main>
      <section id="dashboard">
        <div className="container">
          <div className="title">
            <h2>Dashboard</h2>
          </div>
          <div className="daily_amount_container">
            <div className="managers_info_table">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Company Name</th>
                    <th>Daily Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {state.dailyData.map((row, index) => (
                    <tr key={row.id}>
                      <th>{index + 1}</th>
                      <td>
                        {
                          state.companies.find(
                            (company) => company.id === row.company_id
                          )?.name
                        }
                      </td>
                      <td>{row.amount}</td>
                    </tr>
                  ))}
                  <tr>
                    <th></th>
                    <td>Total</td>
                    <td>{state.totalAmount}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
