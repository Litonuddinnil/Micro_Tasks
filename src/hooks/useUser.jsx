
import { useQuery } from "@tanstack/react-query"; 
import useAuth from "./useAuth"; 
import useAxiosSecure from "./useAxiosSecure";
 
const useUser = () => {
    const axiosSecure = useAxiosSecure();
    const {user }= useAuth();
    const {data:  userData = [],isPending:loading,refetch} = useQuery({
        queryKey:['users',user?.email],
        queryFn: async ()=>{
        const res = await axiosSecure.get(`/users/${user.email}`); 
        return res.data;
        }
    })
    return [userData,loading,refetch];
};

export default useUser;