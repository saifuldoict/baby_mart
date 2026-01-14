import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAxiosPrivate } from '@/hooks/useAxiosPrivate'
import useAuthStore from '@/store/useAuthStore';
import { Badge, Plus, RefreshCcw, Users2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import {UserType} from "../../type"
import { cn } from '@/lib/utils';

const UsersPage = () => {
  const [users, setUsers]=useState<UserType>([])
  const [loading, setLoading]= useState(true);
  const axiosPrivate = useAxiosPrivate();
  const {checkIsAdmin}= useAuthStore();
  const isAdmin = checkIsAdmin();

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
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='test-xl md:text-3xl font-bold text-gray-900'>Users Management</h1>
          <p className='text-gray-600 mt-0.5'>All Users view and edit</p>
        </div>
        <div className='flex items-center gap-4'>
            <div className=' text-purple-600 flex items-center gap-1'>
              <Users2 className='w-8 h-8 '/>
              <p className='text-2xl font-black'>{users?.length}</p>
            </div >
            <Button>
              <RefreshCcw/>
                Refresh
            </Button>
            {isAdmin && (
              <Button>
              <Plus/>
                Add User
            </Button>
            )}
        </div>
      </div>
      {/* Filters  */}
       {/* Users Table  */}
        <div className='bg-white rounded-lg shadow-sm '>
           <Table>
              <TableHeader>
                 <TableHead>
                    <TableHead className='font-semibold'>Avater</TableHead>
                     <TableHead className='font-semibold'>Name</TableHead>
                      <TableHead className='font-semibold'>Email</TableHead>
                      <TableHead className='font-semibold'>Role</TableHead>
                      <TableHead className='font-semibold'>Created At</TableHead>
                        <TableHead className='font-semibold'>Action</TableHead>
                </TableHead>
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
                              <span className={cn("capitalize", getRoleColor(user.role))}>
                                {user.role}
                              </span>
                        </TableCell>
                        <TableCell className='text-gray-600'>
                              <div>
                                {new Date(user.createdAt).toLocaleDateString()}
                              </div>
                        </TableCell>
                    </TableRow>
                  ))):(<div>No Users</div>)}
              </TableBody>
           </Table>
        </div>
    </div>
  )
}

export default UsersPage