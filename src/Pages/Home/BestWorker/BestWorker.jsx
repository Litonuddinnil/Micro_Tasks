import useUsers from "../../../hooks/useUsers"; 
const BestWorker = () => {
  const [users] = useUsers(); 
  // console.log(users);
  const workers = users.filter((user) => user.role === "Worker");
  const sortedWorkers = workers.sort((a, b) => b.coins - a.coins);
  const topWorkers = sortedWorkers.slice(0, 6);

  return (
    <div className="p-8 mt-6 bg-gray-100">
     
      <h2 className="text-4xl font-bold text-center mb-8 text-sky-950">
        Top 6 Best Workers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {topWorkers.map((worker) => (
          <div
            key={worker._id}
            className="bg-gradient-to-br from-blue-100 to-sky-300 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <img
              className="w-24 h-24 rounded-full mx-auto border-4 border-sky-600"
              src={worker.photoURL || "https://via.placeholder.com/150"}
              alt={worker.name}
            />
            <h3 className="text-2xl font-semibold text-center mt-4 text-sky-950">
              {worker.name}
            </h3>
            <p className="text-center text-gray-600 text-lg mt-2">
              Coins:{" "}
              <span className="text-sky-700 font-bold">{worker.coins}</span>
            </p> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestWorker;
