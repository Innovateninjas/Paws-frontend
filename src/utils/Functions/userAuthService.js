import axios from "axios";
import isValidEmail from "./emailValidator";
import isValidPhoneNumber from "./phoneNumberValidator";
import requestPermission from "./notifyService";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";


/**
 * Performs a login request to the backend server.
 *
 * @param {string} email - The email address of the user trying to login.
 * @param {string} password - The password of the user trying to login.
 * @param {Function} setError - A function to set the error message in the component state.
 * @param {Function} setButtonState - A function to set the state of the login button (idle/loading/success/error).
 * @returns {void}
 */
export const googleLogin = async (setError, setButtonState) => {
  try {
    // Clear any previous error message and set button state to loading
    setError("");
    setButtonState("loading");

    const url = process.env.REACT_APP_BACKEND_URL;
    // Send a POST request to the registration endpoint with user data

    // Sign in with Google provider
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    // Extract user data from the authentication result
    const user = result.user;
    const name = user.displayName;
    const email = user.email;
    console.log(name, user, email);
    const response = await axios.post(`${url}/login/`, {
      email: email,
      password: "0000",
    });
    // Redirect or handle the successful signup process
    // For example, you can save user data to database and redirect user
    setButtonState("success");
    const token = response.data.token;
    const userType = response.data.is_ngo ? "ngo" : "user";
    requestPermission();
    if (userType === "ngo") {
      window.location.href = "/stats";
    } else {
      window.location.href = "/";
    }
    // Save token to local storage and redirect user to home page
    localStorage.setItem("csrftoken", token);
    localStorage.setItem("userType", userType);
  } catch (error) {
    // Set button state to error and handle error message
    setButtonState("error");
    if (error.response && error.response.data.error) {
      setError(error.response.data.error);
    } else if (error.message === "Network Error") {
      setError("Network error.Please check your internet connection.");
    } else {
      setError("An error occurred while logging in.");
    }
  }
};

export const login = async (email, password, setError, setButtonState) => {
  // Validate the email address
  if (!isValidEmail(email)) {
    setError("Enter a valid email address.");
    return;
  }

  try {
    // Clear any previous error message and set button state to loading
    setError("");
    setButtonState("loading");
    const url = process.env.REACT_APP_BACKEND_URL;
    // Send a POST request to the login endpoint with email and password
    const response = await axios.post(`${url}/login/`, {
      email,
      password,
    });

    // Set button state to success and extract token from response
    setButtonState("success");
    const token = response.data.token;
    const userType = response.data.is_ngo ? "ngo" : "user";
    requestPermission();
    if (userType === "ngo") {
      window.location.href = "/stats";
    } else {
      window.location.href = "/";
    }
    // Save token to local storage and redirect user to home page
    localStorage.setItem("csrftoken", token);
    localStorage.setItem("userType", userType);
  } catch (error) {
    // Set button state to error and handle error message
    setButtonState("error");
    if (error.response && error.response.data.error) {
      setError(error.response.data.error);
    } else if (error.message === "Network Error") {
      setError("Network error.Please check your internet connection.");
    } else {
      setError("An error occurred while logging in.");
    }
  }
};

/**
 * Performs a registration request to the backend server.
 *
 * @param {string} name - The full name of the user registering.
 * @param {number} phone_number - The phone number of the user registering.
 * @param {string} email - The email address of the user registering.
 * @param {string} password - The password of the user registering.
 * @param {Function} setError - A function to set the error message in the component state.
 * @param {Function} setButtonState - A function to set the state of the registration button (idle/loading/success/error).
 * @returns {void}
 * @throws {Error} Throws an error if the email or phone number is not valid or if there's an error during the registration process.
 */
export const registration = async (
  name,
  phone_number,
  email,
  password,
  setError,
  setButtonState
) => {

  try {
    // Clear any previous error message and set button state to loading
    //setError("");
    //setButtonState("loading");
    const url = process.env.REACT_APP_BACKEND_URL;
    // Send a POST request to the registration endpoint with user data
    const response = await axios.post(`${url}/register/user`, {
      name,
      phone_number,
      email,
      password,
    });

    // Set button state to success and initiate login
    //setButtonState("success");
    const token = response.data.token;
    localStorage.setItem("csrftoken", token);
    localStorage.setItem("userType", "user");
    return true;

  } catch (error) {
    return false;
  }
};

export const googleSignup = async (setError, setButtonState) => {
  try {
    // Clear any previous error message and set button state to loading
    setError("");
    setButtonState("loading");

    const url = process.env.REACT_APP_BACKEND_URL;
    // Send a POST request to the registration endpoint with user data

    // Sign in with Google provider
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    // Extract user data from the authentication result
    const user = result.user;
    const name = user.displayName;
    const email = user.email;
    console.log(name, user, email);
    const response = await axios.post(`${url}/register/user`, {
      name: name,
      phone_number: "0000000000",
      email: email,
      password: "0000",
    });
    // Redirect or handle the successful signup process
    // For example, you can save user data to database and redirect user
    setButtonState("success");
    const token = response.data.token;
    // Save token to local storage
    localStorage.setItem("csrftoken", token);
    localStorage.setItem("userType", "user");
    console.log("Google signup successful:", name, email);

    window.location.href = "/"; // Redirect to home page
  } catch (error) {
    // Set button state to error and handle error message
    setButtonState("error");
    console.error("Google signup error:", error.message);
    setError("An error occurred during signup.");
  }
};
