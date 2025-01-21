import { useQuery } from "@tanstack/react-query";  
import useAxiosSecure from "./useAxiosSecure";
 
const useBuyer = () => {
    const axiosSecure = useAxiosSecure(); 
    const {data: Tasks = [],isPending:loading,refetch} = useQuery({
        queryKey:['Task',],
        queryFn: async ()=>{
        const res = await axiosSecure.get(`/tasks`);
        return res.data;
        }
    })
    return [Tasks,loading,refetch];
};

export default  useBuyer;