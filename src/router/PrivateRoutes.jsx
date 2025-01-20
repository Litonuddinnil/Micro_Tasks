  
import { Navigate, useLocation } from 'react-router-dom'; 
import useAuth from '../hooks/useAuth'; 
import Loading from '../Pages/Loading/Loading';
const PrivateRoutes = ({children}) => {
 const {user,loading} =  useAuth();
 const location = useLocation();
 if(loading){
    return <Loading></Loading>
 }
 if(user){
    return children;
 }

    return <Navigate to={"/login"} state={{form:location}} replace></Navigate>
};

export default PrivateRoutes;