import Head from "next/head";
import Image from "next/image";
import React,{memo} from "react";
import { GetState } from "../../state/stateProvider";
import Loading from "../progress/Loading";
import SignUpForm from "./SignupForm";

const SignUp = () =>{
    const {loading}=GetState()
    return (
        <>
            <Head>
                <title>Signup - create a new account</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link
                    rel="icon"
                    href="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    sizes="any"
                    type="image/svg+xml"
                />
            </Head>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
                <div className="max-w-lg w-full space-y-8 drop-shadow-sm transition-shadow shadow-2xl p-12">
                    <div>
                        <span className="flex justify-center h-12 w-auto">
                            <Image
                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                alt="Workflow"
                                width="100%"
                                height="100%"
                            />
                        </span>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Create a new Account
                        </h2>
                    </div>
                    <SignUpForm />
                </div>
                {loading && <Loading/>}
            </div>
        </>
    );
}
export default memo(SignUp)