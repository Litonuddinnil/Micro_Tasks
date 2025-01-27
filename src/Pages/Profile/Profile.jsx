import { Helmet } from "react-helmet";
import useUser from "../../hooks/useUser";

const Profile = () => {
  const [userData] = useUser(); 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Helmet>
        <title>Micro Platform | My Profile</title>
        </Helmet>
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-sky-600 mb-6 md:ml-8 text-center">
          My Profile Dashboard
        </h1>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-shrink-0">
            <img
              className="w-42 h-42 md:w-64 md:h-64 rounded-full object-cover shadow-lg"
              src={userData?.photoURL || "https://via.placeholder.com/150"}
              alt="User Profile"
            />
          </div>
          <div className="text-center md:text-left space-y-4">
            <h2 className="text-2xl font-semibold">
              <span className="text-gray-600">Name:</span>{" "}
              <span className="text-gray-800">{userData?.name || "N/A"}</span>
            </h2>
            <p className="text-xl">
              <span className="text-gray-600">Email:</span>{" "}
              <span className="text-gray-800">{userData?.email || "N/A"}</span>
            </p>
            <p className="text-xl">
              <span className="text-gray-600">Role:</span>{" "}
              <span className="text-gray-800">{userData?.role || "N/A"}</span>
            </p>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default Profile;
