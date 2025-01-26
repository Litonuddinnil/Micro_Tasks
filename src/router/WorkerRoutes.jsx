import PropTypes from "prop-types"; 
import { Navigate, useLocation } from 'react-router-dom';   
import useAuth from "../hooks/useAuth";
import useWorker from "../hooks/useWorker";
import Loading from "../Pages/Loading/Loading";
 
const WorkerRoutes = ({children}) => {
    const {user,loading} = useAuth();
    const [isWorker,isWorkerPending] = useWorker();
    const location = useLocation();
    if(loading || isWorkerPending){
       return <Loading></Loading>
    }
    if(user && isWorker){
       return children;
    }
   
       return <Navigate to={"/login"} state={{form:location}} replace></Navigate>
   }; 
   WorkerRoutes.propTypes = {
    children: PropTypes.node.isRequired, 
};

export default WorkerRoutes;
