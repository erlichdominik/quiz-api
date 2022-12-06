import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';

const REGISTER_URL = '/auth/register';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postObj = JSON.stringify({
      email: email,
      password: password,
    });

    try {
      const response = await axios
        .post(REGISTER_URL, postObj, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="bg-secondaryblue w-screen h-screen">
        <form onSubmit={handleSubmit} className="pt-16">
          <div className="flex flex-col space-y-4 border w-5/12 mx-auto border-darkcl shadow rounded-md bg-white">
            <div className="text-center">
              <p className="text-2xl pt-2">Register</p>
            </div>
            <div className="w-10/12 mx-auto">
              <label className="block" htmlFor="email">
                Email:
              </label>
              <input
                className="rounded-xl pl-2 border shadow w-full h-8"
                type="text"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
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
            <div className="py-2 text-center">
              <button className="border border-darkcl px-4 py-2 rounded-xl shadow">
                Sign up
              </button>
            </div>
            <div className="text-center">
              Already have an account? &nbsp;
              <span className="font-bold underline">
                <Link to="/login">Sign in</Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Registration;
