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
        <div className="p-4 border-b border-b-gray-200 transition-all duration-1000">
            {post && (
                <div
                    className={`"font-light text-justify break-all" ${
                        lineClamp ? "line-clamp-6" : "line-clamp-none"
                    }`}
                    onDoubleClick={() => setLineClamp((p) => !p)}
                >
                    {post}
                </div>
            )}
            {image && (
                <div className="relative h-48 w-full mt-3">
                    <Image
                        className="object-center object-cover rounded-md"
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
