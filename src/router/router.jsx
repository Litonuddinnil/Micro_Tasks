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
import ManageTasks from "../DashBoard/Workers/Buyer/Admin/ManageTasks/ManageTasks";
import PurchaseCoins from "../DashBoard/Workers/Buyer/PurchaseCoins/PurchaseCoins";
import Payment from "../DashBoard/Payment/Payment";
import BuyerHome from "../DashBoard/Workers/Buyer/BuyerHome/BuyerHome";
import PaymentHistory from "../DashBoard/Workers/Buyer/PaymentHistory/PaymentHistory"; 
import WorkersHome from "../DashBoard/Workers/WorkersHome/WokersHome";
import WithDrawals from "../DashBoard/Workers/WithDrawals/WithDrawals";
import AdminHome from "../DashBoard/Workers/Buyer/Admin/AdminHome/AdminHome";
import BuyerRoutes from "./BuyerRoutes";
import WorkerRoutes from "./WorkerRoutes";
import Loading from "../Pages/Loading/Loading";
import Profile from "../Pages/Profile/Profile";
import Contact from "../Pages/Contact/Contact";
 
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path:"/profile",
        element:<Profile></Profile>
      }
       
    ]
  },
  {
    path:"dashboard",
    element: <PrivateRoutes><DashBoard></DashBoard></PrivateRoutes>,
    children:[
      //buyer
      {
          path:"buyerHome",
          element:<BuyerRoutes><BuyerHome></BuyerHome></BuyerRoutes>
      },
      {
        path:"addTask",
        element:<BuyerRoutes><AddTask></AddTask></BuyerRoutes>
      },
      {
        path:"myTasks",
        element:<BuyerRoutes><MyTasks></MyTasks></BuyerRoutes>
      },
      {
        path:"task-details/:id",
        element: <TaskDetail></TaskDetail>,
        loader:({params})=> fetch(` https://carrier-point-server-site.vercel.app/tasks/${params.id}`)
      }, 
      {
        path:"updateTask/:id",
        element:<BuyerRoutes><UpdateTask></UpdateTask></BuyerRoutes>,
        loader:({params})=> fetch(` https://carrier-point-server-site.vercel.app/tasks/${params.id}`)
      },
      {
        path:"purchaseCoin",
        element:<PurchaseCoins></PurchaseCoins> 
      },
      {
         path:"paymentHistory",
         element:<PaymentHistory></PaymentHistory>
      },
      {
         path:"payment/:id",
         element:<Payment></Payment>,
         loader:({params})=>fetch(` https://carrier-point-server-site.vercel.app/purchaseCoin/${params.id}`)
      },
      //admin
      {
        path:"adminHome",
        element: <AdminRoutes><AdminHome></AdminHome> </AdminRoutes>
      },
      {
        path:"manageUsers",
        element:<AdminRoutes><ManageUsers></ManageUsers></AdminRoutes>
      },
      {
        path:"manageTasks",
        element:<ManageTasks></ManageTasks>
      },
      //worker
      {
        path:"workerHome",
        element:<WorkerRoutes><WorkersHome></WorkersHome></WorkerRoutes>
      },
      {
        path:"taskList",
        element:<TaskList></TaskList> 
      },
      {
        path:"mySubmissions",
        element: <MySubmissionTask></MySubmissionTask> 
      },
      {
        path:"withdrawals",
        element: <WorkerRoutes><WithDrawals></WithDrawals> </WorkerRoutes>
      },
      {
        path:"contact",
        element:<Contact></Contact>
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
  },
  {
    path:"*",
    element:<Loading></Loading>
  }
]);

export default router;
