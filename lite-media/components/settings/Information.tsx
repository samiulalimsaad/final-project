import axios from "axios";
import { Field, Form, Formik } from "formik";
import useSWR from "swr";
import { GetState } from "../../state/stateProvider";
import { NOTIFICATION_ADD } from "../../state/types";
import { fetcher, NODE_SERVER } from "../../util";
import Countries from "../../util/countries.json";

const initialValue = {
    _id: "",
    email: "",
    gender: "",
    name: {
        firstName: "",
        lastName: "",
        fullName: "",
    },
    bio: "",
    contact: {
        tel: "",
        website: "",
        address: {
            city: "",
            street: "",
            state: "",
            zip: "",
            country: "",
        },
    },
};

const Information = () => {
    const { uid, dispatch } = GetState();

    const { data, error } = useSWR(NODE_SERVER(`/info/${uid}`), fetcher);
    if (error) {
        dispatch({
            type: NOTIFICATION_ADD,
            payload: { type: "error", text: error },
        });
    }

    const updateInfo = async (
        value: typeof initialValue,
        { setSubmitting }: { setSubmitting: (arg0: boolean) => void }
    ) => {
        try {
            const { firstName, lastName } = value.name;
            value.name.fullName = `${firstName} ${lastName}`;

            const { data } = await axios.put(
                NODE_SERVER("/info/" + uid),
                value
            );
            if (!data.success) {
                dispatch({
                    type: NOTIFICATION_ADD,
                    payload: { type: "warning", text: data.message },
                });
            } else {
                dispatch({
                    type: NOTIFICATION_ADD,
                    payload: { type: "success", text: data.message },
                });
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <section>
            <div className="mt-10 sm:mt-0">
                <div className="px-4">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Personal Information
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                        Use a permanent address where you can receive mail.
                    </p>
                </div>
                <div className="">
                    <div className="mt-5">
                        {data?.user?._id && (
                            <Formik
                                initialValues={data?.user!}
                                onSubmit={updateInfo}
                            >
                                {(isSubmitting) => (
                                    <Form>
                                        <div className="shadow overflow-hidden sm:rounded-md">
                                            <div className="px-4 py-5 bg-white sm:p-6">
                                                <div className="grid grid-cols-6 gap-6">
                                                    <div className="col-span-6 sm:col-span-3">
                                                        <label
                                                            htmlFor="firstName"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            First name
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            name="name.firstName"
                                                            id="firstName"
                                                            autoComplete="given-name"
                                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-3">
                                                        <label
                                                            htmlFor="lastName"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Last name
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            name="name.lastName"
                                                            id="lastName"
                                                            autoComplete="family-name"
                                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                    </div>

                                                    <div className="col-span-6 ">
                                                        <label
                                                            htmlFor="email"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Email address
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            name="email"
                                                            id="email"
                                                            autoComplete="email"
                                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                    </div>

                                                    <div className="col-span-6 ">
                                                        <label
                                                            htmlFor="country"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Country
                                                        </label>
                                                        <Field
                                                            as="select"
                                                            id="country"
                                                            name="contact.address.country"
                                                            autoComplete="country"
                                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        >
                                                            {Countries.map(
                                                                (v: {
                                                                    code: string;
                                                                    name: string;
                                                                }) => (
                                                                    <option
                                                                        key={
                                                                            v.code
                                                                        }
                                                                        value={
                                                                            v.name
                                                                        }
                                                                    >
                                                                        {v.name}
                                                                    </option>
                                                                )
                                                            )}
                                                        </Field>
                                                    </div>

                                                    <div className="col-span-6">
                                                        <label
                                                            htmlFor="tel"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Contact Number
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            name="contact.tel"
                                                            id="tel"
                                                            autoComplete="tel"
                                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                    </div>
                                                    <div className="col-span-6">
                                                        <label
                                                            htmlFor="street"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Street address
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            name="contact.address.street"
                                                            id="street"
                                                            autoComplete="street"
                                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                    </div>
                                                    <div className="col-span-6 ">
                                                        <label
                                                            htmlFor="gender"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Gender
                                                        </label>
                                                        <Field
                                                            as="select"
                                                            id="gender"
                                                            name="gender"
                                                            autoComplete="gender"
                                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        >
                                                            <option value="male">
                                                                Male
                                                            </option>
                                                            <option value="female">
                                                                Female
                                                            </option>
                                                            <option value="notInterested">
                                                                Not Interested
                                                            </option>
                                                        </Field>
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                                        <label
                                                            htmlFor="city"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            City
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            name="contact.address.city"
                                                            id="city"
                                                            autoComplete="address-level2"
                                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                        <label
                                                            htmlFor="state"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            State / Province
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            name="contact.address.state"
                                                            id="state"
                                                            autoComplete="address-level1"
                                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                        <label
                                                            htmlFor="zip"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            ZIP / Postal code
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            name="contact.address.zip"
                                                            id="zip"
                                                            autoComplete="zip"
                                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                                            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                                <div className="grid grid-cols-6 gap-6">
                                                    <div className="col-span-6">
                                                        <label
                                                            htmlFor="website"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Website
                                                        </label>
                                                        <div className="mt-1 w-full flex rounded-md shadow-sm">
                                                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                                                http://
                                                            </span>
                                                            <Field
                                                                type="text"
                                                                name="contact.website"
                                                                id="website"
                                                                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                                                placeholder="www.example.com"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label
                                                        htmlFor="bio"
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        Bio
                                                    </label>
                                                    <div className="mt-1">
                                                        <Field
                                                            as="textarea"
                                                            id="bio"
                                                            name="bio"
                                                            rows={3}
                                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                            placeholder="Brief description for
                                                        your profile."
                                                            maxLength={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                                <button
                                                    type="submit"
                                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Information;
