import { email } from 'zod';
import { email } from 'zod';

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
     user: User | null;
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

const useAuthStore = create<AuthStore>()(persist((set,get) => ({
      user: null;
      token:null;
    }),
    {
      name: "auth-storage",
    }
  )
)

export default useAuthStore