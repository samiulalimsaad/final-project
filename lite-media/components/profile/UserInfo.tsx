import {
    CursorClickIcon,
    HomeIcon,
    MailIcon,
    PhoneIcon,
    SpeakerphoneIcon,
} from "@heroicons/react/solid";
import moment from "moment";
import Link from "next/link";
import React from "react";

interface userSelfInterface {
    id: string;
    email: string;
    contact: {
        tel: string;
        website: string;
        address: {
            city: string;
            street: string;
            state: string;
            country: string;
            zip: string;
        };
    };
    bio: string;
    createdAt: string;
}

const UserInfo = ({ bio, contact, createdAt, email }: userSelfInterface) => {
    return (
        <div>
            <div className="flex items-center space-x-2 py-4 px-2">
                {bio ? (
                    <>
                        <SpeakerphoneIcon
                            className="h-4 w-4 mr-2"
                            aria-hidden="true"
                        />
                        <p className="capitalize">{bio}</p>
                    </>
                ) : (
                    <Link href="/settings" passHref>
                        <a className="capitalize">add bio</a>
                    </Link>
                )}
            </div>
            <div className="flex flex-col justify-between space-y-2 py-4 px-2">
                {contact?.tel && (
                    <p className="capitalize flex space-y-2 items-center">
                        <PhoneIcon
                            className="h-4 w-4 mr-2"
                            aria-hidden="true"
                        />
                        {contact?.tel}
                    </p>
                )}
                {email && (
                    <p className="capitalize flex space-y-2 items-center">
                        <MailIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                        {email}
                    </p>
                )}
                {createdAt && (
                    <p className="capitalize flex space-y-2 items-center">
                        <CursorClickIcon
                            className="h-4 w-4 mr-2"
                            aria-hidden="true"
                        />
                        {moment(createdAt).format("DD/M/yyyy")}
                    </p>
                )}
            </div>
            {(contact?.address?.street ||
                contact?.address.city ||
                contact?.address.zip ||
                contact?.address.state ||
                contact?.address.country) && (
                <div className="flex items-center space-x-1 px-2 ">
                    <HomeIcon
                        className="h-4 w-4 ml-0 mr-2"
                        aria-hidden="true"
                    />
                    <p className="capitalize ml-0">
                        {contact?.address?.street}
                    </p>
                    ,<p className="capitalize">{contact?.address.zip}</p>,
                    <p className="capitalize">{contact?.address.city}</p>,
                    <p className="capitalize">{contact?.address.state}</p>,
                    <p className="capitalize">{contact?.address.country}</p>
                </div>
            )}
        </div>
    );
};

export default UserInfo;
