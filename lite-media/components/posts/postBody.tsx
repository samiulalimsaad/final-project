import Image from "next/image";
import { useState } from "react";

interface postBodyInterface {
    id: string;
    image?: undefined | string;
    post?: undefined | string;
}

const PostBody = ({ id, image, post }: postBodyInterface) => {
    const [lineClamp, setLineClamp] = useState(true);
    return (
        <div className="py-4">
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
                        alt="post image"
                        layout="fill"
                    />
                </div>
            )}
        </div>
    );
};

export default PostBody;
