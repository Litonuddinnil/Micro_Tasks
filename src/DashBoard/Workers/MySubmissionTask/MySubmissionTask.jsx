import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes for validation
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FixedSizeList as List } from "react-window";

const MySubmissionTask = () => {
  const axiosSecure = useAxiosSecure();
  const [submissions, setSubmissions] = useState([]);
  const { user } = useAuth();
  const email = user?.email;

  useEffect(() => {
    axiosSecure.get(`/workers/${email}`).then((res) => {
      setSubmissions(res.data);
    });
  }, [axiosSecure, email]);

  console.log(submissions);

  const Row = ({ index, style }) => {
    const task = submissions[index];
    return (
      <div style={style} className={`flex gap-4 items-center px-4 py-2 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
        <div className="w-1/12 font-medium">{index + 1}</div> 
        <div className="w-3/12 font-medium">{task?.task_title}</div>
        <div className="w-2/12">{new Date(task?.submissionDate).toLocaleDateString()}</div>
        <div className="w-4/12 ">{task?.submission_details}</div>
        <div className="w-2/12 font-medium">{task?.status || "pending"}</div>
      </div>
    );
  };

  Row.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        ---My Submission Task---
      </h2>
      <div className="divider"></div>

      {/* Submissions Table */}
      {submissions.length > 0 && (
        <div className="border border-gray-300 shadow-md rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="flex bg-primary text-white px-4 py-2">
            <div className="w-1/12">Serial No</div> 
            <div className="w-3/12">Task Title</div>
            <div className="w-2/12">Submission Date</div>
            <div className="w-4/12">Submission Details</div>
            <div className="w-2/12">Status</div>
          </div>
          {/* Table Body with react-window */}
          <List
            height={400} // Adjust height as needed
            itemCount={submissions.length}
            itemSize={50} // Adjust row height
            width="100%"
          >
            {Row}
          </List>
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
