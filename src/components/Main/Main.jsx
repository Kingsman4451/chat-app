import React, { useContext } from 'react';
import context from '../../context';
import Chat from '../Chat/Chat';
import Download from '../Download/Download';
import Profile from '../Profile/Profile';
import Users from '../Users/Users';
import '../../assets/styles/index.css'

const Main = () => {
  let { values } = useContext(context.context)
  let { checker, token } = values

  if(!token) {
    return (
      <>
        <div className="alert alert-danger fs-4 fw-bold  text-center w-50 h-100 py-4 m-0 mt-5 " >404 Page not found</div>
      </>
    )
  }
  return (

    <>
        <div className="main container-fluid self-align-start bg-white">
          <div className="w-100">
            <Users/>
            <Chat/>
            <div className="right border-start">
              <Profile/>
              <Download/>
            </div>
          </div>
        </div>
    </>
  );
};

export default Main;