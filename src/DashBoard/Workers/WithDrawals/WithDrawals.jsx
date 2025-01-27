import { useState } from "react";  
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const WithDrawals = () => { 
  const axiosSecure = useAxiosSecure();   
  const [withdrawCoins, setWithdrawCoins] = useState(0);  
  const [paymentSystem, setPaymentSystem] = useState("");  
  const [accountNumber, setAccountNumber] = useState("");  
  const [withdrawalAmount, setWithdrawalAmount] = useState(0); 
  
  const [userData] = useUser();
//   console.log(userData);
  const totalCoins = userData?.coins; 
  // Handle withdraw coin input
  const handleCoinChange = (value) => {
      
        const coins = parseInt(value, 10);
    if (coins <= totalCoins) {
      setWithdrawCoins(coins);
      setWithdrawalAmount(coins / 20); 
    } else {
      setWithdrawCoins(totalCoins);  
    }
 
  }; 
  // Handle form submission
  const handleWithdraw = () => {
    const withdrawalData = {
      worker_email: userData?.email,
      worker_name: userData?.name,
      withdrawal_coin: withdrawCoins,
      withdrawal_amount: withdrawalAmount,
      payment_system: paymentSystem,
      account_number: accountNumber,
      withdraw_date: new Date().toISOString(),
      status: "pending",
    };

    axiosSecure.post("/withdrawals", withdrawalData)
    .then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Withdrawal request submitted successfully!Please Wait.",
        showConfirmButton: false,
        timer: 1500
      }); 
      setWithdrawCoins(0);
      setWithdrawalAmount(0);
      setPaymentSystem("");
      setAccountNumber("");
    });
  };

  return (
    <div className="p-6">
      <Helmet>
      <title>Micro Platform | WithDrawals</title>
      </Helmet>
      <h1 className="text-2xl font-bold text-center mb-6">Withdrawals</h1>

      {/* User's Total Coins and Earnings */}
      <div className="mb-6 text-center">
        <p className="text-lg font-medium text-gray-700">
          Total Coins: <span className="font-bold text-blue-600">{totalCoins}</span>
        </p>
        <p className="text-lg font-medium text-gray-700">
          Equivalent Dollar Amount:{" "}
          <span className="font-bold text-green-600">${(totalCoins / 20).toFixed(2)}</span>
        </p>
      </div>

      {/* Withdrawal Form */}
      <div className="bg-gray-100 shadow-md p-6 rounded-lg max-w-md mx-auto">
        {totalCoins >= 200 ? (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Coins to Withdraw</label>
              <input
                type="number"
                min="200"
                max={totalCoins}
                value={withdrawCoins}
                onChange={(e) => handleCoinChange(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Withdrawal Amount ($)</label>
              <input
                type="text"
                value={withdrawalAmount.toFixed(2)}
                readOnly
                className="w-full border border-gray-300 p-2 rounded-lg bg-gray-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Select Payment System</label>
              <select
                value={paymentSystem}
                onChange={(e) => setPaymentSystem(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg"
              >
                <option disabled value="">-- Select Payment System --</option>
                <option value="Bkash">Bkash</option>
                <option value="Rocket">Rocket</option>
                <option value="Nagad">Nagad</option> 
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Account Number</label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>
            <button
              onClick={handleWithdraw}
              className="w-full bg-blue-600 text-white font-medium p-2 rounded-lg hover:bg-blue-700"
            >
              Withdraw
            </button>
          </>
        ) : (
          <p className="text-center text-red-500 font-medium">Insufficient coins to withdraw.</p>
        )}
      </div>
    </div>
  );
};

export default WithDrawals;
