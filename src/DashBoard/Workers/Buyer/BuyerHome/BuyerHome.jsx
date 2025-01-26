 
import { LuHandCoins } from "react-icons/lu";
import useAuth from "../../../../hooks/useAuth"; 
import useBuyer from "../../../../hooks/useBuyer";  
import WorkerInformation from "./WorkerInformation/WorkerInformation";

const BuyerHome = () => {
    const [Tasks] = useBuyer();
  //  console.log('all tasks',Tasks); 
  const { user } = useAuth(); 

  const currentEmail = Tasks.filter((task) => task.buyer_email === user?.email);
  // console.log('current email tasks',currentEmail);
  const totalTaskCount = currentEmail.length; 
  
  const pendingTaskCount = currentEmail.reduce((acc,task)=>acc + (task.required_workers || 0),0 );
    
  const totalPaymentPaid = currentEmail.reduce(
    (acc, task) => acc + (task.payable_amount || 0),
    0
  ); 

  return (
    <div className="p-6">
      <h1 className="text-2xl text-center font-bold mb-4">Buyer Dashboard</h1>
      <div className="stats shadow mb-8 flex items-center justify-center ">
  <div className="stat">
    <div className="stat-figure text-primary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block md:h-14 h-8 w-8  md:w-14 stroke-current">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
      </svg>
    </div>
    <div className="stat-title">Total Task Count</div>
    <div className="stat-value text-primary"> {totalTaskCount}</div>
    <div className="stat-desc">21% more than last month</div>
  </div>

  <div className="stat">
    <div className="stat-figure text-secondary ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block md:h-14 md:w-14 h-8 w-8 stroke-current">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 10V3L4 14h7v7l9-11h-7z"></path>
      </svg>
    </div>
    <div className="stat-title">Pending Task Count</div>
    <div className="stat-value text-secondary"> {pendingTaskCount}</div>
    <div className="stat-desc">Required Works for the tasks!</div>
  </div>

  <div className="stat"> 
    <div className="stat-figure text-6xl text-yellow-500">
    <LuHandCoins />
    </div>
    <div className="stat-value">{totalPaymentPaid}</div>
    <div className="stat-title">Total Payment Paid</div>
    <div className="stat-desc text-secondary">{totalTaskCount} tasks remaining</div>
  </div>
</div> 
    <WorkerInformation></WorkerInformation>
      
    </div>  
  );
};

export default BuyerHome;



