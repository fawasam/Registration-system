import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { authenticate, isAuth } from "../../utils/auth";
import { GoogleLogin } from "react-google-login";
import "react-toastify/dist/ReactToastify.css";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useRouter } from "next/router";
const Login = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    textChange: "Sign In",
  });
  const { email, password1, textChange } = formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  setTimeout(() => {
    if (error !== null || success !== null) {
      setError(null);
      setSuccess(null);
    }
  }, [4000]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password1) {
      setFormData({ ...formData, textChange: "Submitting" });
      axios
        .post(`http://localhost:5000/api/login`, {
          email,
          password: password1,
        })
        .then((res) => {
          authenticate(res, () => {
            setFormData({
              ...formData,
              email: "",
              password1: "",
              textChange: "Submitted",
            });
            isAuth() && isAuth().role === "admin"
              ? router.push("/admin")
              : router.push("/user/register");
            toast.success(`Hey ${res.data.user.name}, Welcome back!`);
            setSuccess(`Hey ${res.data.user.name}, Welcome back!`);
          });
        })
        .catch((err) => {
          setFormData({
            ...formData,
            email: "",
            password1: "",
            textChange: "Sign In",
          });
          toast.error(err.response.data.errors);
          setError(err.response.data.errors);
        });
    } else {
      toast.error("Please fill all fields");
      setError("Please fill all fields");
    }
  };
  useEffect(() => {
    if (isAuth()) {
      router.push("/");
    }
  }, [isAuth]);
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      {/* <ToastContainer /> */}
      <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Sign In for Congar
            </h1>
            <br />

            {error && <div className="text-red-400 text-bold">{error}</div>}
            {success && <div className="text-green-500">{success}</div>}

            <div className="w-full flex-1 mt-8 text-indigo-500">
              <div className="flex flex-col items-center">
                <Link href="/user/register">
                  <a
                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3
                  bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5"
                    target="_self"
                  >
                    <i className="fas fa-user-plus fa 1x w-6  -ml-2 text-indigo-500" />
                    <span>Sign Up</span>
                  </a>
                </Link>
              </div>
              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or sign In with e-mail
                </div>
              </div>
              <form
                className="mx-auto max-w-xs relative "
                onSubmit={handleSubmit}
              >
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange("email")}
                  value={email}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange("password1")}
                  value={password1}
                />
                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <i className="fas fa-sign-in-alt  w-6  -ml-2" />
                  <span>Sign In</span>
                </button>
                <Link href="/user/password/forget">
                  <a className="no-underline hover:underline text-indigo-500 text-md text-right absolute right-0  mt-2">
                    Forget password?
                  </a>
                </Link>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: "url(/assests/login.svg)",
              backgroundPosition: `center`,
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
      </div>
      ;
    </div>
  );
};

export default Login;
