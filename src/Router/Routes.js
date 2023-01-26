import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import CheckOut from "../Pages/CheckOut/CheckOut";
import AdminList from "../Pages/Dashboard/AdminList";
import AllUsers from "../Pages/Dashboard/AllUsers";
import Customers from "../Pages/Dashboard/Customers";
import ProductList from "../Pages/Dashboard/ProductList";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/Login/SignUp";
import Orders from "../Pages/Orders/Orders";
import PrivateRoute from "./PrivateRoute";


const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children:[
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/signup',
          element: <SignUp></SignUp>
        },
        {
          path: '/checkout/:id',
          element: <PrivateRoute><CheckOut></CheckOut></PrivateRoute>,
          loader: ({params}) => fetch(`https://car-service-hub-server.vercel.app/services/${params.id}`)
        },
        {
          path: '/orders',
          element: <PrivateRoute><Orders></Orders></PrivateRoute>
        }
      ]
    },
    {
      path: '/dashboard',
      element: <DashboardLayout></DashboardLayout>,
      children: [
        {
          path: 'orders',
          element: <Orders></Orders>
        },
        {
          path: '/dashboard/allusers',
          element: <AllUsers></AllUsers>
        },
        {
          path: '/dashboard/customerlist',
          element: <Customers></Customers>
        },
        {
          path: '/dashboard/adminlist',
          element: <AdminList></AdminList>
        },
        {
          path: '/dashboard/productlist',
          element: <ProductList></ProductList>
        }
  
      ]
    }
  ])

  export default router;