
import App from "@/App";
import DashBoardPage from "@/pages/DashBoardPage";
import HomePage from "@/pages/HomePage.tsx";
import Login from "@/pages/Login";
import RegisterPage from "@/pages/RegisterPage";


import { createBrowserRouter } from "react-router";


const router = createBrowserRouter([
           {
             index: true,
            element:<HomePage/>
           },
           {
            path: "/login",
            element: <Login/>
           },
           {
            path: "/register",
            element: <RegisterPage/>
           },
           {
            path:"/",
            element: <App/>,
            children: [
                 {
                    path: "/dashboard",
                    element: <DashBoardPage/>
                }
            ]
           }
       
    
]);


export default router