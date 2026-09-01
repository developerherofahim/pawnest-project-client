"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, User, Link2 } from "lucide-react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { Router } from "next/router";
import { router } from "better-auth/api";
import { redirect } from "next/navigation";


export default function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = (
        name,
        imageUrl,
        email,
        password,
        confirmPassword
    ) => {
        const error = {};

        // Name
        if (!name.trim()) {
            error.name = "Name is required.";
        }

        // Image URL
        if (!imageUrl.trim()) {
            error.imageUrl = "Image URL is required.";
        } else {
            try {
                new URL(imageUrl);
            } catch {
                error.imageUrl = "Please enter a valid image URL.";
            }
        }

        // Email
        if (!email.trim()) {
            error.email = "Email is required.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ) {
            error.email = "Please enter a valid email.";
        }

        // Password
        if (!password) {
            error.password = "Password is required.";
        } else if (password.length < 8) {
            error.password = "Password must be at least 8 characters.";
        } else if (!/[A-Z]/.test(password)) {
            error.password = "Password must contain at least one uppercase letter.";
        } else if (!/[a-z]/.test(password)) {
            error.password = "Password must contain at least one lowercase letter.";
        } else if (!/[0-9]/.test(password)) {
            error.password = "Password must contain at least one number.";
        } else if (!/[!@#$%^&*]/.test(password)) {
            error.password = "Password must contain at least one special character.";
        }

        // Confirm Password
        if (!confirmPassword) {
            error.confirmPassword = "Confirm password is required.";
        } else if (password !== confirmPassword) {
            error.confirmPassword =
                "Confirm password does not match.";
        }

        return error;
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        const form = e.target;

        const name = form.name.value.trim();
        const imageUrl = form.imageUrl.value.trim();
        const email = form.email.value.trim();
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        const validationErrors = validate(
            name,
            imageUrl,
            email,
            password,
            confirmPassword
        );

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return error;

        // setLoading(true);

        const { data, error } = await authClient.signUp.email({
            name,
            email,
            password,
            image: imageUrl,
        });

        if (error) {
            return toast.error(error.message);
        }


        toast.success("Sign Up Successful");
        redirect('/log-in');

    };

    // Optional: Live password validation
    const handlePasswordChange = (e) => {
        const password = e.target.value;

        setErrors((prev) => ({
            ...prev,
            password:
                password.length === 0
                    ? ""
                    : password.length < 8
                        ? "Password must be at least 8 characters."
                        : !/[A-Z]/.test(password)
                            ? "Password must contain at least one uppercase letter."
                            : !/[a-z]/.test(password)
                                ? "Password must contain at least one lowercase letter."
                                : !/[0-9]/.test(password)
                                    ? "Password must contain at least one number."
                                    : !/[!@#$%^&*]/.test(password)
                                        ? "Password must contain at least one special character."
                                        : "",
        }));
    };

    const handleGoogleLogIn = async (data) => {
        const { data: googleRes, error } = await authClient.signIn.social({
            provider: "google",
        });

        if (error) {
            console.error(error);
            return;
        }
    };

    return (
        <div className="w-full max-w-md">

            {/* Card */}

            <div className="rounded-3xl border border-[#E6DED2] bg-white p-8 shadow-xl">

                {/* Heading */}

                <div className="mb-8 text-center">

                    <h2 className="text-4xl font-bold text-primary-800">
                        Create Your Account
                    </h2>

                    <p className="mt-3 text-earth-500">
                        Sign up to start your adoption journey.
                    </p>

                </div>

                {/* Form */}

                <form
                    onSubmit={handleSignUp}
                    className="space-y-6"
                >
                    {/* Name */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-primary-800">
                            Name <span className="text-red-500">*</span>
                        </label>

                        <div className="relative">

                            <User
                                size={20}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-500"
                            />

                            <input
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                className="h-14 w-full rounded-xl border border-earth-400 bg-earth-50 pl-12 pr-4 outline-none transition focus:border-primary-800"
                            />

                        </div>
                        {errors.name && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>
                    {/* Image URL */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-primary-800">
                            Image URL <span className="text-red-500">*</span>
                        </label>

                        <div className="relative">

                            <Link2
                                size={20}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-500"
                            />

                            <input
                                name="imageUrl"
                                type="text"
                                placeholder="Enter your image URL"
                                className="h-14 w-full rounded-xl border border-earth-400 bg-earth-50 pl-12 pr-4 outline-none transition focus:border-primary-800"
                            />

                        </div>
                        {errors.imageUrl && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.imageUrl}
                            </p>
                        )}
                    </div>

                    {/* Email */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-primary-800">
                            Email Address <span className="text-red-500">*</span>
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
                            Password <span className="text-red-500">*</span>
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
                                onChange={handlePasswordChange}
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
                    {/* Confirm Password */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-primary-800">
                            Confirm Password <span className="text-red-500">*</span>
                        </label>

                        <div className="relative">

                            <Lock
                                size={20}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-500"
                            />

                            <input
                                name="confirmPassword"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter your confirm password"
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

                        {errors.confirmPassword && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.confirmPassword}
                            </p>
                        )}

                    </div>



                    {/* Sign Up */}

                    <button
                        disabled={loading}
                        className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary-800 via-[#2D5142] to-primary-500 font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? (
                            <>
                                <span className="loading loading-spinner loading-sm"></span>
                                Signing Up...
                            </>
                        ) : (
                            <>
                                Sign Up
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

                <button onClick={handleGoogleLogIn} className="flex h-14 w-full items-center justify-center gap-3 rounded-xl border border-earth-400 bg-white font-medium text-primary-800 transition hover:bg-secondary-100">
                    <Image
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        width={50}
                        height={50}
                        className="h-5 w-5"
                    />

                    Continue with Google
                </button>

            </div>

        </div>
    );
}