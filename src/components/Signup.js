import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Account created successfully","success")
      navigate("/login");
    } else {
      props.showAlert("Invalid Credentials","error")
    }
  };
  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container ">
      <h2 className="d-flex justify-content-center mx-5">Create your account</h2>
      <div className="d-flex justify-content-center" >
      <form className="shadow-lg bg-body-tertiary rounded p-3 m-5 px-5 " style={{width:"30rem"}}onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Name
          </label>
          <input
            name="name"
            type="text"
            className="form-control"
            id="text"
            aria-describedby="emailHelp"
            minLength={5}
            required
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            name="cpassword"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={onchange}
            minLength={5}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Create account
        </button>
      </form>
      </div>
    </div>
  );
};

export default Signup;
