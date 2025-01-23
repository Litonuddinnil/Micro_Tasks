import { useState, useEffect } from "react";
import useWorkers from "../../../../hooks/useWorkers";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure"; 
// import useBuyer from "../../../../hooks/useBuyer";

const BuyerHome = () => {
    // const [Tasks] = useBuyer();
    // console.log('all tasks',Tasks);
  const [workers, , refetch] = useWorkers(); 
  console.log('workers',workers);
  const axiosSecure = useAxiosSecure();
  const [buyerSubmissions, setBuyerSubmissions] = useState([]);
  const { user } = useAuth();
  const [modalDetails, setModalDetails] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false); 

  useEffect(() => {
    const loggedInBuyerEmail = user?.email;
    const submissions = workers.filter(
      (task) => task.buyer_email === loggedInBuyerEmail
    );
    setBuyerSubmissions(submissions);
  }, [workers, user?.email]);

  const totalTaskCount = buyerSubmissions.length;
  const pendingTask = buyerSubmissions.filter(
    (state) => state.status === "pending"
  );
  const pendingTaskCount = pendingTask.length;
  const totalPaymentPaid = buyerSubmissions.reduce(
    (acc, task) => acc + (task.payable_amount || 0),
    0
  );

  const handleApprove = async (submission) => {
    try {
      setIsProcessing(true);
      const updateStatus = "approve";
      await axiosSecure.patch(`/workers/${submission._id}`, {
        status: updateStatus,
      });
      refetch();
      console.log("Approved submission:", submission);
    } catch (error) {
      console.error("Error approving submission:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async (submissionId) => {
    try {
      setIsProcessing(true);
      await axiosSecure.patch(`/workers/${submissionId}`, {
        status: "rejected",
      });
    //   await axiosSecure.patch(`/tasks/${taskId}`, {
    //     $inc: { required_workers: 1 },
    //   });
      refetch();
      console.log("Rejected submission:", submissionId);
    } catch (error) {
      console.error("Error rejecting submission:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleViewSubmission = (submissionDetails) => {
    setModalDetails(submissionDetails);
  };

  const closeModal = () => {
    setModalDetails(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Buyer Dashboard</h1>

      <div className="mb-6">
        <p>Total Task Count: {totalTaskCount}</p>
        <p>Pending Task Count: {pendingTaskCount}</p>
        <p>Total Payment Paid: {totalPaymentPaid}</p>
      </div>

      <h2 className="text-xl font-semibold mb-4">Tasks to Review</h2>
      <table className="table-auto w-full border border-gray-300">
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
          {buyerSubmissions.map((submission) => (
            <tr key={submission._id} className="border-t border-gray-300">
              <td className="px-4 py-2">{submission.worker_name}</td>
              <td className="px-4 py-2">{submission.task_title}</td>
              <td className="px-4 py-2">{submission.payable_amount}</td>
              <td className="px-4 py-2">{submission.status}</td>
              <td className="px-4 py-2 flex flex-col md:flex-row items-center gap-4">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => handleViewSubmission(submission.submission_details)}
                >
                  View Submission
                </button>
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => handleApprove(submission)}
                  disabled={isProcessing}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleReject(submission._id, submission.task_id)}
                  disabled={isProcessing}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalDetails && (
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle" open>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Submission Details!</h3>
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

export default BuyerHome;



