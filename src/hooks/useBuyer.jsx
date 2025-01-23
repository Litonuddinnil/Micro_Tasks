import { useQuery } from "@tanstack/react-query";  
import useAxiosSecure from "./useAxiosSecure";
 
const useBuyer = () => {
    const axiosSecure = useAxiosSecure(); 
    const {data: Tasks = [],isPending:loading,refetch:refetchTasks} = useQuery({
        queryKey:['Task',],
        queryFn: async ()=>{
        const res = await axiosSecure.get(`/tasks`);
        return res.data;
        }
    })
    return [Tasks,loading,refetchTasks];
};

export default  useBuyer;