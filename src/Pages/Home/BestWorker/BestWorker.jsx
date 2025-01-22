import useUsers from "../../../hooks/useUsers";

const BestWorker = () => {
  const [users] = useUsers();   
  const workers = users.filter(user => user.role === "Worker");  
  const sortedWorkers = workers.sort((a, b) => b.coins - a.coins); 
  const topWorkers = sortedWorkers.slice(0, 6); 
  
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Top 6 Best Workers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {topWorkers.map((worker) => ( 
          <div
            key={worker._id}
            className="bg-white border border-gray-300 p-4 rounded-lg shadow-md"
          >
            <img
              className="w-32 h-32 rounded-full mx-auto"
              src={worker.photoURL || "https://via.placeholder.com/150"}
              alt={worker.name}
            />
            <h3 className="text-xl font-semibold text-center mt-4">{worker.name}</h3>
            <p className="text-center text-gray-500">Coins: {worker.coins}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestWorker;
