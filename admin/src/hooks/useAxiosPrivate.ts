import adminApi from "@/lib/config";
import useAuthStore from "@/store/useAuthStore"
import { useEffect } from "react";

export const useAxiosPrivate =()=>{
    const {logout}= useAuthStore();

    useEffect(()=>{
        // the auth interceptor is already configured in the adminApi instance
        // we just need to handle the logout on 401 errors if needed
        const responseIntercept = adminApi.interceptors.request.use((response)=> response,(error)=>{
                if(error?.response?.status===401){
                    logout();
                    // redirect ot login
                    window.location.href="/login"
                }
                return Promise.reject(error)
            })
            return()=>{
            adminApi.interceptors.response.eject(responseIntercept) 
            }
    },[logout])
    return adminApi;
}
