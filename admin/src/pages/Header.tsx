import { Button } from '@/components/ui/button';
import useAuthStore from '@/store/useAuthStore'
import { Bell } from 'lucide-react';
import React from 'react'

const Header = () => {
    const {user}= useAuthStore();
  return (
    <header className='sticky top-0 z-10 flex items-center h-16 bg-background border-b border-border px-4'>
        <div className='flex items-center gap-4 ml-auto'> 
            <Button variant={"ghost"} size={"icon"} className='rounded-full border border-border hover:bg-red-100' >
                <Bell size = {18}/>
            </Button>
            <div>
                <div className='hidden md:block'>
                    <p className='text-sm font-medium'>{user?.name}</p>
                    <p className='text-xs text-muted-foreground capitalize'>{user?.role}</p>
                </div>
            </div>
            <div className='w-10 rounded-full bg-primary/10 flex justify-center text-primary font-semibold overflow-hidden border border-border'>
                {user?.avatar? <img src={user?.avatar} alt='image'/>: user?.name.charAt(0).toUpperCase()}
            </div>
        </div>
    </header>
  )
}

export default Header