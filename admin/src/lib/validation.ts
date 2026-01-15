import { errorMap } from 'node_modules/zod/v3/locales/en.d.cts';



import { z} from "zod"

export const loginSchema = z.object({
    email: z.string().email({message: "Please enter your valid email address"}),
    password: z.string().min(6,{message: "Password must be at least 6 characters"}),
})

export const registerSchema = z.object({
  name: z.string().min(2,{message:"Name must be at lease 2 character"}),
  email: z.string().email({message: "Please enter your valid email address"}),
  password: z.string().min(6,{message: "Password must be at least 6 characters"}),
  role: z.enum(["admin", "user", "deliveryman"], {
   message:"Please select a valid role"
  }),
})


export const userSchema = z.object({
  name: z.string().min(2, {message: "Name must be at least 2 characters"}),
  email: z.string().email({message: "Please enter a valid email address"}),
  password: z.string().min(6,{message: "Password must be at least 6 character"}).optional(),
   role: z.enum(["admin", "user", "deliveryman"], {
    errorMap:()=>({message:"Please select a valid role"})
 
  }),
  avater: z.string().optional(),
});