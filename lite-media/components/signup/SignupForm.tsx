import axios from "axios";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState,memo } from "react";
import { db } from "../../firebase";
import { GetState } from "../../state/stateProvider";
import { LOADING, LOGIN } from "../../state/types";
import { NODE_SERVER } from "../../util";
import { signUpValidationSchema } from "../../validator/index";

const initialValue = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
};

const SignUpForm = () => {
    const { dispatch } = GetState();
    const router = useRouter();
    const [error, setError] = useState("");
    const signup = (
        value: typeof initialValue,
        { setSubmitting }: { setSubmitting: (arg0: boolean) => void }
    ) => {
        dispatch({ type: LOADING });
        const isValid = signUpValidationSchema.isValidSync(value);
        if (isValid) {
            const { email, password } = value;
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    const userData = {
                        name: {
                            firstName: value.firstName,
                            lastName: value.lastName,
                            fullName: `${value.firstName} ${value.lastName}`,
                        },
                        email: user.email,
                        userId: user.uid,
                        active: true,
                        assistant: user.uid + "assistant",
                        created_at: moment().format(),
                    };
                    try {
                        await addDoc(collection(db, "users"), userData);
                        await addDoc(collection(db, userData.userId), userData);
                        const { data } = (await axios.post(
                            NODE_SERVER("/user"),
                            userData
                        )) as any;
                        if (!data.success) {
                            setError(data.message);
                        } else {
                            router.push("/");
                            dispatch({
                                type: LOGIN,
                                payload: {
                                    displayName: userData.name.fullName,
                                },
                            });
                        }
                    } catch (e) {
                        console.error("Error adding document: ", e);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    setError(error.message.replace("Firebase: ", ""));
                })
                .finally(() => {
                    setSubmitting(false);
                    dispatch({ type: LOADING });
                });
        }
    };
    return (
        <Formik
            initialValues={initialValue}
            validationSchema={signUpValidationSchema}
            onSubmit={signup}
            className="ease-in-out duration-1000"
        >
            {({ isSubmitting, isValid, values }) => (
                <Form className="mt-8 space-y-6">
                    <Field type="hidden" name="remember" defaultValue="true" />
                    {error && (
                        <div className="bg-red-500/70 text-white px-5 py-2 rounded-md ">
                            {error}
                        </div>
                    )}
                    <div className="rounded-md space-y-4">
                        <div className="flex justify-between space-x-4">
                            <div>
                                <label htmlFor="firstName" className="sr-only">
                                    First Name
                                </label>
                                <Field
                                    id="firstName"
                                    name="firstName"
                                    type="firstName"
                                    autoComplete="firstName"
                                    required
                                    className="appearance-none rounded-lg relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="First Name"
                                />
                                <ErrorMessage name="firstName">
                                    {(msg) => (
                                        <div className="text-red-500">
                                            {msg}
                                        </div>
                                    )}
                                </ErrorMessage>
                            </div>
                            <div>
                                <label htmlFor="lastName" className="sr-only">
                                    Last Name
                                </label>
                                <Field
                                    id="lastName"
                                    name="lastName"
                                    autoComplete="lastName"
                                    type="text"
                                    required
                                    className="appearance-none rounded-lg relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Last Name"
                                />
                                <ErrorMessage name="lastName">
                                    {(msg) => (
                                        <div className="text-red-500">
                                            {msg}
                                        </div>
                                    )}
                                </ErrorMessage>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <Field
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-lg relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                            <ErrorMessage name="email">
                                {(msg) => (
                                    <div className="text-red-500">{msg}</div>
                                )}
                            </ErrorMessage>
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <Field
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-lg relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                            <ErrorMessage name="password">
                                {(msg) => (
                                    <div className="text-red-500">{msg}</div>
                                )}
                            </ErrorMessage>
                        </div>
                        <div>
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="sr-only"
                                >
                                    Password
                                </label>
                                <Field
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="current-confirmPassword"
                                    required
                                    className="appearance-none rounded-lg relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="confirm Password"
                                />
                            </div>
                            <ErrorMessage name="confirmPassword">
                                {(msg) => (
                                    <div className="text-red-500">{msg}</div>
                                )}
                            </ErrorMessage>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Field
                                id="terms"
                                name="terms"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label
                                htmlFor="terms"
                                className="ml-2 block text-sm text-gray-900"
                            >
                                Accept{" "}
                                <span className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                                    Terms
                                </span>{" "}
                                &{" "}
                                <span className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                                    Conditions
                                </span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70"
                            disabled={isSubmitting || !isValid}
                        >
                            Sign in
                        </button>
                    </div>

                    <div>
                        <div className="text-sm text-center">
                            Already Have an Account? goto{" "}
                            <Link href="/login">
                                <a
                                    href="#"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Login
                                </a>
                            </Link>{" "}
                            Page
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default memo(SignUpForm);
