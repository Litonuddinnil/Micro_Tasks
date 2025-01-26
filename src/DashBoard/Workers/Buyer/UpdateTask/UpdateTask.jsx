import { useForm } from "react-hook-form";
import Swal from "sweetalert2"; 
import { useLoaderData, useNavigate} from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
 

const UpdateTask = () => { 
    const task = useLoaderData(); 
    const axiosSecure = useAxiosSecure(); 
    const navigate = useNavigate();
   const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      task_title: task.task_title,
      task_detail: task.task_detail,
      required_workers: task.required_workers,
      payable_amount: task.payable_amount,
      completion_date: task.completion_date,
      submission_info: task.submission_info,
    },
  });

  const onSubmit = async (data) => {
    const updatedTask = {
      task_title: data.task_title,
      task_detail: data.task_detail,
      required_workers: data.required_workers,
      payable_amount: data.payable_amount,
      completion_date: data.completion_date,
      submission_info: data.submission_info,
    };
  //  console.log(updatedTask);
    try {
      const response = await axiosSecure.put(`/tasks/${task._id}`, updatedTask);
      if (response.data.modifiedCount > 0) { 
        Swal.fire("Success", "Task updated successfully!", "success"); 
        navigate('/dashboard/myTasks')
      }
    } catch (error) {
      console.error("Error updating task:", error);
      Swal.fire("Error", "Failed to update task. Please try again.", "error");
    }
  };

  return (
    <div className="w-11/12 mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Update Task</h2>
      <div className="bg-base-200 w-full shadow-lg rounded-lg p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Task Title */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Task Title*</span>
            </label>
            <input
              {...register("task_title", { required: "Task title is required" })}
              type="text"
              placeholder="Enter task title"
              className={`input input-bordered w-full ${errors.task_title ? "border-red-500" : ""}`}
            />
            {errors.task_title && <span className="text-red-500 text-sm">{errors.task_title.message}</span>}
          </div>

          {/* Task Details */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Task Details*</span>
            </label>
            <textarea
              {...register("task_detail", { required: "Task details are required" })}
              placeholder="Enter task details"
              className={`textarea textarea-bordered w-full ${errors.task_detail ? "border-red-500" : ""}`}
              rows="4"
            ></textarea>
            {errors.task_detail && <span className="text-red-500 text-sm">{errors.task_detail.message}</span>}
          </div> 
           

          {/* Submission Info */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Submission Info*</span>
            </label>
            <input
              {...register("submission_info", { required: "Submission info is required" })}
              type="text"
              placeholder="e.g., Screenshot or proof"
              className={`input input-bordered w-full ${errors.submission_info ? "border-red-500" : ""}`}
            />
            {errors.submission_info && <span className="text-red-500 text-sm">{errors.submission_info.message}</span>}
          </div> 
          {/* Submit Button */}
          <div className="text-center">
            <button type="submit" className="btn bg-blue-500 text-white">
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
