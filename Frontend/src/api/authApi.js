import axios from "axios";


export const registerUser=async(userData)=>{
     
    return axios.post(`/api/auth/register`,userData);
}

export const loginUser=async(userData)=>{     
    return axios.post(`/api/auth/login`,userData);
}