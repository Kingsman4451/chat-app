import React, { useContext } from "react";
import context from "../../context";
import defaultAvatar from '../../assets/images/default-avatar.png'
import './Users.css'

const Users = () => {
  let { values } = useContext(context.context);
  let { users } = values;

  return (
    <>
      <div className="users col-3 gx-0 p-0 pt-2 border-end">
        <h1 className="user-heading text-center m-0 pb-2 border-bottom border-end px-3">
          Users
        </h1>
        <ul className="user-list list-unstyled p-0">
          {users.map((user) => {
            return (
              <li className="list-item d-flex align-items-center gap-3 py-3 px-3 border-bottom" key={user.userId}>
                <img className="avatar-img d-block" src={user.avatar ? `https://custom--chat.herokuapp.com${user.avatar}` : defaultAvatar} alt={user.username} width='60' height='60'/>
                <div className="item-content">
                  <p className="fw-bold fs-4 m-0">{user.username}</p>
                  <a className="text-decoration-none" href={`tel:${user.contact}`}>{user.contact}</a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Users;
