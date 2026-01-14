
import Sidebar from '@/components/ui/dashboard/Sidebar';
import { cn } from '@/lib/utils';


import {  Navigate, Outlet } from 'react-router'
import useAuthStore from './store/useAuthStore';
import Header from './pages/Header';
import { useState } from 'react';


function App() {
const [sidebarOpen, setSidebarOpen]= useState(false)
 const {isAuthenticated}= useAuthStore();
    if(!isAuthenticated){
        return <Navigate to={"/login"}/>
    }
  return (

      <div className='h-screen flex bg-background'>
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}/>
        <div className={cn("flex flex-col flex-1 max-w-[--breakpoint-2xl] hoverEffect", sidebarOpen?"ml-64":"ml-20")}>

          <Header/>
          <main>
            <Outlet/>
          </main>
        </div>
    </div>

  )
}

export default App
