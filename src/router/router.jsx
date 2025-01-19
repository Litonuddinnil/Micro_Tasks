import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/signUp/signUp";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>
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
