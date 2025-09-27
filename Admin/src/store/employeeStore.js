import {create} from "zustand";

export const useEmployeeStore=create((set)=>({

       employees:[],
       setEmployees:(employees)=>set({employees}),
}));

export const useLeaveStore=create((set)=>(
    {

        leaveBalance:[],
        setLeaveBalance:(leaveBalance)=>set({leaveBalance}),

    }
));