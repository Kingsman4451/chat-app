import React, { useContext } from "react";
import context from "../../context";
import defaultAvatar from '../../assets/images/default-avatar.png'
import { NavLink } from "react-router-dom";

const Profile = () => {
  let { values } = useContext(context.context);
  let { users, userId } = values;
  return (
    <>
    <NavLink to='/'>
      <button className="log-out-btn btn btn-danger" onClick={e=>{
        localStorage.removeItem('token')
        setTimeout(() => {window.location.reload()}, 100)
        
      }}>Log out</button>
    </NavLink>
      {users.map((user) => {
        if (user.userId == userId) {
          return (
            <div className="profile text-center pt-3 pb-3 border-bottom" key={userId}>
              <img className="avatar-img d-inline-block mb-2" src={user.avatar ? `https://custom--chat.herokuapp.com${user.avatar}` : defaultAvatar} alt="" width='80' height='80'/>
              <p className="user-name fw-bold h2 m-0 mb-2">{user.username}</p>
              <a className="text-decoration-none" href={`tel:${user.contact}`}>{`Tel: ${user.contact}`}</a>
            </div>
          );
        }
      })}
    </>
  );
};

export default Profile;
