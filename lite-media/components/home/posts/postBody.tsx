import Image from "next/image";
import { useState } from "react";

interface postBodyInterface {
    image: undefined | string;
    post: undefined | string;
    userName: string;
}

const PostBody = ({ image, post, userName }: postBodyInterface) => {
    const [lineClamp, setLineClamp] = useState(true);
    return (
        <div className="">
            {post && (
                <div
                    className={`"font-light text-justify " ${
                        lineClamp ? "line-clamp-6" : "line-clamp-none"
                    }`}
                    onClick={() => setLineClamp((p) => !p)}
                >
                    {post}
                </div>
            )}
            {image && (
                <div className="relative h-48 w-full mt-3">
                    <Image
                        className="object-center object-cover "
                        src={image}
                        alt={userName}
                        layout="fill"
                    />
                </div>
            )}
        </div>
    );
};

export default PostBody;
