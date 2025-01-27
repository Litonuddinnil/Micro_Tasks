import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet";

const MySubmissionTask = () => {
  const axiosSecure = useAxiosSecure();
  const [submissions, setSubmissions] = useState([]);
  const { user } = useAuth();
  const email = user?.email;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Items per page

  useEffect(() => {
    axiosSecure.get(`/workers/${email}`).then((res) => {
      setSubmissions(res.data);
    });
  }, [axiosSecure, email]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = submissions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(submissions.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-4">
      <Helmet>
      <title>Micro Platform | MySubmission</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4 text-center">
        --- My Submission Task ---
      </h2>
      <div className="divider"></div>

      {/* Submissions Table */}
      {submissions.length > 0 && (
        <div className="border border-gray-300 shadow-md rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="flex bg-primary text-white px-4 py-2">
            <div className="md:w-1/12">Serial No</div>
            <div className="md:w-3/12">Task Title</div>
            <div className="md:w-2/12">Submission Date</div>
            <div className="md:w-4/12">Submission Details</div>
            <div className="md:w-2/12">Status</div>
          </div>
          {/* Table Body */}
          {currentItems.map((task, index) => (
            <div
              key={task._id || index}
              className={`flex gap-4 items-center px-4 py-2 ${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              }`}
            >
              <div className="md:w-1/12 font-medium">
                {indexOfFirstItem + index + 1}
              </div>
              <div className="md:w-3/12 md:text-lg text-xs font-medium">{task?.task_title}</div>
              <div className="md:w-2/12">
                {new Date(task?.submissionDate).toLocaleDateString()}
              </div>
              <div className="md:w-4/12 md:text-lg text-xs">{task?.submission_details}</div>
              <div className="md:w-2/12 font-bold bg-yellow-200 underline text-gray-950 text-xs md:text-xl px-2 py-1 rounded-lg text-center">
                {task?.status }
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {submissions.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-4 gap-2">
          {/* Previous Button */}
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className={`btn btn-sm ${
              currentPage === 1 ? "btn-disabled" : "btn-primary"
            }`}
          >
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`btn btn-sm ${
                currentPage === i + 1 ? "btn-active" : "btn-outline"
              }`}
            >
              {i + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className={`btn btn-sm ${
              currentPage === totalPages ? "btn-disabled" : "btn-primary"
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* No Submissions Message */}
      {submissions.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No submission tasks available.
        </p>
      )}
    </div>
  );
};

export default MySubmissionTask;
