import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Helmet } from "react-helmet";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const RADIAN = Math.PI / 180;

const WorkersHome = () => {
  const [submissions, setSubmissions] = useState([]);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch data for worker submissions
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/workers/${user.email}`).then((res) => {
        setSubmissions(res.data);
      });
    }
  }, [axiosSecure, user?.email]);

  // Data Calculations
  const totalSubmission = submissions.length;
  const pendingSubmission = submissions.filter((stat) => stat.status === "pending").length;
  const approvedSubmissions = submissions.filter((stat) => stat.status === "approve");
  const payableAmount = approvedSubmissions.reduce(
    (acc, curr) => acc + (curr.payable_amount || 0),
    0
  );

  // Pie Chart Data
  const data = [
    { name: "Total Submissions", value: totalSubmission },
    { name: "Pending Submissions", value: pendingSubmission },
    { name: "Total Payable Amount", value: payableAmount },
  ];

  // Render Custom Label
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="p-6">
      <Helmet>
      <title>Micro Platform | WorkerHome</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-4  text-center ">Worker Stats Dashboard</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 h-96">
        {/* Statistics Section */}
        <div className="bg-gray-100 shadow-md p-6 rounded-lg flex-1 text-center md:text-left">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 ">Your Stats</h2>
          <p className="text-gray-600 text-xl font-medium">
            Total Submissions: <span className="text-primary font-bold">{totalSubmission}</span>
          </p>
          <p className="text-gray-600 text-xl font-medium">
            Pending Submissions:{" "}
            <span className="text-green-500 font-bold">{pendingSubmission}</span>
          </p>
          <p className="text-gray-600 text-xl font-medium">
            Total Payable Amount:{" "}
            <span className="text-yellow-500 font-bold">${payableAmount.toFixed(2)}</span>
          </p>
        </div>

        {/* Pie Chart Section */}
        <div className="flex-1 w-full h-80 md:h-full">
          {submissions.length > 0 ? (
            <ResponsiveContainer width="90%" height="90%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend></Legend>
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500">No data available to display.</p>
          )}
        </div>
      </div>

      {/* //table for approvedSubmission */}
       {/* Approved Submissions Table */}
       <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
          Approved Submissions
        </h2>
        {approvedSubmissions.length > 0 ? (
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="table-auto w-full text-sm text-left text-gray-500">
              <thead className="text-xs uppercase bg-gray-100 text-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3">Task Title</th>
                  <th scope="col" className="px-6 py-3">Payable Amount</th>
                  <th scope="col" className="px-6 py-3">Buyer Name</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {approvedSubmissions.map((submission, index) => (
                  <tr
                    key={index}
                    className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {submission.task_title}
                    </td>
                    <td className="px-6 py-4 text-green-600 font-semibold">
                      ${submission.payable_amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">{submission.buyer_name}</td>
                    <td className="px-6 py-4 text-blue-600 font-medium">
                      Approved
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No approved submissions available.
          </p>
        )}
      </div>
    </div>
  );
};

export default WorkersHome;
