 
import { FcGoogle } from 'react-icons/fc';
 
// import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
 

const SocialLogin = () => {
    // const axiosPublic  = useAxiosPublic();
    const {googleLogIn} = useAuth();
    const navigate = useNavigate();
    const handlerGoogleLogin = () =>{
        googleLogIn()
        .then(res =>{
            console.log(res);
            // const userInfo = {
            //     email: res.user?.email,
            //     name:res.user?.displayName,
            // }
            // axiosPublic.post('/users',userInfo)
            // .then(res =>{
                //  console.log(res.data);
                 navigate('/');
            // })
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