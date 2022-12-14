import React, { useState, useEffect } from "react";
import authSvg from "../../../public/assests/auth.svg";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import jwt from "jsonwebtoken";
import { authenticate, isAuth } from "../../../utils/auth";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
const Activate = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(null);

  setTimeout(() => {
    if (error !== null || success !== null) {
      setError(null);
      setSuccess(null);
    }
  }, [4000]);

  useEffect(() => {
    if (router.isReady) {
      const { activate } = router.query;
      let token = activate;
      let { name } = jwt.decode(token);
      if (token) {
        setFormData({ ...formData, name, token });
      }
      // console.log(token, name);
    }
  }, [router.isReady]);

  const [formData, setFormData] = useState({
    name: "",
    token: "",
    show: true,
  });

  const { name, token, show } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:5000/api/activation`, {
        token,
      })
      .then((res) => {
        setFormData({
          ...formData,
          show: false,
        });

        toast.success(res.data.message);
        setSuccess(res.data.message);
        router.push("/user/login");
      })
      .catch((err) => {
        toast.error(err.response.data.errors);
        setError(err.response.data.errors);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      {/* <ToastContainer /> */}
      <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Welcome {name}
            </h1>
            <br />
            {error && <div className="text-red-400 text-bold">{error}</div>}
            {success && <div className="text-green-500">{success}</div>}
            <form
              className="w-full flex-1 mt-8 text-indigo-500"
              onSubmit={handleSubmit}
            >
              <div className="mx-auto max-w-xs relative ">
                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <i className="fas fa-user-plus fa 1x w-6  -ml-4" />
                  <span>Activate your Account</span>
                </button>
              </div>
              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or sign up again
                </div>
              </div>
              <div className="flex flex-col items-center">
                <Link href="/user/register" target="_self">
                  <a
                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3
                  bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5"
                  >
                    <i className="fas fa-sign-in-alt fa 1x w-6  -ml-4 text-indigo-500" />
                    <span>Sign Up</span>
                  </a>
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${authSvg})` }}
          ></div>
        </div>
      </div>
      ;
    </div>
  );
};

export default Activate;
