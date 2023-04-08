import React, { useState, useEffect } from "react";
import axios from "axios";

const ServiceForManager = () => {
  const [data, setData] = useState([]);


  const getServices = () =>{
    axios
      .get("https://api.alistudiox.com/public/api/v1/service?type=all",{
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem('token')}`,
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    getServices()
  }, []);
  

  return (
    <main>
      <section id="createManager">
        <div className="container">
        <div className="title">
            <h2>Services</h2>
          </div>
          <div className="createManager_all">
            <div className="managers_info_table">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={row.id}>
                      <th>{index + 1}</th>
                      <td>{row.title}</td>
                      <td>{row.category_id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServiceForManager;
