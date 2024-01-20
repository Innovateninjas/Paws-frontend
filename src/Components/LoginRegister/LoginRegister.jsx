import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styles from "./LoginRegister.module.css";
import InputField from "../InputsFields/bigInputs";

function LoginRegisterForm() {
    const location = useLocation();
    let isRegistration = false;
    let isLogin = true;
    if (location.pathname === "/register") {
        isRegistration = true;
        isLogin = false;
    }

    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Enter a valid email address.");
            return;
        }
        if (isRegistration) {
            // Phone number validation (10 digits only)
            const phoneRegex =
                /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            if (!phoneRegex.test(phoneNumber)) {
                setError("Enter a valid  phone number.");
                console.log("wrog ph");
                return;
            }

            try {
                await axios.post(
                    "https://aniresfr-backend.vercel.app/register/",
                    {
                        fullName,
                        phoneNumber,
                        email,
                        password,
                    }
                );
                alert("Registration successful");
                // convert this alert into toast.succes() notificication using ReactToastify
                setSuccess("Registration successful. You can now login.");
            } catch (error) {
                if (error.response && error.response.data.error) {
                    setError(error.response.data.error);
                } else {
                    setError("An error occurred while registering.");
                }
            }
        } else {
            try {
                const response = await axios.post(
                    "https://aniresfr-backend.vercel.app/login/",
                    { email, password }
                );
                const token = response.data.token;
                console.log("Login successful, csrftoken:", token);
                localStorage.setItem("csrftoken", token);
                window.location.href = "/";
            } catch (error) {
                if (error.response && error.response.data.error) {
                    setError(error.response.data.error);
                } else {
                    setError("An error occurred while logging in.");
                }
            }
        }
    };

    return (
        <div className={styles.container}>
            <img src="./images/paw.png" alt="paw img" className={styles.paw1} />
            <form onSubmit={handleSubmit}>
                {isRegistration && (
                    <>
                        <h1 className={styles.heading}>Create account</h1>
                        <InputField
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                        <InputField
                            type="tel"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </>
                )}
                {isLogin && <h1 className={styles.heading }> Welcome Back</h1>}
                <InputField
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
                <InputField
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {isRegistration && (
                    <p className={styles.text}>
                        Already have an account? 
                        <Link to="/login" className={styles.LoginNow}>
                        Login now!
                        </Link>
                    </p>
                )}
                {isRegistration && (
                    <>
                        <button type="submit" className={styles.btn}>
                            Register
                        </button>
                    </>
                )}
                {isLogin && (
                    <button type="submit" className={styles.btn}>
                        Login
                    </button>
                )}
            </form>
            {success && (
                <Link to="/login">
                    <button>Login</button>
                </Link>
            )}

            {error && <p className={styles.errtext} >{error}</p>}
            <img src="./images/paw.png" alt="paw img" className={styles.paw2} />
        </div>
    );
}

export default LoginRegisterForm;
