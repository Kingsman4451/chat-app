import React, { useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Api } from '../URL/Api';
import context from "./context";
import Login from './components/Login/Login'
import PrivateRoute from './components/private/PrivateRoute';
import Register from './components/Register/Register';
import Main from './components/Main/Main';


const App = () => {
  const cont = context.context;
  const { getUserId, getMessages, postMessage, getUsers, loginUser, registerUser } = Api;
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [repeat_password, setRepeat_password] = useState("")
  const [contact, setContact] = useState("")
  const [avatar, setAvatar] = useState("")
  const [fileName, setFileName] = useState("")
  const [formData, setFormData] = useState("")
  const [messageData, setMessageData] = useState("")
  const [newMessage, setNewMessage] = useState("message")
  const [messages, setMessages] = useState([])
  const [data, setData] = useState([])

  
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [userId, setUserId] = useState('')
  const [users, setUsers] = useState([])
  const [click, setClick] = useState(0)
  const [messageClick, setMessageClick] = useState(0)
  const [registerClick, setRegisterClick] = useState(0)
  const [checker, setChecker] = useState(token ? true : false)


  useEffect(() => {
    if(!token && !newMessage) return
    getUsers(token).then(res => setUsers(res.data)).catch( err=> {
      console.log(err);
    })
    getMessages(token).then(res => {setMessages(res.data[0]), setData(res.data[1])}).catch( err=> {  console.log(err); });
  })

  useEffect(() => {
    if(token) setChecker(true)
    else setChecker(false)
    if(token) return
    loginUser(username, password, repeat_password).then((res) => {
      setToken(res.data.token)
      localStorage.setItem('token', res.data.token)
    }).catch( err=> {
      console.log(err);
    })
  },[click, token])

  useEffect(() => {
    getUserId(token).then(res => setUserId(res.data.userId)).catch( err=> {
      console.log(err);
    })
  },[token])


  useEffect(() => {
    if(token) return
    registerUser(formData).then((res) =>{
      setToken(res.data.token)
      if(token) setChecker(true)
    }).catch( err=> {
      console.log(err);
    })
  },[registerClick])

  useEffect(() => {
    if(!newMessage) return
    postMessage(messageData, token).then((res) => {
    }).catch( err=> {
      console.log(err);
    })
  },[messageClick])



  const values = {
    username,
    password,
    repeat_password,
    contact,
    avatar,
    token,
    users,
    messages,
    data,
    userId,
    messages,
    click,
    registerClick,
    checker,
    formData,
    messageData,
    newMessage,
    messageClick,
    setClick,
    setMessageClick,
    setRegisterClick,
    setUsername,
    setPassword,
    setRepeat_password,
    setContact,
    setAvatar,
    setFormData,
    setMessageData,
    setNewMessage,
    setFileName
  }

  return (
    <>
      <div className="container-1">
        <cont.Provider value={{values}}>
          <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/" element={<PrivateRoute logged={checker}/>}>
                <Route path="/main" element={<Main/>}/>
              </Route>
            </Routes> 
          </BrowserRouter>
        </cont.Provider>
      </div>
    </>
  );
};

export default App;