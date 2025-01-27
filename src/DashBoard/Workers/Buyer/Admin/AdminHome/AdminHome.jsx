import { useEffect, useState } from "react";
import useAuth from "../../../../../hooks/useAuth";
import useUsers from "../../../../../hooks/useUsers";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaBitcoin } from "react-icons/fa";
import { Helmet } from "react-helmet";

const AdminHome = () => {
  const [users] = useUsers();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const totalWorkers = users.filter((admin) => admin.role === "Worker");
  const totalBuyers = users.filter((buyer) => buyer.role === "Buyer");
  const totalCoins = users.reduce((acc, coinData) => acc + (coinData.coins || 0), 0);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axiosSecure.get("/withdrawals");
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching withdraw requests:", error);
      }
    };

    fetchRequests();
  }, [axiosSecure]);

  const approveEmail = requests.filter((approveData) => approveData.status === "approve");
  const totalPayments = approveEmail.reduce((acc, taka) => acc + (taka.withdrawal_amount || 0), 0);

  const updateWorkerCoins = async (workerEmail, amount) => {
    const worker = users.find((user) => user.email === workerEmail);
    if (worker) {
      const updatedCoins = worker.coins - amount;
      await axiosSecure.patch(`/users/${worker._id}`, { coins: updatedCoins });
    }
  };

  const handlePaymentSuccess = async (request) => {
    if (request.status === "approve") return;

    try {
      setIsProcessing(true);
      //notification worker to approve 
      const notificationData = {
        task_title:request.task_title,
        withdrawal_amount: request.withdrawal_amount, 
        worker_email: request.worker_email, 
        status:"admin", 

      }
      // console.log('when admin approve',notificationData);
      await axiosSecure.post('/notifications',notificationData)

      await axiosSecure.patch(`/withdrawals/${request._id}`, { status: "approve" });
      await updateWorkerCoins(request.worker_email, request.withdrawal_coin);
      setRequests((prev) =>
        prev.map((admin) =>
          admin._id === request._id ? { ...admin, status: "approve" } : admin
        )
      );
      Swal.fire({
        title: "Payment approved successfully!",
        icon: "success",
        draggable: true,
      });
    } catch (error) {
      console.error("Error approving submission:", error);
      alert("Failed to approve payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <Helmet>
      <title>Micro Platform | AdminHome</title>
      </Helmet>
      <h1 className="text-2xl md:text-3xl text-teal-800 font-bold my-6 text-center">
        Hi, Welcome {user?.displayName ? user.displayName : "Back"}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
        <div className="stat shadow-lg rounded-lg p-6 bg-gradient-to-br from-white to-gray-100">
          <div className="stat-title text-gray-600">Total Workers</div>
          <div className="stat-value text-teal-600">{totalWorkers.length}</div>
        </div>

        <div className="stat shadow-lg rounded-lg p-6 bg-gradient-to-br from-white to-gray-100">
          <div className="stat-title text-gray-600">Total Buyers</div>
          <div className="stat-value text-teal-600">{totalBuyers.length}</div>
        </div>

        <div className="stat shadow-lg rounded-lg p-6 bg-gradient-to-br from-white to-gray-100">
          <div className="stat-title text-gray-600">Total Available Coins</div>
          <div className="stat-value text-teal-600">{totalCoins}</div>
        </div>

        <div className="stat shadow-lg rounded-lg p-6 bg-gradient-to-br from-white to-gray-100">
          <div className="stat-title text-gray-600">Total Payment</div>
          <div className="stat-value text-teal-600 flex items-center">
            <FaBitcoin className="mr-2" /> {totalPayments}
          </div>
        </div>
      </div>

      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-xl md:text-2xl text-center font-bold text-teal-800 mb-6">
          Pending Withdrawal Requests
        </h1>
        {requests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-teal-100 text-teal-800">
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Withdrawal Coins</th>
                  <th className="border px-4 py-2">Amount</th>
                  <th className="border px-4 py-2">Payment System</th>
                  <th className="border px-4 py-2">Account Number</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Withdraw Date</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request._id} className="hover:bg-gray-100 text-gray-700">
                    <td className="border px-4 py-2 text-sm">{request.worker_name}</td>
                    <td className="border px-4 py-2 text-sm">{request.worker_email}</td>
                    <td className="border px-4 py-2 text-sm">{request.withdrawal_coin}</td>
                    <td className="border px-4 py-2 text-sm">{request.withdrawal_amount}</td>
                    <td className="border px-4 py-2 text-sm">{request.payment_system}</td>
                    <td className="border px-4 py-2 text-sm">{request.account_number}</td>
                    <td className="border px-4 py-2 text-sm">{request.status}</td>
                    <td className="border px-4 py-2 text-sm">
                      {new Date(request.withdraw_date).toLocaleString()}
                    </td>
                    <td className="border px-4 py-2 text-sm">
                      <button
                        disabled={request.status === "approve" || isProcessing}
                        className={`px-4 py-2 rounded-lg text-white text-sm ${
                          request.status === "approve" || isProcessing
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-teal-600 hover:bg-teal-700"
                        }`}
                        onClick={() => handlePaymentSuccess(request)}
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No pending withdrawal requests.</p>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
