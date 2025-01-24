import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch payment history using React Query
  const { data: payments = [], isLoading, isError } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
    enabled: !!user.email, // Ensure the query runs only if the user email is available
  });

  // Conditional rendering
  if (isLoading) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-bold">Loading Payment History...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-bold text-red-500">
          Failed to load payment history. Please try again later.
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Payments History: {payments.length}
      </h1>
      {payments.length === 0 ? (
        <p className="text-gray-500">No payments found.</p>
      ) : (
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Transaction ID</th>
              <th className="border px-4 py-2">Coins</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.transactionId} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{payment.email}</td>
                <td className="border px-4 py-2">{payment.transactionId}</td>
                <td className="border px-4 py-2">{payment.coins}</td>
                <td className="border px-4 py-2">${payment.price}</td>
                <td className="border px-4 py-2">
                  {new Date(payment.date).toLocaleDateString()}
                </td>
                <td
                  className={`border px-4 py-2 ${
                    payment.status === "succeeded"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  {payment.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentHistory;
