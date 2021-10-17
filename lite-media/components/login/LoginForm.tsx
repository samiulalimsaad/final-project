import axios from "axios";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { GetState } from "../../state/stateProvider";
import { LOADING, LOGIN } from "../../state/types";
import { NODE_SERVER } from "../../util";
import { LoginValidationSchema } from "../../validator/index";

const initialValue = { email: "", password: "" };

const LoginForm = () => {
    const { dispatch } = GetState();
    const router = useRouter();
    const [error, setError] = useState("");
    const login = (
        value: typeof initialValue,
        { setSubmitting }: { setSubmitting: (arg0: boolean) => void }
    ) => {
        dispatch({ type: LOADING });
        const isValid = LoginValidationSchema.isValidSync(value);
        if (isValid) {
            const { email, password } = value;
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    try {
                        const { data } = await axios.get(
                            NODE_SERVER("/user/" + user.uid)
                        );
                        if (!data.success) {
                            setError(data.message);
                        } else {
                            router.push("/");
                            dispatch({
                                type: LOGIN,
                                payload: {
                                    displayName: data.user.name.fullName,
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
            validationSchema={LoginValidationSchema}
            onSubmit={login}
        >
            {({ isSubmitting }) => (
                <Form className="mt-8 space-y-6">
                    <Field type="hidden" name="remember" defaultValue="true" />
                    {error && (
                        <div className="bg-red-500/70 text-white px-5 py-2 rounded-md ">
                            {error}
                        </div>
                    )}
                    <div className="rounded-md shadow-sm space-y-4">
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
                                className="appearance-none rounded-md relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                                className="appearance-none rounded-md relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                        <ErrorMessage name="password">
                            {(msg) => <div className="text-red-500">{msg}</div>}
                        </ErrorMessage>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Field
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label
                                htmlFor="remember-me"
                                className="ml-2 block text-sm text-gray-900"
                            >
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a
                                href="#"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Forgot your password?
                            </a>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            disabled={isSubmitting}
                        >
                            Sign in
                        </button>
                    </div>
                    <div>
                        <div className="text-sm text-center">
                            Create an{" "}
                            <Link href="/signup">
                                <a
                                    href="#"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Account
                                </a>
                            </Link>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
