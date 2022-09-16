import React, { useContext, useRef, useState, useEffect } from "react";
import context from "../../context";
import "./Chat.css";
import { io } from 'socket.io-client';
import defaultAvatar from "../../assets/images/default-avatar.png";
import dowloadPng from "../../assets/images/download.png"
const socket = io("https://custom--chat.herokuapp.com")

const Chat = () => {
  let { values } = useContext(context.context);
  let {
    messages,
    userId,
    setMessageData,
    newMessage,
    setNewMessage,
    data,
    users,
    messageClick,
    setMessageClick,
    click,
    setClick,
  } = values;
  const chatDiv = useRef();
  const [typing, setTyping]= useState(false)
  const [id, setId]= useState(false)

  const user = users.find(user=>{
    user.userId == id
  })

  useEffect(() => {
    setTimeout(() => {
      chatDiv.current.scrollTo({
        top: chatDiv.current.scrollHeight,
        behavior: "smooth",
    })
    }, 100);
  },[click])

  const handleSendMessage = () => {
    let data = new FormData();
    data.append("body", newMessage);
    setMessageData(data);
  };



  return (
    <>
      <div className="chat col-6 gx-0">
        <div className="chat-header position-relative ps-2 pt-1 bg-white pb-4 border-bottom">
          <h2 className="chat-title d-block m-0">Web Group N-29</h2>

        </div>
        <ul className="chat-main list-unstyled" ref={chatDiv}>
          {messages.map((message, index) => {
            return (
              <li
                className="msg-wrapper"
                style={
                  userId == message.userId
                    ? { alignSelf: "flex-end", justifyContent: "flex-end" }
                    : { alignSelf: "flex-start", justifyContent: "flex-start" }
                }
                key={message.messageId}
              >
                {userId == message.userId ? (
                  ""
                ) : (
                  <img
                    src={
                      message.user.avatar
                        ? `https://custom--chat.herokuapp.com/${message.user.avatar}`
                        : defaultAvatar
                    }
                    alt="profile-picture"
                  />
                )}

                <div className="msg-text p-2">
                  <p className="msg-author">{message.user.username}</p>
                  {message.isText ? (
                    <p className="msg">{message.body}</p>
                  ) : (
                    <>
                      <object
                        className="msg object-class d-inline-block mb-2"
                        width="500"
                        height="100%"
                        data={` https://custom--chat.herokuapp.com/${message.body}`}
                      ></object>
                      {data.map((item) => {
                        return (
                          <>
                            {message.messageId == item.messageId ? (
                              <a
                                href={` https://custom--chat.herokuapp.com/download/${item.downloadLink}`}
                                onClick={() => {
                                  setClick(click + 1),
                                    setFileName(item.downloadLink);
                                }}
                                key={item.dataId}
                              >
                                <img src={dowloadPng} width="30"/>
                              </a>
                            ) : (
                              ""
                            )}
                          </>
                        );
                      })}
                    </>
                  )}

                  <p className="time">{message.createdAt}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <form
          action="#"
          className="chat-footer"
          onSubmit={(evt) => {
            evt.preventDefault();
          }}
        >
          <button className="icon-btn" type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
          </button>
          <input
            type="text"
            placeholder="Enter a message."
            id="textInput"
            required
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              let timeId
              if(e.keyCode != 13 && timeId) return
              socket.emit('typing', {userId})
              socket.on("typing", ({userId})=>{setId(userId)})
              setTyping(true)
              timeId = setTimeout(()=>{
                timeId = undefined
                setTyping(false)
              }, 2000)
            }}
            autoComplete="off"
          />
          <div className="file-upload">
            <label className="m-0" htmlFor="uploads">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
              </svg>
            </label>
            <input
              type="file"
              id="uploads"
              name="uploads"
              onChange={(e) => setNewMessage(e.target.files[0])}
            />
          </div>
          <button
            className="m-0 bg-transparent p-0 text-dark"
            id="sendBtn"
            type="submit"
            onClick={(e) => {
              handleSendMessage();
              setMessageClick(messageClick + 1);
              setClick(click + 1);
              setTimeout(() => {
                setNewMessage("");
                setMessageData('');
                
              }, 200);
              
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </>
  );
};

export default Chat;
