import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";

import { USERNAME_REGEX, PASSWORD_REGEX } from "../../utils/regexes/userRegex";

const REGISTER_URL = "/auth/register";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postObj = JSON.stringify({
      email: username,
      password: password,
    });

    try {
      await axios.post(REGISTER_URL, postObj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setErrorMessage("Registration succesful");
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  };

  return (
    <section className="bg-secondaryblue h-screen">
      <form onSubmit={handleSubmit} className="my-auto pt-6 h-full">
        <div className="flex flex-col space-y-4 border mx-auto border-darkcl shadow rounded-md bg-white sm:w-5/12">
          <div className="text-center">
            <p className="text-2xl pt-2">Register</p>
          </div>
          <div className="w-10/12 mx-auto">
            <label className="block" htmlFor="username">
              Username:
            </label>
            <input
              className="rounded-xl pl-2 border shadow w-full h-8"
              type="text"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div className="w-10/12 mx-auto">
            <label className="block" htmlFor="password">
              Password:
            </label>
            <input
              className="rounded-xl pl-2 border shadow w-full h-8"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="w-10/12 mx-auto">
            <label className="block" htmlFor="rePassword">
              Re-enter password:
            </label>
            <input
              className="rounded-xl pl-2 border shadow w-full h-8"
              type="password"
              id="rePassword"
              onChange={(e) => setRePassword(e.target.value)}
            ></input>
          </div>
          <div className="w-10/12 mx-auto text-center">
            <p className="text-xs">(password recovery question)</p>
            <label className="block" htmlFor="rePassword">
              What's your favourite food?
            </label>
            <input
              className="rounded-xl pl-2 border shadow w-full h-8"
              type="password"
              id="rePassword"
              onChange={(e) => setRePassword(e.target.value)}
            ></input>
          </div>
          <div className="w-10/12 mx-auto text-center">
            <p className="text-xs">(password recovery question)</p>
            <label className="block" htmlFor="rePassword">
              What's your pet's name?
            </label>
            <input
              className="rounded-xl pl-2 border shadow w-full h-8"
              type="password"
              id="rePassword"
              onChange={(e) => setRePassword(e.target.value)}
            ></input>
          </div>
          <div className="text-center">
            <p>{errorMessage}</p>
          </div>
          <div className="text-center">
            <button
              className="border border-darkcl px-4 py-2 rounded-xl shadow"
              disabled={false}
            >
              Sign up
            </button>
          </div>
          <div className="text-center px-2">
            Already have an account? &nbsp;
            <span className="font-bold underline">
              <Link to="/login">Sign in</Link>
            </span>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Registration;
