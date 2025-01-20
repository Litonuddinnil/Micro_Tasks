import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
 
const useUsers = () => {
    const axiosSecure = useAxiosSecure();
    const {user }= useAuth();
    const {data: users = [],isPending:loading,refetch} = useQuery({
        queryKey:['users',user?.email],
        queryFn: async ()=>{
        const res = await axiosSecure.get(`/users?email=${user.email}`);
        return res.data;
        }
    })
    return [users,loading,refetch];
};

export default useUsers;