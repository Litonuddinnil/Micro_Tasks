 import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useUser from "../../../../hooks/useUser";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";  
// Image Hosting Key
const Image_Hosting_Key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const Image_Hosting_Api = `https://api.imgbb.com/1/upload?key=${Image_Hosting_Key}`;

const AddTask = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm(); 
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure(); 
  const [userData, ,refetch] = useUser();
  // console.log(userData);
  const onSubmit = async (data) => {
    const requiredWorkers = parseInt(data.required_workers, 10);
    const payableAmount = parseFloat(data.payable_amount);
    const totalPayable = requiredWorkers * payableAmount;

    // Check if the user has enough coins
    // console.log(totalPayable,userData.coins)
    if (totalPayable > userData.coins) {
      Swal.fire({
        icon: "error",
        title: "Not enough coins",
        text: "Purchase more coins to proceed.",
      });
      navigate("/dashboard/purchaseCoin");
      return;
    }

    // Prepare the image upload form data
    const imageFile = new FormData();
    imageFile.append("image", data.task_image[0]);

    try {
      // Upload image to imgbb
      const imageRes = await fetch(Image_Hosting_Api, {
        method: "POST",
        body: imageFile,
      });
      const imageData = await imageRes.json();
      const email = userData?.email;
      const name = userData?.name;
      if (imageData.success) {
        // Prepare task data to save in the database
        const taskData = {
          task_title: data.task_title,
          task_detail: data.task_detail,
          required_workers: requiredWorkers,
          payable_amount: payableAmount,
          completion_date: data.completion_date,
          submission_info: data.submission_info,
          task_image_url: imageData.data.display_url,
          buyer_email:email,
          buyer_name:name,
        };

        // Save the task to the database
        const saveTaskRes = await axiosSecure.post("/tasks", taskData);

        if (saveTaskRes.data.insertedId) {
          // Deduct user's coins if task is added successfully
          const coinsData = userData.coins - totalPayable;
          const updateCoins = parseFloat(coinsData);
          await axiosSecure.patch(`/users/${userData._id}`, {
            coins:updateCoins,
          });   
          Swal.fire({
            icon: "success",
            title: "Task Added Successfully",
            text: `Your task "${ data.task_title}" has been added.`,
          });
           refetch();
           reset(); // Reset the form
        }
      }
    } catch (error) {
      console.error("Error adding task:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Unable to add the task. Please try again later.",
      });
    }
  };

  return (
    <div className="w-11/12 mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Add New Task</h2>
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

          {/* Required Workers and Payable Amount */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <div className="flex-1">
              <label className="label">
                <span className="label-text font-medium">Required Workers*</span>
              </label>
              <input
                {...register("required_workers", {
                  required: "Number of workers is required",
                  valueAsNumber: true,
                })}
                type="number"
                placeholder="Enter required workers"
                className={`input input-bordered w-full ${errors.required_workers ? "border-red-500" : ""}`}
              />
              {errors.required_workers && <span className="text-red-500 text-sm">{errors.required_workers.message}</span>}
            </div>

            <div className="flex-1">
              <label className="label">
                <span className="label-text font-medium">Payable Amount (per worker)*</span>
              </label>
              <input
                {...register("payable_amount", {
                  required: "Payable amount is required",
                  valueAsNumber: true,
                })}
                type="number"
                placeholder="Enter amount per worker"
                className={`input input-bordered w-full ${errors.payable_amount ? "border-red-500" : ""}`}
              />
              {errors.payable_amount && <span className="text-red-500 text-sm">{errors.payable_amount.message}</span>}
            </div>
          </div>

          {/* Completion Date */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Completion Date*</span>
            </label>
            <input
              {...register("completion_date", { required: "Completion date is required" })}
              type="date"
              className={`input input-bordered w-full ${errors.completion_date ? "border-red-500" : ""}`}
            />
            {errors.completion_date && <span className="text-red-500 text-sm">{errors.completion_date.message}</span>}
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

          {/* Task Image */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Task Image*</span>
            </label>
            <input
              {...register("task_image", { required: "Task image is required" })}
              type="file"
              className={`file-input w-full max-w-xs ${errors.task_image ? "border-red-500" : ""}`}
            />
            {errors.task_image && <span className="text-red-500 text-sm">{errors.task_image.message}</span>}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button type="submit" className="btn bg-blue-500 text-white">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
