import { createBrowserRouter, Navigate } from "react-router";
import LayoutShop from "./shop/layout/LayoutShop";
import Home from "./shop/pages/Home/Home";
import GenderPage from "./shop/pages/Gender/GenderPage";
import ProductPage from "./shop/pages/Product/ProductPage";

import LoginPage from "./auth/Pages/Login/LoginPage";
import Register from "./auth/Pages/Register/Register";

import DashBoardPage from "./admin/Pages/DashBoard/DashBoardPage";
import AdminProductPage from "./admin/Pages/Product/AdminProductPage";
import AdminProductsPage from "./admin/Pages/Products/AdminProductsPage";
import { lazy } from "react";
import { AdminRoute, NotAutenticatedRoute } from "./components/routes/protectedRoutes";

const LazyAuthLayout = lazy(()=> import('./auth/Layout/LayoutAuth'))
const LazyAdminLayout = lazy(()=> import('./admin/Layout/LayoutAdmin'))

export const router = createBrowserRouter([
    {
        path:'/',
        element: <LayoutShop/>,
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:'gender/:gender',
                element:<GenderPage/>
            },
            {
                path:'product/:idSlug',
                element:<ProductPage/>
            }
        ]
    },
    {
        path:'/auth',
        element: (
          <NotAutenticatedRoute>
            <LazyAuthLayout/>
          </NotAutenticatedRoute>
          ),
        children:[
            {
                index:true,
                element: <Navigate to={'/auth/login'}/>
            },
            {
                path:'register',
                element:<Register/>
            },
            {
                path:'login',
                element:<LoginPage/>
            }
        ]
    },
    {
        path:'/admin',
        element: (
            <AdminRoute>
                <LazyAdminLayout/>
            </AdminRoute>
        ),
        children:[
            {
                index:true,
                element:<DashBoardPage/>
            },
            {
                path:'products',
                element:<AdminProductsPage/>
            },
            {
                path:'products/:id',
                element:<AdminProductPage/>
            }
        ]
    },
    {
        path:'*',
        element:<Navigate to='/'/>
    }
])