import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../components/Logo";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();
    const [isPasswordMatched, setIsPasswordMatched] = useState({
        status: true,
        message: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        // password: A@1abcde
        const { username, email, password, confirmPassword } = data;

        if (password !== confirmPassword) {
            setIsPasswordMatched({
                status: false,
                message: "Both password not matched.",
            });
            return;
        } else {
            setIsLoading(true);
            const user = { username, email, password };
            // posting
            try {
                const response = await axios.post(
                    "https://full-stack-job-portal-server.vercel.app/api/v1/auth/register",
                    user
                );

                Swal.fire({
                    icon: "success",
                    title: "Hurray...",
                    text: response?.data?.message,
                });
                reset();
                navigate("/login");
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error?.response?.data,
                });
            }
        }
        setIsLoading(false);
    };

    // to hide the popup
    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsPasswordMatched({ status: true, message: "" });
        }, 2000);

        return () => {
            clearInterval(intervalId); // Clear the interval on component unmount or when dependencies change
        };
    }, [isPasswordMatched.status]);

    return (
        <Wrapper>
            <div className="container">
                <div className="flex justify-center">
                    <Logo />
                </div>
                <h1>Create Account</h1>
                {!isPasswordMatched?.status && (
                    <p className="text-[11px] font-semibold text-center text-red-700 bg-red-100 px-1 py-2 mt-4 tracking-wider">
                        both password not matched
                    </p>
                )}
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <div className="row">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            autoComplete="off"
                            placeholder="Type Here"
                            {...register("username", {
                                required: {
                                    value: true,
                                    message: "Username is required",
                                },
                                maxLength: {
                                    value: 30,
                                    message: "Username is too long(max 30char)",
                                },
                                minLength: {
                                    value: 3,
                                    message:
                                        "Username is too short (min 3char)",
                                },
                                pattern: {
                                    value: /^[A-Za-z][A-Za-z0-9_]*$/,
                                    message:
                                        "Username can't start with number and special characters",
                                },
                            })}
                        />
                        {errors?.username && (
                            <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                {errors?.username?.message}
                            </span>
                        )}
                    </div>
                    <div className="row">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email@example.com"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "A valid email is required",
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                                    message: "Enter a valid email",
                                },
                            })}
                        />
                        {errors?.email && (
                            <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                {errors?.email?.message}
                            </span>
                        )}
                    </div>
                    <div className="row">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Type Here"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "Password is required",
                                },
                                maxLength: {
                                    value: 20,
                                    message: "Password is too long(max 20char)",
                                },
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password is too short (min 8char)",
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/,
                                    message:
                                        "At least one uppercase,one special char and one number",
                                },
                            })}
                        />
                        {errors?.password && (
                            <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                {errors?.password?.message}
                            </span>
                        )}
                    </div>
                    <div className="row">
                        <label htmlFor="password">Confirm Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Type Here"
                            {...register("confirmPassword", {
                                required: {
                                    value: true,
                                    message: "Password is required",
                                },
                            })}
                        />
                        {errors?.confirmPassword && (
                            <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                {errors?.confirmPassword?.message}
                            </span>
                        )}
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? "Loading..." : "Register"}
                        </button>
                    </div>
                </form>
                <div className="">
                    <p className="text-center text-[10px] font-semibold opacity-9 mt-3">
                        Already have an account.
                        <Link className="ml-1 link" to="/login">
                            Login now
                        </Link>
                    </p>
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    background: #f9faff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
    .container {
        background: var(--color-white);
        max-width: 360px;
        width: 100%;
        padding: 58px 44px;
        border: 1px solid #e1e2f0;
        border-radius: 4px;
        box-shadow: 0 0 5px 0 rgba(42, 45, 48, 0.12);
        transition: all 0.3s ease;
    }
    h1 {
        margin-top: 20px;
        text-align: center;
        text-transform: capitalize;
        font-size: calc(1rem + 0.3vw);
        font-weight: 600;
        color: var(--color-primary);
    }
    form {
        margin-top: calc(0.8rem + 0.7vw);
    }

    .row {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }

    .row label {
        font-size: 12px;
        color: var(--color-black);
        font-weight: 400;
        margin-bottom: 2px;
    }

    .row input {
        flex: 1;
        padding: 8px 10px;
        border: 1px solid #d6d8e6;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
        transition: all 0.2s ease-out;
    }

    .row input:focus {
        outline: none;
        box-shadow: inset 2px 2px 5px 0 rgba(42, 45, 48, 0.12);
    }

    .row input::placeholder {
        color: var(--color-black);
        opacity: 0.7;
    }

    button {
        width: 50%;
        min-width: 100px;
        padding: 8px;
        font-size: 16px;
        letter-spacing: 1px;
        background: var(--color-accent);
        color: var(--color-white);
        border: none;
        border-radius: 6px;
        cursor: pointer;
        margin: 15px auto 0;
        transition: background 0.2s ease-out;
    }

    button:hover {
        background: var(--color-primary);
    }
    button:disabled {
        background: var(--color-gray);
        color: var(--color-black);
        cursor: not-allowed;
    }

    @media (max-width: 458px) {
        .container {
            width: 90%;
            padding: 30px 0;
        }
        form {
            padding: 0 20px;
        }
    }
    p .link {
        text-transform: capitalize;
        color: var(--color-primary);
    }
    p .link:hover {
        text-decoration: underline;
    }
`;

export default Register;
