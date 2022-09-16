import axios from "axios"


const URL = "https://custom--chat.herokuapp.com"

export const Api = {
  getUsers: (token)=>{
    return axios.get(`${URL}/users`, {
      headers: {token: token}
    })
  },
  getUserId: (token)=>{
    return axios.get(`${URL}/user`, {
      headers:{ token: token}
    })
  },
  getUser: (id)=>{
    return axios.get(`${URL}/users?userId=${id}`)
  },

  getMessages: (token)=>{
    return axios.get(`${URL}/messages`, {
      headers: {token: token}
    })
  },

  loginUser: (username, password)=>{
    return axios.post(`${URL}/login`, {
        username: username,
        password: password
    },
    )
  },

  registerUser: (formData)=>{
    return axios.post(`${URL}/register`, formData)
  },

  postMessage: (body, token)=>{
    return axios({
      url:`${URL}/messages`,
      method:"POST",
      data: body,
      headers:{
        token:token
      }
    })
  },


}