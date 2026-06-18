'use client'
import React, { useState } from 'react';
import { Button, FieldError, Form, Input, Label, TextField, } from "@heroui/react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Check } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { Radio, RadioGroup } from "@heroui/react";


const RegisterPage = () => {
    const [isShowPass, setIsShowPass] = useState(false);
    const router = useRouter();
    const [role, setRole] = useState("seeker");

    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());
        console.log(user);

        const plan = role === "seeker" ? "seeker_free" : "recruiter_free";

        // const { data, error } = await authClient.signUp.email({
        //     name: user.name,
        //     image: user.image,
        //     email: user.email,
        //     password: user.password,
        //     role: user.role,
        //     plan: plan
        // });
        // console.log("sign up response", data, error);

        // if (error) {
        //     toast.error("Sign up failed " + error.message);
        // }
        // else if (data) {
        //     toast.success("Sign up successfull! Verify your Email...");
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
        <div className="container mx-auto min-h-screen px-4 py-20 bg-gray-50">

            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold">
                    Create Account
                </h2>

                <p className="text-gray-800 mt-2">
                    Start your journey with StayNest
                </p>
            </div>

            <div className="rounded-3xl max-w-2xl mx-auto border border-gray-400 bg-white p-8 backdrop-blur-xl">

                <Form onSubmit={onSubmit} className="flex flex-col gap-5 text-gray-900">

                    <TextField isRequired name="name" type="text">
                        <Label className="text-gray-700">
                            Full Name
                        </Label>

                        <Input className="w-full text-gray-900 bg-white border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your full name"/>
                        <FieldError />
                    </TextField>

                    <TextField isRequired name="image" type="text">
                        <Label className="text-gray-700">
                            Profile Image URL
                        </Label>

                        <Input className="w-full text-gray-900 bg-white border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://example.com/profile.jpg"/>
                        <FieldError />
                    </TextField>

                    <TextField isRequired name="email" type="email" validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}>
                        <Label className="text-gray-700">
                            Email
                        </Label>

                        <Input className="w-full text-gray-900 bg-white border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email"/>
                        <FieldError />
                    </TextField>

                    <TextField isRequired minLength={8} className="relative" name="password" type={isShowPass ? "text" : "password"} validate={(value) => {
                            if (value.length < 8) return "Password must be at least 8 characters";
                            if (!/[A-Z]/.test(value)) return "Must contain uppercase letter";
                            if (!/[a-z]/.test(value)) return "Must contain lowercase letter";
                            if (!/[0-9]/.test(value)) return "Must contain number";
                            return null;
                        }}>
                        <Label className="text-gray-700">
                            Password
                        </Label>

                        <Input className="w-full text-gray-900 bg-white border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Create a password"/>
                        <FieldError />

                        <button type="button" onClick={() => setIsShowPass(!isShowPass)} className="absolute top-9 right-3 text-gray-500 hover:text-gray-700">
                            {isShowPass ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </TextField>

                    <TextField isRequired minLength={8} className="relative" name="confirmPassword" type={isShowPass ? "text" : "password"}>
                        <Label className="text-gray-700">
                            Confirm Password
                        </Label>

                        <Input className="w-full text-gray-900 bg-white border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Confirm your password"/>
                        <FieldError />

                        <button type="button" onClick={() => setIsShowPass(!isShowPass)} className="absolute top-9 right-3 text-gray-500 hover:text-gray-700">
                            {isShowPass ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </TextField>

                    {/* Role Section */}
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                        <Label className="text-gray-700 mb-3 block">
                            Account Type
                        </Label>

                        <RadioGroup defaultValue="seeker" name="role" orientation="horizontal">
                            <Radio value="Tenant">
                                <Radio.Control>
                                    <Radio.Indicator />
                                </Radio.Control>

                                <Radio.Content>
                                    <Label className="text-gray-700">
                                        Tenant
                                    </Label>
                                </Radio.Content>
                            </Radio>

                            <Radio value="Owner">
                                <Radio.Control>
                                    <Radio.Indicator />
                                </Radio.Control>

                                <Radio.Content>
                                    <Label className="text-gray-700">
                                        Owner
                                    </Label>
                                </Radio.Content>
                            </Radio>
                        </RadioGroup>
                    </div>

                    {/* Button */}
                    <Button
                        className="w-full rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-semibold h-11"
                        type="submit">
                        <Check size={18} />
                        Create Account
                    </Button>

                    {/* Divider */}
                    <div className="relative flex items-center my-6">
                        <div className="grow border-t border-gray-400"></div>

                        <span className="px-4 text-sm text-gray-800 bg-white">
                            Or continue with
                        </span>

                        <div className="grow border-t border-gray-400"></div>
                    </div>
                </Form>

                <div className="mt-5 flex flex-col gap-4">
                    <Button
                        onClick={handleSigninGoogle}
                        className="w-full rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100">
                        <FcGoogle size={20} />
                        Continue with Google
                    </Button>

                    <h2 className="text-center text-gray-800">
                        Already have an account?
                        <Link href={`/signin?redirect=${redirectTo}`} className="ml-2 text-blue-500 font-bold hover:text-blue-300">
                            Sign In
                        </Link>
                    </h2>
                </div>
            </div>
        </div>
    );
};
export default RegisterPage;


