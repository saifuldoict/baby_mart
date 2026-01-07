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

const RegisterPage = () => {
  const form = useForm({
    defaultValues: {
      email: "",
    },
  })
  const [loading, setLoading]= useState(false)
  const navigate = useNavigate();
  const onSubmit =()=>{
    
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
                Create an Account
              </CardTitle>
              <CardDescription className="text-gray-500">
                Enter your details to sign up
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent >
            <Form   {...form}>
               <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                 <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-sm font-medium text-gray-700">Name</FormLabel>
                            <FormControl>
                              <Input className=""
                                type="email"
                                placeholder="Enter your email"
                                disabled={loading}
                                {...field}/>
                            </FormControl>
                        <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                            <FormControl>
                              <Input className=""
                                type="email"
                                placeholder="Enter your email"
                                disabled={loading}
                                {...field}/>
                            </FormControl>
                            <FormLabel className="text-sm font-medium text-gray-700">Password</FormLabel>
                            <FormControl>
                              <Input className=""
                                type="password"
                                placeholder="Enter your password"
                                disabled={loading}
                                {...field}/>
                            </FormControl>
                      
                        <FormMessage className="text-red-500 text-sm"/>
             </FormItem>
            )}
          />
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 hoverEffect">
            <LogIn/> Sign Up
          </Button>
               </form>
            </Form>
          </CardContent>
          <CardFooter className="justify-center ">
            <p className="text-sm text-gray-500 ">Already have an account <span className="text-red-500 pl-8 hover:text-indigo-500 hover:underline"><Link to={'/login'}>Sign In</Link></span> </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
  
}

export default RegisterPage