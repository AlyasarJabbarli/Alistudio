import React, { useState, useEffect } from "react";
import axios from "axios";
import AddServiceModal from "../../components/addServiceModal/AddServiceModal";
import EditServiceModal from "../../components/editServiceModal/EditServiceModal";
import Swal from "sweetalert2";


const Service = () => {
  const [data, setData] = useState([]);
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: true,
  });

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
            .delete(`https://api.alistudiox.com/public/api/v1/service/${id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            })
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
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={row.id}>
                      <th>{index + 1}</th>
                      <td>{row.title}</td>
                      <td>{row.category_id}</td>
                      <td>{<EditServiceModal getServices={()=>getServices()} id={row.id} name={row.title} categoryId={row.category_id}/>}</td>
                      <td><button className="deleteBtn" onClick={() => handleDelete(row.id)}>Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="add_manager_modal_div">
                <AddServiceModal  getServices={()=>getServices()}/>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Service;
