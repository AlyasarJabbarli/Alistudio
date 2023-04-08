import React, { useState, useEffect } from "react";
import axios from "axios";
import AddCategoryModal from "../../components/addCategoryModal/AddCategoryModal";
import EditCategoryModal from "../../components/editCategoryModal/EditCategoryModal";
import Swal from "sweetalert2";
const Category = () => {
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
            .delete(`https://api.alistudiox.com/public/api/v1/category/${id}`, {
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
  const getCategories = () => {
    axios
    .get("https://api.alistudiox.com/public/api/v1/category", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }
  useEffect(() => {
    getCategories()
  }, []);

  return (
    <main>
      <section id="createManager">
        <div className="container">
          <div className="title">
            <h2>Categories</h2>
          </div>
          <div className="createManager_all">
            
            <div className="managers_info_table">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={row.id}>
                      <th>{index + 1}</th>
                      <td>{row.title}</td>
                      <td>
                        {<EditCategoryModal id={row.id} name={row.title} getCategories = {() => getCategories()}/>}
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
                  ))}
                </tbody>
              </table>
            </div>
            <div className="add_manager_modal_div">
              <AddCategoryModal   getCategories = {() => getCategories()}/>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Category;
