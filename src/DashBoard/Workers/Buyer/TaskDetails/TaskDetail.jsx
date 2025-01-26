import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure"; 

const TaskDetail = () => {
  const taskDetails = useLoaderData();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure(); 
  const navigate = useNavigate();
  const {
    _id: task_id,
    task_title,
    task_detail,
    required_workers,
    payable_amount,
    completion_date,
    submission_info,
    task_image_url,
    buyer_name,
    buyer_email,
  } = taskDetails;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionDetails = e.target.submission_Details.value;

    if (!user) {
      Swal.fire("Error", "You must be logged in to submit a task.", "error");
      return;
    }

    const submissionData = {
      task_id,
      task_title,
      payable_amount,
      required_workers,
      worker_email: user.email,
      worker_name: user.displayName,
      buyer_name,
      buyer_email,
      submission_details: submissionDetails,
      submissionDate: new Date().toLocaleDateString(),
      task_image_url,
      status: "pending",
    };

    try {
      // Submit task to the server
      const response = await axiosSecure.post("/workers", submissionData);

      if (response.data.insertedId) {

        //notification worker to buyer 
        const notificationData = {
          task_title:taskDetails.task_title,
          payable_amount: taskDetails.payable_amount ,
          BuyerName: taskDetails.buyer_name,
          buyer_email:taskDetails.buyer_email,
          worker_name:user?.displayName,
          worker_email:user?.email, 
          status:"worker",
          Time: new Date(), 
        }
        // console.log(notificationData);
        await axiosSecure.post('/notifications',notificationData)
        const updatedWorkers = required_workers - 1; 
        // Update task's required workers count
        await axiosSecure.patch(`/tasks/${task_id}`, {
          required_workers: updatedWorkers > 0 ? updatedWorkers : 0,
        });

        // Update user's coins if status is "approve"
        console.log(submissionData.status);
       

        Swal.fire("Success", "Submission saved successfully!", "success");
        e.target.reset();
        navigate("/dashboard/mySubmissions");
      }
    } catch (error) {
      console.error("Error saving submission:", error);
      Swal.fire("Error", "Failed to save submission. Please try again.", "error");
    }
  };

  return (
    <div className="py-10 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Task Header */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={task_image_url}
            alt={task_title}
            className="w-40 h-40 object-cover rounded-lg shadow-md"
          />
          <div>
            <h2 className="text-2xl font-bold text-indigo-600 mb-2">
              {task_title}
            </h2>
            <p className="text-gray-700">{task_detail}</p>
          </div>
        </div>

        {/* Task Details */}
        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-600">Required Workers:</span>
            <span className="font-bold text-gray-800">{required_workers}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-600">Payable Amount:</span>
            <span className="font-bold text-gray-800">${payable_amount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-600">Completion Date:</span>
            <span className="font-bold text-gray-800">{completion_date}</span>
          </div>
          <div className="mt-4 p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded">
            <h4 className="text-lg font-semibold text-indigo-600 mb-2">
              Submission Information:
            </h4>
            <p className="text-gray-700">{submission_info}</p>
          </div>
        </div>

        {/* Submission Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 bg-gray-50 p-4 rounded shadow-md"
        >
          <h3 className="text-lg font-bold text-gray-700 mb-4">
            Submit Your Task
          </h3>
          <div className="mb-4">
            <textarea
              name="submission_Details"
              placeholder="Enter your submission details here..."
              className="textarea textarea-bordered w-full"
              rows="5"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary text-white w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskDetail;
