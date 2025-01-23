import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import Swal from "sweetalert2";
import signUPImg from "../../assets/signUp.json";
import Lottie from "lottie-react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

// Image Hosting Key
const Image_Hosting_Key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const Image_Hosting_Api = `https://api.imgbb.com/1/upload?key=${Image_Hosting_Key}`;

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { createUser, userUpdateProfile } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      // Handle file upload (task image)
      let photoURL = "";
      if (data.task_image?.[0]) {
        const imageFile = new FormData();
        imageFile.append("image", data.task_image[0]);
        const imageRes = await fetch(Image_Hosting_Api, {
          method: "POST",
          body: imageFile,
        });
        const imageData = await imageRes.json();
        if (imageData.success) {
          photoURL = imageData.data.display_url;
        }
      }

      // Password confirmation check
      if (data.password !== data.confirmPassword) {
        Swal.fire({
          title: "Error",
          text: "Passwords do not match!",
          icon: "error",
          confirmButtonText: "Ok",
        });
        return;
      }

      // Create User
      const result = await createUser(data.email, data.password);
      const loggedUser = result.user;
       console.log(loggedUser);
      // Update Profile
      await userUpdateProfile(data.name, photoURL);

      // Prepare user payload
      const coinAmount = data.role === "Worker" ? 10 : 50;
      const userPayload = {
        name: data.name,
        email: data.email,
        photoURL: photoURL,
        role: data.role,
        coins: coinAmount,
      };

      // Save user to the database
      const res = await axiosPublic.post("/users", userPayload);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Account Created Successfully!",
          icon: "success",
          confirmButtonText: "Ok",
        });
        reset();
        navigate("/dashboard");
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
      console.error("Error:", err.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Micro Tasking Platform | Sign Up</title>
      </Helmet>
      <div
        className="min-h-screen flex items-center justify-center bg-gray-100"
        style={{
          backgroundImage: `url('https://i.ibb.co/qdvwJSz/registerimg.webp')`,
        }}
      >
        <div className="flex flex-col md:flex-row items-center w-full max-w-5xl">
          {/* Form Container */}
          <div className="card bg-white shadow-lg rounded-lg p-8 w-full md:w-2/3">
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
              Create an Account
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <input
                  {...register("name", {
                    required: "Name is required",
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Name can only contain letters and spaces",
                    },
                  })}
                  type="text"
                  placeholder="Enter your full name"
                  className="input input-bordered input-primary"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Photo URL and Task Image */} 
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Task Image*</span>
                  </label>
                  <input
                    {...register("task_image", {
                      required: "Task image is required",
                    })}
                    type="file"
                    className={`file-input w-full max-w-xs ${
                      errors.task_image ? "border-red-500" : ""
                    }`}
                  />
                  {errors.task_image && (
                    <span className="text-red-500 text-sm">
                      {errors.task_image.message}
                    </span>
                  )}
                </div> 
              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered input-primary"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Role Selection */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Select Role</span>
                </label>
                <select
                  {...register("role", { required: "Role selection is required" })}
                  className="select select-bordered select-primary"
                >
                  <option value="">Choose your role</option>
                  <option value="Worker">Worker</option>
                  <option value="Buyer">Buyer</option>
                </select>
                {errors.role && (
                  <span className="text-red-500 text-sm">
                    {errors.role.message}
                  </span>
                )}
              </div>

              {/* Password and Confirm Password */}
              <div className="md:flex gap-8 items-center">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Password</span>
                  </label>
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                      maxLength: {
                        value: 10,
                        message: "Password must not exceed 10 characters",
                      },
                      pattern: {
                        value:
                          /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
                        message:
                          "Password must include one lowercase, one uppercase, one digit, and one special character",
                      },
                    })}
                    type="password"
                    placeholder="Enter your password"
                    className="input input-bordered input-primary"
                  />
                  {errors.password && (
                    <span className="text-red-500 text-sm">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Confirm Password</span>
                  </label>
                  <input
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                    })}
                    type="password"
                    placeholder="Confirm your password"
                    className="input input-bordered input-primary"
                  />
                  {errors.confirmPassword && (
                    <span className="text-red-500 text-sm">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn btn-primary w-full hover:bg-primary-focus"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>

          {/* Animation/Image Section */}
          <div className="hidden md:block md:w-1/3 bg-gray-100 ml-2 my-8">
            <Lottie animationData={signUPImg} />
            <div className="mt-4">
              <SocialLogin />
            </div>
            <p className="text-center mt-4 text-gray-950 font-bold p-6">
              Already have an account?{" "}
              <a href="/login" className="text-primary font-bold link-hover">
                Log in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
