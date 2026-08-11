"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { dmSans } from "@/lib/font";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function LoginForm() {

    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({});

    const validate = (email, password) => {
        const error = {};

        if (!email.trim()) {
            error.email = "Email is required";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ) {
            error.email = "Please enter a valid email";
        }

        if (!password.trim()) {
            error.password = "Password is required";
        } else if (password.length < 6) {
            error.password = "Password must be at least 6 characters";
        }

        return error;
    };

    const handleLogIn = async (e) => {
        e.preventDefault();

        const form = e.target;

        const email = form.email.value;

        const password = form.password.value;

        const validationErrors = validate(email, password);

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length) return;

        setLoading(true);

        const { data, error } = await authClient.signIn.email({
            email,
            password,
            rememberMe: true,
        });

        if (error) {
            toast.error(error.message);
            return;
        }

        toast.success("Log In Successful");
            router.push("/")
    }

    return (
        <div className={`w-full max-w-md ${dmSans.className}`}>

            {/* Card */}

            <div className="rounded-3xl border border-[#E6DED2] bg-white p-8 shadow-xl">

                {/* Heading */}

                <div className="mb-8 text-center">

                    <h2 className="text-4xl font-bold text-primary-800">
                        Welcome Back
                    </h2>

                    <p className="mt-3 text-earth-500">
                        Login to continue your adoption journey.
                    </p>

                </div>

                {/* Form */}

                <form
                    onSubmit={handleLogIn}
                    className="space-y-6"
                >

                    {/* Email */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-primary-800">
                            Email Address
                        </label>

                        <div className="relative">

                            <Mail
                                size={20}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-500"
                            />

                            <input
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                className="h-14 w-full rounded-xl border border-earth-400 bg-earth-50 pl-12 pr-4 outline-none transition focus:border-primary-800"
                            />

                        </div>

                        {errors.email && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.email}
                            </p>
                        )}

                    </div>

                    {/* Password */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-primary-800">
                            Password
                        </label>

                        <div className="relative">

                            <Lock
                                size={20}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-500"
                            />

                            <input
                                name="password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter your password"
                                className="h-14 w-full rounded-xl border border-earth-400 bg-earth-50 px-12 outline-none transition focus:border-primary-800"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-earth-500"
                            >
                                {showPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>

                        </div>

                        {errors.password && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.password}
                            </p>
                        )}

                    </div>

                    {/* Remember */}

                    <div className="flex items-center justify-between">

                        <label className="flex items-center gap-2">

                            <input
                                type="checkbox"
                                className="checkbox checkbox-sm border-primary-800"
                            />

                            <span className="text-sm text-earth-600">
                                Remember me
                            </span>

                        </label>

                        <Link
                            href="/forgot-password"
                            className="text-sm font-semibold text-secondary-700 hover:underline"
                        >
                            Forgot Password?
                        </Link>

                    </div>

                    {/* Login */}

                    <button
                        disabled={loading}
                        className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary-800 via-[#2D5142] to-primary-500 font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? (
                            <>
                                <span className="loading loading-spinner loading-sm"></span>
                                Logging In...
                            </>
                        ) : (
                            <>
                                Login
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>

                </form>

                {/* Divider */}

                <div className="my-8 flex items-center">

                    <div className="h-px flex-1 bg-earth-400" />

                    <span className="mx-4 text-sm text-earth-500">
                        OR
                    </span>

                    <div className="h-px flex-1 bg-earth-400" />

                </div>

                {/* Social Login */}

                <button className="flex h-14 w-full items-center justify-center gap-3 rounded-xl border border-earth-400 bg-white font-medium text-primary-800 transition hover:bg-secondary-100">
                    <Image
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        width={50}
                        height={50}
                        className="h-5 w-5"
                    />

                    Continue with Google
                </button>

                {/* Register */}

                <p className="mt-8 text-center text-earth-600">

                    Dont have an account?

                    <Link
                        href="/register"
                        className="ml-2 font-semibold text-secondary-700"
                    >
                        Create Account
                    </Link>

                </p>

            </div>

        </div>
    );
}