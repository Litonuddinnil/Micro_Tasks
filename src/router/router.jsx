import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/signUp/signUp";
import Home from "../Pages/Home/Home/Home";
import DashBoard from "../Layout/DashBoard"; 
import AdTask from "../DashBoard/Workers/AddTask/AdTask";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      }
    ]
  },
  {
    path:"/dashboard",
    element: <DashBoard></DashBoard>,
    children:[
      {
        path:"addTask",
        element:<AdTask></AdTask>
      }
    ]
  },
  {
    path:"/login",
    element:<Login></Login>
  },
  {
    path:"/register",
    element:<SignUp></SignUp>
  }
]);

export default router;
