import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styles from "./LoginRegister.module.css";
import InputField from "../InputsFields/bigInputs";
import Checkbox from "../CheckBoxes/Checkbox";
import ReactiveButton from 'reactive-button';
import isValidEmail from "../utils/Functions/emailValidator";
import isValidPhoneNumber from "../utils/Functions/phoneNumberValidator";

function LoginRegisterForm() {
    const location = useLocation();
    let isRegistration = false;
    let isLogin = true;
    if (location.pathname === "/register") {
        isRegistration = true;
        isLogin = false;
    }

    const customButtonStyle = {
        borderRadius: '14px',
        background: '#333333',
        padding: '10px 85px',
        marginTop: '0.675rem',
        fontSize: '19px',
        fontWeight: '700',
    };
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isNGO, setIsNGO] = useState(false);
    const [error, setError] = useState("");
    const [state, setButtonState] = useState('idle');

    const handleLogin = async () => {
        if (!isValidEmail(email)) {
            setError("Enter a valid email address.");
            return;
        }

        try {
            setError("") // clearing the previous error if any 
            setButtonState('loading');
            const response = await axios.post(
                "https://aniresfr-backend.vercel.app/login/",
                {
                    username: email,
                    password: password
                }
            );
            setButtonState('success');
            const token = response.data.token;
            console.log("Login successful, csrftoken:", token);
            localStorage.setItem("csrftoken", token);
            window.location.href = "/";
        } catch (error) {
            setButtonState("error");
            if (error.response && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError("An error occurred while logging in.");
            }
        }
    }

    const handleRegistration = async () => {

        if (!isValidEmail(email)) {
            setError("Enter a valid email address.");
            return;
        }
        if (!isValidPhoneNumber(phoneNumber)) {
            setError("Enter a valid  phone number.");
            return;
        }
        try {
            setError("") // clearing the previous error if any 
            setButtonState('loading');
            await axios.post(
                "https://aniresfr-backend.vercel.app/register/",
                {
                    fullName,
                    phoneNumber,
                    email,
                    password,
                    userType: isNGO ? 'ngo' : 'user',
                }
            );
            setButtonState('success');
            handleLogin()
        } catch (error) {
            setButtonState('error');
            if (error.response && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError("An error occurred while registering.");
            }
        }
    };

    return (
        <div className={styles.container}>
            <img src="./images/paw.png" alt="paw img" className={styles.paw1} />
            <form >
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
                {isLogin && <h1 className={styles.heading}> Welcome Back</h1>}
                <InputField
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                        <div className={styles.wrap}>


                            <Checkbox
                                checked={isNGO}
                                onChange={() => setIsNGO(!isNGO)}
                                label="Register as NGO/Govt Body"
                                style={{ marginRight: "10px" }}
                            />
                            <ReactiveButton
                                style={customButtonStyle}
                                buttonState={state}
                                idleText="Register"
                                loadingText="wait.."
                                successText="Logging In"
                                errorText="Register"
                                messageDuration={3000}
                                shadow
                                onClick={handleRegistration}
                            /></div>
                    </>
                )}
                {isLogin && (
                    <ReactiveButton
                        style={customButtonStyle}
                        buttonState={state}
                        idleText="Login"
                        loadingText="wait.."
                        successText="Logging In"
                        errorText="Login"
                        onClick={handleLogin}
                    />
                )}
            </form>

            {error && <p className={styles.errtext} >{error}</p>}
            <img src="./images/paw.png" alt="paw img" className={styles.paw2} />
        </div>
    );
}

export default LoginRegisterForm;
