import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import useAuth from "../../../../../hooks/useAuth";
import useUser from "../../../../../hooks/useUser";
import useUsers from "../../../../../hooks/useUsers";

const WorkerInformation = () => {
  const [workers, setWorkers] = useState([]);
  const [userData, , refetch] = useUser();
  const [users] = useUsers();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [modalDetails, setModalDetails] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch workers' submissions
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axiosSecure.get("/workers");
        setWorkers(response.data);
      } catch (error) {
        console.error("Error fetching workers' submissions:", error);
      }
    };
    fetchWorkers();
  }, [axiosSecure]);

  // Filter submissions for the current buyer
  const buyerWorkByEmailData = workers.filter(
    (work) => work.buyer_email === user?.email
  );

  // Helper function to update worker coins
  const updateWorkerCoins = async (workerEmail, amount) => {
    const worker = users.find((user) => user.email === workerEmail);
    if (worker) {
      const updatedCoins = worker.coins + amount;
      await axiosSecure.patch(`/users/${worker._id}`, { coins: updatedCoins });
    }
  };

  // Handle submission approval
  const handleApprove = async (submission) => {
    if (submission.status === "approve") return; // Prevent re-approval
    try {
      setIsProcessing(true);
      const notificationData = {
        task_title:submission.task_title,
        payable_amount: submission.payable_amount ,
        BuyerName: submission.buyer_name,
        worker_email: submission.worker_email,
        status:"approve",
        Time: new Date(),

      }
      // console.log(notificationData);
      await axiosSecure.post('/notifications',notificationData)
      // Deduct coins from the buyer and update worker coins
      await updateWorkerCoins(submission.worker_email, submission.payable_amount);
      const updatedBuyerCoins = userData.coins - submission.payable_amount;
      await axiosSecure.patch(`/users/${userData._id}`, { coins: updatedBuyerCoins });

      // Update submission status to "approve"
      await axiosSecure.patch(`/workers/${submission._id}`, { status: "approve" });
      refetch();

      // Update UI state
      setWorkers((prev) =>
        prev.map((worker) =>
          worker._id === submission._id
            ? { ...worker, status: "approve", buyer_coins: updatedBuyerCoins }
            : worker
        )
      );
      // console.log("Approved submission:", submission);
    } catch (error) {
      console.error("Error approving submission:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle submission rejection
  const handleReject = async (submission) => {
    if (submission.status === "rejected") return; // Prevent re-rejection
    try {
      setIsProcessing(true);
      const notificationData = {
        task_title:submission.task_title,
        payable_amount: submission.payable_amount ,
        BuyerName: submission.buyer_name,
        worker_email: submission.worker_email,
        status:"rejected",
        Time: new Date(),

      }
      // console.log('when rejected',notificationData);
      await axiosSecure.post('/notifications',notificationData)

      // Deduct coins from the worker (if previously credited)
      await updateWorkerCoins(submission.worker_email, -submission.payable_amount);

      // Refund coins to the buyer
      const updatedBuyerCoins = userData.coins + submission.payable_amount;
      await axiosSecure.patch(`/users/${userData._id}`, { coins: updatedBuyerCoins });

      // Update submission status to "rejected"
      await axiosSecure.patch(`/workers/${submission._id}`, { status: "rejected" });
      refetch();

      // Update UI state
      setWorkers((prev) =>
        prev.map((worker) =>
          worker._id === submission._id
            ? { ...worker, status: "rejected", buyer_coins: updatedBuyerCoins }
            : worker
        )
      );
      // console.log("Rejected submission:", submission);
    } catch (error) {
      console.error("Error rejecting submission:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Modal handlers
  const handleViewSubmission = (submissionDetails) => setModalDetails(submissionDetails);
  const closeModal = () => setModalDetails(null);

  return (
    <div>
       
      <h2 className="text-xl font-semibold mb-4">
        Submission From Buyer: {buyerWorkByEmailData.length}
      </h2>
      <table className="table-auto w-full border border-gray-300" >
        <thead>
          <tr>
            <th className="px-4 py-2">Worker Name</th>
            <th className="px-4 py-2">Task Title</th>
            <th className="px-4 py-2">Payable Amount</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {buyerWorkByEmailData.map((submission) => (
            <tr key={submission._id} className="border-t border-gray-300">
              <td className="px-4 py-2">{submission.worker_name}</td>
              <td className="px-4 py-2">{submission.task_title}</td>
              <td className="px-4 py-2">{submission.payable_amount}</td>
              <td className="px-4 py-2 capitalize">{submission.status}</td>
              <td className="px-4 py-2 flex flex-col md:flex-row items-center gap-4">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => handleViewSubmission(submission.submission_details)}
                >
                  View Submission
                </button>
                <button
                  disabled={submission.status === "approve" || isProcessing}
                  className={`px-2 py-1 rounded text-white ${
                    submission.status === "approve" || isProcessing
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500"
                  }`}
                  onClick={() => handleApprove(submission)}
                >
                  Approve
                </button>
                <button
                  disabled={isProcessing}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleReject(submission)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for viewing submission details */}
      {modalDetails && (
        <dialog
          id="submission_modal"
          className="modal modal-bottom sm:modal-middle"
          open
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">Submission Details</h3>
            <p className="py-4">{modalDetails}</p>
            <div className="modal-action">
              <button className="btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default WorkerInformation;
