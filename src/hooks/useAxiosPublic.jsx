import axios from 'axios'; 
const axiosPublic = axios.create({
    baseURL:'https://carrier-point-server-site.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;