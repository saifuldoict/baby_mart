import { cn } from '@/lib/utils'
import {motion} from "motion/react"
import { Button } from '../button';
import { ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react';
import useAuthStore from '@/store/useAuthStore';

interface Props{
  open:boolean;
  setOpen:(open:boolean)=>void
}
const Sidebar = ({open, setOpen}:Props) => {
 const {user, logout} = useAuthStore();
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
        animate={{ rotate: open ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {open ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </motion.div>
    </Button>
  </motion.div>
</div>

          </motion.aside>
  )
  
}

export default Sidebar