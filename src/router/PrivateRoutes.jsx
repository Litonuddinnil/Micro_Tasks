import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types"; // Ensure PropTypes is imported
import useAuth from "../hooks/useAuth";
import Loading from "../Pages/Loading/Loading";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,  
};

export default PrivateRoutes;
