import PropTypes from "prop-types"; 
import { Navigate, useLocation } from 'react-router-dom';  
import Loading from "../Pages/Loading/Loading";
import useVerifyBuyer from "../hooks/useVerifyBuyer";
import useAuth from "../hooks/useAuth";
const BuyerRoutes = ({children}) => {
    const {user,loading} = useAuth();
    const [isBuyer,isBuyerPending] = useVerifyBuyer();
    const location = useLocation();
    if(loading || isBuyerPending){
       return <Loading></Loading>
    }
    if(user && isBuyer){
       return children;
    }
   
       return <Navigate to={"/login"} state={{form:location}} replace></Navigate>
   }; 
   BuyerRoutes.propTypes = {
    children: PropTypes.node.isRequired, 
};

export default BuyerRoutes;
