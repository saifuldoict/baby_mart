import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  
} from "@/components/ui/card"
import { Form, FormField, FormItem, FormLabel,FormControl, FormMessage, } from "@/components/ui/form"

import { motion } from "motion/react"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import {LogIn} from "lucide-react"
import {z} from "zod"
import {  loginSchema } from "@/lib/validation"
import { zodResolver } from '@hookform/resolvers/zod';

type FormData =z.infer<typeof loginSchema>

const Login = () => {
  const form = useForm<FormData>({
    resolver:zodResolver(loginSchema),
    defaultValues:{
      email: "",
      password: ""
    },
  })
  
  const [loading, setLoading]= useState(false)
  const navigate = useNavigate();
  
  const onSubmit = async(data:FormData)=>{
    console.log(data)
  }
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <motion.div
        className="w-full max-w-md px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeIn"}}
      >
        <Card className="w-full bg-white/95 backdrop-blur-sm shadow-xl border border-gray-200">
          <CardHeader className="text-center space-y-2">
            <motion.div
             initial={{scale: 0.8}}
             animate={{scale:1}}
             transition={{duration:0.3}}
            >
              <CardTitle className="text-3xl font-bold text-gray-800">
                Admin Dashboard
              </CardTitle>
              <CardDescription className="text-gray-500">
                Enter your credentials to sign in
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

      {/* Email */}
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="Enter your email"
                disabled={loading}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Password */}
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Enter your password"
                disabled={loading}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700"
      >
        <LogIn className="mr-2 h-4 w-4" />
        Sign In
      </Button>

    </form>
  </Form>
</CardContent>

          <CardFooter className="justify-center ">
            <p className="text-sm text-gray-500 ">Don't have an account <span className="text-red-500 pl-8 hover:text-indigo-500 hover:underline"><Link to={'/register'}>Sign Up</Link></span> </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

export default Login
