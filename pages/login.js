import axios from "axios";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const login = () => {
  useEffect(() => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });
  }, []);
  const notify = (text) => toast(text);
  var signupSubmit = async (data) => {
    try {
      var dat = await axios.post("/api/signUp", {
        firstName: data.name,
        lastName: data.name,
        email: data.email,
        password: data.password,
      });
      toast.success(
        dat.data?.success || dat.data?.error || "Backend Developers☕",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      if (dat.data?.success.includes("User created successfully")) {
        localStorage.setItem("userToken", dat.data?.token);
      }
    } catch (error) {
      toast.error(
        error.response.data?.success ||
          error.response.data?.error ||
          "Backend Developers☕",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      // alert(JSON.stringify(error.response.data));
    }
  };
  var loginSubmit = async (data) => {
    try {
      var dat = await axios.post("/api/login", {
        email: data.email,
        password: data.password,
      });
      toast.success(
        dat.data?.success || dat.data?.error || "Backend Developers☕",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      if (dat.data?.success.includes("successfully")) {
        console.log(dat.data?.token);
        // localStorage.removeItem("userToken");
        localStorage.setItem("userToken", dat.data?.token);
      }
    } catch (error) {
      toast.error(
        error.response.data?.success ||
          error.response.data?.error ||
          "Backend Developers☕",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      // alert(JSON.stringify(error.response.data));
    }
  };
  var getformInputs = (callback, el) => {
    var formOBJ = {};
    el.currentTarget
      .querySelectorAll("input")
      .forEach((el2) => (formOBJ[el2.name] = el2.value));
    return callback(formOBJ);
  };

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h2
        className="mb-[1.5rem] text-4xl"
        style={{ fontFamily: "Staatliches" }}
      >
        TrickyTravellers
      </h2>
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form
            className="login-signupform"
            onSubmit={(el) => {
              el.preventDefault();
              if (el.target.cnfPassword.value != el.target.password.value) {
                return alert("Please Double Check Your Given Password!");
              }
              getformInputs(signupSubmit, el);
            }}
          >
            <h1 className="text-3xl" style={{ fontFamily: "Staatliches" }}>
              Create Account
            </h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>Use your email for registration</span>
            <input
              className="login-signup-input"
              type="text"
              placeholder="Name"
              name="name"
            />
            <input
              className="login-signup-input"
              type="email"
              placeholder="Email"
              name="email"
            />
            <input
              className="login-signup-input"
              type="password"
              placeholder="Password"
              name="password"
            />
            <input
              className="login-signup-input"
              type="password"
              placeholder="Confirm Password"
              name="cnfPassword"
            />
            <button className="btnlogin-signup">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form
            className="login-signupform"
            onSubmit={(el) => {
              el.preventDefault();
              getformInputs(loginSubmit, el);
            }}
          >
            <h1 className="text-3xl" style={{ fontFamily: "Staatliches" }}>
              Sign in
            </h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>Use your account</span>
            <input
              className="login-signup-input"
              type="email"
              placeholder="Email"
              name="email"
            />
            <input
              className="login-signup-input"
              type="password"
              placeholder="Password"
              name="password"
            />
            <a href="#">Forgot your password?</a>
            <button className="btnlogin-signup">Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left flex flex-col gap-[1rem]">
              <h1 style={{ fontFamily: "Staatliches" }} className="text-4xl">
                Welcome Back!
              </h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="btnlogin-signup ghost" id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right flex flex-col gap-[1rem]">
              <h1 style={{ fontFamily: "Staatliches" }} className="text-4xl">
                Hello, Friend!
              </h1>
              <p>Enter your details and start journey with us</p>
              <button className="btnlogin-signup ghost" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
