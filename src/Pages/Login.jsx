import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/userSlice.js";
import { useSelector } from "react-redux";
const Login = () => {
  const { authUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const emailRef = useRef();
  const usernameref = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      navigate("/home");
    }
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const username = usernameref.current.value;
    const password = passwordRef.current.value;
    const response = await axiosInstance.post("auth/login", {
      username: "mor_2314",
      password: "83r5^_",
    });
    console.log(response);
    if (response.status === 200) {
      dispatch(setUser(username));
      navigate("/home");
    }
    console.log("username:", username);
    console.log("Password:", password);
  };
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const username = usernameref.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const response = await axiosInstance.post("users", {
      username,
      email,
      password,
    });
    console.log(response.data.token);
    console.log("Email:", email);
    console.log("username:", username);
    console.log("Password:", password);
  };
  return (
    <div className="Login_Container  flex justify-center items-center  h-screen  bg-gradient-to-b from-[#fdf6e3] to-[#e7e7e7] ">
      {!toggle ? (
        <div className="Login  h-[70%] sm:w-[80%] md:w-[50%] lg:w-[40%]">
          <h1
            className=" text-center text-[2rem] font-medium"
            style={{ marginBottom: "4rem" }}
          >
            Login
          </h1>
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-3">
            <div className=" flex flex-col gap-4 mb-4">
              <label style={{ padding: "0 1rem" }} htmlFor="username">
                Username:
              </label>
              <input
                ref={usernameref}
                className=" bg-white rounded-full outline-none"
                style={{ padding: " 0.5rem" }}
                type="text"
                id="username"
                placeholder="mor_2314"
                name="username"
                required
              />
            </div>
            <div className=" flex flex-col gap-4 mb-4">
              <label style={{ padding: "0 1rem" }} htmlFor="password">
                Password:
              </label>
              <input
                ref={passwordRef}
                className=" bg-white rounded-full outline-none"
                style={{ padding: " 0.5rem" }}
                type="password"
                id="password"
                placeholder="83r5^_"
                name="password"
                required
              />
            </div>

            <button
              className="bg-[#f6d15c] w-fit rounded-lg self-center"
              style={{ padding: "0.5rem 1rem" }}
              type="submit"
            >
              Login
            </button>
          </form>
          <div
            style={{ marginTop: "2rem" }}
            className="flex flex-col items-center gap-2 "
          >
            <p className="text-center text-sm mt-4">Don't have an account?</p>
            <button
              className="text-center text-sm text-[#235af3] underline w-fit"
              onClick={() => {
                setToggle((prev) => !prev);
              }}
            >
              Sign Up
            </button>
          </div>
          <div
            className="flex justify-between  w-full"
            style={{ marginTop: "2rem", padding: "1rem" }}
          >
            <p className=" text-[0.6rem] underline">Privacy and Policy</p>
            <p className="text-[0.6rem]  underline">Terms and Conditions</p>
          </div>
        </div>
      ) : (
        <div className="Signup  h-[70%] sm:w-[80%] md:w-[50%] lg:w-[40%]">
          <h1
            className=" text-center text-[2rem] font-medium"
            style={{ marginBottom: "4rem" }}
          >
            SignUp
          </h1>
          <form onSubmit={handleSignupSubmit} className="flex flex-col gap-3">
            <div className=" flex flex-col gap-4 mb-4">
              <label style={{ padding: "0 1rem" }} htmlFor="username">
                Username:
              </label>
              <input
                ref={usernameref}
                className=" bg-white rounded-full outline-none"
                style={{ padding: " 0.5rem" }}
                type="text"
                id="username"
                name="username"
                required
              />
            </div>
            <div className=" flex flex-col gap-4 mb-4">
              <label style={{ padding: "0 1rem" }} htmlFor="email">
                Email:
              </label>
              <input
                ref={emailRef}
                className=" bg-white rounded-full outline-none"
                style={{ padding: " 0.5rem" }}
                type="email"
                id="email"
                name="email"
                required
              />
            </div>
            <div className=" flex flex-col gap-4 mb-4">
              <label style={{ padding: "0 1rem" }} htmlFor="password">
                Password:
              </label>
              <input
                ref={passwordRef}
                className=" bg-white rounded-full outline-none"
                style={{ padding: " 0.5rem" }}
                type="password"
                id="password"
                name="password"
                required
              />
            </div>

            <button
              className="bg-[#f6d15c] w-fit rounded-lg self-center"
              style={{ padding: "0.5rem 1rem" }}
              type="submit"
            >
              SignUp
            </button>
          </form>
          <div
            style={{ marginTop: "2rem" }}
            className="flex flex-col items-center gap-2 "
          >
            <p className="text-center text-sm mt-4">
              Already Having an account?
            </p>
            <button
              className="text-center text-sm text-[#235af3] underline w-fit"
              onClick={() => {
                setToggle((prev) => !prev);
              }}
            >
              Login
            </button>
          </div>
          <div
            className="flex justify-between  w-full"
            style={{ marginTop: "2rem", padding: "1rem" }}
          >
            <p className=" text-[0.6rem] underline">Privacy and Policy</p>
            <p className="text-[0.6rem]  underline">Terms and Conditions</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
