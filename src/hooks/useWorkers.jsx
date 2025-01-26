import { useQuery } from "@tanstack/react-query";   
import useAxiosSecure from "./useAxiosSecure";
 
const useWorkers = () => {
    const axiosSecure = useAxiosSecure(); 
    const {data: workers = [],isPending:loading, refetch} = useQuery({
        queryKey:['Task',],
        queryFn: async ()=>{
        const res = await axiosSecure.get(`/workers`);
        // console.log(res.data);
        return res.data;
        }
    })
    return [workers,loading,refetch];
};

export default  useWorkers;