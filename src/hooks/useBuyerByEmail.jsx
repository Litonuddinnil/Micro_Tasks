import { useQuery } from "@tanstack/react-query"; 
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useBuyerByEmail = () => { 
  const { user } = useAuth(); 
  const { data: taskData = [],  refetch } = useQuery({
    queryKey: ['tasks', user?.email],
    queryFn: async () => { 
      const res = await  useAxiosPublic.get(`/tasks/${user.email}`);
      console.log(res);
      return res.data;
    }, 
  }); 
  return [taskData, refetch];
};

export default useBuyerByEmail;
