import React, { useState, useEffect } from "react";
import axios from "axios";
import AddCompanyModal from "../../components/addCompanyModal/AddCompanyModal";
import EditCompanyModal from "../../components/editCompanyModal/EditCompanyModal";


const Companies = () => {
  const [data, setData] = useState([]);
  const getCompanies = () =>{
    axios
    .get("https://api.alistudiox.com/public/api/v1/company",{
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
    getCompanies()
  }, []);

  return (
    <main>
      <section id="createManager">
        <div className="container">
        <div className="title">
            <h2>Companies</h2>
          </div>
          <div className="createManager_all">
          
            <div className="managers_info_table">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Manager</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={row.id}>
                      <th>{index + 1}</th>
                      <td>{row.name}</td>
                      <td>{row.manager.full_name}</td>
                      <td>{<EditCompanyModal getCompanies={()=>getCompanies()} id={row.id} name={row.name} managerId={row.manager.id}/>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="add_manager_modal_div">
                <AddCompanyModal getCompanies={()=>getCompanies()}/>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Companies;
