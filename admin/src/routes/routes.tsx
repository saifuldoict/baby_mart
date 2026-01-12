
import App from "@/App";
import AccountPage from "@/pages/AccountPage";
import BannersPage from "@/pages/BannersPage";
import BrandsPage from "@/pages/BrandsPage";
import CategoriesPage from "@/pages/CategoriesPage";
import DashBoardPage from "@/pages/DashBoardPage";
import HomePage from "@/pages/HomePage.tsx";
import InvoicesPage from "@/pages/InvoicesPage";
import Login from "@/pages/Login";
import OrdersPage from "@/pages/OrdersPage";
import ProductsPage from "@/pages/ProductsPage";
import RegisterPage from "@/pages/RegisterPage";
import UsersPage from "@/pages/UsersPage";


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
                },
                {
                    path: "/dashboard/account",
                    element: <AccountPage/>
                },
                {
                    path: "/dashboard/user",
                    element: <UsersPage/>
                },
                {
                    path: "/dashboard/orders",
                    element: <OrdersPage/>
                },
                {
                    path: "/dashboard/account",
                    element: <AccountPage/>
                },
                 {
                    path: "/dashboard/invoices",
                    element: <InvoicesPage/>
                },
                {
                    path: "/dashboard/banners",
                    element: <BannersPage/>
                },
                {
                    path: "/dashboard/products",
                    element: <ProductsPage/>
                },
                {
                    path: "/dashboard/categories",
                    element: <CategoriesPage/>
                },
                {
                    path: "/dashboard/brands",
                    element: <BrandsPage/>
                },
            ]
           }
       
    
]);


export default router