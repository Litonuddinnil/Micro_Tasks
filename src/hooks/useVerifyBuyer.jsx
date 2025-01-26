import { useQuery } from '@tanstack/react-query';  
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
const useVerifyBuyer = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
  const {data: isBuyer,isPending: isBuyerPending} = useQuery({
    queryKey:[user?.email,' isBuyer'],
    queryFn: async ()=>{
        const res = await axiosSecure.get(`/users/buyer/${user.email}`);
        // console.log(res.data);
        return res.data?.buyer;
        }
  })
  return [ isBuyer, isBuyerPending];
};

export default useVerifyBuyer;