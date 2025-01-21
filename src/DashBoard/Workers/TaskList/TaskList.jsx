import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const TaskList = () => {
  const axiosSecure = useAxiosSecure(); 
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tasks");
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Available Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="border border-gray-300 p-4 rounded-lg shadow-md bg-white"
          >
            <h3 className="text-xl font-bold">{task.task_title}</h3>
            <p>Buyer: {task.Buyer_name}</p>
            <p>Completion Date: {task.completion_date}</p>
            <p>Payable Amount: ${task.payable_amount}</p>
            <p>Required Workers: {task.required_workers}</p>
            <Link to={`/task-details/${task._id}`}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
