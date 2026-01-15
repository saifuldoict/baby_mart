import { Button} from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAxiosPrivate } from '@/hooks/useAxiosPrivate'
import useAuthStore from '@/store/useAuthStore';
import { Edit, Eye, Plus, RefreshCcw, Trash, Users2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import {UserType} from "../../type"
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { motion } from "motion/react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import z from 'zod';
import { userSchema } from '@/lib/validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type FormData = z.infer<typeof userSchema> //userSchema কে লিংক করা হলো

const UsersPage = () => {
  const [users, setUsers]=useState<UserType[]>([]);
  const [loading, setLoading]= useState(true);

  const [refresh, setRefreshing] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen]= useState(false);
  const [issAddModalOpen, setIsAddModalOpen]= useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen]= useState(false);
  const [isViewModalOpen, setIsViewModlOpen]= useState(false);
  const [selectedUser, setSelectedUser]= useState<UserType |null>(null);
  
  const [formLoading, setFormLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(1);
  const [perPage] = useState(20);
  const [totalPage, setTotalPage] = useState(1);


  const axiosPrivate = useAxiosPrivate();
  const {checkIsAdmin}= useAuthStore();
  const isAdmin = checkIsAdmin();

// form এর সাথে FormData কানেক্ট করা হলো
 const formAdd=useForm<FormData>({
  resolver:zodResolver(userSchema),
  defaultValues:{
    name:"",
    email:"",
    password:"",
    role:"user",
    avater:"",
  }
 })

  const fetchUsers =async()=>{
    setLoading(true);
    try {
      const response = await axiosPrivate.get("/users")
      setUsers(response?.data)
    } catch (error) {
      console.log("Failed to loas users", error)
    } finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    fetchUsers()
  },[])
  const getRoleColor = (role:string)=>{
    switch(role){
      case "admin":
        return "bg-red-100 text-red-800";
        case "user":
        return "bg-green-100 text-green-800";
        case "deliveryman":
        return "bg-blue-100 text-blue-800";
        default:
        return "bg-red-100 text-red-800"
    }
  }
  return (
    <div className='p-6 space-y-6'>
      <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className='flex items-center justify-between'>
        <div>
          <h1 className='test-xl md:text-3xl font-bold text-gray-900'>Users Management</h1>
          <p className='text-gray-600 mt-0.5'>All Users view and edit</p>
        </div>
        <div className='flex items-center gap-4'>
            <div className=' text-purple-600 flex items-center gap-1'>
              <Users2 className='w-8 h-8 '/>
              <p className='text-2xl font-black'>{users?.length}</p>
            </div >
            <Button 
             variant="outline"
            //onClick={handleRefresh}
            //disabled={refreshing}
            className="border-blue-600 text-blue-600 hover:bg-blue-50">
              <RefreshCcw
             
              />
                 refreshing 
            </Button>
           {isAdmin && (
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-purple-600 hover:bg-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          )}
        </div>
      </motion.div>
      {/* Filters  */}
       {/* Users Table  */}
        <div className='bg-white rounded-lg shadow-sm '>
           <Table>
              <TableHeader>
                 <TableRow>
                    <TableHead className='font-semibold'>Avater</TableHead>
                     <TableHead className='font-semibold'>Name</TableHead>
                      <TableHead className='font-semibold'>Email</TableHead>
                      <TableHead className='font-semibold'>Role</TableHead>
                      <TableHead className='font-semibold'>Created At</TableHead>
                        <TableHead className='font-semibold'>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  {users?.length>0?(users?.map((user)=>(
                    <TableRow key={user?._id}>
                        <TableCell>
                              <div className='h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold shadow-sm overflow-hidden'>
                                  {user?.avatar? (<img src={user?.avatar} alt='userImage' className='w-full h-full object-cover'/>):(<span className='text-lg font-black'>{user?.name?.charAt(0).toUpperCase()}</span>)}
                              </div>
                        </TableCell>
                         <TableCell className='text-gray-600'>
                              <div>{user?.name}</div>
                        </TableCell>
                        <TableCell className='text-gray-600'>
                              <div>{user?.email}</div>
                        </TableCell>
                        <TableCell className='text-gray-600'>
                             
                              <Badge className={cn("capitalize", getRoleColor(user.role))}>
                                {user.role}
                              </Badge>
                        </TableCell>
                        <TableCell className='text-gray-600'>
                              <div>
                                {new Date(user.createdAt).toLocaleDateString()}
                              </div>
                        </TableCell>
                        <TableCell>
                            <div className='flex items-center gap-2'>
                               <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    title="View user details" className='border border-border'>
                                  <Eye/>
                               </Button>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    title="Edit user" className='border border-border'>
                                      <Edit/>
                               </Button>
                               <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    title="Delete user" className='border border-border'>
                                  <Trash/>
                               </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                  ))):(<div>No Users</div>)}
              </TableBody>
           </Table>
        </div>
        {/* Add User Modal */}
        <Dialog open={issAddModalOpen} onOpenChange={setIsAddModalOpen}>
                  <DialogContent className='sm:max-w-[550px] max-h-[90vh] overflow-auto'>
                     <DialogHeader>
                        <DialogTitle>Add User</DialogTitle>
                        <DialogDescription>Create a new user account</DialogDescription>
                     </DialogHeader>
                     <Form {...formAdd}>
                         <form className='mt-4 space-y-6'>
                             <FormField control={formAdd.control} name="name" render={({field})=>(<FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <input type='text'{...field} disabled={formLoading} className='focus:border-indigo-500 hoverEffect' placeholder='Enter your name here'/>
                                </FormControl>
                             </FormItem>)}/>
                         </form>
                     </Form>
                  </DialogContent>
        </Dialog>
    </div>
  )
}

export default UsersPage