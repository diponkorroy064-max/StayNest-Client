'use client'
import React, { useState } from 'react';
import { Button, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Check } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter, useSearchParams } from 'next/navigation';


const SignInPage = () => {
    const [isShowPass, setIsShowPass] = useState(false);

    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";
    console.log("Redirect after sign in:", redirectTo);

    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());
        console.log(user);

        // const { data, error } = await authClient.signIn.email({
        //     email: user.email,
        //     password: user.password,
        //     rememberMe: true,
        // });
        // console.log("sign in response", data, error);

        // if (error) {
        //     toast.error("Sign In failed ." + error.message);
        // }
        // else if (data) {
        //     toast.success("Signed In successfull!")
        //     router.push(redirectTo);
        // }
    }


    const handleSigninGoogle = async () => {
        // const data = await authClient.signIn.social({
        //     provider: "google",
        // });
        // console.log("google sign in response", data);
    }


    return (
        <div className="container mx-auto py-20 px-4 min-h-screen bg-gray-50">

            <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-gray-900">
                    Welcome Back
                </h2>
                <p className="text-gray-500 mt-1">
                    Adventure with StayNest
                </p>
            </div>

            {/* Card */}
            <div className="mx-auto w-full max-w-md p-8 rounded-2xl border border-gray-200 shadow-lg bg-white">

                <Form onSubmit={onSubmit} className="flex flex-col gap-4">

                    {/* Email */}
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label className="text-gray-700">Email</Label>

                        <Input
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-pink-400 focus:outline-none"
                            placeholder="Enter Your Email"
                        />

                        <FieldError />
                    </TextField>

                    {/* Password */}
                    <TextField
                        isRequired
                        className="relative"
                        minLength={8}
                        name="password"
                        type={isShowPass ? "text" : "password"}
                        validate={(value) => {
                            if (value.length < 8) return "Password must be at least 8 characters";
                            if (!/[A-Z]/.test(value)) return "Must contain uppercase letter";
                            if (!/[0-9]/.test(value)) return "Must contain number";
                            return null;
                        }}
                    >
                        <Label className="text-gray-700">Password</Label>

                        <Input
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-pink-400 focus:outline-none"
                            placeholder="Enter your password"
                        />

                        <FieldError />

                        <button
                            type="button"
                            onClick={() => setIsShowPass(!isShowPass)}
                            className="absolute top-9 right-3 text-gray-500 hover:text-gray-700"
                        >
                            {isShowPass ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </TextField>

                    {/* Options */}
                    <div className="flex justify-between items-center text-sm text-gray-600">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            Remember Me
                        </label>

                        <span className="hover:text-pink-500 cursor-pointer">
                            Forget Password?
                        </span>
                    </div>

                    {/* Button */}
                    <Button
                        className="w-full rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-semibold h-11"
                        type="submit"
                    >
                        <Check />
                        Sign In
                    </Button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 text-gray-400 text-sm my-2">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <span>Or continue with</span>
                        <div className="flex-1 h-px bg-gray-200"></div>
                    </div>

                </Form>

                {/* Google + Signup */}
                <div className="flex flex-col gap-3 mt-4">

                    <Button
                        onClick={handleSigninGoogle}
                        className="w-full rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                    >
                        <FcGoogle />
                        Continue with Google
                    </Button>

                    <h2 className="text-center text-gray-600 text-sm">
                        Do not have an account?
                        <Link
                            className="text-pink-500 font-bold ml-1 hover:text-pink-600"
                            href={`/signup?redirect=${redirectTo}`}
                        >
                            Sign Up
                        </Link>
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;


