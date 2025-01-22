import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/signUp/signUp";
import Home from "../Pages/Home/Home/Home";
import DashBoard from "../Layout/DashBoard";  
import PrivateRoutes from "./PrivateRoutes";
import MyTasks from "../DashBoard/Workers/Buyer/Mytasks/Mytasks";
import AddTask from "../DashBoard/Workers/Buyer/AddTask/AdTask";
import UpdateTask from "../DashBoard/Workers/Buyer/UpdateTask/UpdateTask";
import ManageUsers from "../DashBoard/Workers/Buyer/Admin/ManageUsers/ManageUsers";
import TaskList from "../DashBoard/Workers/TaskList/TaskList";
import TaskDetail from "../DashBoard/Workers/Buyer/TaskDetails/TaskDetail";
import AdminRoutes from "./AdminRoutes";
import MySubmissionTask from "../DashBoard/Workers/MySubmissionTask/MySubmissionTask";
 
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
       
    ]
  },
  {
    path:"dashboard",
    element: <PrivateRoutes><DashBoard></DashBoard></PrivateRoutes>,
    children:[
      //buyer
      {
        path:"addTask",
        element:<AddTask></AddTask>
      },
      {
        path:"myTasks",
        element:<MyTasks></MyTasks>
      },
      {
        path:"task-details/:id",
        element:<TaskDetail></TaskDetail>,
        loader:({params})=> fetch(`http://localhost:5000/tasks/${params.id}`)
      },
      {
        path:"updateTask/:id",
        element:<UpdateTask></UpdateTask>,
        loader:({params})=> fetch(`http://localhost:5000/tasks/${params.id}`)
      },
      //admin
      {
        path:"manageUsers",
        element:<AdminRoutes><ManageUsers></ManageUsers></AdminRoutes>
      },
      //worker
      {
        path:"taskList",
        element:<TaskList></TaskList>
      },
      {
        path:"mySubmissions",
        element:<MySubmissionTask></MySubmissionTask>
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
