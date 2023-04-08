import AddManagerModal from "../../components/addManagerModal/AddManagerModal";
import React, { useState, useEffect } from "react";
import axios from "axios";
import EditManagerModal from "../../components/editManagerModal/EditManagerModal";

const Managers = () => {
  const [data, setData] = useState([]);
  const getManagers = () =>{
    axios
    .get("https://api.alistudiox.com/public/api/v1/users",{
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
    getManagers()
  }, []);

  return (
    <main>
      <section id="createManager">
        <div className="container">
        <div className="title">
            <h2>Managers</h2>
          </div>
          <div className="createManager_all">
           
            <div className="managers_info_table">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>FullName</th>
                    <th>Number</th>
                    <th>Email</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={row.id}>
                      <th>{index + 1}</th>
                      <td>{row.first_name + ' ' + row.last_name}</td>
                      <td>{row.phone_number}</td>
                      <td>{row.email}</td>
                      <td>
                        <EditManagerModal getManagers={()=>getManagers()} id={row.id} name={row.first_name} lastName={row.last_name} number={row.phone_number } email={row.email}/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="add_manager_modal_div">
              <AddManagerModal getManagers={()=>getManagers()} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Managers;
