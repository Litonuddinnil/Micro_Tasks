import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const PurchaseCoins = () => {
  const axiosSecure = useAxiosSecure();
  const [purchaseCoin, setPurchaseCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosSecure.get("/purchaseCoin")
      .then((res) => {
        setPurchaseCoin(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load coin packages. Please try again later.",err);
        setLoading(false);
      });
  }, [axiosSecure]);
// console.log(purchaseCoin);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-red-500 font-semibold text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div
      className="p-8 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 min-h-screen"
      style={{
        backgroundImage: `url('https://www.transparenttextures.com/patterns/gplay.png')`,
      }}
    >
      <h2 className="text-4xl font-bold text-center text-black mb-12 drop-shadow-md">
        Purchase Coins
      </h2>
      {purchaseCoin.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {purchaseCoin.map((pkg, index) => (
            <div
              key={index}
              className="relative p-6 rounded-lg shadow-lg bg-white text-center transform hover:scale-105 transition duration-300"
              style={{
                background:
                  "linear-gradient(145deg, #f0e4d7, #ffffff), radial-gradient(circle, rgba(253,216,104,1) 0%, rgba(255,235,175,1) 100%)",
              }}
            >
              <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full px-3 py-1 text-xs font-bold shadow-md animate-pulse">
                {pkg.badge}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-600">
                {pkg.coins} Coins
              </h3>
              <p className="text-lg mb-6 text-gray-700 font-medium">
                = ${pkg.price}
              </p>
              <Link to={`/dashboard/payment/${pkg._id}`}>
                <button
                  className="btn px-6 py-3 bg-yellow-500 text-white rounded-lg shadow-lg hover:bg-yellow-600 hover:shadow-xl transition duration-300 transform hover:translate-y-1"
                >
                  Purchase Now
                </button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-white font-medium text-lg">
          No coin packages available at the moment. Please check back later!
        </p>
      )}
    </div>
  );
};

export default PurchaseCoins;
