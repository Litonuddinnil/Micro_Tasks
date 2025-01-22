import PropTypes from "prop-types"; 
import { Navigate, useLocation } from 'react-router-dom'; 
import useAuth from '../hooks/useAuth'; 
import Loading from '../Pages/Loading/Loading';
import useAdmin from '../hooks/useAdmin';
const AdminRoutes = ({children}) => {
    const {user,loading} = useAuth();
    const [isAdmin,isAdminPending] = useAdmin();
    const location = useLocation();
    if(loading || isAdminPending){
       return <Loading></Loading>
    }
    if(user && isAdmin){
       return children;
    }
   
       return <Navigate to={"/login"} state={{form:location}} replace></Navigate>
   }; 
   AdminRoutes.propTypes = {
    children: PropTypes.node.isRequired, 
};

export default AdminRoutes;
