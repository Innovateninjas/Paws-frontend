import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./LoginRegister.module.css";
import InputField from "../../Components/InputsFields/bigInputs";
import ReactiveButton from 'reactive-button';
import { login, registration } from "../../Components/utils/Functions/userAuthService";
import LoginTextLink from "../../Components/LoginLinkText/LoginTextLink";
function LoginRegisterForm() {
    const location = useLocation();

    let isLogin = true;
    if (location.pathname === "/register") {
        isLogin = !isLogin;
    }

    const customButtonStyle = {
        borderRadius: '14px',
        background: '#333333',
        padding: '10px 85px',
        marginTop: '0.675rem',
        fontSize: '19px',
        fontWeight: '700',
    };
    const [name, setname] = useState("");
    const [phone_number, setPhone_number] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [state, setButtonState] = useState('idle');


    return (
        <div className={styles.container}>
            <img src="./images/paw.png" alt="paw img" className={styles.paw1} />
            <form >
                {!isLogin && (
                    <>
                        <h1 className={styles.heading}>Create account</h1>
                        <InputField
                            className="flex h-16 w-72 items-center justify-center px-4 py-2 border border-gray-400 bg-gray-300 shadow-md m-0.5 rounded-2xl text-black text-lg"
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => {
                                setError("");
                                setname(e.target.value);
                            }}
                            required
                        />
                        <InputField
                            className="flex h-16 w-72 items-center justify-center px-4 py-2 border border-gray-400 bg-gray-300 shadow-md m-0.5 rounded-2xl text-black text-lg"
                            type="tel"
                            placeholder="Phone Number"
                            value={phone_number}
                            onChange={(e) => {
                                setError("");
                                setPhone_number(e.target.value);
                            }}
                            required
                        />
                    </>
                )}
                {isLogin && <h1 className={styles.heading}> Welcome Back</h1>}
                <InputField
                    className="flex h-16 w-72 items-center justify-center px-4 py-2 border border-gray-400 bg-gray-300 shadow-md m-0.5 rounded-2xl text-black text-lg"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                        setError("");
                        setEmail(e.target.value);
                    }}
                    required
                />
                <InputField
                    className="flex h-16 w-72 items-center justify-center px-4 py-2 border border-gray-400 bg-gray-300 shadow-md m-0.5 rounded-2xl text-black text-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setError("");
                        setPassword(e.target.value);
                    }}
                    required
                />
                {!isLogin && (
                    <>
                    <LoginTextLink
                        bottomPosition={"-14%"} 
                        />
                        <LoginTextLink
                            text={"Are you an NGO ?"}
                            link={"/ngoregister"}
                            linkText={"Register Here!"}
                            bottomPosition={"-20%"}
                            leftPosition={"7%"}
                             />
                            </>
                )}
                {!isLogin && (
                    <>
                        <div className={styles.wrap}>


                            <ReactiveButton
                                style={customButtonStyle}
                                buttonState={state}
                                idleText="Register"
                                loadingText="wait.."
                                successText="Logging In"
                                errorText="Register"
                                messageDuration={3000}

                                onClick={
                                    async () => registration(name,
                                        phone_number,
                                        email,
                                        password,
                                        setError,
                                        setButtonState)
                                }
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
                        onClick={
                            async () => login(email,
                                password,
                                setError,
                                setButtonState)
                        }
                    />
                )}
            </form>

            {error && <p className={styles.errtext} >{error}</p>}
            <img src="./images/paw.png" alt="paw img" className={styles.paw2} />
        </div>
    );
}

export default LoginRegisterForm;
