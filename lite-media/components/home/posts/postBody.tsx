import Image from "next/image";
import { useState } from "react";
import { GetState } from "../../../state/stateProvider";
import { SHOW_IMAGE } from "../../../state/types";

interface postBodyInterface {
    id: string;
    image: undefined | string;
    post: undefined | string;
}

const PostBody = ({ id, image, post }: postBodyInterface) => {
    const { dispatch } = GetState();
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
                <div
                    className="relative h-48 w-full mt-3"
                    onClick={() =>
                        dispatch({
                            type: SHOW_IMAGE,
                            payload: { imageSrc: id },
                        })
                    }
                >
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
