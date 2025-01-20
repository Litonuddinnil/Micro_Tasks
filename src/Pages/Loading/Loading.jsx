 import loadingImg from "../../assets/404.gif"
const Loading = () => {
    return (
        <div className='min-h-screen w-full bg-white items-center flex justify-center'>
            <img src={loadingImg} alt="" />
        </div>
    );
};

export default Loading;