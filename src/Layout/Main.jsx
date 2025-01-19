import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import { Helmet } from "react-helmet";

const Main = () => {
  return (
    <div>
      <Helmet>
        <title>Micro Tasking Platform | Home</title>
      </Helmet>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
