import { useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const Login = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [captchaMessage, setCaptchaMessage] = useState("");
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    loadCaptchaEnginge(6); // Load a 6-character captcha
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signInUser(email, password);
    if(result){
        Swal.fire({
            title: "Successfully Logged In!",
            icon: "success",
            confirmButtonText: "OK",
          });
          navigate(from, { replace: true });
    }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  const handleCaptchaValidate = (e) => {
    const captchaValue = e.target.value;
    if (validateCaptcha(captchaValue)) {
      setIsDisabled(false);
      setCaptchaMessage("Captcha Matched ✅");
    } else {
      setIsDisabled(true);
      setCaptchaMessage("Captcha Does Not Match ❌");
    }
  };

  return (
    <>
      <Helmet>
        <title>Micro Tasking Platform | Login</title>
      </Helmet>

      <div className="hero bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 min-h-screen flex items-center justify-center">
        <div className="card bg-white shadow-lg rounded-md p-5 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center text-indigo-600 mb-4">
            Login to Your Account
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control">
              <label className="text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="input input-bordered input-sm w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="text-sm font-medium mb-1">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                className="input input-bordered input-sm w-full"
                required
              />
              <a
                href="#"
                className="text-xs text-primary mt-1 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <div className="form-control">
              <label className="text-sm font-medium mb-1">Captcha</label>
              <LoadCanvasTemplate />
              <input
                name="captcha"
                type="text"
                onBlur={handleCaptchaValidate}
                placeholder="Type the captcha above"
                className="input input-bordered input-sm w-full mt-2"
                required
              />
              {captchaMessage && (
                <p
                  className={`text-xs mt-1 ${
                    isDisabled ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {captchaMessage}
                </p>
              )}
            </div>

            <div className="form-control mt-4">
              <button
                type="submit"
                disabled={isDisabled}
                className="btn btn-primary btn-sm w-full disabled:opacity-50"
              >
                Login
              </button>
            </div>
          </form>

          <SocialLogin />

          <p className="text-center text-xs text-gray-600 mt-3">
            Don not have an account?{" "}
            <a
              href="/register"
              className="text-primary font-medium hover:underline"
            >
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
