import { useQuery } from '@tanstack/react-query'; 
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
 
const useWorker = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
  const {data:isWorker,isPending:isWorkerPending} = useQuery({
    queryKey:[user?.email,'isWorker'],
    queryFn: async ()=>{
        const res = await axiosSecure.get(`/users/worker/${user.email}`);
        // console.log(res.data);
        return res.data?.worker;
        }
  })
  return [isWorker,isWorkerPending];
};

export default useWorker;