import HomeLayout from "@/layout/HomeLayout";
import HomePage from "@/pages/HomePage";
import { createBrowserRouter } from "react-router";


const router = createBrowserRouter([
    {
        path: "/",
        element:<HomeLayout/>,
        children:[
           {
             index: true,
            element:<HomePage/>
           }

        ]
    }
]);


export default router