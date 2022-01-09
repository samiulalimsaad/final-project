import { NextApiResponse } from "next";

interface CustomError {
    message: any;
    error: { errors?: any };
}

export const sendError = (res: NextApiResponse, error: any) => {
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
