import React, { useContext } from "react";
import context from "../../context";
import { NavLink } from "react-router-dom";
import SignUpImg from "../../assets/images/signup-image.jpg";
import { ToastContainer, toast } from 'react-toastify';
import "../../assets/styles/styles.css";

const Register = () => {
  const { values } = useContext(context.context);
  const {
    username,
    password,
    repeat_password,
    contact,
    avatar,
    checker,
    setUsername,
    click,
    registerClick,
    setPassword,
    formData,
    setRepeat_password,
    setContact,
    setAvatar,
    setFormData,
    setClick,
    setRegisterClick
  } = values;

  const cheker = () => {
    return checker
      ? checker
      : toast.error("Please first register your account!");
  };

  const handleUpload = () => {

    let data = new FormData()
    data.append('username', username),
    data.append('password', password),
    data.append('repeat_password', repeat_password),
    data.append('contact', contact),
    data.append('avatar', avatar)
    setFormData(data)

  }

  return (
    <>
      <div className="wrapper">
        <h1 className="title">Sign up</h1>
        <form
          action="#"
          className="site-form"
          onSubmit={(evt) => evt.preventDefault()}
        >
          <label>
            <span className="zmdi zmdi-account"></span>
            <input
              type="text"
              id="usernameInput"
              placeholder="Your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>

          <label>
            <span className="zmdi zmdi-lock"></span>
            <input
              type="password"
              id="passwordInput"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className="zmdi zmdi-eye"
              type="button"
              id="showButton"
            ></button>
          </label>

          <label>
            <span className="zmdi zmdi-lock"></span>
            <input
              type="password"
              id="passwordInput"
              placeholder="Repeat Password"
              value={repeat_password}
              onChange={(e) => setRepeat_password(e.target.value)}
              required
            />
            <button
              className="zmdi zmdi-eye"
              type="button"
              id="showButton"
            ></button>
          </label>
          <label>
            <span className="zmdi zmdi-smartphone"></span>
            <input
              type="tel"
              id="emailInput"
              placeholder="Your contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </label>
          <label className="custom-upload">
            <span className="zmdi zmdi-upload"></span>
            <span className="file-name">click upload a avatar picture</span>
            <input type="file" id="uploadInput" accept="image/*" 
            onChange={e=>{
              setAvatar(e.target.files[0]);
              setRegisterClick(registerClick + 1);
            }}
            />
          </label>
          <div>
          <button
                type="submit"
                id="submitButton"
                onClick={() => {
                  handleUpload()
                  setRegisterClick(registerClick + 1);
                }}
                disabled={checker}
              >
                Register
              </button>
            <NavLink to={checker ? "/main": '/register'}>
              <button
                type="submit"
                id="submitButton"
                onClick={() => {
                  cheker()
                  if (!checker) return
                  setUsername('')
                  setPassword('')
                  setContact('')
                  setAvatar('')
                  setRepeat_password('')
                }}
                style={!checker ? {'backgroundColor': 'red'} : {'backgroundColor': 'green'}}
              >
                Start
              </button>
            </NavLink>
          </div>
        </form>
        <NavLink to="/" className="sign-link">
          I am already member
        </NavLink>
        <img src={SignUpImg} alt="signup-image" className="signup-image" />
      </div>
      <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
    </>
  );
};

export default Register;
