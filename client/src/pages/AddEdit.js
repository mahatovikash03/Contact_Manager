import { API_URL } from "../config";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  contact: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { name, email, contact } = state;

  const navigate = useNavigate(); // ✅ useNavigate instead of useHistory

  const {id} = useParams();

  useEffect(() =>{
    axios
    .get(`${API_URL}/api/get/${id}`)
    .then((resp) => setState({...resp.data[0]}));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("Please provide value into each field");
    } else {
      if(!id) {
        axios
        .post(`${API_URL}/api/post`, {
          name,
          email,
          contact,
        })
        .then(() => {
          setState({ name: "", email: "", contact: "" });
        }).catch((err) => toast.error(err.response?.data || "Error occurred"));
        toast.success("Contact Added successfully!");
      } else {
        axios
        .put(`${API_URL}/api/update/${id}`, {
          name,
          email,
          contact,
        })
        .then(() => {
          setState({ name: "", email: "", contact: "" });
        }).catch((err) => toast.error(err.response?.data || "Error occurred"));
        toast.success("Contact Updated successfully!");
      }
      setTimeout(() => navigate("/"), 500); // ✅ use navigate instead of history.push
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name..."
          value={name || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email..."
          value={email || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Your Contact..."
          value={contact || ""}
          onChange={handleInputChange}
        />

        <input type="submit" value={id ? "Update" : "Save"} />
        <Link to="/">
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
