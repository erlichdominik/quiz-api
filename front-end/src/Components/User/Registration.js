import React, { useState, useEffect, useRef } from 'react';
import { USERNAME_REGEX, PASSWORD_REGEX } from '../../utils/regexes/userRegex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Registration = () => {
  // refs
  const usernameRef = useRef();
  const errorRef = useRef();

  // username
  const [username, setUsername] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  // password
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  // re-typed password
  const [rePassword, setRePassword] = useState('');
  const [arePasswordsMatching, setArePasswordsMatching] = useState(false);
  const [rePasswordFocus, setRePasswordFocus] = useState(false);

  // error messages
  const [errorMessage, setErrorMessage] = useState('');

  // registration
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // focus username field when component loads
  useEffect(() => {
    usernameRef.current.focus();
  });

  // handle username change and validate the username
  useEffect(() => {
    const validationResult = USERNAME_REGEX.test(username);

    console.log(validationResult);
    console.log(username);

    setIsUsernameValid(validationResult);
  }, [username]);

  // handle passwords change and validate the passwords
  useEffect(() => {
    const validationResult = PASSWORD_REGEX.test(password);

    console.log(validationResult);
    console.log(password);

    setIsPasswordValid(validationResult);
    const doPasswordsMatch = password === rePassword;

    setArePasswordsMatching(doPasswordsMatch);
  }, [password, rePassword]);

  // clear the error message after input from the user
  useEffect(() => {
    setErrorMessage('');
  }, [username, password, arePasswordsMatching]);

  return (
    <section>
      <form className="text-xl w-1/4 mx-auto bg-blue-300 border-blue-500 border-2 rounded-md">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-center text-4xl pt-2">Register</h1>
          <p
            className={
              errorMessage
                ? 'text-lg text-red-500 py-2'
                : 'text-lg text-red-500 py-2'
            }
            ref={errorRef}
          >
            {errorMessage}
          </p>
          <div className="">
            <label htmlFor="username" className="block pl-1">
              Username:
            </label>
            <input
              className="w-full rounded-xl pl-2"
              type="text"
              id="username"
              ref={usernameRef}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setUsernameFocus(true)}
              onBlur={() => setUsernameFocus(false)}
              autoComplete="off"
            ></input>
            <p
              className={
                usernameFocus && username && !isUsernameValid
                  ? 'text-sm text-slate-800'
                  : 'hidden'
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8-20 characters long <br /> No special characters at the end or
              start
            </p>
          </div>
          <div className="">
            <label htmlFor="password" className="block pl-1">
              Password:
            </label>
            <input className=" w-full rounded-xl pl-2" type="password" />
          </div>
          <div className="">
            <label htmlFor="re-enter password" className="block pl-1">
              Re-enter password:
            </label>
            <input type="password" className=" w-full rounded-xl pl-2" />
          </div>
          <div>
            <button className="text-white bg-blue-400 px-3 border-blue-400 border-2 rounded-xl hover:bg-blue-300 transition">
              Sign up
            </button>
          </div>
          <div>
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
