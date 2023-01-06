import React, { useEffect, useState, useRef } from "react";
import "../../css/admin/admin-verticals.css";
import { useNavigate } from "react-router-dom";

import { SERVER_ORIGIN } from "../../utilities/constants";
import { refreshScreen } from "../../utilities/helper_functions";

const AdminVerticals = () => {
  const [allVerticals, setAllVerticals] = useState([]);
  const [newVertical, setNewVertical] = useState({ name: "", desc: "" });
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllVerticals() {
      try {
        const response = await fetch(
          `${SERVER_ORIGIN}/api/public/verticals/all`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          }
        );

        const { statusText, allVerticals } = await response.json();

        // console.log(statusText);
        console.log(allVerticals);

        setAllVerticals(allVerticals);
      } catch (error) {
        console.log(error.message);
      }
    }

    getAllVerticals();
  }, []);

  //////////////////////////////// Add Vertical Modal ////////////////////////////////////////

  const ref = useRef(null);
  const refClose = useRef(null);

  async function openAddModal() {
    ref.current.click();
  }

  function onAddChange(e) {
    setNewVertical({ ...newVertical, [e.target.name]: e.target.value });
    console.log(newVertical);
  }

  async function handleAddVertical(e) {
    e.preventDefault();

    // todo: validate input
    try {
      const response = await fetch(
        `${SERVER_ORIGIN}/api/admin/auth/verticals/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(newVertical),
        }
      );

      const data = await response.json();
      console.log(data);

      refClose.current.click();
      // refreshScreen();
    } catch (error) {
      console.log(error.message);
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  async function handleAddOrViewCourses(e) {
    const verticalId = e.target.id;
    console.log(verticalId);
    navigate(`/admin/verticals/${verticalId}/courses/all`);
  }

  ////////////////////////////////////// Delete Vertical Modal ///////////////////////////////////////////////////
  const ref2 = useRef(null);
  const refClose2 = useRef(null);
  const [toDeleteVerticalId, setToDeleteVerticalId] = useState("");
  const [confirmText, setConfirmText] = useState("");

  function openDeleteModal(e) {
    ref2.current.click();
    setToDeleteVerticalId(e.target.id);
  }

  function onConfirmTextChange(e) {
    setConfirmText(e.target.value);
  }

  async function handleDeleteVertical() {
    const verticalId = toDeleteVerticalId;
    // todo: validate input
    try {
      const response = await fetch(
        `${SERVER_ORIGIN}/api/admin/auth/verticals/${verticalId}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      const { statusText } = await response.json();
      console.log(statusText);

      refClose2.current.click();
      // refreshScreen();
    } catch (error) {
      console.log(error.message);
    }
  }

  const deleteModal = (
    <>
      <button
        ref={ref2}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal3"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal3"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete vertical
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                {/* <i className="fa-solid fa-xmark"></i> */}
              </button>
            </div>
            <div className="modal-body">
              {/* Form */}
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Confirmation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="confirm"
                    name="confirm"
                    minLength={3}
                    required
                    placeholder="Type 'Confirm' to delete"
                    value={confirmText}
                    onChange={onConfirmTextChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose2}
              >
                Close
              </button>
              <button
                onClick={handleDeleteVertical}
                type="button"
                className="btn btn-primary"
                disabled={confirmText === "Confirm" ? false : true}
              >
                - Delete Vertical
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div style={{ textAlign: "center", margin: "2%" }}>
        <button onClick={openAddModal} className="btn btn-primary btn-lg">
          + Vertical
        </button>
      </div>
      <section className="online">
        <div className="container1">
          {/* <Heading subtitle="COURSES" title="Browse Our Online Courses" /> */}
          <div className="content grid2 row">
            {allVerticals.map((vertical) => (
              <div className="box col w-200" key={vertical._id}>
                <div className="img">
                  <img src={vertical.imgSrc} alt="sjfn" />
                  {/* <img src={vertical.imgSrc} alt="" className="show" /> */}
                </div>
                <h1>{vertical.name}</h1>
                <h1>{vertical.desc}</h1>
                <span>{vertical.courseIds.length} Courses </span>
                <br />
                <button
                  className="btn btn-primary"
                  style={{ margin: "10px" }}
                  id={vertical._id}
                  onClick={handleAddOrViewCourses}
                >
                  + Add / View courses
                </button>
                <button
                  className="btn btn-primary"
                  id={vertical._id}
                  onClick={openDeleteModal}
                >
                  - Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal2"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add a new vertical
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                {/* <i className="fa-solid fa-xmark"></i> */}
              </button>
            </div>
            <div className="modal-body">
              {/* Form */}
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    minLength={3}
                    onChange={onAddChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="desc"
                    name="desc"
                    onChange={onAddChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="imgSrc" className="form-label">
                    Image Source
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="imgSrc"
                    name="imgSrc"
                    onChange={onAddChange}
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                onClick={handleAddVertical}
                type="button"
                className="btn btn-primary"
              >
                Add Vertical
              </button>
            </div>
          </div>
        </div>
      </div>

      {deleteModal}
    </>
  );
};

export default AdminVerticals;
