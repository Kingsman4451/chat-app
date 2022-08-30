import React, { useContext } from "react";
import context from "../../context";
import { ToastContainer, toast } from 'react-toastify';
import signinImg from "../../assets/images/signin-image.jpg";
import "../../assets/styles/styles.css";
import { NavLink } from "react-router-dom";

const Login = () => {
  const { values } = useContext(context.context);
  const { username, password,token, checker, setUsername, click, setPassword, setClick } = values;


  const cheker = ()=>{
    return checker ? checker : toast.error("Username or password is incorrect!");
  }


  return (
    <>
        <div className="wrapper sign-in">
          <form action="#" className="site-form" onSubmit={evt => evt.preventDefault()}>
            <h1 className="title">Sign in</h1>
            <label>
              <span className="zmdi zmdi-account"></span>
              <input type="text" id="usernameInput" placeholder="Your name" value={username} onChange={e => setUsername(e.target.value)}/>
            </label>
            <label>
              <span className="zmdi zmdi-lock"></span>
              <input type="password" id="passwordInput" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              <button
                className="zmdi zmdi-eye"
                id="showButton"
                type="button"
        
              ></button>
            </label>
            <div>
          <button
                type="submit"
                id="submitButton"
                onClick={() => {setClick(click + 1)}}
                disabled={checker}
              >
                Log in
              </button>
            <NavLink to={checker ? "/main": '/'}>
              <button
                type="submit"
                id="submitButton"
                onClick={() => {
                  cheker()
                  if (!checker) return
                  setUsername('')
                  setPassword('')
                }}
                style={!checker ? {'backgroundColor': 'red'} : {'backgroundColor': 'green'}}
              >
                Start
              </button>
            </NavLink>
          </div>
          </form>
          <NavLink to="/register" className="sign-link">
            Create an account
          </NavLink>
          <img src={signinImg} alt="signin-image" className="signin-image" />
        
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

export default Login;
