
import Sidebar from '@/components/ui/dashboard/Sidebar';
import { cn } from '@/lib/utils';


import {  Navigate, Outlet } from 'react-router'


function App() {

 const isAuthenticated = true;
    if(!isAuthenticated){
        return <Navigate to={"/login"}/>
    }
  return (

      <div className='h-screen flex '>
        <Sidebar/>
        <div className={cn("flex flex-col flex-1 max-w-[--breakpoint-2xl] hoverEffect ml-64")}>


          <main>
            <Outlet/>
          </main>
        </div>
    </div>

  )
}

export default App
