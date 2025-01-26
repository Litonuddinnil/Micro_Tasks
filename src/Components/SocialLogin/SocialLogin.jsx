 
import { FcGoogle } from 'react-icons/fc';
  
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
 

const SocialLogin = () => {
    const axiosPublic  = useAxiosPublic();
    const {googleLogIn} = useAuth();
    const navigate = useNavigate();
    const coinAmount = 10;
    const roleWorker = "Worker";
    const handlerGoogleLogin = () =>{
        googleLogIn()
        .then(res =>{
            // console.log(res.user);
            const userInfo = {
                email: res.user?.email,
                name:res.user?.displayName,
                photoURL:res.user?.photoURL,
                coins:coinAmount,
                role:roleWorker,
            }
            axiosPublic.post('/users',userInfo)
            .then(res =>{
                 console.log(res.data);
                 navigate('/');
            })
        })
    }
    return (
        <div className='flex items-center justify-center  flex-col'>
            <div className='divider'>OR</div>
            <button onClick={handlerGoogleLogin} className='btn btn-outline'>
            <FcGoogle /> SigUp or Login with Google
            </button>
        </div>
    );
};

export default SocialLogin;