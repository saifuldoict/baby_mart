import { cn } from '@/lib/utils'
import {AnimatePresence, motion, scale} from "motion/react"
import { Button } from '../button';
import { Bookmark,  ChevronLeft, ChevronRight, FileTextIcon,  Layers2Icon, LayoutDashboard, LogOut, Package, ShoppingBagIcon, TagIcon, User, Users } from 'lucide-react';
import useAuthStore from '@/store/useAuthStore';
import { NavLink, useLocation } from 'react-router';



interface Props{
  open:boolean;
  setOpen:(open:boolean)=>void
}

interface NavItemProps{
  to: string;
  icon: React.ReactNode;
  label?: string;
  open: boolean;
  end?: boolean
  pathname: string
}

const navigateItems=[
  {
    to:"/dashboard",
    icon: <LayoutDashboard size={22}/>,
    label:"Dashboard",
    end:true,
  },
  {
    to:"/dashboard/account",
    icon: <User size={22}/>,
    label:"Account",
  },
  {
    to:"/dashboard/user",
    icon: <Users size={22}/>,
    label:"Users",
  },
  {
    to:"/dashboard/orders",
    icon: <Package size={22}/>,
    label:"Orders",
  },
  {
    to:"/dashboard/invoices",
    icon: <FileTextIcon size={22}/>,
    label:"Invoices",
  },
  {
    to:"/dashboard/banners",
    icon: <Layers2Icon size={22}/>,
    label:"Banners",
  },
  {
    to:"/dashboard/products",
    icon: <ShoppingBagIcon size={22}/>,
    label:"Products",
  },
  {
    to:"/dashboard/categories",
    icon: <TagIcon size={22}/>,
    label:"Categories",
  },
  {
    to:"/dashboard/brands",
    icon: <Bookmark size={22}/>,
    label:"Brands",
  },
]



const Sidebar = ({open, setOpen}:Props) => {
 const {user, logout} = useAuthStore();
 const {pathname} = useLocation();

  return (
    <motion.aside 
  className={cn("fixed inset-y-0 left-0 z-20 flex flex-col border-r border-r-slate-800/50 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl hoverEffect text-white", open?"w-64": "w-20")}
  initial={{width:open?256:80}}
  animate={{width:open?256:80}}
  transition={{duration:0.3, ease: "easeInOut"}}
  >
       <div className="flex items-center justify-between p-4 h-13 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
  
  {/* Title (hide when closed) */}
  <motion.span
    initial={false}
    animate={{ opacity: open ? 1 : 0, width: open ? "auto" : 0 }}
    transition={{ duration: 0.2 }}
    className="font-bold text-xl text-white drop-shadow-lg overflow-hidden whitespace-nowrap"
  >
    Kids Zone Admin
  </motion.span>

  {/* Toggle Button (ALWAYS visible) */}
  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
    <Button
      onClick={() => setOpen(!open)}
      variant="ghost"
      size="icon"
      className="rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white border-white/20 backdrop-blur-sm"
    >
      <motion.div
        animate={{ rotate: open ? 0 : 180 }} // div যখন close হবে তখন আইকন রোটেড হবে
        transition={{ duration: 0.3 }}
      >
        {open ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </motion.div>
    </Button>
  </motion.div>
</div>
    <div className='flex flex-col gap-1 flex-1 p-3'>

    {/* route show here*/}
   {
      navigateItems?.map((item, index)=>(
        <NavItem key={index}
          {...item}
          open={open}
          end={item.end}
          pathname={pathname}
          />
        ))
   }
    </div>

      <div className='p-4 mb-2 border-t border-slate-600/50 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800'>
         <motion.div 
            //  initial={{opacity: 0, y:10}}
            //  animate={{opacity:1, y: 0}}
            //  transition={{duration:0.3, delay:0.2}}
            className={cn("flex items-center gap-3 mb-3", open? "justify-start":"justify-center" )}
             >
             
            <div className='h-10 w-10 rounded-full bg-gradient-to-br from-[#29beb3] to-[#a96bde] flex items-center justify-center text-white font-semibold overflow-x-hidden shadow-lg ring-2 ring-white/20'>
                {user?.avatar? <img src={user?.avatar} alt='userImage'/>:user?.name?.charAt(0).toUpperCase()}
           </div>
           <AnimatePresence>
             {
              open && (
                <motion.div
                 initial={{opacity: 0, x:-10}}
                  animate={{opacity:1, x: 0}}
                  exit={{opacity: 0,x:-10}}
                  transition={{duration:0.3}}
                >
                  <p className='text-sm w-30 font-medium truncate'>{user?.name}</p>
                  <p className='text-xs text-muted-foreground capitalize'>{user?.role}</p>
                </motion.div>
              )
             }
           </AnimatePresence>
         </motion.div>

         <motion.div 
         whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
           <Button variant={"outline"} size={open? "default": "icon"} // when close text hidden 
           onClick={logout}
           className='w-full border-red-500/50 hover:bg-red-600/20 hover:border-red-400/50 text-red-400 transition-colors bg-red-600/10 backdrop-blur-sm'
           >
            <LogOut size={1} className={cn("mr-2", !open && "mr-0")}/>
            {open && "Logout"}
           </Button>
         </motion.div>
      </div>
</motion.aside>
  )
  
}

const NavItem =({to,icon,label,open,end,pathname}: NavItemProps)=>{
  return <NavLink 
  to={to}
  end={end}
  className={cn(
    "flex items-center p-3 rounded-full text-sm font-medium gap-3 overflow-hidden",
    "text-white/80 hover:text-white hover:bg-white/10 focus:bg-white/20 focus:outline-none",
    "transition-all duration-200 ease-in-out",
    "shadow-sm hover:shadow-md",
    "truncate no-underline", pathname===to?"bg-gradient-to-r from-[#29beb3]/20 to-[#a96bde]/20 text-white shadow-lg shadow-[#29beb3]/20 scale-105 ring-1 ring-[#29beb3]/30 border border-white/10 backdrop-blur-sm":"text-slate-300 hover:scale-102 justify-center"
  )}
>
  <span>{icon}</span>
  {open && label}
</NavLink>

}


export default Sidebar