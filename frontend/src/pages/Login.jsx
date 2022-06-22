import { set } from "mongoose";
import React, { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
  
    email: "",
    password: "",
 
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData((prevState) =>({
      ...prevState, [e.target.name]: e.target.value,
    }))

  };
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and Explore</p>
        <section className="form">
          <form onSubmit={onSubmit}>
           
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                id=" email"
                value={ email}
                name="email"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                id="password"
                value={password}
                name="password"
                onChange={onChange}
              />
            </div>
            
              <div className="form-group">
                <button type="submit" className="btn btn-block">
                  Submit
                </button>
              </div>
            
          </form>
        </section>
      </section>
    </>
  );
};

export default Login;
