import { NextApiResponse } from "next";

interface CustomError {
    errors: any;
    message: any;
    error: { errors?: Error };
}

export const sendError = (res: NextApiResponse, error: CustomError) => {
    if (Object.keys(error.errors)) {
        const errors = Object.keys(error.errors).map((v) => ({
            [v]: error.errors[v].message,
        }));
        console.error({ errors });
        return res.json({
            message: JSON.stringify(errors),
            success: false,
        });
    } else {
        console.error({ error: error.message });
        return res.json({ message: error.message, success: false });
    }
};
