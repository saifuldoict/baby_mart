
import { api } from "@/lib/api"     // এপিআই. টিএস কে এই ফাইলে কানেক্ট করা হলো
import {create} from "zustand"
import { persist } from 'zustand/middleware'



type User = {
  _id: string
  name: string
  email: string
  avatar:string
  role: "admin" | "user" | "deliveryman"
}

type AuthStore ={
     user: User | null;    // উপরের User কে এখানে আনা হলো
     token: string | null;
     isAuthenticated: boolean;
     login: (Credential:{email:string; password:string})=>Promise<void>

     register:(userData:{
        name: string;
        email:string;
        password: string;
        role:string
     })=>Promise<void>

     logout: () => void;

     checkIsAdmin: ()=>boolean;

}

const useAuthStore = create<AuthStore>()(
  persist((set,get) => ({
      user: null,
      token:null,
      isAuthenticated: false,
      login: async(Credential)=>{},

      register:async(userData)=>{
        try {
          await api.post("/auth/register",userData) // এপিআই কানেন্ট করা হলো রেজিস্টারে প্যারামিটার হিসেবে userData সেট করা হলো 
          
        } catch (error) {
          console.error("Registration error", error)
        }
      },
      logout:()=>{},

      checkIsAdmin:()=>{},

    }),
    {
      name: "auth-storage",
    }
  )
)

export default useAuthStore