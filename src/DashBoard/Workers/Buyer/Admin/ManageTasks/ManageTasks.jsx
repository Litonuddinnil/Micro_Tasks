import Swal from "sweetalert2"; 
import { Link} from "react-router-dom"; 
import useAuth from "../../../../../hooks/useAuth";
import useBuyer from "../../../../../hooks/useBuyer";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const ManageTasks = () => {
  const { loading } = useAuth();
  const [Tasks, , refetchTasks] = useBuyer();
  const axiosSecure = useAxiosSecure();  
  
//   console.log(Tasks);
  const handleDelete = async (task) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/tasks/${task._id}`);
          if (response.data.deletedCount > 0) { 
            refetchTasks();
            Swal.fire("Deleted!", "Task has been deleted.", "success");
          }
        } catch (error) {
          console.error("Error deleting task:", error);
          Swal.fire("Error", "Failed to delete task. Please try again.", "error");
        }
      }
    });
  };

  return (
    <div className="p-4">
      <Helmet>
      <title>Micro Platform | ManageTasks</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4 text-center">---Manage Tasks All---</h2>
      <div className="divider"></div>

      {/* Tasks Table */}
      {!loading && Tasks.length > 0 && (
        <div className="overflow-x-auto" style={{ height: "100vh" }}>
          <table className="table-auto w-full  border-collapse border border-gray-300 shadow-md rounded-lg">
            <thead className="bg-primary sticky top-0 z-10 text-white">
              <tr>
                <th className="px-4 py-2">Serial No</th>
                <th className="px-4 py-2">Task Title</th>
                <th className="px-4 py-2">Details</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Required Workers</th>
                <th className="px-4 py-2">Payable Amount</th>
                <th className="px-4 py-2">Completion Date</th>
                <th className="px-4 py-2">Submission Info</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              { Tasks.map((task, index) => (
                <tr
                  key={task._id}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="px-4 py-2 font-medium">{index + 1}</td>
                  <td className="px-4 py-2 font-medium">{task.task_title}</td>
                  <td className="px-4 py-2">{task.task_detail}</td>
                  <td className="px-4 py-2">{task.task_status || "Pending"}</td>
                  <td className="px-4 py-2 text-center">
                    {task.required_workers}
                  </td>
                  <td className="px-4 py-2 text-center">
                    ${task.payable_amount}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {new Date(task.completion_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{task.submission_info}</td>
                  <td className="px-4 py-2 flex justify-center gap-2">
                    {/* Edit Button */}
                  <Link to={`/dashboard/updateTask/${task._id}`}>   <button 
                      className="btn btn-sm btn-info"
                    >
                      Edit
                    </button></Link>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(task)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No Tasks Message */}
      {!loading &&  Tasks.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No tasks available.</p>
      )}
    </div>
  );
};

export default ManageTasks;
