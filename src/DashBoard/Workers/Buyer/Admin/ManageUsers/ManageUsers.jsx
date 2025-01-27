import { useQuery } from "@tanstack/react-query";
import { RiDeleteBin2Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  // Fetch users with react-query
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data.map((user) => ({
        ...user,
        role: user.role,
      }));
    },
  });
  // Handler to delete a user
  const handlerDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/users/${user._id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              refetch();
              Swal.fire("Deleted!", "User has been deleted.", "success");
            }
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete the user.", "error");
          });
      }
    });
  };

  // Handler to change role
  const handlerRoleChange = (user, newRole) => {
    axiosSecure
      .patch(`/users/admin/${user._id}`, { role: newRole })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Role updated to ${newRole}!`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      })
      .catch(() => {
        Swal.fire("Error!", "Failed to update the role.", "error");
      });
  };
  return (
    <div>
      <Helmet>
      <title>Micro Platform | ManageUsers</title>
      </Helmet>
      {users && users.length > 0 ? (
        <div className=" shadow-xl mx-auto">
          <h2 className="font-extrabold text-4xl">
            Total Users: {users.length}
          </h2>
          <div className="overflow-x-auto" style={{height:"100vh"}}>
            <table className="table-auto border-collapse w-full border border-gray-200">
              <thead className="bg-gray-200 sticky top-0 z-10 " >
                <tr>
                  <th className="border border-gray-300 px-4 py-4">#</th>
                  <th className="border border-gray-300 px-4 py-4">Photo</th>
                  <th className="border border-gray-300 px-4 py-4">Name</th>
                  <th className="border border-gray-300 px-4 py-4">Email</th>
                  <th className="border border-gray-300 px-4 py-4">Coins</th>
                  <th className="border border-gray-300 px-4 py-4">Role</th>
                  <th className="border border-gray-300 px-4 py-4">Actions</th>
                </tr>
              </thead>
              <tbody >
                {users.map((user, index) => (
                  <tr key={user._id} className="text-center">
                    <td className="border-b-2 border-gray-300 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border-b-2 border-gray-300 px-4 py-2">
                      <img
                        className="w-24 h-24 rounded-full"
                        src={user.photoURL || "https://via.placeholder.com/150"}
                        alt="User Avatar"
                      />
                    </td>
                    <td className="border-b-2 border-gray-300 px-4 py-2">
                      {user.name}
                    </td>
                    <td className="border-b-2 border-gray-300 px-4 py-2">
                      {user.email}
                    </td>
                    <td className="border-b-2 text-yellow-400 font-bold text-xl border-gray-300 px-4 py-2">
                      {user.coins || 0}
                    </td>
                    <td className="border-b-2 border-gray-300 px-4 py-2">
                      <select
                        value={user.role}  
                        onChange={(e) =>
                          handlerRoleChange(user, e.target.value)
                        }  
                        className="bg-gray-500 text-white px-2 py-1 rounded"
                      > 
                        <option value="Admin">Admin</option>
                        <option value="Buyer">Buyer</option>
                        <option value="Worker">Worker</option>
                      </select>
                    </td>
                    <td className="border-b-2 border-gray-300 px-4 py-2">
                      <button
                        onClick={() => handlerDeleteUser(user)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        <RiDeleteBin2Fill />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 text-xl mt-8">
          No users found.
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
