import api from "./axios";

export const getEmployee =async()=>{

    return await api.get("/employees/getAllEmployee");

}

export const getEmployeeById =async(id)=>{

    return await api.get(`/employees/getEmployee/${id}`);

}

export const createEmployee=async(formData)=>{

     return await api.post("/employees",formData)
}